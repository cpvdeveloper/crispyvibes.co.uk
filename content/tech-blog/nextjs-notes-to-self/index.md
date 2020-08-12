---
title: 'Next.js on the  server-side— notes to self'
date: '2020-08-06'
description: 'But hopefully useful to others too.'
length: '5 min'
link: 'https://medium.com/@cp.vibert/next-js-on-the-server-side-notes-to-self-e2170dc331ff'
---

_This is a curation of Next.js documentation, explanations and advice. With a few code snippets and images to help along the way._

_It focusses mainly on how the ‘server-side’ works in Next.js. Spoiler — it can do more than just render HTML_

_Currently, Next.js latest version is 9.5._

## What is Next.js?

It’s a framework for building server-side rendered React applications.

But Next.js is not just for building an application’s frontend, because of its ‘server-side’, it can be used to build a full backend for the application as well.

## How does the server-side work?

The ‘server-side’ in Next.js applications can be separated into two parts:

1. The server-side rendering — how Next.js generates HTML on the server-side and sends it to the client

1. The backend server — how Next.js supports a backend server and APIs

### The server-side rendering (pre-rendering)

_Pre-rendering = general term for rendering HTML before it is sent to the client_

By default, Next.js will pre-render every page, but can do so in two different ways:

1. Static generation

1. Server-side rendering (SSR)

An application can use a combination of these methods, where the method used for a given page is determined by the page’s data requirements — see the ‘data fetching on the server-side’ section below for more details.

**Static generation** means that the HTML is generated once on the server at build-time, and this HTML is reused for each client request.

This is the recommended approach for performance reasons (better caching), however, it comes with some obvious limitations when it comes to fetching data for that page — the data can only be fetched during the application’s build process using the `getStaticProps` method.

This might be acceptable when the data being fetched does not change often, and/or in scenarios where the user does not always need the most updated data. But often it is crucial that the user is shown a current view of the data, meaning that static generation of pages cannot be used.

**Server-side rendering (SSR)** means that the HTML is generated on the server on each request for the page — the HTML is ‘dynamic’ rather than ‘static’ as it will depend on the data required.

Each time a client requests the page, the server will fetch the data for that page, and generate the page’s HTML using the data. Only once all of this is complete will the HTML be sent back to the client.

Next.js offers two data fetching methods for SSR — `getServerSideProps` and `getInitialProp` — which are discussed in the ‘data fetching on the server-side’ section below.

![Types of web rendering](./web-rendering.png)

<center><small><a href="https://developers.google.com/web/updates/2019/02/rendering-on-the-web">https://developers.google.com/web/updates/2019/02/rendering-on-the-web</a></small></center><br />

### The backend server‌

The backend part of a Next.js application (assuming you need one) can be built in two ways:

1. Using a custom server

1. Using serverless API Routes‌

**A custom server** is a normal NodeJS server which can be built using your choice of framework and libraries — typically Express.

The server must return the static resources for each frontend route in the application (using the Next.js `getRequestHandler` function), but apart from this, the server can behave like any other with middlewares, API routes, database connection etc.

`gist:cpv123/85d935ee56eb97e5ecb460bbf5a2079a#next-custom-server.js`

- [Customer server example repo](https://github.com/vercel/next.js/tree/canary/examples/custom-server)

- [Customer server documentation](https://nextjs.org/docs/advanced-features/custom-server)

**API Routes** are Next.js built-in functions for writing backend APIs. Each function is a request handler written using “Express.js-like methods”, and will be deployed as a serverless function.

```js
(req, res) => { // send back some json }
```

API routes use file-system routing — any file under the `/page/api/` directory will be deployed as an API endpoint. For example, a function handler in `/pages/api/users.js` will be available at for requests at `http://your-domain.com/api/users`

Dynamic routing is also supported, allowing for URL query parameters to be used. For example, a handler in `/pages/api/users/[userId].js` will have access to `req.query.userId`

‌Finally, catch-all routes are also possible as `/pages/api/[...rest].js` (where 'rest' can be named anything). These can be useful if the application has some of its own APIs but also acts as a proxy to an external backend service.

`gist:cpv123/ce498aba29cc145ae75d48bf1d291019#update-user.js`

Some of the main differences between API Routes and a typical Express/NodeJS server can be seen in the code above:

1. Connecting to the database must be done at the start of every handler. The database `connect()` function here will actually first check if there is already an active connection, and only if there is not will it attempt to connect.

1. Middleware comes in the form of higher-order functions that wrap and enhance the handler — the above function is using `withAuth` middleware that checks for authentication before allowing the request to be handled.‌

- [API routes example repo](https://github.com/vercel/next.js/tree/canary/examples/api-routes)

- [API routes documentation](https://nextjs.org/docs/api-routes/introduction)

## Which backend approach should I go for?

Next.js officially recommends using API Routes for many good reasons that are [explained in the feature’s initial RFC](https://github.com/vercel/next.js/issues/7297).

In summary, using a custom server has a number of drawbacks when compared to API Routes: it will remove certain optimizations, it usually requires a separate step for builds and local development, and it cannot scale as well.

Whilst a custom server might be tempting at first — you can probably copy and paste the code from the last Express server you wrote — my advice is to prefer using API routes whenever possible, especially for new projects.

Using them makes building full-stack applications incredibly fast — building an API doesn't have to take any longer than building a React component. It also guarantees that your backend is scalable, decoupled, and performant.

Migrating an existing custom server to API routes isn’t always necessary, but if you do choose to migrate, then be sure to check out [this great blog post](https://hoangvvo.com/blog/migrate-from-express-js-to-next-js-api-routes/) which helps to explain how.

## Data fetching on the server-side

Next.js supports two types of rendering on the server as explained above (static generation and SSR) — which of these it uses for a given page is determined by how that page fetches data.

`gist:cpv123/baac9d45ff519bff4bc822f1f70e4bc5#data-fetching.csv`

**General rule**: for SSR prefer to use getServerSideProps over getInitialProps to avoid the situation where data fetching can happen on both server and client-side.

> _For the initial page load, getInitialProps will run on the server only. getInitialProps will then run on the client when navigating to a different route via the [next/link](https://nextjs.org/docs/api-reference/next/link) component or by using [next/router](https://nextjs.org/docs/api-reference/next/router)._

This means that your `getInitialProps` code has to be written in a way that works on both client and server-sides — redirecting a user might need `ctx.res.writeHead` (server) or it might need `Router.push` (client).

`getServerSideProps` has the same effect as `getInitialProps`, but is more predictable because it will only ever run on the server.‌

## Two tips to finish off:

1. Next.js moves fast — be sure to check out [their blog](https://nextjs.org/blog) for the latest updates as it’ll nearly always include something awesome.

1. If you’re starting a new Next.js application, take a look at the [official examples repo](https://github.com/vercel/next.js/tree/canary/examples) to see if there’s an example setup for your chosen tech stack (there almost always will be).
