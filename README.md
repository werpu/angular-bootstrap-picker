# angular-bootstrap-picker
Bootstrap date picker with timezone support for angular 1.5.x

## Introduction

Why another date picker? There are myriads of date pickers on the net, so why another one?
The answer is simple, I could not find any which was able to handle timezones in a decent manner, and also
had maintainable code. At least not for Angularjs. My main requirement was to be able to nail down a date picker
to a certain timezone and allow input and output within the parameters of this zone independend of the browser timezone.
So I tried various pickers and while they did have timezone support it often was buggy and the code often was
in a state that it was more work to try to fix the issue instead of writing my own picker.

Most of the time this was due to various facts

* The code base was really old and relied on old outdated angular APIs
* The code base often was to generic for what it did just to cover every corner case there is
* The code relied on its own buggy reimplementation of what momentjs and its plugins can provide

So my main goal is to keep the code in a clean maintainable state and to cover just my corner case.
If it fits yours then feel free to use my date picker, it is under the most liberal license there is (MIT license).
If it does not fit then feel free to extend it and send a patch. However bare in mind. I do not intend to
cover every corner case on earth with this picker. I prefer to do one thing and do it correctly. Which is date picking
with timezone support. For now I have no plans to isolate the picker itself into its own component or to add time picking
unless the need arises. Also expect additonal refactorings in the near future to make the code even cleaner than it is today.

## Installation

Installation via bower

```
bower install werpu/angular-bootstrap-picker --save
```

## Demo

A live demo can be found in the demo folder or on
https://werpu.github.io/angular-bootstrap-picker/demo/

## Usage

You simply can use the date picker like every other angular module. Once imported

```javascript

    angular.module('App', ['werpu.bootstrap.picker'])

```


```html
    <date-picker name="europe" ng-model="currentDate"
                 start-date="minDate" end-date="maxDate" timezone="Europe/Zurich">
    </date-picker>
```

The date picker has following dependencies which must be loaded upfront

* bootstrap (with it jquery)
* angular 1.5.x+
* momentjs
* moment-timezone
* moment-range


Following attributes are available:

* ng-model {required} the model of the date picker, must be an object of type Date
* start-date {optional} the lower bound of the possible pick values (must be of type date=
* end-date {optional} the upper bound of the possible pick values (must be of type date=
* timezone {optional} the moment timezone which should be used for the current picker, if not set the browsers timezone is used per default
* date-format {optional} the moment date format for the dates, if not set DD.MM.YYYY is used per default
* placeholder {optional} placeholder for the input
* name {optional} form name
* buttonLabel {optional} label for the button



