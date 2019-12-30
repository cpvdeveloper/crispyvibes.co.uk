---
title: 'DRAFT: Achieving immutability in Redux'
date: '2019-01-02'
description: ''
length: ''
link: ''
---

You don't always need a library, but if you do, pick a good one.
In a previous post, I advised that ImmutableJS shouldn't be used as the 'immutability-helper' library for Redux, but I didn't recommend any alternative solutions. So here are a few options that I've enjoyed using:

- seamless-immutable
- immer
- No library at all

### Recap: why not ImmutableJS?

The main issue with ImmutableJS is that its data structures are not backwards-compatible with plain JavaScript syntax - they can only be handled using the library's APIs which are essentially another language. The library therefore inevitably spreads throughout a codebase, even into places that shouldn't care about immutability such as dumb React components. This can make life unnecessarily difficult for developers, who must be constantly asking if their object is plain JavaScript or wrapped by ImmutableJS.

Trying to destructure an ImmutableJS object is one way of answering the question.And so a better alternative is one in which the library's usage is confined only to where immutable data is being handled: ideally in just reducers. Other places such as components, utility functions, and selectors should all be unaware of any immutability-helper library.

###Alternative 1: seamless-immutable
Seamless initially feels very similar to ImmutableJS: all objects must be wrapped by an immutable factory function, and the library's API must be used to make changes to them. The key difference is that Seamless objects can be read using plain JavaScript.
Consider a reducer, which looks nearly identical for Seamless and ImmutableJS:

But there's a difference in how the todos are passed to a component through Redux's mapStateToProps, and in how that component then uses this prop - with Seamless this can all be done using plain JavaScript.
The mapStateToProps functions using Seamless and ImmutableJS look like:

```js
state => {
  todos: state.todos
} // Seamless
```

```js
state => {
  todos: state.get('todos')
} // ImmutableJS
```

and using the prop within a component looks like:

```js
props.todos['a'].isComplete // Seamless
```

```js
props.todos.getIn(['a', 'isComplete']) // ImmutableJS
```

And so the use of Seamless is more confined within a codebase than ImmutableJS because Seamless objects can be read with plain JavaScript - things like dumb React components and basic selectors (along with all their tests) won't show any sign of the library. However, changing the data can only be done using the Seamless APIs and so it's likely that in utility functions and more complex selectors, the library will still be apparent.

### Alternative 2: immer

Immer works very differently to both ImmutableJS and Seamless, and for that reason, it completely solves the issue of interoperability - it's all plain JavaScript.
Largely for this reason, immer has become an extremely popular solution for managing the immutability of state in Redux. Even the Redux Style Guide shows it as a clear favourite:

> _Use Immer for Writing Immutable Updates - STRONGLY RECOMMENDED_
> I was a little surprised to see that ImmutableJS still tops the npm download charts, but I suspect that Immer will soon take the lead.
> https://www.npmtrends.com/immutable-vs-immer-vs-seamless-immutableImmer allows developers to write mutating operations but ensures that these only happen on a temporary 'draft' state, which is later finalised into a new state. Immer docs get this spot on:
> Using Immer is like having a personal assistant; he takes a letter (the current state) and gives you a copy (draft) to jot changes onto. Once you are done, the assistant will take your draft and produce the real immutable, final letter for you (the next state).
> This is enabled by the produce function:
> produce(currentState, producer: (draftState) => void): nextState
> or in other words means: pass the current state, the desired update which may be expressed as a mutation (producer function) and Immer will return the result as a new state leaving the current state untouched.
> Comparing Immer to Seamless and ImmutableJS in the context of Redux: the initial state is a plain JavaScript object, and updates to this state in the reducer are done as mutations using plain JavaScript (along with the produce function).

And so Immer achieves exactly what we hoped for: the library is confined only to reducers, leaving other parts of the codebase such as components, utility functions and selectors completely unaware that an immutability-helper is in use.

### Alternative 3: no library at all

This is one which everybody should at least try. Preferrable for small applications (do small applications need Redux though?…), doing this will certainly help to provide a good understanding of, and appreciation for, immutability in JavaScript and in state management.
In simple terms: just remember to { ...spreadEverything } and it'll probably work. But also remember that this will only produce a shallow copy.
Remember that there are a huge number of native tools at your disposal:
Spread operator
Object.assign
Object.freeze

Here's a quirky example of what you might end up with:

### Summary

For small applications that will remain small, handling state immutability without a library is perfectly sufficient, and a great way to learn
For large or growing applications, consider an alternative to ImmutableJS such as Immer

And as a final note: Immer and Seamless are 6KB and 3KB respectively, whilst ImmutableJS comes in at 17KB!
