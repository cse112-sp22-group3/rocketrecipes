/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
// custom-navbar.js
import { logOut } from '../scripts/authUtils.js';

class Navbar extends HTMLElement {
  constructor() {
    const LOCAL_STORAGE_USER_KEY = 'uuid';
    super(); // Inherit everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });

    // create styles for navbar
    const style = document.createElement('style');
    style.innerHTML = `
        .site-title {
            padding-right: 20px;
        }
        #navbar-id {
            position: fixed;
            width: 100%;
            transition: 0.4s; 
            /* background
            background-image: url('../media/nav_background.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-opacity: 60%;
            */
            background-color: white;
        }
        .navbar-container {
            padding: 50px 10px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 100%;
            align-items: center;
            position: fixed;
            top: 0;
            display: flex;
            flex-direciton: row;
            justify-content: space-between;
            font-size: 20px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            height: 55px;
            background-color: white;
        }
        .navbar-container a{
          color: black;
          text-decoration: none;
        }
        .navbar-image {
            text-decoration: none;
        }
        .navbar-image img{
            object-fit: cover;
            width: 400px;
            height: 80px;
        }
        .navbar-text-link {
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            width: 130px;
            padding: 0 10px;
            height: 50px;
            color: black;
            text-decoration: none;
            background-color: none;
            text-transform: uppercase;
            font-size: 15px;
        }
        .navbar-text-link:hover {
            cursor: pointer;
            background-color: white;
            opacity: 0.6;
        }
        .scrolling-active {
            padding: 8px 10px;
        }
        .scrolling-active .navbar-image img{
            object-fit: cover;
            padding-top: 12px;
            width: 55px;
            height: 55px;
        }
        .mobile-navbar-expanded {
            position: absolute;
            width: 30%;
            top: 100px;
            right: 0px;
            display: flex;
            flex-direction: column;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
            background: white;
        }
        .mobile-link {
            width: 100%;
            padding: 0;
        }
        .mobile-navbar-button {
          width: 36px;
          height: 36px;
          background: url('https://api.iconify.design/icon-park-outline/hamburger-button.svg?color=%23999&height=48') no-repeat center center / contain;
          margin-right: 10px;
        }
        p.mobile { 
          font-size: 10px;
        }
        @media (max-width: 1690px) {
            .navbar-text-link {
              width: 120px;
              font-size: 15px;
              padding: 5px;
            }
        }
        /*
        @media (max-width: 1300px) {
            .site-title {
              font-weight: 800;
              text-align: left;
              text-transform: uppercase;
              top: 7%;
              left: 231px;
            }
            .site-description {
              margin: 5px;
              left: 251px;
            }
        }
        */
        @media (max-width: 950px) {
          .navbar-text-link {
            font-size: 12px;
            width: 90px;
          }
          .navbar-image img{
            object-fit: cover;
            width: 250px;
            height: 50px;
          }
        }
        @media (max-width: 650px) {
          .navbar-links-container-desktop {
              display: none;
          }
          .navbar-links-container-mobile {
              display: flex;
          }
        } 
        @media screen and (max-width: 640px) {
          .navbar-image img{
            object-fit: cover;
            width: 250px;
            height: 50px;
        }
        }
        @media (min-width: 651px) {
            .navbar-links-container-desktop {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .navbar-links-container-mobile {
                display: none;
            }
        }
    `;

    // create html for navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.setAttribute('id', 'navbar-id');
    navbarContainer.innerHTML = `
        <div class='site-title'>
            <h1 class='site-header'>
                  <a class='navbar-image' href='./index.html'> 
                      <img class='logo' src='../media/header-logo.png'> 
                  </a>
            </h1>
        </div>
        <div class='navbar-links-container-desktop'> 
            <a class='navbar-text-link' id='search' href='./searchpage.html'>Search</a>
            <a class='navbar-text-link' id='create' href='./CreateRecipe.html'>Create Recipe</a>
            <a class='navbar-text-link' id='account' href='./generalAccount.html'>My Account</a>
            <a class="navbar-text-link" id="sign-in" href="./entry.html">Sign In</a>
        </div>
        <div class='navbar-links-container-mobile'> 
            <div class='mobile-navbar-button'></div>
        </div>
        <div class='mobile-navbar-expanded'>
            <a class='navbar-text-link mobile-link' id='search-mobile' href='./searchpage.html'>Search</a>
            <a class='navbar-text-link mobile-link' id='create-mobile' href='./CreateRecipe.html'>Create Recipe</a>
            <a class='navbar-text-link mobile-link' id='account-mobile' href='./generalAccount.html'>My Account</a>
            <a class="navbar-text-link mobile-link" id="account-mobile" href="./entry.html">Sign In</a>
        </div>
    `;

    if (localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
      navbarContainer.querySelector('#sign-in').textContent = 'Logout';
    }

    navbarContainer.querySelector('#sign-in').addEventListener('click', () => {
      if (localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
        navbarContainer.querySelector('#sign-in').textContent = 'Sign In';
        logOut();
      }
    });

    const navbarLinksBody = navbarContainer.querySelector('.mobile-navbar-expanded');
    navbarLinksBody.style.display = 'none'; // hide mobile navbar links on new page

    navbarContainer.querySelector('.mobile-navbar-button').addEventListener('click', () => {
      if (navbarLinksBody.style.display === 'none') {
        navbarLinksBody.style.display = 'flex';
      } else {
        navbarLinksBody.style.display = 'none';
      }
    });

    // eslint-disable-next-line linebreak-style
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 650) {
        navbarLinksBody.style.display = 'none';
      }
    });

    navbarContainer.classList.add('navbar-container');

    const initialSrc = '../media/header-logo.png';
    const scrollSrc = '../media/teamLogo.png';
    const navLogo = navbarContainer.querySelector('.logo');
    window.addEventListener('scroll', () => {
      const windowPosition = window.scrollY > 0;
      navbarContainer.classList.toggle('scrolling-active', windowPosition);
      if (windowPosition) {
        navLogo.setAttribute('src', scrollSrc);
      } else navLogo.setAttribute('src', initialSrc);
    });

    const page = this.getAttribute('page');
    switch (page) {
      case 'search':
        navbarContainer.querySelector('#search').style.textDecoration = 'underline';
        navbarContainer.querySelector('#search-mobile').style.textDecoration = 'underline';
        break;
      case 'create':
        navbarContainer.querySelector('#create').style.textDecoration = 'underline';
        navbarContainer.querySelector('#create-mobile').style.textDecoration = 'underline';
        break;
      case 'account':
        navbarContainer.querySelector('#account').style.textDecoration = 'underline';
        navbarContainer.querySelector('#account-mobile').style.textDecoration = 'underline';
        break;
      default:
        break;
    }

    this.shadowRoot.append(style, navbarContainer);
  }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-navbar', Navbar);
