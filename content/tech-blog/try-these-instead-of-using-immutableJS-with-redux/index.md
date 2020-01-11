---
title: 'Try these instead of using ImmutableJS with Redux'
date: '2020-01-11'
description: 'Immer, the Redux Toolkit, Seamless, no library at all.'
length: '5 min'
link: 'https://medium.com/better-programming/try-these-instead-of-using-immutable-js-with-redux-f5bc3bd30190'
---

In a [previous post](https://medium.com/better-programming/3-reasons-to-avoid-using-immutablejs-with-redux-b0109d0123e8), I said that [Immutable.JS](https://immutable-js.github.io/immutable-js/) shouldn’t be used as the “immutability-helper” library for Redux, but didn’t recommend any other options.

Here are a few alternatives (in no particular order) that I’ve enjoyed using more so than Immutable.JS:

1. [Seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

1. [Immer](https://github.com/immerjs/immer)

1. [Redux Toolkit](https://github.com/reduxjs/redux-toolkit)

1. No library at all

## Recap: Why Not Immutable.JS?

The main issue with using Immutable.JS with Redux is that its data structures are not backward-compatible with plain JavaScript syntax — they can only be handled using the library’s APIs which are essentially another language.

This causes the library to spread throughout a codebase, even into places that shouldn’t care about immutability such as dumb React components.

This can make life unnecessarily difficult for developers, who must be constantly asking if some data is plain JavaScript or wrapped by Immutable.JS.

`gist:cpv123/176356243af434e68d5ee8c808edcfdf#cant-destructure-immutable.js`

<center><small>Trying to destructure an Immutable.JS object is one way of answering the question.</small></center><br />

A better alternative is one in which the library’s usage is confined only to where immutable data is being handled: in reducers.

Other places such as components, utility functions, and selectors should all be unaware of any immutability-helper library.

## Alternative 1: seamless-immutable

Seamless initially feels very similar to ImmutableJS: all objects must be wrapped by an immutable factory function, and the library’s API must be used to make changes to them. The key difference is that _Seamless objects can be read using plain JavaScript._

Consider a reducer, which looks nearly identical for Seamless and Immutable.JS:

`gist:cpv123/7114d3918dedcca5b6c46f513bb3e4a5#immutable-vs-seamless.js`

But there’s a difference in how the todos are passed to a component through Redux’s mapStateToProps, and in how that component then uses this prop — with Seamless this can all be done using plain JavaScript.

The mapStateToProps functions using Seamless and Immutable.JS looks like this:

    (state) => { todos: state.todos }  // Seamless

    (state) => { todos: state.get('todos') }  // ImmutableJS

And using the prop within a component looks like this:

    props.todos.a.isComplete  // Seamless

    props.todos.getIn(['a', 'isComplete']) // ImmutableJS

And so the use of Seamless is more confined within a codebase than Immutable.JS because Seamless objects can be read with plain JavaScript.

Things like dumb React components and basic selectors (along with all their tests) won’t show any sign of the library. However, changing the data can only be done using the Seamless APIs and so it is likely that in utility functions and more complex selectors, the library will still be apparent.

## Alternative 2: immer

Immer works very differently to both Immutable.JS and Seamless, and because of that, it completely solves the issue of backward-compatibility — _it’s all plain JavaScript._

Largely for this reason, Immer has become an extremely popular solution for managing immutability in Redux. Even the [Redux style guide](https://redux.js.org/style-guide/style-guide/#use-immer-for-writing-immutable-updates) shows it as a clear favorite:

> ### “Use Immer for Writing Immutable Updates — **STRONGLY RECOMMENDED”**

Somewhat surprisingly, Immutable.JS still tops the npm download charts, but I suspect that Immer will soon take the lead.

![npm trends for Immutable.JS vs Immer vs Seamless](./immutable-npm-trends.png)

<center><small><a href='https://www.npmtrends.com/immutable-vs-immer-vs-seamless-immutable'>https://www.npmtrends.com/immutable-vs-immer-vs-seamless-immutable</a></small></center><br />

Immer allows developers to write mutating operations but ensures that these only happen on a temporary “draft” state, which is later finalized into a new state:

> _Using Immer is like having a personal assistant; he takes a letter (the current state) and gives you a copy (draft) to jot changes onto. Once you are done, the assistant will take your draft and produce the real immutable, final letter for you (the next state)._ — Immer

This is enabled by Immer’s `produce`&nbsp;function:

    produce(currentState, producer: (draftState) => void): nextState

Pass the current state, the desired update expressed as a mutation (producer function), and Immer will return the result as a new state, leaving the current state untouched.

One thing to note is that because Immer itself takes care of returning the finalized draft, the `producer`&nbsp;function argument should not mutate the draft and also try to return something — it should only do one or the other.

![Immer error](./immer-error.png)

With the help of this `produce`&nbsp;function, using Immer with Redux is extremely straightforward. Considering the same reducer as earlier, using Immer is better than both Seamless and Immutable.JS because:

- The state is plain JavaScript.

- Updates to this state in the reducer are done using plain JavaScript.

- All props derived from this state are plain JavaScript.

`gist:cpv123/53018a24cd816a3a60d5d59085c08dea#immer-reducer.js`

Immer achieves exactly what we hoped for: the library is confined only to reducers, and won’t spread into other parts of a codebase such as components, utility functions, and selectors.

## Alternative 3: Redux Toolkit

The Redux Toolkit provides a set of utilities and functions that help developers write consistent Redux logic with best practices baked in.

One such utility is createReducer() which uses Immer behind the scenes, allowing immutable state updates to be written as mutations.

This utility also allows the structure of reducers to be simplified (goodbye, switch statements) making the reducer as a whole look a little different, but the actual state update looks the same as with Immer:

`gist:cpv123/0e254be496781d56407199e35702f32d#redux-toolkit-reducer.js`

So, using the Redux Toolkit comes with the same benefits as using Immer, only the produce function is hidden from sight.

## Alternative 4: No Library at All

The most fun option, but with the most room for error. For this reason, it’s a great way to gain an appreciation for immutability in state management.

Doing things on your own probably won’t scale as well, but for small applications that will remain small (do small apps need Redux though?) it’s a solution as good as any other.

In simple terms: just remember to `{ ...spreadEverything }`&nbsp;in reducers:

`gist:cpv123/5cd0054a5460ab56ff67a7ccb938cc4f#normal-reducer.js`

<center><small>Remembering that the spread operator only shallow copies, hence the recursion.</small></center><br />

Taking it further, you can use `Object.freeze()`&nbsp;to ensure the immutability of your data — attempting to mutate a frozen object will throw an error.

However, freezing is a shallow method (like the spread operator) meaning that as the state becomes nested, freezing and unfreezing it becomes more complex and must be done recursively.

When you find yourself writing custom `deepFreeze`&nbsp;and `deepUnfreeze`&nbsp;functions, it’s probably time to start using one of the library solutions above that take care of this more elegantly.

## Summary

There are many libraries available to help with immutable data in Redux, but those that are backward-compatible with plain JavaScript are the winners in my opinion, which very quickly discounts Immutable.JS.

Right now, the Immer + Redux combination seems to be the favorite and with good reason — Immer doesn’t introduce anything that can’t be handled using just plain JavaScript.

This means that it is confined to reducers only, unlike Immutable.JS which spreads far beyond the Redux-specific parts of a codebase. All of this makes Immer easy to understand and use, simple to adopt, and even simple to remove if necessary (but I doubt it will be)!

And remember that for small applications you might not need a library at all. At least try before you import.
