/* eslint-disable linebreak-style */
// eslint-disable-next-line import/extensions
import { search } from './utils.js';

const resultsPerPage = 12;
const activeColor = 'white';
let pageUserIsOn = 1;
let numResults = 0;
let totalPages = 1;
let resultsFound = 0;
let searchQuery = '';
let filterTags = [];
let filterMessage = '';
let ingredsIncluded = '';
let ingredsExcluded = '';

function buttonReset() {
  const pageButtonFirst = document.getElementById('search-page-button-first');
  const pageButtonPrevious = document.getElementById('search-page-button-previous');
  const pageButtonNext = document.getElementById('search-page-button-next');
  const pageButtonLast = document.getElementById('search-page-button-last');
  if (pageUserIsOn === 1) { // no more previous pages
    pageButtonPrevious.style.display = 'none';
    pageButtonPrevious.disabled = true;
    pageButtonFirst.style.display = 'none';
    pageButtonFirst.disabled = true;
    // active buttons
    pageButtonNext.style.display = 'block';
    pageButtonNext.style.backgroundColor = activeColor;
    pageButtonNext.disabled = false;
    pageButtonLast.style.display = 'block';
    pageButtonLast.style.backgroundColor = activeColor;
    pageButtonLast.disabled = false;
  } else if (pageUserIsOn < totalPages) {
    pageButtonPrevious.style.display = 'block';
    pageButtonPrevious.style.backgroundColor = activeColor;
    pageButtonPrevious.disabled = false;
    pageButtonFirst.style.display = 'block';
    pageButtonFirst.style.backgroundColor = activeColor;
    pageButtonFirst.disabled = false;
    pageButtonNext.style.display = 'block';
    pageButtonNext.style.backgroundColor = activeColor;
    pageButtonNext.disabled = false;
    pageButtonLast.style.display = 'block';
    pageButtonLast.style.backgroundColor = activeColor;
    pageButtonLast.disabled = false;
  } else {
    pageButtonPrevious.style.display = 'block';
    pageButtonPrevious.style.backgroundColor = activeColor;
    pageButtonPrevious.disabled = false;
    pageButtonFirst.style.display = 'block';
    pageButtonFirst.style.backgroundColor = activeColor;
    pageButtonFirst.disabled = false;
    pageButtonNext.style.display = 'none';
    pageButtonNext.disabled = true;
    pageButtonLast.style.display = 'none';
    pageButtonLast.disabled = true;
  }
  const includeMessage = ` including ${ingredsIncluded}`;
  const excludeMessage = ` excluding ${ingredsExcluded}`;
  document.getElementById('searchHeader').innerHTML = `${resultsFound} recipes found for ${filterTags.length !== 0 ? filterMessage : ''} ${searchQuery}${ingredsIncluded !== null ? includeMessage : ''} ${ingredsExcluded !== null ? excludeMessage : ''}, page ${pageUserIsOn} of results`;
}

function clickNextSearchPage(currentPage) {
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const nextPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) + 1)}`);
  // console.log(nextPageDiv);
  if (!currentPageDiv || !nextPageDiv) {
    currentPageDiv.innerHTML = `
      <p>Sorry, there are no more pages. </p>
    `;
    return;
  }
  currentPageDiv.style.display = 'none';
  nextPageDiv.style.display = 'flex';
  pageUserIsOn += 1;
  buttonReset();
  window.scrollTo(0, 0);
}

function clickPreviousSearchPage(currentPage) {
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const previousPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) - 1)}`);
  if (!currentPageDiv || !previousPageDiv) {
    currentPageDiv.innerHTML = `
      <p>Sorry, there are no more pages. </p>
    `;
    return;
  }
  currentPageDiv.style.display = 'none';
  previousPageDiv.style.display = 'flex';
  pageUserIsOn -= 1;
  buttonReset();
  window.scrollTo(0, 0);
}

/**
 * Navigates to the next search page, if it exists.
 */
export function goToNextSearchPage() {
  if (pageUserIsOn < Math.ceil(numResults / resultsPerPage)) {
    clickNextSearchPage(pageUserIsOn);
  }
}

/**
 * Navigates to the previous search page, if it exists.
 */
export function gotToPreviousSearchPage() {
  if (pageUserIsOn > 1) {
    clickPreviousSearchPage(pageUserIsOn);
  }
}

/**
 * Returns all RecipieCard objects on the current page of search results.
 *
 * @returns a list of RecipeCard objects from the current page
 */
export function getCurrentSearchResults() {
  const currentPageDiv = document.getElementById(`page${pageUserIsOn}`);
  const { children } = currentPageDiv;
  const output = [];
  for (let i = 0; i < children.length; i += 1) {
    const value = children[i];
    // Check if the type of value is RecipeCard
    if (value.constructor.name === 'RecipeCard') {
      output.push(value);
    }
  }
  return output;
}

function clickFirstSearchPage(currentPage) {
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const firstPageDiv = document.getElementById('page1');
  if (!currentPageDiv || !firstPageDiv) {
    currentPageDiv.innerHTML = `
      <p>Sorry, there is no first page. </p>
    `;
    return;
  }
  currentPageDiv.style.display = 'none';
  firstPageDiv.style.display = 'flex';
  pageUserIsOn = 1;
  buttonReset(currentPage);
  window.scrollTo(0, 0);
}

function clickLastSearchPage(currentPage) {
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const lastPageDiv = document.getElementById(`page${totalPages}`);
  if (!currentPageDiv || !lastPageDiv) {
    currentPageDiv.innerHTML = `
      <p>Sorry, there is no last page. </p>
    `;
    return;
  }
  currentPageDiv.style.display = 'none';
  lastPageDiv.style.display = 'flex';
  pageUserIsOn = totalPages;
  buttonReset(currentPage);
  window.scrollTo(0, 0);
}

// Sets the filter message text to human readable
function cleanFilterMessage() {
  filterMessage = filterMessage.replace('dairyFree', 'dairy-free');
  filterMessage = filterMessage.replace('quickEat', 'quick eat');
  filterMessage = filterMessage.replace('fiveIngredientsOrLess', 'easy');
  filterMessage = filterMessage.replace('glutenFree', 'gluten-free');
  filterMessage = filterMessage.replace(/,/g, ', ');
}

// takes the current recipe object and fills the html of the page with
// the information within it
function fillSearchPage(searchResults) {
  filterMessage = filterTags.toString();
  cleanFilterMessage();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  ingredsIncluded = searchParams.get('IngIncl');
  ingredsExcluded = searchParams.get('IngExcl');
  const includeMessage = ` including ${ingredsIncluded}`;
  const excludeMessage = ` excluding ${ingredsExcluded}`;
  const searchResultsContainer = document.getElementById('search-results-container');

  searchQuery = searchParams.get('searchQuery');
  numResults = searchResults.length;
  if (searchResults.length === 0) {
    document.getElementById('searchHeader').innerHTML = `0 ${filterTags.length !== 0 ? filterMessage : ''} recipes found for ${searchQuery} ${ingredsIncluded !== null ? includeMessage : ''}  ${ingredsExcluded !== null ? excludeMessage : ''} `;
    searchResultsContainer.innerHTML = `
      <p>Sorry, no results were found for your search</p>
    `;
  } else {
    let resultsCounter = 0;
    let currentPageNumber = 1;

    let currentPageDiv = document.createElement('div');
    currentPageDiv.setAttribute('id', `page${currentPageNumber}`);
    currentPageDiv.classList.add('search-page-result');

    searchResults.forEach((recipe) => {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;
      currentPageDiv.appendChild(recipeCard);
      resultsCounter += 1;

      // turn on page buttons
      if (resultsCounter === resultsPerPage) {
        const pageButtons = document.getElementById('search-results-page-buttons');
        pageButtons.style.display = 'grid';
        const pageButtonFirst = document.getElementById('search-page-button-first');
        pageButtonFirst.addEventListener('click', () => {
          clickFirstSearchPage(pageUserIsOn);
        });
        const pageButtonPrevious = document.getElementById('search-page-button-previous');
        pageButtonPrevious.addEventListener('click', () => {
          clickPreviousSearchPage(pageUserIsOn);
        });
        const pageButtonNext = document.getElementById('search-page-button-next');
        pageButtonNext.addEventListener('click', () => {
          clickNextSearchPage(pageUserIsOn);
        });
        const pageButtonLast = document.getElementById('search-page-button-last');
        pageButtonLast.addEventListener('click', () => {
          clickLastSearchPage(pageUserIsOn);
        });

        buttonReset();
      }
      // move to next page
      if (resultsCounter % resultsPerPage === 0) {
        searchResultsContainer.appendChild(currentPageDiv);
        currentPageNumber += 1;
        totalPages = currentPageNumber;
        currentPageDiv = document.createElement('div');
        currentPageDiv.setAttribute('id', `page${currentPageNumber}`);
        currentPageDiv.classList.add('search-page-result');
        currentPageDiv.style.display = 'none';
      } else {
        searchResultsContainer.appendChild(currentPageDiv);
      }
    });

    // page buttons moved to bottom of container
    if (resultsCounter >= resultsPerPage) {
      const pageButtons = document.getElementById('search-results-page-buttons');
      searchResultsContainer.appendChild(pageButtons);
    }

    resultsFound = resultsCounter;
    document.getElementById('searchHeader').innerHTML = `${resultsFound} ${filterTags.length !== 0 ? filterMessage : ''} recipes found for ${searchQuery}${ingredsIncluded !== null ? includeMessage : ''}${ingredsExcluded !== null ? excludeMessage : ''}, page 1 of results`;
  }
}

async function init() {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  ingredsIncluded = searchParams.get('IngIncl');
  ingredsExcluded = searchParams.get('IngExcl');

  searchQuery = searchParams.get('searchQuery');
  filterTags = searchParams.get('tags')?.split(',') || [];

  if (searchQuery === null || searchQuery === undefined || searchQuery.length === 0) {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.style.display = 'flex';
    searchResultsContainer.style.maxWidth = '100%';
    searchResultsContainer.style.justifyContent = 'center';
    searchResultsContainer.style.flexWrap = 'wrap';

    searchResultsContainer.innerHTML = `
      <p>Enter your search term above!</p>
    `;
  } else {
    const searchedRecipes = await search(searchQuery, filterTags, ingredsIncluded, ingredsExcluded);
    fillSearchPage(searchedRecipes);
    const searchbarRoot = document.querySelector('custom-searchbar').shadowRoot;
    searchbarRoot.querySelector('input').value = searchQuery;
    searchbarRoot.getElementById('ingredients-included').value = ingredsIncluded;
    searchbarRoot.getElementById('ingredients-excluded').value = ingredsExcluded;
    for (let i = 0; i < filterTags.length; i += 1) {
      searchbarRoot.getElementById(filterTags[i]).checked = true;
    }
  }
}

window.addEventListener('DOMContentLoaded', init);
