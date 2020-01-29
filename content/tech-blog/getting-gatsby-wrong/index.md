---
title: 'Getting Gatsby Wrong'
date: '2020-01-29'
description: "It's not just another create-react-app (it's more)"
length: '4 min'
link: 'https://medium.com/better-programming/getting-gatsby-wrong-836c198eb6ea'
---

Like many others, I recently built myself a website using [Gatsby](https://www.gatsbyjs.org/). But what I actually did was bootstrap an application with the Gatsby CLI and then treat it like any other React application — I might as well have used [create-react-app](https://github.com/facebook/create-react-app).

As you’ve probably heard, Gatsby makes it easy to build static websites that are progressive web apps, “blazing fast”, secure, SEO-optimized, etc. using React.

Most of these benefits can’t be avoided because they’re built into the way that Gatsby works and yet I still managed to provide a user experience that didn’t live up to the Gatsby standard.

## The Mistake

One of the [website pages](https://cpv123.netlify.com/coffee/) shows a list of (mostly very good) coffee shops, the data for which comes from an external REST API of mine.

When it came to fetching this data, I went into autopilot and did so from within the component once mounted and then stored it in state:

`gist:cpv123/f2454bf55cfbcdd1e4ed41c9f44bf36f#runtime-fetch.js`

<center><small>A familiar pattern, but not always the correct one.</small></center><br/>

This works perfectly fine, and is what Gatsby refers to as “client runtime data fetching.”

But with Gatsby, there is an alternative way to fetch data: _build time data fetching_.

This is where the data is fetched during the site’s build process (typically during a deployment) and then retained as static data for the site to use once it’s up and running.

Each method has some obvious pros and cons.

#### **Client runtime**

- ✅ The fetched data will always be up-to-date.

- ❌ User experience is dependent on external factors like internet connectivity and the performance of the API.

In general, use this only for fetching data that changes frequently.

#### **Build time**

- ✅ The data is readily available so the user experience will remain fast.

- ❌ The data might be out of date — it’ll be from the last time the site was built and deployed.

In general, use this for data that does not change often.

The mistake that I made was to use client runtime fetching when my website is actually a perfect example of where fetching at build time is superior — when the data doesn’t change often.

This is, unfortunately, the case because I only manage to visit one or two new coffee shops per week.

Switching to build-time fetching, in this case, provides better user experience (less or even no visible load time) and the likelihood of showing an outdated list of shops is very low — it’s zero if I remember to build and deploy the site once per week.

### Side note: The real reason I switched data fetching methods

Being honest, it wasn’t the marginally worse user experience that made me switch (given that I’m the only user), it was the realization that client runtime fetching increased the chances of receiving a bill from AWS.

The coffee shops API is served by AWS API Gateway, backed by a Lambda function, meaning that if somehow the website became an internet sensation overnight, the API would start receiving lots of requests — one request every time someone loads the page.

Switching to build time means that the API is called only once per build, no matter how much traffic the site receives.

## From Runtime to Build Time Data Fetching

Switching from client runtime to build time fetching turned out to be very simple, as proven by this [one small commit](https://github.com/cpv123/my-site/commit/8eccda2cbb5479c659bc6bf6e60fb239f1cf1600).

The magic happens in the `gatsby-node.js`&nbsp;file which is run during the site’s build process.

All I had to do was move the existing data fetching function into here and then use Gatsby’s onCreatePage function to create a new “coffee shops” page that has access to this data:

`gist:cpv123/454600f5f7a2c139eb9dd6e3c467d51a#built-time-fetch.js`

The `onCreatePage`&nbsp;function is called for each page after it’s created and can be used to modify the page before it’s finalized in the build.

In this case, the function is used to manipulate the “coffee shops” page so that it has access to the coffee shops’ data in its context via props.

Because this “coffee shops” page is [automatically created by Gatsby](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/), this can only be done by first deleting the page and then re-creating it with the coffee shops’ context.

The component (coffee shops page) now has immediate access to the list of coffee shops via `props.pageContext.coffeeShops`— there’s no need for loading states, error states, or waiting for the component to mount, the data will simply be there.

## Summary

When using Gatsby, don’t fall into the trap of treating it like a create-react-app just because it supports many of the same ways of working.

Remember that Gatsby offers a whole lot more that can help you provide better user experience, or even save you some money.
