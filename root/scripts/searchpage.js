// eslint-disable-next-line import/extensions
import { search } from './utils.js';

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
    searchResults.forEach((recipe) => {
      const recipeCard = document.createElement('recipe-card');
      recipeCard.data = recipe;

      searchResultsContainer.appendChild(recipeCard);
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
