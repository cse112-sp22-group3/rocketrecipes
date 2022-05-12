// custom-navbar.js

class Navbar extends HTMLElement {
  constructor() {
    super(); // Inherit everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });

    // Create styles for navbar
    const style = document.createElement('style');
    style.innerHTML = `
        .navbar-container {
            background-color: #C2FFD9;
            position: fixed;
            display: flex;
            flex-direciton: row;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            top: 0;
            height: 90px;
            font-size: 20px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
            z-index: 1000;
        }
        .navbar-container a{
          background-color:  #C2FFD9;
        }
        .navbar-image {
            text-decoration: none;
            width: 75px;
            height 75px;
            padding: 5px 0 0 10px;
        }
        .navbar-image img{
            object-fit: cover;
        }
        .navbar-text-link {
            background-color: #FFAB4C;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            width: 130px;
            padding: 0 20px;
            height: 80px;
            color: black;
            text-decoration: none;
            background-color: white;
        }
        .navbar-text-link:hover {
            cursor: pointer;
            background-color: #98fbbe;
        }
        .mobile-navbar-expanded {
            position: absolute;
            width: 100%;
            top: 80px;
            display: flex;
            flex-direction: column;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
        }
        .mobile-link {
            width: 100%;
            padding: 0;
        }
        .mobile-navbar-button {
            width: 48px;
            height: 48px;
            background: url('https://api.iconify.design/icon-park-outline/hamburger-button.svg?color=%23999&height=48') no-repeat center center / contain;
            margin-right: 10px;
        }
        @media (max-width: 650px) {
            .navbar-links-container-desktop {
                display: none;
            }
            .navbar-links-container-mobile {
                display: flex;
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

    // Create html for navbar
    const navbarContainer = document.createElement('div');
    navbarContainer.innerHTML = `
        <a class="navbar-image" href="./index.html"> 
            <img src="../media/teamLogo.png" width="75" height="75" > 
        </a>
        <div class="navbar-links-container-desktop"> 
            <a class="navbar-text-link" id="search" href="./searchpage.html">Search</a>
            <a class="navbar-text-link" id="create" href="./CreateRecipe.html">Create Recipe</a>
            <a class="navbar-text-link" id="account" href="./generalAccount.html">My Account</a>
        </div>
        <div class="navbar-links-container-mobile"> 
            <div class="mobile-navbar-button"></div>
        </div>
        <div class="mobile-navbar-expanded">
            <a class="navbar-text-link mobile-link" id="search-mobile" href="./searchpage.html">Search</a>
            <a class="navbar-text-link mobile-link" id="create-mobile" href="./CreateRecipe.html">Create Recipe</a>
            <a class="navbar-text-link mobile-link" id="account-mobile" href="./generalAccount.html">My Account</a>
        </div>
    `;

    const navbarLinksBody = navbarContainer.querySelector('.mobile-navbar-expanded');
    navbarLinksBody.style.display = 'none'; // Hide mobile navbar links on new page

    navbarContainer.querySelector('.mobile-navbar-button').addEventListener('click', () => {
      if (navbarLinksBody.style.display === 'none') {
        navbarLinksBody.style.display = 'flex';
      } else {
        navbarLinksBody.style.display = 'none';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 650) {
        navbarLinksBody.style.display = 'none';
      }
    });

    navbarContainer.classList.add('navbar-container');

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
