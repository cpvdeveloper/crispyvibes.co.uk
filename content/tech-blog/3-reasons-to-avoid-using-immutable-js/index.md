---
title: '3 reasons to avoid using ImmutableJS with Redux'
date: '2019-12-29'
description: 'Once in, you’ll never get out.'
length: '6 min'
link: 'https://medium.com/better-programming/3-reasons-to-avoid-using-immutablejs-with-redux-b0109d0123e8'
---

Redux wouldn’t work without immutable data, and so it makes sense the [immutable-js library](https://github.com/immutable-js/immutable-js) — which helps to ensure immutability — has become used so frequently with Redux. But after working with ImmutableJS in a few large-scale React-Redux applications, it’s clear using the library comes at a price, and that once in, it’s difficult to opt out.

The three reasons to avoid using ImmutableJS with Redux are:

1. It leaks into dumb components, making them impure and difficult to work with

2. It can kill Redux performance

3. It allows the application state to become complex and deeply nested

Before diving into these, here’s a brief run through of what immutability is, why it’s so important in Redux, and what ImmutableJS offers.

## Immutability and Redux

Redux decides if a component should rerender by checking if any piece of the application’s state relevant to that component has changed.

When the application’s state is an immutable object — meaning that once created it can’t then be changed, or _mutated_ — Redux can make this check very quickly and easily.

This is because when objects are immutable, the only way to update them is to create a new object with the desired change. New objects have new references in memory, and so a shallow comparison is all that’s needed. For each bit of state that a component cares about — defined in `mapStateToProps` — Redux can do the following, no matter how complex that bit of state might be:

    previousBitOfState !== newBitOfState ? updateComponent() : null

## What Does ImmutableJS Offer?

ImmutableJS offers a range of immutable data structures and the APIs to update them — which generally look quite similar to plain JavaScript.

For example, objects can be handled as:

    const myImmutableMap = Immutable.fromJS({ a: 1, b: 2 })

    myImmutbableMap.set('b', 3)

And arrays as:

    const myImmutableList = Immutable.fromJS([1, 2, 3])

    myImmutableList.push(4)

This ensures that `myImmutableMap`&nbsp;and `myImmutableList`&nbsp;are never mutated, and they can then be converted back to plain JavaScript objects/arrays when necessary using the `toJS()`&nbsp;function.

ImmutableJS also has a lot of performance optimization going on behind the scenes to make the immutable updates fast and efficient. For example, the `push`&nbsp;and `pop`&nbsp;methods of an ImmutableJS `List`&nbsp;scale with O(1) time complexity, even though they result in a new `List`&nbsp;.

Ordinary these kinds of methods means you have to create a copy of the array with all other elements — an O(n) operation.

Here’s how ImmutableJS works with Redux, in short:

1. Initialize your entire Redux store as an ImmutableJS data structure using `Immutable.fromJS()`.

1. Update your state in reducers using ImmutableJS APIs — `push()`&nbsp;, `set()`&nbsp;, `setIn([])`&nbsp;, `merge()`&nbsp;, etc.

1. Be confident your state hasn’t been mutated during updates.

1. Ideally, convert the pieces of your ImmutableJS state to plain JavaScript before they’re passed to components as props.

This sounds simple, but as an application grows in both lines of code and number of developers, many things can go wrong.

## Reason 1: It Leaks Into Dumb Components, Making Them Impure and Difficult to Work With

The Redux documentation makes it clear that dumb components — e.g., those wrapped by Redux-connected containers — shouldn’t receive props as ImmutableJS objects:

> _Your dumb components should be pure; that is, they should produce the same output given the same input, and have no external dependencies. If you pass such a component an Immutable.JS object as a prop, you make it dependent upon Immutable.JS to extract the prop’s value and otherwise manipulate it._

There are also many other, more apparent issues that arise — especially when dumb components are receiving both plain JavaScript and ImmutableJS props. When this happens, developers must be constantly aware of what kind of prop they’re dealing with, often finding out the hard way when attempting to destructure an ImmutableJS object:

    const immutableMap = Immutable.fromJS({ a: 1, b: 2 })
    const { a, b } = immutableMap

    console.log(a) // undefined
    console.log(b) // undefined

With this uncertainty, some simple things become complicated — not impossibly complicated but unnecessarily so:

### 1. Defining a component’s propTypes and defaultProps

Expecting `propTypes.object`&nbsp;or `propTypes.instanceOf(Immutable.Map)`? If it’s the latter, don’t forget to import the ImmutableJS library into the component file.

### 2. Mocking props for component tests

It’s the same issue again: Expecting a mock prop to be `Immutable.fromJS({...})`&nbsp;or just a plain `{...}` ?

### 3. Writing, using, and reusing utility functions

Does a function expect an array or ImmutableJS list as an argument? What does it return? Why are there two functions that look so similar?

`gist:cpv123/24eb953fa8627368b6eec9f0171bea85#immutable-util-functions.js`

<center><small>Ignoring the fact that these could be written more concisely…</small></center><br />

To avoid this uncertainty, whilst also abiding by the Redux docs quoted above, all props must be converted to plain JavaScript before being passed to components. This can be achieved easily — but not very elegantly.

A naive approach is to use `toJS()`&nbsp;on all props before they’re passed, but this is a bad idea, which is discussed below in Reason 2. A higher-order component (HoC) can be used to more efficiently make the conversion, but this requires wrapping each already-wrapped connected component, resulting in connect `(toJS(MyComponent))`&nbsp;, where `toJS()`&nbsp;is a fairly intimidating HoC that looks something like this:

`gist:cpv123/d2ffcfb34c2789b04c373c59a9c98286#to-js-hoc.js`

There is an npm package [with-immutable-props-to-js](https://www.npmjs.com/package/with-immutable-props-to-js) that offers this kind of HoC, but hiding such complex code doesn’t make it much more pleasing to use.

## Reason 2: It Can Kill Redux Performance

ImmutableJS itself is cleverly optimized for performance, but if used incorrectly with Redux — specifically within `mapStateToProps`— it can worsen the overall application performance. I’ve [written about this previously](https://medium.com/front-end-weekly/a-redux-performance-obsession-mapping-state-to-props-11b6bbae1766) without explicitly calling out ImmutableJS, despite it being probably the worst culprit of them all.

The problem arises when converting an ImmutableJS object to plain JavaScript using `toJS()`&nbsp;or `toArray()`&nbsp;.

These operations aren’t only [expensive to run on large objects](https://www.grzegorowski.com/immutable-js-tojs-vs-toarray), but they also result in a new object being created each time. Thinking back to shallow equality checks, this means when Redux compares the results of consecutive mapStateToProps functions, they always look different — which results in a rerender of the Redux-connected component.

`gist:cpv123/235e68c989422b6ecbeed5f6eaacfed3#map-state-with-to-js.js`

<center><small>NumbersComponent will re-render more often than required--every time mapStateToProps is called.</small></center><br />

Unfortunately, the options for avoiding the use of `toJS()`&nbsp;in `mapStateToProps`&nbsp;can be difficult as discussed in Reason 1: Either leave all props as ImmutableJS objects or succumb to yet another npm package and/or another higher-order component.

## Reason 3: It Allows the Application State to Become Complex and Deeply Nested

The shape of an application’s state is rarely given much thought, and for small applications, this is probably fine. But as an application grows, the state can become difficult to manage — usually when it becomes deeply nested.

A nested state is more likely to store duplicate data, which is particularly problematic when it’s data that can be updated, as updates must then be made consistently across all duplicates. This is one of the main reasons why a [normalized state is often recommended](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/). Furthermore, updating deeply nested data whilst ensuring immutability is usually quite difficult:

    const newImmutableState = {
      ...immutableState,
      deeply: {
        ...deeply,
        nested: {
          ...nested,
          data: 'new data'
        }
      }
    }

This is one of the places where ImmutableJS comes to the rescue with:

    immutableState.setIn(['deeply', 'nested', 'data'], 'new data')

But from a cynical perspective, this syntax is perhaps a little too convenient. When it’s this easy to update the state, no matter how complex or nested, it’s unlikely a developer will ever question it. This leaves no incentive to optimize state shape, and so the potential benefits this could bring (for both the developer and application performance) will never be realised.

## Summary

ImmutableJS can help to ensure an application’s state remains immutable, which is necessary for Redux to do its job properly.

However, using the library comes at a price: It’ll quickly spread throughout your codebase, even into places that don’t care about immutable data. It can harm performance if not used correctly. It can hide some of the nuances of managing the state effectively. And it often doesn’t even look like JavaScript.

If you’re starting a new Redux application, think about these costs before taking the one-way jump into ImmutableJS, and know there are alternative solutions — which I’ll write about in a follow-up piece.
