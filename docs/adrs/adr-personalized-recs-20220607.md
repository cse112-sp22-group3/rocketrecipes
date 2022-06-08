# Personalized Recommended Recipes on Page Load

* Status: accepted 
* Deciders: Mihir Gupta, Angie Thai
* Date: 2022-06-07

## Context and Problem Statement

Should we have user personalized recommended recipes? If so, should we determine these recommendations on-device on page load or in the backend before page load.

## Decision Drivers

* We want users to have personal accounts
* We want users to have some personalization opportunities
* We want to maximize user experience

## Considered Options

* No personalized recommended recipes
* Personalized recommended recipes will be determined on-device on page load
* Personalized recommended recipes will be determined in backend before page load

## Decision Outcome

Chosen option: Personalized recommended recipes will be determined on-device on page load, because we want to first prioritize user personalization. We felt like users needed an opportunity to feel as if their account is personal to them, so this is an important feature to have. However, our bandwidth does not allow us to determine recommended recipes in the backend. A good future improvement would be to use an actual backend and determine recommendations in the cloud instead of on-device when the page loads

### Positive Consequences

* Users have personalization opportunities with their account
* Lower developer effort

### Negative Consequences

* Slower load time for recommended recipes, hurting performance

## Pros and Cons of the Options

### No personalized recommended recipes

* Good, because lowest developer effort to accomplish
* Bad, because users will have almost no personalization opportunities

### Personalized recommended recipes will be determined on-device on page load

* Good, because users will have more personalization opportunities
* Good, because low developer effort to accomplish
* Bad, because page load time will take a significant hit

### Personalized recommended recipes will be determined in backend before page load

* Good, because users will have more personalization opportunities
* Good, because page load time will take the smallest hit
* Bad, because requires most developer effort to accomplish
