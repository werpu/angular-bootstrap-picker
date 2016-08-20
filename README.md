# angular-bootstrap-picker
Bootstrap date picker with timezone support for angular 1.5.x

<img src="./doc/images/datepicker1.jpg" alt="Picker Image 1" style="width: 400px; float: left; margin-right: 10px;"/>

<img src="./doc/images/datepicker2.jpg" alt="Picker Image 1" style="width: 400px;"/>


## Introduction

Why another date picker? There are myriads of date pickers on the net, so why another one?
The answer is simple, I could not find any which were able to handle timezones in a decent manner, and also
had maintainable code - at least not for Angularjs. My main requirement was to be able to nail down a date picker
to a certain timezone and allow input and output within the parameters of this zone, independent of the browser timezone.
So I tried various pickers, and while they did have timezone support, they often were buggy and the code most of the times was
in a state that it was more work to try to fix the issue instead of writing my own picker.

Most of the time this was due to various facts

* The code base was really old and relied on old outdated angular APIs
* The code base often was to generic for what it did just to cover every corner case there is
* The code relied on its own buggy reimplementation of what momentjs and its plugins can provide

So my main goal is to keep the code in a clean maintainable state and to cover just my corner case.
If it fits your use cases then feel free to use my date picker, it is under the most liberal license there is (MIT license).
If it does not fit then feel free to extend it and send a patch. However bare in mind. I do not intend to
cover every corner case on earth with this picker. I prefer to do one thing and do it correctly. Which is date picking
with timezone support. 

So what does the component exactly do?

* It allows you to pick time and dates with javascript Date objects.
* It allows you to set the component to a timezone and pattern no matter where you are located.
* The component is optimized for clean code and easy navigation to make the selection progress as easy as possible.
* You can set upper and lower DateTime boundaries, which are reflected in the correct time and date of the timezone selected.


What it does not do (at the moment)

* Localisation (you can localize to some degree via moment which is used internally however)
* AM/PM timeformat at the moment the component allows only the 24 hours timeformat

Both things might be added in the future if the need arises or someone provides a proper patch.
(Patches and collaboration are always welcome)



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
* picker-mode {optional} allowed values DATE or DATE_TIME if no value is set DATE is used automatically
* button-label {optional} label for the picker button



