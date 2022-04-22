# Deciding on a recipe scraping API

* Status: accepted <!-- optional -->
* Deciders: Mihir, Seeraj <!-- optional -->
* Date: 2021-11-08 <!-- optional -->

## Context and Problem Statement

Our application needs to scrape recipes off the internet, and in order to do so, we need to pick out a recipe scraping API. After doing some research and looking through multiple recipe scraping APIs, we landed on the Spoonacular API.

## Decision Drivers <!-- optional -->

* Spoonacular has a good 'free' tier, which reduces costs
* Relatively easy to implement and has a large variety of recipes to scrape
* Each recipe is structured similarly, making it easier to scrape and add recipes to our website

## Considered Options

* [Spoonacular](https://spoonacular.com/food-api)
* [Allrecipes Scraper](https://apify.com/dtrungtin/allrecipes-scraper/api)
* [recipe-scraper](https://www.npmjs.com/package/recipe-scraper)

## Decision Outcome

Chosen option: We chose "Spoonacular", because it meets pretty much all of our criteria. It has a great free-tier, allows us to scrape from 5,000+ recipes, and includes a lot of information that was important for our application (ie. cooking times, serving sizes, etc.). It also had great documentation, which makes it even easier to implement in our application.

### Positive Consequences <!-- optional -->

* Because it is easy to use, most of the team can learn how it works
* Don't have to worry about over-bloating our application with recipes from all random sources, it all comes from Spoonacular

### Negative Consequences <!-- optional -->

* 5,000ish recipes may seem on the lower end when considering how vast cooking can be
* Might be a common API being used by other teams

## Pros and Cons of the Options <!-- optional -->

### Spoonacular

* Good, because it has a great free tier and is easy to use
* Good, because it has well written documentation
* Bad, because might be an easy API for most teams to use and implement

### Allrecipes Scraper

* Good, because All Recipes has an even greater selection of recipes, since it is such a large website
* Bad, because not all recipes are standardized
* Bad, because documentation is not as well fleshed out

### recipe-scraper

* Good, because it can scrape from 40+ websites which means way more recipes than other options
* Good, because it's a package for Node.js, a technology all team members are familiar with
* Bad, because very little documentation, and basically no documentation for bugs
* Bad, because scraping from all those websites might not be standardized (they might also not have all the info we're looking for)
* … <!-- numbers of pros and cons can vary -->

## Links <!-- optional -->

* {Link type} {Link to ADR}
