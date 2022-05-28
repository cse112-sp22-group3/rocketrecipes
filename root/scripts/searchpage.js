// eslint-disable-next-line import/extensions
import { search, syncWithDatabaseUser } from './utils.js';

const resultsPerPage = 12;
const fadedColor = '#d3d3d3';
const activeColor = '#fef2e6';
let pageUserIsOn = 1;
let totalPages = 1;
let resultsFound = 0;
let searchQuery = '';

function buttonReset() {
  const pageButtonFirst = document.getElementById('search-page-button-first');
  const pageButtonPrevious = document.getElementById('search-page-button-previous');
  const pageButtonNext = document.getElementById('search-page-button-next');
  const pageButtonLast = document.getElementById('search-page-button-last');
  if (pageUserIsOn === 1) { // no more previous pages
    pageButtonPrevious.style.backgroundColor = fadedColor;
    pageButtonPrevious.disabled = true;
    pageButtonFirst.style.backgroundColor = fadedColor;
    pageButtonFirst.disabled = true;
    pageButtonNext.style.backgroundColor = activeColor;
    pageButtonNext.disabled = false;
    pageButtonLast.style.backgroundColor = activeColor;
    pageButtonLast.disabled = false;
  } else if (pageUserIsOn < totalPages) {
    pageButtonPrevious.style.backgroundColor = activeColor;
    pageButtonPrevious.disabled = false;
    pageButtonFirst.style.backgroundColor = activeColor;
    pageButtonFirst.disabled = false;
    pageButtonNext.style.backgroundColor = activeColor;
    pageButtonNext.disabled = false;
    pageButtonLast.style.backgroundColor = activeColor;
    pageButtonLast.disabled = false;
  } else {
    pageButtonPrevious.style.backgroundColor = activeColor;
    pageButtonPrevious.disabled = false;
    pageButtonFirst.style.backgroundColor = activeColor;
    pageButtonFirst.disabled = false;
    pageButtonNext.style.backgroundColor = fadedColor;
    pageButtonNext.disabled = true;
    pageButtonLast.style.backgroundColor = fadedColor;
    pageButtonLast.disabled = true;
  }

  document.getElementById('searchHeader').innerHTML = `${resultsFound} recipes found for ${searchQuery}, page ${pageUserIsOn} of results`;
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

// takes the current recipe object and fills the html of the page with
// the information within it
function fillSearchPage(searchResults) {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  searchQuery = searchParams.get('searchQuery');
  const searchResultsContainer = document.getElementById('search-results-container');
  if (searchResults.length === 0) {
    document.getElementById('searchHeader').innerHTML = `0 recipes found for ${searchQuery}`;
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
    document.getElementById('searchHeader').innerHTML = `${resultsFound} recipes found for ${searchQuery}, page 1 of results`;
  }
}

async function init() {
  await syncWithDatabaseUser();
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  searchQuery = searchParams.get('searchQuery');
  const filterTags = searchParams.get('tags')?.split(',') || [];

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
    const searchedRecipes = await search(searchQuery, filterTags);
    fillSearchPage(searchedRecipes);
    const searchbarRoot = document.querySelector('custom-searchbar').shadowRoot;
    searchbarRoot.querySelector('input').value = searchQuery;
    for (let i = 0; i < filterTags.length; i += 1) {
      searchbarRoot.getElementById(filterTags[i]).checked = true;
    }
  }
}

window.addEventListener('DOMContentLoaded', init);
