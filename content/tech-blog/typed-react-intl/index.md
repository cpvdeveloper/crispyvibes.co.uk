---
title: 'React-Intl translations done properly with TypeScript'
date: '2021-09-20'
description: 'A trick for react-intl’s FormattedMessage and formatMessage'
length: '4 min'
link: 'https://medium.com/weekly-webtips/react-intl-translations-done-properly-with-typescript-3d901ca1b77f'
---

_**TLDR;**_ by creating a wrapper around [react-intl](https://www.npmjs.com/package/react-intl)’s `FormattedMessage`&nbsp; component and `formatMessage`&nbsp; function, you can add type-safety so that only valid translation message IDs are allowed. Here’s an [example repo](https://github.com/cpv123/typed-react-intl-keys) and [some gists](https://gist.github.com/cpv123/afccb1a87d235b9300547f00180c3b99).

With react-intl, you can translate messages with the `FormattedMessage`&nbsp; component or with the `formatMessage`&nbsp function. Either way, you have to provide an id for the message, which is ordinarily of type `string | number`

![Standard use of react-intl translation functions](./react-intl-basic.png)

This means that you can pass any string or any number, even if a message doesn’t exist for that ID...

![Passing an invalid message ID](./react-intl-error.png)

But by knowing all of the possible messages IDs, we can add additional type-safety to the `id`&nbsp; prop/argument so that it’ll only accept values that actually exist in our translation files. As an added benefit, we’ll also get IntelliSense from our IDE when inputting the argument value (as you’d expect when using TypeScript).

From a typical JSON file containing translation messages:

```
// en.json
{
  "helloWorld": "Hello world!",
  "goodbye: "Goodbye"
}
```

we can create a union type all of messages IDs:

![Creating a union type from know message IDs](./union-type.png)

### A type-safe FormattedMessage component

For each translation component/function, we can write a light wrapper that will enhance the underlying `react-intl`&nbsp; function by adding a more specific typing to the `id`&nbsp; argument, whilst leaving all other types the same.

For the `FormattedMessage`&nbsp; component, that looks like this:

![Enhanced FormattedMessage component](./FormattedMessage.png)

<center><small><a href="https://gist.github.com/cpv123/afccb1a87d235b9300547f00180c3b99">https://gist.github.com/cpv123/afccb1a87d235b9300547f00180c3b99</a></small></center><br />

It looks complicated, but that’s mostly because of the `FormattedMessageProps`&nbsp; type that we’ve created based on the original component’s props. To make sure that we’re matching the original prop types exactly, we’ve imported them directly from `react-intl/src/components/message`&nbsp; and then enhanced the type of `id`&nbsp;.

If your use of the `FormattedMessage`&nbsp; component is relatively simple, you could just define the complete props type yourself and it’ll probably be enough to meet your needs:

![Types for enhanced FormattedMessage component](./simple-type.png)

### A type-safe formatMessage function

Providing a type-safe wrapper for the `formatMessage`&nbsp; function is slightly more work because the function itself is returned from the `useIntl`&nbsp; hook:

![Enhanced formatMessage function](./formatMessage.png)

<center><small><a href="https://gist.github.com/cpv123/afccb1a87d235b9300547f00180c3b99">https://gist.github.com/cpv123/afccb1a87d235b9300547f00180c3b99</a></small></center><br />

Here we enhance the type of the descriptor argument so that the id option uses our new `IntlMessageKeys`&nbsp; type. To ensure that all other arguments remain the same, we use TypeScript’s `Parameters`&nbsp; utility type to extract the argument types from the original function type and access them one by one.

### Using the new functions

Because we made sure that the function signatures haven’t changed, we can use our new `FormattedMessage`&nbsp; and `formatMessage`&nbsp; in the exact same way as we’d use the original ones. Assuming we defined them both in the same file, we can just replace the import statement from `react-intl`&nbsp; to our new local file:

![Git diff showing import of enhanced translation functions](./git-diff.png)

And once we do, the benefits of this work will be clear:

![IDE intellisense not allowed invalid message IDs](./intellisense.png)

With our new translation component and function, only valid message IDs are accepted, and our IDE will be sure to help us out. No more risk of misspellings and accidentally using message IDs that don’t exist. TypeScript as you’d expect.
