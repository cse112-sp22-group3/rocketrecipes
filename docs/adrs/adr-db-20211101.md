# Using LocalStorage over Firebase/Cloud DB

- Status: accepted
- Deciders: Mihir Gupta, Seeraj Somla, Sid Madduri, Patrick Brown
- Date: 2021-11-01

## Context and Problem Statement

How should we store user created content and preferences? Specifically, how should user and community recipes be stored and served?

## Decision Drivers

- We need to implement CRUD features
- We want to minimize complexity
- We want to maximize utility and user experience

## Considered Options

- Firebase
- MongoDB
- LocalStorage

## Decision Outcome

Chosen option: LocalStorage, because it has the lowest barrier of entry while maintaining CRUD features. Additionally, guidance from the TA and professor indicated they would favor an approach using localStorage.

### Positive Consequences <!-- optional -->

- less new technologies to learn
- team has familiarity with using localStorage as of Lab8
- simplifies development

### Negative Consequences <!-- optional -->

- user experience is not as good
- a user cannot see the uploaded recipes of another user

## Pros and Cons of the Options <!-- optional -->

### Firebase

Store all recipes (user and community) in a Firebase instance. Manage user authentication with built-in Firebase methods <!-- optional -->

- Good, because it is a dependable framework developed by Google
- Good, because it has authentication built in
- Good, because it maximizes user experience
- Bad, because many developers on the team are unfamiliar 
- Bad, because the professor and TAs did not support using it

### MongoDB

Store all recipes in MongoDB <!-- optional -->

- Good, because it is a dependable framework developed by MongoDB
- Good, because it maximizes user experience
- Bad, because it does not have authentication built in
- Bad, because many developers on the team are unfamiliar
- Bad, because the professor and TAs did not support using it


### LocalStorage

Store community recipes in a static JSON and user recipes and preferences in browser localStorage

- Good, because easier to develop
- Good, because more team members are familiar
- Bad, because it hurts the user experience
- Bad, because the user cannot access their information on a different web browser or device
- Bad, because the user cannot see other people's recipes

## Links 


