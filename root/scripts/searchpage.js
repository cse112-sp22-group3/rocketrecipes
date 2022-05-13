// eslint-disable-next-line import/extensions
import { search } from './utils.js';

const resultsPerPage = 15;
let pageUserIsOn = 1;

function clickNextSearchPage(currentPage) {


  
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const nextPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) + 1)}`);
  const nextTwoPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) + 2)}`);
  // console.log(nextPageDiv);
  if (!currentPageDiv || !nextPageDiv) {
    console.log('Error, current page does not exist');
    return;
  }
  const pageButtonNext = document.getElementById('search-page-button-next');
  if (!nextTwoPageDiv) {
    pageButtonNext.style.backgroundColor = '#d3d3d3';
  } else {
    pageButtonNext.style.backgroundColor = '#fef2e6';
    currentPageDiv.style.display = 'none';
    nextPageDiv.style.display = 'inline';
    pageUserIsOn += 1;
  }
}

function clickPreviousSearchPage(currentPage) {
  const currentPageDiv = document.getElementById(`page${currentPage}`);
  const previousPageDiv = document.getElementById(`page${String(parseInt(currentPage, 10) - 1)}`);
  if (currentPage <= 1 || !currentPageDiv || !previousPageDiv) {
    console.log('Cannot go to previous page because does not exist');
    return;
  }
  const pageButtonPrevious = document.getElementById('search-page-button-previous');
  if (currentPage === 2) {
    pageButtonPrevious.style.backgroundColor = '#d3d3d3';
  } else {
    pageButtonPrevious.style.backgroundColor = '#fef2e6';
    currentPageDiv.style.display = 'none';
    previousPageDiv.style.display = 'inline';
    pageUserIsOn -= 1;
  }
}

// takes the current recipe object and fills the html of the page with
// the information within it
function fillSearchPage(searchResults) {
  const searchResultsContainer = document.getElementById('search-results-container');
  searchResultsContainer.style.display = 'flex';
  searchResultsContainer.style.maxWidth = '100%';
  searchResultsContainer.style.justifyContent = 'center';
  searchResultsContainer.style.flexWrap = 'wrap';
  if (searchResults.length === 0) {
    searchResultsContainer.innerHTML = `
      <p>Sorry, no results were found for your search</p>
    `;
  } else {
    let resultsCounter = 0;
    let currentPageNumber = 1;

    let currentPageDiv = document.createElement('div');
    currentPageDiv.setAttribute('id', `page${currentPageNumber}`);

    searchResults.forEach((recipe) => {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;
      currentPageDiv.appendChild(recipeCard);
      resultsCounter += 1;

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
        pageButtonPrevious.addEventListener('click', () => {
          clickPreviousSearchPage(pageUserIsOn);
        });
      }
      // move to next page
      if (resultsCounter % resultsPerPage === 0) {
        // console.log(`done w page ${currentPageNumber}`);
        searchResultsContainer.appendChild(currentPageDiv);
        currentPageNumber += 1;
        currentPageDiv = document.createElement('div');
        currentPageDiv.setAttribute('id', `page${currentPageNumber}`);
        currentPageDiv.style.display = 'none';
      }
    });
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
