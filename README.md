# Rocket Recipes
[![CI](https://github.com/cse112-sp22-group3/rocketrecipes/actions/workflows/main.yml/badge.svg)](https://github.com/cse112-sp22-group3/rocketrecipes/actions/workflows/main.yml)
### Where your palette will be blasting off to the moon, time and time again

This is Team Rocket's (Team 34) project repository for Rocket Recipes, a web application that allows users to search and create recipes for their own personal culinary escapades. 

Check out our website live [here](https://rocket-recipes.com/)!

If you are looking for our Private video, the link is [here](https://www.youtube.com/watch?v=MG4AHLxTytE)!

---
## Features

**CRUD features**  
Create, read, update and delete recepies easly!
<p align="left">
<img src="https://user-images.githubusercontent.com/69459954/169669901-fb182f09-9e5b-4f5a-b470-f7a0fef3c0d8.gif", align="left", width:"465" height="425">
</p>


**Favourite Recepies**  
We chose to include this feature because of our user-oriented research, we found that most chefs tend to find recipes they like and cook them over and over again. By favoriting a recipe, the user will be able to easily find the recipe again.
<p>
<img allign:"left", width:"465" height="425" src="https://user-images.githubusercontent.com/69459954/169669926-5479f6cb-8ec8-4491-b35f-a706bedfc2cb.gif">
</p>

**Scale Recepies**  
When looking at a specific recipe, the user can input a number with which to scale the recipe. This will scale the yield of the recipe, as well as the amount of each ingredient they will need to make it.
<p>
<img allign:"left", width:"465" height="425" src="https://user-images.githubusercontent.com/69459954/169669923-3d16bcb0-4981-4711-9d44-3cebe02593be.gif">
</p>

**Share Recepies**  
You have the ability to share a recipe using Twitter, Facebook, Reddit, or email.
<p>
<img allign:"left", width:"465" height="425" src="https://user-images.githubusercontent.com/69459954/169669914-55dfd244-f843-4298-bc4c-2110f848db43.gif">
</p>


## Repository Setup

The repository can be accessed at https://github.com/cse110-fa21-group34/rocketrecipes. We follow a development model similar to GitFlow. Deployments are hosted on the ```deploy``` branch, and the primary branch for development is ```main```. 

The repository is split up into various folders. The web application itself is inside ```root/```, while our documentation is in ```docs/``` and automated tests are in ```testing/```. Github Action workflows can be found at ```.github/```. Dependencies can be found in the ```package.json```. Other configuration files can also be found at ```/```. 

When contributing to the project, one should first submit a pull request for the ```main``` branch. Then, there will be automated unit and end-to-end tests as well as a code quality tool to verify the quality of the pull request. Then, documentation will be automatically generated and a live deployment of the pull request will be created. After the pull request passes human review, it can be merged into ```main``` safely. After enough pull requests have been accumulated, a release will be made and the ```deployment``` branch will be updated.

---
## Testing
### Installation
**Step 1:** Install npm on your local machine

[Click here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to learn how to install Node.js and npm


**Step 2:** Install testing packages

We are using Jest and Jest Puppeteer to test our application, and you need to install both of them to get our tests working. First, install the testing packages by typing:
`npm install`

### Running Tests
We have two different types of tests, unit tests and end to end tests.

Our unit tests are done with plain Jest. To go through all unit tests, run the command

`npm run test-unit`


Our end to end tests are done with Jest Puppeteer. To go through each of these tests, run the command

`npm run test-e2e`


If you want to run all tests at the same time, you can use the command

`npm run test`


---
## Formatting
We are using ESLint and Prettier to format our files. For this reason, I've included their respective packages in our package.json.

We are using the [Airbnb](https://github.com/airbnb/javascript) style guide to format our code.
### Installation
The required packages will automatically be installed when you run `npm install` for the first time.

In order to get the linting to work inside your VSCode, please intall the following extentions:


[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)


Once you get these working, it should show you when you have style errors within your VSCode! 

As you can see below, I'm using the var keyword which is a big no-go in modern JavaScript. VSCode makes the file header red and highlights the line. When I hover over that line, it tells me what I did wrong and I can easily change it!

![ESLint in VSCode example](./docs/VSCode-ESLint-example.png)


### Usage

Before you commit your code, run the command 

`npm run lint`

This will automatically format your code, and if it is not able to, show you what styling or formatting errors you have.

If you just want to see the formatting errors in your code and *not* fix them, you can use the command

`npm run test-lint`

**You will not be able to merge your code into main until it passes all of the ESLint, Unit, and E2E tests.**
