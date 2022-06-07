/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import { VoiceButton } from './voice-button.js';
// creates form with all checkboxes for filtering search
// the search bar originally present on index.html and on the searchPage.html

function createCheckboxes() {
  const tagProperties = [
    { id: 'dairyFree', name: 'Dairy Free' },
    { id: 'fiveIngredientsOrLess', name: 'Easy' },
    { id: 'glutenFree', name: 'Gluten Free' },
    { id: 'quickEat', name: 'Quick Eat' },
    { id: 'vegan', name: 'Vegan' },
    { id: 'vegetarian', name: 'Vegetarian' },
  ];
  const checkboxContainer1 = document.createElement('div');
  checkboxContainer1.classList.add('checkboxes1');
  const checkboxContainer = document.createElement('div');
  checkboxContainer.id = 'checkboxes';
  checkboxContainer.classList.add('checkboxes');
  tagProperties.forEach((tag) => {
    const func = document.createElement('div');
    func.classList.add('checked');

    const inp = document.createElement('input');
    inp.id = tag.id;
    inp.name = tag.name;
    inp.type = 'checkbox';
    inp.classList.add('checkbox');

    const tagCheckbox = document.createElement('label');
    tagCheckbox.classList.add('container');
    tagCheckbox.innerText = tag.name;

    // const inpspan = document.createElement('span');
    // inpspan.classList.add('checkmark');
    checkboxContainer1.appendChild(checkboxContainer);
    checkboxContainer.appendChild(func);
    func.appendChild(inp);
    // tagCheckbox.appendChild(inpspan);
    func.appendChild(tagCheckbox);
  });

  return checkboxContainer1;
}

// creates checkbox container with show and hide buttons
function createCheckboxContainer() {
  const filterContainer = document.createElement('div');
  const checkboxFormContainer = createCheckboxes();
  // create show and hide checkbox buttons and their logic
  const showCheckboxesButton = document.createElement('button');
  showCheckboxesButton.innerText = 'SHOW FILTERS';
  showCheckboxesButton.classList.add('button1');
  const filterContainer1 = document.createElement('div');
  const hideCheckboxesButton = document.createElement('button');
  hideCheckboxesButton.style.display = 'none';
  hideCheckboxesButton.innerText = 'HIDE FILTERS';
  hideCheckboxesButton.classList.add('button1');

  showCheckboxesButton.onclick = () => {
    checkboxFormContainer.style.display = 'unset';
    showCheckboxesButton.style.display = 'none';
    hideCheckboxesButton.style.display = 'unset';
  };

  hideCheckboxesButton.onclick = () => {
    checkboxFormContainer.style.display = 'none';
    showCheckboxesButton.style.display = 'unset';
    hideCheckboxesButton.style.display = 'none';
  };

  // add all checkbox containers and elements to the container
  filterContainer.appendChild(showCheckboxesButton);
  filterContainer.appendChild(checkboxFormContainer);
  filterContainer.appendChild(filterContainer1);
  filterContainer1.appendChild(hideCheckboxesButton);
  return filterContainer;
}

class Searchbar extends HTMLElement {
  constructor() {
    super(); // Inheret everything from HTMLElement

    // Attach the shadow DOM and append this markup / stlying inside
    this.attachShadow({ mode: 'open' });

    // create styles for searchbar
    const style = document.createElement('style');
    style.innerHTML = ` 
            @media only screen and (max-width: 900px){
              .button1{
                margin-top: 5%;
                margin-bottom: 3%;
                float: left;
                position: absolute; 
                left: 2%;
                border:none;
                background-color: #DEDEDE;
                font-size: 12px;
                margin-left: 8%;
                cursor: pointer;
                font-family: 'Nunito', sans-serif !important;
                z-index:1;
              }
              .checked{
                display: inline-block;
                width: 120px;
                text-align: left;
              }
              .container {
                font-size: 15px;
                vertical-align: top;
                margin-left: 8%;
                text-align: left;
              }
              .checkbox{
                height:18px;
                margin-left: 3%;
                margin-bottom: 9%;
                width: 20px;
              }
            }
            @media only screen and (min-width: 900px){
              .button1{
                margin-top: 2%;
                margin-bottom: 3%;
                float: left;
                position: absolute; 
                left: 2%;
                border:none;
                background-color: #DEDEDE;
                font-size: 12px;
                margin-left: 20%;
                cursor: pointer;
                font-family: 'Nunito', sans-serif !important;
                z-index: 1;
              }
              .checked{
                display: inline-block;
                width: 250px;
                text-align: left;
              }
              .container {
                font-size: 18px;
                vertical-align: top;
                margin-left: 8%;
                text-align: left;
              }
              .checkbox{
                height:25px;
                margin-left: 3%;
                margin-bottom: 9%;
                width: 20px;
              }
            }
            .bar{
                margin: 0 auto;
                width: 80%;
                height: 50px;
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
            }
            .ingredients-included{
                height:calc(5vh);
                border:none;    
                width:80%;
                font-size:16px;
                outline: none;
                background-color: white;
            }
            .ingredients-excluded{
                height:calc(5vh);
                border:none;    
                width:80%;
                font-size:16px;
                outline: none;
                background-color: white;
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
            .checkboxes1{
              display: none;
            }
            .checkboxes {
                width: 100%;
                height: auto;
                display: inline-block;
                text-align: left;
                margin-left: 8%;
                margin-top: 5%;
            }
            /* Style the button that is used to open and close the collapsible content */
            .collapsible {
              margin-top: calc(1vh);
              background-color: #eee;
              color: #444;
              cursor: pointer;
              padding: 18px;
              width: 80%;
              border: none;
              text-align: left;
              outline: none;
              font-size: 15px;
            }

            /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
            .active, .collapsible:hover {
              background-color: #ccc;
            }

            /* Style the collapsible content. Note: hidden by default */
            .content {
              padding: 0 18px;
              display: none;
              overflow: hidden;
            }

            .collapsible:after {
              font-size: 13px;
              color: white;
              float: right;
              margin-left: 5px;
            }

            .active:after {
            }
        `;

    const searchbarContainer = document.createElement('div');
    const form = document.createElement('form');
    form.id = 'search-bar-form';
    searchbarContainer.appendChild(form);
    form.classList.add('bar');

    const searchInput = document.createElement('input');
    searchInput.classList.add('searchbar');
    searchInput.type = 'text';
    searchInput.id = 'ss';
    searchInput.name = 's';
    searchInput.placeholder = 'Start typing...';
    searchInput.ariaLabel = 'Search through site content';
    this.searchInput = searchInput;

    // element for ingredients INCLUDED
    const ingInputi = document.createElement('input');
    ingInputi.classList.add('ingredients-included');
    ingInputi.type = 'text';
    ingInputi.id = 'ingredients-included';
    ingInputi.name = 's';
    ingInputi.placeholder = 'Add ingredients to include as comma separated values';
    ingInputi.ariaLabel = 'Search through site content';
    ingInputi.style = 'position: relative; top:5px; right: 10px;';

    // element for ingredients EXCLUDED
    const ingInpute = document.createElement('input');
    ingInpute.classList.add('ingredients-excluded');
    ingInpute.type = 'text';
    ingInpute.id = 'ingredients-excluded';
    ingInpute.name = 's';
    ingInpute.placeholder = 'Add ingredients to exclude as comma separated values';
    ingInpute.ariaLabel = 'Search through site content';
    ingInpute.style = 'position: relative; top:10px;  right: 10px;';

    const collapsible = document.createElement('button');
    collapsible.className = 'collapsible';
    collapsible.textContent = 'Search by Ingredient +';
    searchbarContainer.appendChild(collapsible);

    const content = document.createElement('div');
    content.className = 'content';

    searchbarContainer.appendChild(content);
    const searchButton = document.createElement('button');
    searchButton.innerHTML = `
        <a href="#"> 
            <img class="search" src="../media/search.png" alt="Search"/>
        </a>
    `;
    // searchButton.style.paddingTop = 'auto';

    form.appendChild(searchInput);
    form.appendChild(searchButton);

    const voiceButton = new VoiceButton();
    searchbarContainer.appendChild(voiceButton);

    const checkboxContainer = createCheckboxContainer();
    searchbarContainer.appendChild(checkboxContainer);

    content.appendChild(ingInputi);
    content.appendChild(ingInpute);

    this.shadowRoot.append(style, searchbarContainer);

    function handleSearch() {
      const searchInputValue = searchInput.value; // search query
      const ingIncludeInputValue = ingInputi.value;
      const ingExcludeInputValue = ingInpute.value;

      // get tags
      const tags = [];
      const checkboxes = checkboxContainer.querySelectorAll('input');
      checkboxes.forEach((c) => {
        if (c.checked) {
          tags.push(c.id);
        }
      });

      const currentUrl = window.location;
      // Create the url for search
      window.location = `${
        currentUrl.origin
      }/root/html/searchpage.html?searchQuery=${searchInputValue}${
        tags.length > 0 ? `&tags=${tags.join(',')}` : ''
      }${ingIncludeInputValue !== '' ? `&IngIncl=${ingIncludeInputValue}` : ''
      }${ingExcludeInputValue !== '' ? `&IngExcl=${ingExcludeInputValue}` : ''
      } `;
    }
    this.handleSearch = handleSearch;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSearch(e);
    });

    const coll = document.querySelector('#searchbar').shadowRoot.querySelector('div > button');

    coll.addEventListener('click', function () {
      this.classList.toggle('active');
      const cont = this.nextElementSibling;
      if (cont.style.display === 'block') {
        cont.style.display = 'none';
        coll.textContent = 'Search by Ingredient +';
      } else {
        cont.style.display = 'block';
        coll.textContent = 'Search by Ingredient -';
      }
    });
  }
}

// Define the Class so you can use it as a custom element
customElements.define('custom-searchbar', Searchbar);
