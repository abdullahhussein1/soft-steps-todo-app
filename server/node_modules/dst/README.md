# dst.js

Is it daylight savings time?

Designed for use in node as well as in-browser.

## Date.prototype.isDST()

Returns true if the date is during daylight savings time.

## (window || require('dst')).is_dst(date, [thresholds])

Available either directly via `require` or on the window object, `is_dst`
is the function underlying the prototype method.

It accepts an additional `thresholds` argument, which should take the following
form:

````javascript
{
    "spring_forward":<integer offset from beginning of year in milliseconds>,
    "fall_back":<integer offset from beginning of year in milliseconds>,
}
````

> ### nota bene
> 
> `spring_forward` need not be *before* `fall_back` -- in fact, in 50% of earthly
> hemispheres, it's just the opposite situation.
>
> further, in other saner lands, there may be **no** thresholds to cross -- that is,
> there are happy, productive human beings that somehow survive without DST.
> in that case, both fields may be set to `0`.

## is_dst.find_thresholds()

Splits the year in two halves, and attempts to check at which point in the hemi-year
`Date#getTimezoneOffset` changes values. Run once during the execution of the program.
Uses a binary search -- cuts out at the granularity of one second.

May be used to provide valid `thresholds` to pass into `is_dst`, if so desired.

# testing

in node:

````

$ npm install --dev dst
$ npm test dst

````

in browser: [open this url](http://chrisdickinson.github.com/dst.js/test/)

or:

````

$ git clone git@github.com:chrisdickinson/dst.js.git
$ cd dst.js
$ python -m SimpleHTTPServer
$ open http://localhost:8000/test/

````

# LICENSE

MIT

