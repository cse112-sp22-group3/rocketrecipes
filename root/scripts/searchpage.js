// eslint-disable-next-line import/extensions
import { search } from './utils.js';

const resultsPerPage = 12;
let pageUserIsOn = 1;

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
  const pageButtonNext = document.getElementById('search-page-button-next');
  const nextTwoPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) + 2)}`);
  currentPageDiv.style.display = 'none';
  nextPageDiv.style.display = 'flex';
  pageUserIsOn += 1;

  const pageButtonPrevious = document.getElementById('search-page-button-previous');
  if (!nextTwoPageDiv) { // there is no next page
    pageButtonNext.style.backgroundColor = '#d3d3d3';
    pageButtonNext.disabled = true;
  } else {
    pageButtonNext.style.backgroundColor = '#fef2e6';
    pageButtonNext.disabled = false;
  }
  if (pageUserIsOn === 1) {
    pageButtonPrevious.style.backgroundColor = '#d3d3d3';
    pageButtonPrevious.disabled = true;
  } else {
    pageButtonPrevious.style.backgroundColor = '#fef2e6';
    pageButtonPrevious.disabled = false;
  }
  window.scrollTo(0, 0);
}

function clickPreviousSearchPage(currentPage) {
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const previousPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) - 1)}`);
  if (currentPage <= 1 || !currentPageDiv || !previousPageDiv) {
    currentPageDiv.innerHTML = `
      <p>Sorry, there are no more pages. </p>
    `;
    return;
  }
  currentPageDiv.style.display = 'none';
  previousPageDiv.style.display = 'flex';
  pageUserIsOn -= 1;

  const pageButtonPrevious = document.getElementById('search-page-button-previous');
  const pageButtonNext = document.getElementById('search-page-button-next');
  if (pageUserIsOn === 1) { // no more previous pages
    pageButtonPrevious.style.backgroundColor = '#d3d3d3';
    pageButtonPrevious.disabled = true;
  } else {
    pageButtonPrevious.style.backgroundColor = '#fef2e6';
    pageButtonPrevious.disabled = false;
  }
  if (currentPageDiv) { // no future pages
    pageButtonNext.style.backgroundColor = '#fef2e6';
    pageButtonNext.disabled = false;
  } else {
    pageButtonNext.style.backgroundColor = '#d3d3d3';
    pageButtonNext.disabled = true;
  }
  window.scrollTo(0, 0);
}

// takes the current recipe object and fills the html of the page with
// the information within it
function fillSearchPage(searchResults) {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const searchQuery = searchParams.get('searchQuery');

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
      document.getElementById('searchHeader').innerHTML = `${resultsCounter} recipes found for ${searchQuery}`;

      // turn on page buttons
      if (resultsCounter === resultsPerPage) {
        const pageButtons = document.getElementById('search-results-page-buttons');
        pageButtons.style.display = 'grid';

        const pageButtonNext = document.getElementById('search-page-button-next');
        pageButtonNext.addEventListener('click', () => {
          clickNextSearchPage(pageUserIsOn);
        });

        const pageButtonPrevious = document.getElementById('search-page-button-previous');
        pageButtonPrevious.style.backgroundColor = '#d3d3d3';
        pageButtonPrevious.disabled = true;
        pageButtonPrevious.addEventListener('click', () => {
          clickPreviousSearchPage(pageUserIsOn);
        });
      }
      // move to next page
      if (resultsCounter % resultsPerPage === 0) {
        searchResultsContainer.appendChild(currentPageDiv);
        currentPageNumber += 1;
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
  }
}

async function init() {
  const queryString = window.location.search;

  const searchParams = new URLSearchParams(queryString);
  const searchQuery = searchParams.get('searchQuery');
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
