---
title: '3 reason to avoid using ImmutableJS with Redux'
date: '2019-12-29'
description: 'Once in, you’ll never get out.'
length: '5 min'
link: ''
---

Redux wouldn't work without immutable data, and so it makes sense that the immutable-js library--which helps to ensure this immutability--has become used so frequently with Redux. But after working with ImmutableJS in a few large-scale React-Redux applications, it's clear that using the library comes at a price, and that once in, it's difficult to opt-out.

The 3 reasons to avoid using ImmutableJS with Redux are:

1. It leaks into dumb components making them impure and difficult to work with
2. It can kill Redux performance
3. It allows the application state to become complex and deeply nested

Before diving into these, here's a brief run-through of what immutability is, why it's so important in Redux, and what ImmutableJS offers.

### Immutability and Redux

Redux decides if a component should re-render by checking if the application's state has changed. When this state is an immutable object--meaning that once created it can't then be changed, or mutated--Redux can make this check very quickly and easily.

This is because when objects are immutable, the only way to update them is to create a new object with the desired change. New objects have new references in memory and so a shallow comparison is all that's needed. Redux doesn't have to check the entire state object for differences, it can simply check if it's a different object to the previous one, or to express this as an over-simplified ternary:

```js
previousStateObject !== newStateObject ? updateThings() : null
```

### What does ImmutableJS offer?

ImmutableJS offers a range of immutable data structures and APIs to update them, which _generally_ look quite similar to plain JavaScript.

For example, objects can be handled as

```js
const myImmutableMap = Immutable.fromJS({ a: 1, b: 2 })
myImmtubableMap.set('b', 3)
```

and arrays as

```js
const myImmutableList = Immutable.fromJS([1, 2, 3])
myImmutableList.push(4)
```

This ensures that `myImmutableMap`&nbsp;and `myImmutableList`&nbsp;are never mutated, and they can then be converted back to plain JavaScript objects/arrays when necessary using the `toJS()`&nbsp;function. ImmutableJS also has a lot of performance optimization going on behind the scenes to make these immutable updates fast and efficient.

Here's how ImmutableJS works with Redux in short:

1. Initialise your entire Redux store as an ImmutableJS data structure using Immutable.fromJS()
2. Update your state in reducers using ImmutableJS APIs--`push()`, `set()`, `setIn([])`, `merge()`&nbsp;etc.
3. Be confident that your state has not been mutated during updates
4. Ideally, convert the pieces of your ImmutableJS state to plain JavaScript before they're passed to components as props

This sounds simple, but as an application grows in both lines of code and number of developers, there are many things that can go wrong.

### Reason 1: It leaks into dumb components making them impure and difficult to work with

The Redux documentation makes it clear that dumb components i.e. those wrapped by Redux-connected containers, should not receive props as ImmutableJS objects:

> _Your dumb components should be pure; that is, they should produce the same output given the same input, and have no external dependencies. If you pass such a component an Immutable.JS object as a prop, you make it dependent upon Immutable.JS to extract the prop's value and otherwise manipulate it._

There are also many other, more apparent issues that arise--especially when dumb components are receiving both plain JavaScript and ImmutableJS props. When this happens, developers must be constantly aware of what kind of prop they're dealing with, often finding out the hard way when attempting to destructure an ImmutableJS object. With this uncertainty, a number of simple things become complicated--not impossibly complicated but unnecessarily so:

1. Defining a component's `propTypes`&nbsp;and `defaultProps`&nbsp;

Expecting `propTypes.object`&nbsp;or `propTypes.instanceOf(Immutable.Map)`? If it's the latter, don't forget to import the ImmutableJS library into the component file.

2. Mocking props for component tests

It's the same issue again, expecting a mock prop to be `Immutable.fromJS({...})`&nbsp;or just a plain `{...}` ?

3. Writing, using, and reusing utility functions

Does a function expect an array or ImmutableJS list as an argument? What does it return? Why are there two functions that look so similar?

`gist:cpv123/24eb953fa8627368b6eec9f0171bea85#immutable-util-functions.js`

<center><small>Ignoring the fact that these could be written more concisely…</small></center><br />

To avoid this uncertainty, whilst also abiding by the Redux docs quoted above, all props must be converted to plain JavaScript before being passed to components. This can be achieved easily, but not very elegantly.

A naive approach is to use `toJS()`&nbsp;on all props before they are passed, but this is a bad idea for reasons discussed below in Reason 2. A higher-order component (HoC) can be used to more efficiently make the conversion, but this requires wrapping each already-wrapped connected component resulting in `connect(toJS(MyComponent))`&nbsp;where `toJS()`&nbsp;is a fairly intimidating HoC that looks something like this:

`gist:cpv123/d2ffcfb34c2789b04c373c59a9c98286#to-js-hoc.js`

There is an NPM package `with-immutable-props-to-js`&nbsp;that offers this kind of HoC, but hiding such complex code doesn't make it much more pleasing to use.

### Reason 2: It can kill Redux performance

ImmutableJS itself is cleverly optimized for performance, but if used incorrectly with Redux--specifically within `mapStateToProps`--it can actually worsen the overall application performance. I've written about this previously without explicitly calling out ImmutableJS, despite it being possibly the worst culprit of them all.

The problem arises when converting an ImmutableJS object to plain JavaScript using `toJS()`&nbsp;or `toArray()`. These operations are not only expensive to run on large objects, but they also result in a new object being created each time. Thinking back to shallow equality checks, this means that when Redux compares the results of consecutive `mapStateToProps`&nbsp;functions, they always look different which results in a re-render of the Redux-connected component.

`gist:cpv123/235e68c989422b6ecbeed5f6eaacfed3#map-state-with-to-js.js`

<center><small>NumbersComponent will re-render more often than required--every time mapStateToProps is called.</small></center><br />

Unfortunately, the options for avoiding the use of `toJS()`&nbsp;in `mapStateToProps`&nbsp;can be difficult as discussed in Reason 1: either leave all props as ImmutableJS objects or succumb to yet another NPM package and/or another higher-order component.

### Reason 3: It allows the application state to become complex and deeply nested

The shape of an application's state is rarely given much thought, and for small applications, this is probably fine. But as an application grows, the state can become difficult to manage--usually when it becomes deeply nested.

A nested state is more likely to store duplicate data, which is particularly problematic when it's data that can be updated, as updates must then be made consistently across all duplicates. This is one of the main reasons why a normalized state is often recommended. Furthermore, updating deeply nested data whilst ensuring immutability is usually quite difficult:

```js
const newImmutableState = {
  ...immutableState,
  deeply: {
    ...deeply,
    nested: {
      ...nested,
      data: 'new data',
    },
  },
}
```

This is one of the places where ImmutableJS comes to the rescue with:

```js
immutableState.setIn(['deeply', 'nested', 'data'], 'new data')
```

But from a cynical perspective, this syntax is perhaps a little too convenient. When it's this easy to update the state, no matter how complex or nested, it's unlikely that a developer will ever question it. This leaves no incentive to optimize state shape, and so the potential benefits that this could bring (for both the developer and application performance) will never be realised.

### Summary

ImmutableJS can help to ensure that an application's state remains immutable, which is necessary for Redux to do its job properly. However, using the library comes at a price: it will quickly spread throughout your codebase even into places that don't care about immutable data, it can harm performance if not used correctly, and it can hide some of the nuances of managing state effectively.

If you're starting a new Redux application, have a think about these costs before taking the one-way jump into ImmutableJS.
