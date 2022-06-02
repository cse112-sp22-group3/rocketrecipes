/* eslint-disable linebreak-style */
// the search bar present in the navbar
// the search bar for simple-custom-navbar

class Searchbar extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    this.attachShadow({ mode: 'open' });

    // create styles for searchbar
    const style = document.createElement('style');
    style.innerHTML = `
            @media (max-width: 1690px) {
                .bar {
                width: 300px;
                font-size: 15px;
                padding: 5px;
                }
            }
            .bar{
                margin: 0 auto;
                height: 55px;
                border-radius: 0px;
                color: #D3D3D3;
                border: 1px solid;
                background-color: white;
            }
            .bar:hover{
                box-shadow: 1px 1px 8px 1px #dcdcdc;
            }
            .bar:focus-within{
                box-shadow: 1px 1px 8px 1px #dcdcdc;
                outline:none;
            }
            .searchbar{
                height:16px;
                border:none;
                width:80%;
                font-size:16px;
                outline: none;
                background-color: white;
                text-transform: uppercase;
            }
            .search{
                padding-top:7px;
                height:16px;
                position:relative;
                display:inline-block;
                top:5px;
                left:10px;
            }
            .bar button{
                padding-top:10px;
                border:none;
                outline: none;
                background-color: white;
            }
        `;

    const searchbarContainer = document.createElement('div');
    const form = document.createElement('form');
    form.id = 'simple-search-bar-form';
    searchbarContainer.appendChild(form);
    form.classList.add('bar');

    const searchInput = document.createElement('input');
    searchInput.classList.add('searchbar');
    searchInput.type = 'text';
    searchInput.id = 'ss';
    searchInput.name = 's';
    searchInput.placeholder = 'Start typing...';
    searchInput.ariaLabel = 'Search through site content';

    const searchButton = document.createElement('button');
    searchButton.innerHTML = `
          <a href="#"> 
              <img class="search" src="../media/search.png" alt="Search"/>
          </a>
      `;
    // searchButton.style.paddingTop = 'auto';

    form.appendChild(searchInput);
    form.appendChild(searchButton);

    this.shadowRoot.append(style, searchbarContainer);

    function handleSearch() {
      const searchInputValue = searchInput.value; // search query

      const currentUrl = window.location;
      window.location = `${currentUrl.origin
      }/root/html/searchpage.html?searchQuery=${searchInputValue}${''}`;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSearch(e);
    });
  }
}

// Define the Class so you can use it as a custom element
customElements.define('simple-custom-searchbar', Searchbar);
