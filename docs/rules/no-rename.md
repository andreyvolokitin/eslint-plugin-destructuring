# no-rename

When destructuring an object, you can provide the variable name in order to have the variable name differ from the object property. This can produce confusing code that is harder to read than ES5 code, therefore this rule prevents it unless the object property is an invalid identifier (ie. a string literal).

## Rule Details

The following patterns are considered problems:

```js
/*eslint destructuring/no-rename: "error"*/

const { a: b } = c;
const { a: { a : b }} = c;
```


The following patterns are not considered warnings:

```js
/*eslint destructuring/no-rename: "error"*/

const { a } = c;
const { a: { a }} = c;
const { 'data-prop': a } = c;
```

## When Not To Use It

If you think destructuring and renaming creates clear code then you can disable this rule.
