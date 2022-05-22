// custom-navbar.js

class Navbar extends HTMLElement {
  constructor() {
    super(); // Inherit everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    // The shadow root will help us keep everything separated
    this.attachShadow({ mode: 'open' });

    // create styles for navbar
    const style = document.createElement('style');
    style.innerHTML = `
        .site-title {
          font-weight: 800;
          text-transform: uppercase;
          font-size: 50px;
          position: absolute;
          float: none;
          top: 7%;
          left: 50%;
          margin-top: 75px;
          transform: translate(-50%, -50%);
        }
        .site-description { 
          font-weight: 400;
          font-size: 15px;
          text-align: center;
          position: absolute;
          color: #504143;
          float: none;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        #navbar-id {
            position: fixed;
            width: 100%;
            padding: 50px 10px;
            transition: 0s; 
            /* background
            background-image: url('../media/nav_background.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-opacity: 60%;
            */
        }
        .navbar-container {
            left: 0;
            right: 0;
            padding: 50 10px;
            background-color: white;
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
            width: 68px;
            height: 68px;
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
        @media (max-width: 800px) {
          .navbar-text-link {
            font-size: 12px;
            width: 100px;
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
          .site-title.mobile {
              font-size: 5px;
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
        <a class='navbar-image' href='./index.html'> 
            <img src='../media/teamLogo.png' > 
        </a>

        <p class='site-title' id='site-title'>
            <a href='https://rocket-recipes.com/'>Rocket Recipes</a> 
        </p>
        <p class='site-description' id='description'>prepare for trouble, make it double (servings)!</p>
        
        <div class='navbar-links-container-desktop'> 
            <a class='navbar-text-link' id='search' href='./searchpage.html'>Search</a>
            <a class='navbar-text-link' id='create' href='./CreateRecipe.html'>Create Recipe</a>
            <a class='navbar-text-link' id='account' href='./generalAccount.html'>My Account</a>
        </div>
        <div class='navbar-links-container-mobile'> 
            <div class='mobile-navbar-button'></div>
        </div>
        <div class='mobile-navbar-expanded'>
            <a class='navbar-text-link mobile-link' id='search-mobile' href='./searchpage.html'>Search</a>
            <a class='navbar-text-link mobile-link' id='create-mobile' href='./CreateRecipe.html'>Create Recipe</a>
            <a class='navbar-text-link mobile-link' id='account-mobile' href='./generalAccount.html'>My Account</a>
        </div>
    `;

    const navbarLinksBody = navbarContainer.querySelector('.mobile-navbar-expanded');
    navbarLinksBody.style.display = 'none'; // hide mobile navbar links on new page

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
    const navbarTitle = navbarContainer.querySelector('.site-title');
    const navbarDescription = navbarContainer.querySelector('.site-description');

    if (window.innerWidth <= 1300) {
      navbarContainer.style.padding = '30px 10px';
      navbarTitle.style.fontSize = '30px';
      navbarDescription.style.left = '252px';
      navbarDescription.style.margin = '5px';
    } else {
      navbarContainer.style.padding = '50px 10px';
      navbarTitle.style.fontSize = '50px';
      navbarTitle.style.marginTop = '75px';
      navbarDescription.style.left = '50%';
      navbarDescription.style.marginTop = '20px';
      // changing logo size (?)
      navbarContainer.querySelector('.navbar-image').style.height = '150%';
      navbarContainer.querySelector('.navbar-image').style.width = 'auto';
    }
    // navbar gets smaller as you scroll
    function scrollFunction () {
      // scrolled down page
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navbarContainer.style.padding = '10px 10px';
        navbarTitle.style.fontSize = '30px';
        navbarTitle.style.marginTop = '45px';
        // hiding motto
        navbarDescription.style.display = 'none';
        // changing logo size
        navbarContainer.querySelector('.navbar-image').style.width = '5px';
        // document.getElementById('nava ')
      } else {
        navbarTitle.style.marginTop = '50px';
        // showing motto
        navbarDescription.style.display = 'block';
        navbarDescription.style.padding = '0px';
        // if window is small keep font small
        if (window.innerWidth <= 1300) {
          navbarContainer.style.padding = '30px 10px';
          navbarTitle.style.fontSize = '30px';
          navbarDescription.style.fontSize = '11px';
          navbarDescription.style.left = '210px';
          navbarDescription.style.margin = '5px';
        } else {
          navbarContainer.style.padding = '50px 10px';
          navbarTitle.style.fontSize = '50px';
          navbarTitle.style.marginTop = '75px';
          navbarDescription.style.fontSize = '15px';
          navbarDescription.style.left = '50%';
          navbarDescription.style.marginTop = '20px';
          // changing logo size (?)
          navbarContainer.querySelector('.navbar-image').style.height = '150%';
          navbarContainer.querySelector('.navbar-image').style.width = 'auto';
        }
      }
    }
    window.onscroll = function() {
      scrollFunction()
    };

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
