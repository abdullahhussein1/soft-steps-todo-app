# TZ.js

Built for plate; determines (roughly) the timezone name based on a few lovely factors.
Adds two prototype methods to `Date`.

## Date.prototype.tzoffset

Get a formated, `GMT+0000`-style offset string for your locale, based on the result of
`Date.prototype.getTimezoneOffset`. 

## Date.prototype.tzinfo()

Returns an object with the following information if tzinfo exists for your locale's offset
(as returned by `Date.prototype.getTimezoneOffset`):

````javascript
    {
          'name'  : 'Human Readable Name of Area'
        , 'loc'   : 'Location of TZ: E.G., North America'
        , 'abbr'  : 'shortname for tz: E.G, CST'
        , 'offset': '(+|-)0XXX'
    }
````

The TZINFO is collected in `tz.json`.

## How does it work?

Fuzzily. A list of known TZ data is stored in `tz.json`, keyed by offset (`+0000`, `-0600`).
The ordering of the list is important. Roughly, the algorithm does the following:

* Get the offset string from your date.
* Lookup the list of TZ's corresponding to that offset.
* Determine whether your timezone has Daylight Savings.
* Determine the thresholds at which Daylight Savings Time takes effect in your locale, if any.
* Determine, based on that, whether your locale is in the northern or southern hemisphere. Default to southern hemisphere.

    > ### How does that work?
    > If you're in the northern hemisphere, the threshold
    > for "spring forward" will be earlier than "fall back".
    >
    > In the south, this is reversed.

* If your locale is currently in DST, filter the TZ list for names that match `/([Dd]aylight|[Ss]ummer)/`.
* If your locale is in the south (or we have no DST info), reverse the list.
* Return the first time from that list as the TZinfo.

    > ### Why default to the south?
    >
    > For countries that have DST, we can easily determine which
    > half of the Earth they're on. For countries that don't, we're
    > forced to guess. However, if we approach from the South, we
    > [tend to pick up countries of interest](http://en.wikipedia.org/wiki/File:DaylightSaving-World-Subdivisions.png).

## Install (in browser)

````bash

$ git clone git@github.com:chrisdickinson/tz.js.git
$ cd tz.js
$ make build
$ # now you have tz.js, and if you have uglifyjs or jsmin, you also have tz.min.js

````

## Install (in node)

`npm install tz`

## Run the tests

`npm install --dev tz; npm test tz`

## License

MIT
 
