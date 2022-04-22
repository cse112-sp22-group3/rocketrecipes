# Hosting Solution

- Status: accepted
- Deciders: Mihir Gupta, Patrick Brown
- Date: 2021-12-01

## Context and Problem Statement

We need to host our application on the Internet can access it easily. 

## Decision Drivers

- We need to host our application over the internet
- Hosting must be reliable and well-supported for our tech stack

## Considered Options

- Heroku
- Netlify
- Github Pages

## Decision Outcome

Chosen option: Netlify, because it is a leading Tier 2 provider and is known to provide reliable service. Additionally, it leverages AWS, which is the largest cloud resource in the world. Another advantage of Netlify is that it was extremely easy to set up and integrate with our desired CI/CD process (it made developer previews of PRs and automated deployments to production very easy). 

### Positive Consequences <!-- optional -->

- CI/CD workflow fully functioning
- Low developer effort
- Reliable

### Negative Consequences <!-- optional -->

- App URL has netlify.app at the end

## Pros and Cons of the Options <!-- optional -->

### Heroku


- Good, because team members have experience with it
- Good, because it is a large provider
- Bad, because it was hard to set up
- Bad, because no custom URL

### Netlify


- Good, because large tier 2 provider
- Good, because easy to setup
- Good, because it came with CD out of the box
- Bad, because no custom URL without netlify.app

### Github Pages

- Good, because entire team was familiar with it through labs
- Good, because we are already using Github for source control
- Bad, because Professor Powell wanted us to use more production-ready solutions

