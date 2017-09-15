var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define("typescript/utils/DatePickerTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Importance = {
        LOW: "LOW",
        MEDIUM: "MEDIUM",
        HIGH: "HIGH",
        NONE: "NONE",
    };
    var EventModelValue = (function () {
        function EventModelValue() {
        }
        return EventModelValue;
    }());
    exports.EventModelValue = EventModelValue;
    var EventModel = (function () {
        function EventModel() {
            /*iso representation of a certain date*/
            this.data = [];
        }
        return EventModel;
    }());
    exports.EventModel = EventModel;
    /*
     Picker types internally used for the view representation
     */
    var BaseDate = (function () {
        function BaseDate(invalid, momentDate) {
            this.invalid = invalid;
            this.momentDate = momentDate;
        }
        return BaseDate;
    }());
    exports.BaseDate = BaseDate;
    /**
     * internal model class for a single date picker date
     * for the date view
     */
    var PickerDate = (function (_super) {
        __extends(PickerDate, _super);
        function PickerDate(invalid, momentDate, day, sameMonth, event) {
            var _this = _super.call(this, invalid, momentDate) || this;
            _this.day = day;
            _this.sameMonth = sameMonth;
            if (event) {
                _this.event = event;
            }
            return _this;
        }
        return PickerDate;
    }(BaseDate));
    exports.PickerDate = PickerDate;
    /**
     * Simple picker month data structure for the month view
     */
    var PickerMonth = (function (_super) {
        __extends(PickerMonth, _super);
        function PickerMonth(invalid, momentDate, month, sameYear) {
            var _this = _super.call(this, invalid, momentDate) || this;
            _this.month = month;
            _this.sameYear = sameYear;
            return _this;
        }
        return PickerMonth;
    }(BaseDate));
    exports.PickerMonth = PickerMonth;
    /**
     * simple picker year data structure for the year view
     */
    var PickerYear = (function (_super) {
        __extends(PickerYear, _super);
        function PickerYear(invalid, momentDate, year) {
            var _this = _super.call(this, invalid, momentDate) || this;
            _this.year = year;
            return _this;
        }
        return PickerYear;
    }(BaseDate));
    exports.PickerYear = PickerYear;
    var PickerWeek = (function () {
        function PickerWeek(calendarWeek, days) {
            if (days === void 0) { days = []; }
            this.calendarWeek = calendarWeek;
            this.days = days;
        }
        return PickerWeek;
    }());
    exports.PickerWeek = PickerWeek;
    /**
     * page model for the date picker page
     */
    var DatePickerPage = (function () {
        function DatePickerPage(year, month, dayOfWeek, weeks) {
            if (dayOfWeek === void 0) { dayOfWeek = []; }
            if (weeks === void 0) { weeks = []; }
            this.dayOfWeek = dayOfWeek;
            this.weeks = weeks;
            this.year = year;
            this.month = month;
        }
        return DatePickerPage;
    }());
    exports.DatePickerPage = DatePickerPage;
    var EventPickerPage = (function () {
        function EventPickerPage() {
            this.months = [];
        }
        return EventPickerPage;
    }());
    exports.EventPickerPage = EventPickerPage;
    /**
     * we have a 3x4 row for the months of the year
     */
    var MonthPickerPage = (function () {
        function MonthPickerPage(year, monthRow) {
            if (monthRow === void 0) { monthRow = []; }
            this.row = monthRow;
            this.year = year;
        }
        return MonthPickerPage;
    }());
    exports.MonthPickerPage = MonthPickerPage;
    var YearPickerPage = (function () {
        function YearPickerPage(yearRow) {
            if (yearRow === void 0) { yearRow = []; }
            this.row = yearRow;
        }
        return YearPickerPage;
    }());
    exports.YearPickerPage = YearPickerPage;
    /**
     * time picker mode
     */
    var TimeModel = (function () {
        function TimeModel(hour, minutes) {
            this.hour = hour;
            this.minutes = minutes;
        }
        return TimeModel;
    }());
    exports.TimeModel = TimeModel;
});
/*
 Copyright (c) 2016 Werner Punz

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
define("typescript/utils/BehavioralFixes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) {
                    return 0;
                }
                if (number === 0 || !isFinite(number)) {
                    return number;
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };
            // The length property of the from method is 1.
            return function from(arrayLike /*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;
                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);
                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }
                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }
                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }
                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);
                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);
                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    }
                    else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }
    /**
     * Some bootstrtrap behavioral fixes
     */
    var BehavioralFixes = (function () {
        function BehavioralFixes() {
        }
        /**
         * Get all of an element's parent elements up the DOM tree
         * @param  {Node}   elem     The element
         * @param  {String} selector Selector to match against [optional]
         * @return {Array}           The parent elements
         */
        BehavioralFixes.getParents = function (elem, selector) {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                        Element.prototype.mozMatchesSelector ||
                        Element.prototype.msMatchesSelector ||
                        Element.prototype.oMatchesSelector ||
                        Element.prototype.webkitMatchesSelector ||
                        function (s) {
                            var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                            while (--i >= 0 && matches.item(i) !== this) {
                            }
                            return i > -1;
                        };
            }
            // Setup parents array
            var parents = [];
            // Get matching parent elements
            for (; elem && elem !== document; elem = elem.parentNode) {
                // Add matching parents to array
                if (selector) {
                    if (elem.matches && elem.matches(selector)) {
                        parents.push(elem);
                    }
                }
                else {
                    parents.push(elem);
                }
            }
            return parents;
        };
        ;
        BehavioralFixes.isScrollable = function (node) {
            return node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight;
        };
        BehavioralFixes.trigger = function (element, selector, trigger) {
            Array.from(element.querySelectorAll(selector)).forEach(trigger);
        };
        BehavioralFixes.addEventListener = function (element, selector, trigger) {
            Array.from(element.querySelectorAll(selector)).forEach(trigger);
        };
        /**
         * we register some keyboard events
         * to override the default behavior
         *
         * @param $element
         */
        BehavioralFixes.registerKeyBindings = function (element) {
            element.addEventListener("keydown", function (event) {
                /*
                 * enter should trigger a form submit
                 */
                if (event.keyCode == 13 /*enter*/) {
                    event.preventDefault();
                    BehavioralFixes.trigger(BehavioralFixes.getParents(element, "form")[0], "input[type=submit]", function (button) { return button.click(); });
                    return false;
                }
                /*
                 * arrow down should open the date picker
                 */
                if (event.keyCode == 40 /*arrow down*/) {
                    BehavioralFixes.trigger(element, ".picker-open", function (button) { return button.click(); });
                    return false;
                }
                /*
                 * escape should close it
                 */
                if (event.keyCode == 27 /*escape*/) {
                    BehavioralFixes.trigger(element, ".picker-close", function (button) { return button.click(); });
                    return false;
                }
            });
        };
        /**
         * for clicks outside of our date picker area
         * the date picker automatically should close
         *
         * @param $element
         * @param controller
         */
        BehavioralFixes.registerDocumentBindings = function (element, controller) {
            if (!controller.documentClickHandler) {
                var clickHandler = function () {
                    BehavioralFixes.unregisterDocumentBindings(element, controller);
                    BehavioralFixes.trigger(element, ".picker-close", function (button) { return button.click(); });
                };
                document.addEventListener("click", clickHandler);
                controller.documentClickHandler = clickHandler;
            }
        };
        /**
         * we also have to unregister global events
         *
         * @param clickHandler
         * @param controller
         */
        BehavioralFixes.unregisterDocumentBindings = function (element, controller) {
            if (controller.documentClickHandler) {
                document.removeEventListener("click", controller.documentClickHandler);
                //TODO add parent scroll removal here
                controller.documentClickHandler = null;
            }
            BehavioralFixes.offScroll(element, controller);
        };
        BehavioralFixes.registerPopupBindings = function (element, controller) {
            Array.from(element.querySelectorAll(".picker-popup")).forEach(function (node) {
                node.addEventListener("click", function (event) {
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                });
            });
        };
        BehavioralFixes.openDropDown = function (element, controller) {
            controller.isOpen = true;
            Array.from(element.querySelectorAll(".dropdown")).forEach(function (node) {
                node.classList.add("open");
            });
            this.repositionPopup(controller, element);
            this.onScroll(controller, element);
        };
        BehavioralFixes.repositionPopup = function (controller, element) {
            if (controller.appendToBody) {
                Array.from(element.querySelectorAll(".dropdown-menu")).forEach(function (node) {
                    node.classList.add("fixedPos");
                    //node.classList.add("hidden");
                    setTimeout(function () {
                        try {
                            var top_1 = element.querySelectorAll("input[type=\"text\"]")[0].getBoundingClientRect().bottom;
                            var left = element.getBoundingClientRect().left + element.clientWidth - node.clientWidth;
                            if (top_1 + node.clientHeight + 10 > window.innerHeight) {
                                top_1 = element.querySelectorAll("input[type=\"text\"]")[0].getBoundingClientRect().top - 5 - node.clientHeight;
                                node.classList.add("top");
                            }
                            else {
                                node.classList.remove("top");
                            }
                            node.style.top = top_1 + "px";
                            node.style.left = left + "px";
                            node.style.right = "auto";
                        }
                        finally {
                            // node.classList.remove("hidden");
                        }
                    }, 100);
                });
            }
        };
        BehavioralFixes.closeDropDown = function (element, controller) {
            controller.isOpen = false;
            Array.from(element.querySelectorAll(".dropdown")).forEach(function (node) {
                node.classList.remove("open");
            });
            if (controller.appendToBody) {
                Array.from(element.querySelectorAll(".dropdown-menu")).forEach(function (node) {
                    node.classList.add("fixedPos");
                });
            }
            BehavioralFixes.offScroll(controller, element);
        };
        BehavioralFixes.onScroll = function (controller, element) {
            if (controller.appendToBody && controller.onParentScroll) {
                Array.from(BehavioralFixes.getParents(element, "*")).forEach(function (node) {
                    if (BehavioralFixes.isScrollable(node)) {
                        node.addEventListener("scroll", controller.onParentScroll);
                    }
                    window.addEventListener("scroll", controller.onParentScroll);
                });
            }
        };
        BehavioralFixes.offScroll = function (controller, element) {
            if (controller.appendToBody && controller.onParentScroll) {
                Array.from(BehavioralFixes.getParents(element, "*")).forEach(function () { return function (node) {
                    node.removeEventListener("scroll", controller.onParentScroll);
                }; });
                window.removeEventListener("scroll", controller.onParentScroll);
            }
        };
        return BehavioralFixes;
    }());
    exports.BehavioralFixes = BehavioralFixes;
});
/// <reference path="../../../node_modules/moment/moment.d.ts" />
define("typescript/utils/DateUtils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*
     Copyright (c) 2016 Werner Punz
    
     Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
     (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
     modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following conditions:
    
     The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
     WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
     COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
     ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    
     */
    var PickerConstants = (function () {
        function PickerConstants() {
        }
        return PickerConstants;
    }());
    PickerConstants.DEFAULT_DATE_FORMAT = "DD.MM.YYYY";
    PickerConstants.DEFAULT_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
    PickerConstants.DEFAULT_PICKER_MODE = "DATE";
    PickerConstants.PICKER_VIEW_DATE = "DATE";
    PickerConstants.PICKER_VIEW_TIME = "TIME";
    PickerConstants.PICKER_VIEW_MONTH = "MONTH";
    PickerConstants.PICKER_VIEW_YEAR = "YEAR";
    PickerConstants.DEFAULT_PICKER_LABEL = "Date";
    exports.PickerConstants = PickerConstants;
    /**
     * A set of moment based utils classes
     */
    var DateUtils = (function () {
        function DateUtils() {
        }
        /**
         * checks if the selected date is today within the given timezone
         *
         * @param timezone
         * @param selectedDate
         * @returns {boolean}
         */
        DateUtils.isToday = function (timezone, selectedDate) {
            var modelDate = moment.tz(new Date(), DateUtils.getTimezone(timezone));
            return modelDate.isSame(selectedDate, "date")
                && modelDate.isSame(selectedDate, "month")
                && modelDate.isSame(selectedDate, "year");
        };
        ;
        /**
         * checks if both dates are the same
         *
         * @param timezone
         * @param selectedDate
         * @returns {boolean}
         */
        DateUtils.isSameDay = function (selectedDate, dateToCompare) {
            return dateToCompare.isSame(selectedDate, "date")
                && dateToCompare.isSame(selectedDate, "month")
                && dateToCompare.isSame(selectedDate, "year");
        };
        ;
        /**
         * checks if the given month is the current month within the given timezone
         *
         * @param timezone
         * @param selectedDate
         * @returns {boolean}
         */
        DateUtils.isCurrentMonth = function (timezone, selectedDate) {
            var modelDate = moment.tz(new Date(), DateUtils.getTimezone(timezone));
            return modelDate.isSame(selectedDate, "month")
                && modelDate.isSame(selectedDate, "year");
        };
        ;
        /**
         * Checks if the given moment value is the same as the selected month within the given timehzone
         * @param timeZone
         * @param modelValue
         * @param selectedMonth
         * @returns {boolean}
         */
        DateUtils.isSameMonth = function (timeZone, modelValue, selectedMonth) {
            var modelDate = moment.tz(modelValue, DateUtils.getTimezone(timeZone));
            return modelDate.isSame(selectedMonth, "month")
                && modelDate.isSame(selectedMonth, "year");
        };
        ;
        /**
         * checks if the current year is the same as the given year within the given timezone
         * @param timezone
         * @param selectedDate
         * @returns {boolean}
         */
        DateUtils.isCurrentYear = function (timezone, selectedDate) {
            var modelDate = moment.tz(new Date(), DateUtils.getTimezone(timezone));
            return modelDate.isSame(selectedDate, "year");
        };
        ;
        /**
         * checks if the moment dates match within the given timehone
         * @param timezone
         * @param modelValue
         * @param selectedMonth
         * @returns {boolean}
         */
        DateUtils.isSameYear = function (timezone, modelValue, selectedMonth) {
            var modelDate = moment.tz(modelValue, DateUtils.getTimezone(timezone));
            return modelDate.isSame(selectedMonth, "year");
        };
        ;
        /**
         * fetches the given timezone or the default one depending on the incoming values
         *
         * @param timeZone
         * @returns {string}
         */
        DateUtils.getTimezone = function (timeZone) {
            return timeZone || moment.tz.guess();
        };
        ;
        return DateUtils;
    }());
    exports.DateUtils = DateUtils;
});
/*
 Copyright (c) 2016 Werner Punz

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
define("typescript/utils/ViewModelBuilder", ["require", "exports", "typescript/utils/DatePickerTypes"], function (require, exports, DatePickerTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * utils class to build the various view models
     */
    var ViewModelBuilder = (function () {
        function ViewModelBuilder() {
        }
        ViewModelBuilder.calculateYearView = function (newValue, startDate, endDate, timezone) {
            if (!newValue) {
                newValue = new Date();
            }
            var current = moment.tz(newValue, timezone);
            var offset = current.get("year") % 20 - 1;
            var nextDecadeOffset = 20 - offset - 1;
            var start = moment.tz(newValue, timezone).startOf("year").startOf("month").startOf("day").subtract(offset, "year");
            var end = moment.tz(newValue, timezone).endOf("year").endOf("month").endOf("day").add(nextDecadeOffset, "year");
            var momentStartDate = (startDate) ? moment.tz(startDate, timezone).startOf("year").startOf("month").startOf("day") : null;
            var momentEndDate = (endDate) ? moment.tz(endDate, timezone).endOf("year").endOf("month").endOf("day") : null;
            var cnt = 0;
            var pickerPage = new DatePickerTypes_1.YearPickerPage();
            var range1 = moment.range(start, end);
            range1.by("year", function (date) {
                date = moment.tz(date, timezone);
                if (cnt % 5 == 0) {
                    pickerPage.row.push([]);
                }
                var isInvalid = false;
                if (momentStartDate) {
                    isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isBefore(momentStartDate) && moment.tz(date, timezone).endOf("day").isBefore(momentStartDate));
                }
                if (!isInvalid && momentEndDate) {
                    isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isAfter(momentEndDate) && moment.tz(date, timezone).endOf("day").isAfter(momentEndDate));
                }
                pickerPage.row[pickerPage.row.length - 1].push(new DatePickerTypes_1.PickerYear(isInvalid, date, parseInt(date.tz(timezone).format("YYYY"))));
                cnt++;
            });
            return pickerPage;
        };
        ;
        ViewModelBuilder.calculateMonthView = function (newValue, startDate, endDate, timezone) {
            if (!newValue) {
                newValue = new Date();
            }
            var momentDate = moment.tz(newValue, timezone);
            var start = moment.tz(newValue, timezone).startOf("year").startOf("month").startOf("day");
            var end = moment.tz(newValue, timezone).endOf("year").endOf("month").endOf("day");
            var momentStartDate = (startDate) ? moment.tz(startDate, timezone).startOf("month").startOf("day") : null;
            var momentEndDate = (endDate) ? moment.tz(endDate, timezone).endOf("month").endOf("day") : null;
            var range1 = moment.range(start, end);
            var cnt = 0;
            var pickerPage = new DatePickerTypes_1.MonthPickerPage(momentDate.get("year"));
            range1.by("month", function (date) {
                date = moment.tz(date, timezone);
                if (cnt % 3 == 0) {
                    pickerPage.row.push([]);
                }
                var isInvalid = false;
                if (momentStartDate) {
                    isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isBefore(momentStartDate) && moment.tz(date, timezone).endOf("day").isBefore(momentStartDate));
                }
                if (!isInvalid && momentEndDate) {
                    isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isAfter(momentEndDate) && moment.tz(date, timezone).endOf("day").isAfter(momentEndDate));
                }
                pickerPage.row[pickerPage.row.length - 1].push(new DatePickerTypes_1.PickerMonth(isInvalid, date, moment.tz(date, timezone).format("MMMM"), moment.tz(date, timezone).isSame(momentDate, "year")));
                cnt++;
            });
            return pickerPage;
        };
        ;
        /**
         * calculates the current page for a given date
         * this is the main layout calculation function for the date view
         * for
         * @param newValue
         * @private
         */
        ViewModelBuilder.calculateDateView = function (newValue, startDate, endDate, timezone) {
            if (!newValue) {
                newValue = new Date();
            }
            var momentDate = moment.tz(newValue, timezone);
            var start = moment.tz(newValue, timezone).startOf("month").startOf("week");
            var end = moment.tz(newValue, timezone).startOf("month").startOf("week").add(41, "days");
            var momentStartDate = (startDate) ? startDate : null;
            var momentEndDate = (endDate) ? endDate : null;
            var range1 = moment.range(start, end);
            var weeks = [];
            var dayOfWeek = [];
            var cnt = 0;
            range1.by("day", function (date) {
                if (cnt % 7 == 0) {
                    weeks.push(new DatePickerTypes_1.PickerWeek(date.tz(timezone).get("week")));
                }
                var isInvalid = false;
                if (momentStartDate) {
                    isInvalid = isInvalid || (date.startOf("day").isBefore(momentStartDate) && date.endOf("day").isBefore(momentStartDate));
                }
                if (!isInvalid && momentEndDate) {
                    isInvalid = isInvalid || (date.startOf("day").isAfter(momentEndDate) && date.endOf("day").isAfter(momentEndDate));
                }
                weeks[weeks.length - 1].days.push(new DatePickerTypes_1.PickerDate(isInvalid, date, date.tz(timezone).get("date"), date.tz(timezone).isSame(momentDate, "month")));
                //We also need to display the work days
                if (dayOfWeek.length < 7) {
                    dayOfWeek.push(date.tz(timezone).format("ddd"));
                }
                cnt++;
            });
            return new DatePickerTypes_1.DatePickerPage(momentDate.get("year"), "", dayOfWeek, weeks);
        };
        ;
        /**
         * calculates the the entire event range for a given start and end date
         * @param newValue
         * @private
         */
        ViewModelBuilder.calculateEventDateView = function (rangeModel, startDate, endDate, timezone) {
            var rangeIdx = ViewModelBuilder.buildModelIdx(rangeModel, timezone);
            var start = moment.tz(startDate, timezone).startOf("month").startOf("week");
            var end = moment.tz(endDate, timezone).startOf("month").startOf("week").add(41, "days");
            var momentStartDate = (startDate) ? startDate : null;
            var momentEndDate = (endDate) ? endDate : null;
            var momentDate = moment.tz(timezone);
            var weeks = [];
            var dayOfWeek = [];
            var cnt = 0;
            var retVal = new DatePickerTypes_1.EventPickerPage();
            var tempEndDate = moment.tz(startDate, timezone).startOf("month").startOf("week").add(41, "days");
            var tempStartDate = moment.tz(startDate, timezone).startOf("month").startOf("week");
            var tempMonth = moment.tz(startDate, timezone);
            do {
                var hasDisplayableValues = false;
                var range1 = moment.range(tempStartDate, tempEndDate);
                range1.by("day", function (date) {
                    date = moment.tz(date, timezone).startOf("day");
                    if (cnt % 7 == 0) {
                        weeks.push(new DatePickerTypes_1.PickerWeek(date.tz(timezone).get("week")));
                    }
                    var isInvalid = date.isBefore(momentStartDate, "day") || moment.tz(date, timezone).isAfter(momentEndDate, "day") || moment.tz(date, timezone).endOf("day").isAfter(date.clone().endOf("month"));
                    var eventKey = date.format("DD.MM.YYYY");
                    var eventModelValue = rangeIdx[eventKey];
                    weeks[weeks.length - 1].days.push(new DatePickerTypes_1.PickerDate(isInvalid, date, date.get("date"), date.isSame(tempMonth, "month"), eventModelValue));
                    hasDisplayableValues = hasDisplayableValues || (date.isSame(tempMonth, "month") && !isInvalid);
                    //We also need to display the work days
                    if (dayOfWeek.length < 7) {
                        dayOfWeek.push(date.tz(timezone).format("ddd"));
                    }
                    cnt++;
                });
                var year = moment.tz(tempEndDate, timezone).startOf("month").subtract(1, "day").get("year");
                var month = moment.tz(tempEndDate, timezone).startOf("month").subtract(1, "day").format("MMM");
                tempStartDate = moment.tz(tempEndDate.add("day", 1), timezone).startOf("month").startOf("week");
                tempEndDate = moment.tz(tempStartDate, timezone).add(41, "days");
                tempMonth.add("month", 1);
                if (hasDisplayableValues) {
                    retVal.months.push(new DatePickerTypes_1.DatePickerPage(year, month, dayOfWeek, weeks));
                }
                var weeks = [];
                var dayOfWeek = [];
            } while (tempStartDate.isSameOrBefore(momentEndDate));
            return retVal;
        };
        /**
         * builds a model index for the event model
         *
         * @param eventModel
         * @param timezone
         * @returns {any}
         */
        ViewModelBuilder.buildModelIdx = function (eventModel, timezone) {
            if (!eventModel) {
                return {};
            }
            var rangeIdx = {};
            for (var cnt = 0; cnt < eventModel.data.length; cnt++) {
                var value = eventModel.data[cnt];
                var key = moment.tz(value.day, timezone).format("DD.MM.YYYY");
                rangeIdx[key] = value;
            }
            return rangeIdx;
        };
        return ViewModelBuilder;
    }());
    exports.ViewModelBuilder = ViewModelBuilder;
});
define("typescript_ng2/datePicker/DatePicker", ["require", "exports", "@angular/core", "typescript/utils/DatePickerTypes", "typescript/utils/BehavioralFixes", "typescript/utils/DateUtils", "typescript/utils/ViewModelBuilder", "@angular/forms"], function (require, exports, core_1, DatePickerTypes_2, BehavioralFixes_1, DateUtils_1, ViewModelBuilder_1, forms_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PickerConstants = (function () {
        function PickerConstants() {
        }
        return PickerConstants;
    }());
    PickerConstants.DEFAULT_DATE_FORMAT = "DD.MM.YYYY";
    PickerConstants.DEFAULT_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
    PickerConstants.DEFAULT_PICKER_MODE = "DATE";
    PickerConstants.PICKER_VIEW_DATE = "DATE";
    PickerConstants.PICKER_VIEW_TIME = "TIME";
    PickerConstants.PICKER_VIEW_MONTH = "MONTH";
    PickerConstants.PICKER_VIEW_YEAR = "YEAR";
    PickerConstants.DEFAULT_PICKER_LABEL = "Date";
    var template = function () {
        var inputArea = "\n\n                <div class=\"input-group\">\n                   <input type=\"text\" [placeholder]=\"placeholder\" class=\"form-control\" name=\"{{name}}_inner\" [(ngModel)]=\"innerSelection\" (change)=\"onChange($event)\" (keyup)=\"onChange($event)\">\n                   <span class=\"input-group-btn\">\n                       <button type=\"button\" class=\"picker-open btn btn-default\" (click)=\"openPicker()\">\n                             <span [className]=\"buttonStyleClass\" [ngClass]=\"{'glyphicon glyphicon-align-right glyph-icon glyphicon-calendar': !buttonStyleClass}\"> {{buttonLabel}} </span>\n                       </button>\n                   </span> \n               </div>\n               <input type=\"button\" class=\"picker-close\" (click)=\"close()\" value=\"Close\" [hidden]=\"true\"/>\n              \n        ";
        var inputAreaHidden = "\n           <input type=\"text\" style=\"display: none;\"  class=\"form-control\" name=\"{{name}}_inner\" [(ngModel)]=\"innerSelection\" (change)=\"onChange($event)\" (keyup)=\"onChange($event)\">\n        ";
        var timePickerSpinning = "\n            <div class=\"time-picker\" *ngIf=\"view == 'DATE' && pickerMode == 'DATE_TIME'\" >\n                <table>\n                   <thead>\n                        \n                    </thead>\n                    <tbody>\n                        \n                         <tr>\n                            <td class=\"glyphicon glyphicon-chevron-up\" [ngClass]=\"{'invalid' : !isValidHour(currentDate.get('hour') + 1)}\" (click)=\"nextHour($event)\">\n                            </td>\n                            <td></td>\n                            <td class=\"glyphicon glyphicon-chevron-up\" [ngClass]=\"{'invalid' : !isValidMinute(currentDate.get('minute') + 1)}\" (click)=\"nextMinute($event)\">\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"selected-hour\">\n                                <internal-range-input ngDefaultControl class=\"hour-input\" [from]=\"0\" [to]=\"23\" [(ngModel)]=\"currentHour\"></internal-range-input>    \n                            </td>\n                            <td class=\"invalid\">:</td>\n                            <td class=\"selected-minute\">\n                                <internal-range-input ngDefaultControl  class=\"minute-input\" [from]=\"0\" [to]=\"59\" [(ngModel)]=\"currentMinute\"></internal-range-input> \n                            </td>\n                        </tr>\n                         <tr>\n                            <td class=\"glyphicon glyphicon-chevron-down\" [ngClass]=\"{'invalid' : !isValidHour(currentDate.get('hour') - 1)}\" (click)=\"prevHour($event)\">\n                            </td>\n                            <td></td>\n                            <td class=\"glyphicon glyphicon-chevron-down\" [ngClass]=\"{'invalid' : !isValidMinute(currentDate.get('minute') - 1)}\" (click)=\"prevMinute($event)\">\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"button-group bottom-buttons\" *ngIf=\"view == 'TIME'\">\n                  <input type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"goBackInView($event)\" value=\"Back\" >\n                </div>\n            </div>\n        ";
        var datePicker = "\n               <!-- date view - default view -->\n               <div class=\"date-picker\" *ngIf=\"view == 'DATE'\">                \n                    <table>\n                        <thead>\n                        \n                            <tr *ngIf=\"pickerMode == 'DATE_TIME'\">\n                                <td colspan=\"8\" class=\"invalid picker-title\" >{{innerSelection}}</td>\n                            </tr>\n                            \n                            <tr>\n                                <td><a class=\"prev glyphicon glyphicon-menu-left\" (click)=\"prevMonth($event)\"></a></td><td colspan=\"2\" (click)=\"switchToMonthView($event)\">{{currentDate.format(\"MMMM\")}}</td><td><a class=\"next glyphicon glyphicon-menu-right\" (click)=\"nextMonth($event)\"></a></td>\n                                <td><a class=\"prev glyphicon glyphicon-menu-left\" (click)=\"prevYear($event)\"></a></td><td colspan=\"2\" (click)=\"switchToYearView($event)\">{{monthPickerData.year}}</td><td><a class=\"next glyphicon glyphicon-menu-right\" (click)=\"nextYear($event)\"></a></td>\n                            </tr>\n                            <tr>\n                                <td class=\"calendarWeek\"><!-- week of year --></td>\n                                <td class=\"dayOfWeek\" *ngFor=\"let dayOfWeek of monthPickerData.dayOfWeek\">{{dayOfWeek}}</td>    \n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let week of monthPickerData.weeks\">\n                                <td class=\"calendarWeek\">{{week.calendarWeek}}</td>\n                                <td class=\"day\" *ngFor=\"let day of week.days\" [ngClass]=\"{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : isSelectedDate(day), 'chosen' : isChosenDate(day), 'today': isToday(day)}\" class=\"{{(day.event) ? day.event.importance : ''}}\" (click)=\"selectDate(day, $event)\">{{day.day}}</td>\n                            </tr>\n                        </tbody>\n                        \n                    </table>\n                \n                    " + timePickerSpinning + "\n                    \n                    <div class=\"additional-content\">\n                        <ng-content select=\"additional-content-date\"></ng-content>\n                    </div>\n                    \n                    <div class=\"button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n                      \n                        <ng-content class=\"additional-buttons\" select=\"additional-buttons-date\"></ng-content>\n              \n                        <input type=\"button\" class=\"set btn btn-default btn-sm\" (click)=\"set($event)\" value=\"Set\" *ngIf=\"pickerOnlyMode == 'DOUBLE_BUFFERED'\" >\n                        <input type=\"button\" class=\"clear btn btn-default btn-sm\" (click)=\"clear($event)\" value=\"Clear\" *ngIf=\"!pickerOnlyMode\" >\n                        <input type=\"button\" class=\"today btn btn-default btn-sm\" (click)=\"today($event)\" value=\"Today\" >\n                        <input type=\"button\" class=\"picker-close btn btn-default btn-sm\" (click)=\"close($event)\" *ngIf=\"!pickerOnlyMode\" value=\"{{pickerMode == 'DATE' ? 'Cancel' : 'Close'}}\" >\n                    </div>\n               </div> \n        ";
        var monthPicker = "\n            <!-- month view -->\n            <div class=\"month-picker\" *ngIf=\"view == 'MONTH'\">\n                 <table>\n                    <thead>\n                          <tr>\n                          <td><a class=\"prev glyphicon glyphicon-menu-left\" (click)=\"prevYear($event)\" class=\"glyphicon glyphicon-menu-left\"></a></td>\n                          <td (click)=\"switchToYearView()\">{{monthPickerData.year}}</td>\n                          <td><a class=\"next glyphicon glyphicon-menu-right\" (click)=\"nextYear($event)\"></a></td>\n                          </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let monthRow of yearPickerData.row\">\n                            <td *ngFor=\"let month of monthRow\" [ngClass]=\"{'invalid': month.invalid, 'selected' : isSameMonth(month), 'chosen' : isChosenMonth(month), 'today': isTodayMonth(month)}\"\n                            (click)=\"selectMonth( month, $event)\"\n                            >{{month.month}}</td>\n                        </tr>\n                    </tbody>\n                 </table>   \n            \n                 <div class=\"additional-content\">\n                    <ng-content select=\"additional-content-month\"></ng-content>\n                 </div>\n                <div class=\"button-group bottom-buttons\">\n                    <div class=\"additional-buttons\">\n                        <ng-content select=\"additional-buttons-month\"></ng-content>\n                    </div>\n                    <input type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"goBackInView($event)\" value=\"Back\" />\n                </div>\n            </div>    \n        ";
        var yearPicker = "\n            <!-- year view -->  \n            <div class=\"year-picker\" *ngIf=\"view == 'YEAR'\">\n                  <table>\n                    <thead>\n                    <tr>\n                        <td><a (click)=\"prevDecade($event)\" class=\"glyphicon glyphicon-menu-left\"></a></td>\n                        <td colspan=\"3\" class=\"no-link\">{{decadeFrom}} - {{decadeTo}}</td>\n                        <td><a (click)=\"nextDecade($event)\" class=\"glyphicon glyphicon-menu-right\"></a></td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let yearrow of decadePickerData.row\">\n                            <td *ngFor=\"let year of yearrow\"\n                            [ngClass]=\"{'invalid': year.invalid, 'selected' : isSameYear(year), 'chosen' : isChosenYear(year), 'today': isTodayYear(year)}\"\n                             (click)=\"selectYear(year, $event)\"\n                            >{{year.year}}</td>\n                        </tr>\n                    </table>\n                  <div class=\"additional-content\">\n                        <ng-content select=\"additional-content-year\"></ng-content>\n                  </div>  \n                  <div class=\"button-group bottom-buttons\">\n                    <div class=\"additional-buttons\">\n                        <ng-content select=\"additional-buttons-year\"></ng-content>\n                    </div>\n                    <input type=\"button\" class=\"btn btn-default btn-sm\" (click)=\"goBackInView($event)\" value=\"Back\" />\n                  </div>\n            </div>   \n        ";
        return "\n <!--\n           <div [ngClass]=\"{'dropdown': !pickerOnlyMode, 'dropdown picker-standalone':pickerOnlyMode}\" > \n             \n               <span *ngIf=\"!pickerOnlyMode\">" + inputArea + "</span>  \n               <span *ngIf=\"pickerOnlyMode\">" + inputAreaHidden + "</span>  \n               <div [ngClass]=\"{'dropdown-menu picker-popup':!pickerOnlyMode, 'picker-popup': pickerOnlyMode}\" (click)=\"$event.stopImmediatePropagation()\">\n                    \n                    <div class=\"content\" *ngIf=\"isOpen || pickerOnlyMode\">\n                       \n                      \n                   </div>\n               \n                </div>\n            </div> \n-->            \n      <div class=\"dropdown\" [ngClass]=\"{'picker-standalone':pickerOnlyMode}\" (click)=\"$event.stopImmediatePropagation()\"> \n             \n               <span *ngIf=\"!pickerOnlyMode\">" + inputArea + "</span>  \n               <span *ngIf=\"pickerOnlyMode\">" + inputAreaHidden + "</span>  \n               <div class=\"picker-popup\" [ngClass]=\"{'dropdown-menu':!pickerOnlyMode}\" (click)=\"$event.stopImmediatePropagation()\">\n                    <div class=\"content\" *ngIf=\"isOpen|| pickerOnlyMode\">\n                       \n                       " + datePicker + "\n                       \n                       " + monthPicker + "                   \n                             \n                       " + yearPicker + "\n                   </div>\n               \n                </div>\n            </div>            \n        ";
    };
    //https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73. thanks
    //for providing a dedicated tutorial for a self validating component
    var DatePicker = DatePicker_1 = (function () {
        function DatePicker(elementRef) {
            var _this = this;
            this.elementRef = elementRef;
            //@Input() ngModel: Date;
            //@Output() ngModelChange: EventEmitter<Date> = new EventEmitter(false);
            this.onYearSelection = new core_1.EventEmitter();
            this.onMonthSelection = new core_1.EventEmitter();
            this.onDateSelection = new core_1.EventEmitter(false);
            this.isOpen = false;
            this.viewStack = [];
            this.propagateChange = function (_) { };
            /**
             * fetches the current or default timezone
             * @returns {string}
             * @private
             */
            this.getTimezone = function () {
                return _this.timezone || moment.tz.guess();
            };
            /**
             * fetches the date format set in the component either from outside or by its defaults
             * @returns {string}
             * @private
             */
            this.getDateFormat = function () {
                return _this.dateFormat || ((_this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) ?
                    PickerConstants.DEFAULT_DATE_FORMAT :
                    PickerConstants.DEFAULT_DATE_TIME_FORMAT);
            };
            /**
             * formats a date by using the controls appended parsers
             * this has to be done this way because somone could decorate
             * the control from outside
             *
             * @param value
             * @private
             */
            this.updateModel = function (value) {
                var innerSelection = value;
                //for (var cnt = 0; this._ngModel.$formatters && cnt < this._ngModel.$formatters.length; cnt++) {
                //    innerSelection = this._ngModel.$formatters[cnt](innerSelection);
                //}
                innerSelection = _this.formatDate(value);
                _this.innerSelection = innerSelection;
                if (!_this.validate(null)) {
                    _this._ngModel = _this.currentDate.toDate();
                }
                _this.propagateChange(_this._ngModel);
                _this.updatePickerData();
                //this.onChange(this.innerSelection);
            };
            /**
             * current date viewed (aka navigational position=
             * @type {Moment}
             * @private
             */
            this.currentDate = null;
            /**
             * double buffer date in double buffer mode
             *
             * @type {Moment}
             * @private
             */
            this.doubleBufferDate = null;
            this.buttonLabel = ("undefined" == typeof this.buttonLabel || null == this.buttonLabel) ?
                PickerConstants.DEFAULT_PICKER_LABEL : this.buttonLabel;
            this.pickerMode = ("undefined" == typeof this.pickerMode || null == this.pickerMode) ?
                PickerConstants.DEFAULT_PICKER_MODE : this.pickerMode;
            this.visibleDays = [];
            this.view = PickerConstants.PICKER_VIEW_DATE;
            this.viewStack = [];
            this.onParentScroll = function () {
                BehavioralFixes_1.BehavioralFixes.closeDropDown(_this.elementRef.nativeElement, _this);
            };
        }
        DatePicker.prototype.yearSelection = function () {
            //then when the button is clicked, emit events to the parent.
            this.onYearSelection.emit();
        };
        DatePicker.prototype.ngOnInit = function () {
            /**
             * we turn off event propagation
             * for the popup so that a click within the popup
             * does not propagate to its parent elements
             * (we only want to have the popup closed when we click on the outside)
             *
             */
            BehavioralFixes_1.BehavioralFixes.registerPopupBindings(this.elementRef.nativeElement, this);
            /**
             * we change the key handling a little bit
             * an enter should trigger a form submit
             * and a keydown should open the picker
             */
            BehavioralFixes_1.BehavioralFixes.registerKeyBindings(this.elementRef.nativeElement);
            //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
            //this.innerSelection = this.formatDate(this._ngModel);
            if (this.pickerOnlyMode) {
                this.openPicker();
            }
        };
        Object.defineProperty(DatePicker.prototype, "currentMinute", {
            get: function () {
                if (!this.currentDate) {
                    return 0;
                }
                return this.currentDate.get("minute");
            },
            set: function (val) {
                if (!this.isValidMinute(val)) {
                    return;
                }
                this.currentDate.set("minute", val);
                this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DatePicker.prototype, "currentHour", {
            /*we do the proper max min date validity checks over our setters*/
            get: function () {
                if (!this.currentDate) {
                    return 0;
                }
                return this.currentDate.get("hour");
            },
            set: function (val) {
                if (!this.isValidHour(val)) {
                    return;
                }
                this.currentDate.set("hour", val);
                this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
            },
            enumerable: true,
            configurable: true
        });
        DatePicker.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes.startDate && changes.startDate.previousValue != changes.startDate.currentValue) {
                var newMinDate = moment.tz(changes.startDate.currentValue, this.getTimezone());
                //no date change or mindate < than the currentDate in the min date, we safely can skip
                //the rest of the date processing
                if (newMinDate.isSameOrBefore(this.currentDate)) {
                    this.updatePickerData();
                    return;
                }
                //otherwise we set the currentDate to the newMinDate
                this.currentDate = (this.endOfDay) ? newMinDate.endOf("day") : newMinDate;
                //currentDate != modelValue?
                var currentModel = moment.tz(this._ngModel, this.getTimezone());
                //if there is a discrepancy we also update the model
                if (this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || this.pickerOnlyMode) {
                    if (!currentModel || currentModel.get("day") != this.currentDate.get("day") ||
                        currentModel.get("month") != this.currentDate.get("month") ||
                        currentModel.get("year") != this.currentDate.get("year")) {
                        this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
                    }
                }
                if (this.currentDate) {
                    this.updatePickerData();
                }
            }
            if (this.pickerOnlyMode && changes.ngModel && changes.ngModel.previousValue != changes.ngModel.currentValue) {
                setTimeout(function () {
                    _this.currentDate = (_this._ngModel) ? moment.tz(_this._ngModel, _this.getTimezone()) : moment.tz(new Date(), _this.getTimezone());
                    _this.updatePickerData();
                }, 0);
            }
        };
        /**
         * checks if the current picker date is the selected one
         * @param selectedDate
         * @returns {boolean}
         * @private
         */
        DatePicker.prototype.isSelectedDate = function (selectedDate) {
            if (!this._ngModel) {
                return false;
            }
            else {
                var modelDate = moment.tz(this._ngModel, this.getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "date") &&
                    modelDate.isSame(selectedDate.momentDate, "month") &&
                    modelDate.isSame(selectedDate.momentDate, "year");
            }
        };
        ;
        /**
         * checks if the current picker date is the selected one
         * @param selectedDate
         * @returns {boolean}
         * @private
         */
        DatePicker.prototype.isChosenDate = function (selectedDate) {
            if (!this.doubleBufferDate) {
                return false;
            }
            else {
                //booga
                var modelDate = this.doubleBufferDate;
                return modelDate.isSame(selectedDate.momentDate, "date") &&
                    modelDate.isSame(selectedDate.momentDate, "month") &&
                    modelDate.isSame(selectedDate.momentDate, "year");
            }
        };
        ;
        /**
         * checks if the current picker date is today
         * @param selectedDate
         * @returns {boolean}
         * @private
         */
        DatePicker.prototype.isToday = function (selectedDate) {
            return DateUtils_1.DateUtils.isToday(this.timezone, selectedDate.momentDate);
        };
        ;
        DatePicker.prototype.isTodayMonth = function (selectedDate) {
            return DateUtils_1.DateUtils.isCurrentMonth(this.timezone, selectedDate.momentDate);
        };
        ;
        DatePicker.prototype.isSameMonth = function (selectedMonth) {
            return DateUtils_1.DateUtils.isSameMonth(this.timezone, moment.tz(this._ngModel, this.getTimezone()), selectedMonth.momentDate);
        };
        ;
        DatePicker.prototype.isChosenMonth = function (selectedMonth) {
            if (!this.doubleBufferDate) {
                return false;
            }
            var modelDate = this.doubleBufferDate;
            return modelDate.isSame(selectedMonth.momentDate, "month") &&
                modelDate.isSame(selectedMonth.momentDate, "year");
        };
        ;
        DatePicker.prototype.isTodayYear = function (selectedDate) {
            return DateUtils_1.DateUtils.isCurrentYear(this.timezone, selectedDate.momentDate);
        };
        ;
        DatePicker.prototype.isSameYear = function (selectedYear) {
            return DateUtils_1.DateUtils.isSameYear(this.timezone, moment.tz(this._ngModel, this.getTimezone()), selectedYear.momentDate);
        };
        ;
        DatePicker.prototype.isChosenYear = function (selectedMonth) {
            if (!this.doubleBufferDate) {
                return false;
            }
            var modelDate = this.doubleBufferDate;
            return modelDate.isSame(selectedMonth.momentDate, "year");
        };
        ;
        /**
         * checks if the time given is valid in the scope of the date selected
         *
         * @param hour
         * @param minute
         * @returns {boolean}
         * @private
         */
        DatePicker.prototype.isValidTime = function (hour, minute) {
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                return false;
            }
            var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
            var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()).startOf("day") : null;
            var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()).endOf("day") : null;
            temporaryDate.set("hour", hour).set("minute", minute);
            return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
        };
        ;
        /**
         * checks for a valid hour, valid means the model date
         * @param hour
         * @returns {boolean}
         * @private
         */
        DatePicker.prototype.isValidHour = function (hour) {
            if (hour < 0 || hour > 23) {
                return false;
            }
            var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
            var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
            var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
            temporaryDate.set("hour", hour);
            return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
        };
        ;
        /**
         * checks for a valid minute
         * @param minute
         * @returns {boolean}
         * @private
         */
        DatePicker.prototype.isValidMinute = function (minute) {
            if (minute < 0 || minute > 59) {
                return false;
            }
            var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
            var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
            var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
            temporaryDate.set("minute", minute);
            return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
        };
        ;
        DatePicker.prototype.nextHour = function (event) {
            if (!this.isValidHour(this.currentDate.get("hour") + 1)) {
                return;
            }
            this.currentDate.add(1, "hour");
            this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
        };
        ;
        DatePicker.prototype.prevHour = function (event) {
            if (!this.isValidHour(this.currentDate.get("hour") - 1)) {
                return;
            }
            this.currentDate.subtract(1, "hour");
            this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
        };
        ;
        DatePicker.prototype.nextMinute = function (event) {
            if (!this.isValidMinute(this.currentDate.get("minute") + 1)) {
                return;
            }
            this.currentDate.add(1, "minute");
            this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
        };
        ;
        DatePicker.prototype.prevMinute = function (event) {
            if (!this.isValidMinute(this.currentDate.get("minute") - 1)) {
                return;
            }
            this.currentDate.subtract(1, "minute");
            this.selectDate(new DatePickerTypes_2.PickerDate(false, this.currentDate, 1, true));
        };
        ;
        /**
         * helper function to push the current date into its max min range
         *
         * @private
         */
        DatePicker.prototype._fixCurrentDate = function () {
            var parsedData = this.currentDate;
            var startDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
            var endDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
            if (startDate && moment.tz(parsedData, this.getTimezone()).isBefore(startDate)) {
                this.currentDate = startDate;
            }
            if (endDate && moment.tz(parsedData, this.getTimezone()).isAfter(endDate)) {
                this.currentDate = endDate;
            }
        };
        ;
        /**
         * select a date from the outside
         * @param selectedDate
         * @private
         */
        DatePicker.prototype.selectDate = function (selectedDate, event) {
            this.stopEventPropagation(event);
            if (!selectedDate.invalid) {
                if (!this._ngModel) {
                    this.currentDate = selectedDate.momentDate;
                    if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                        this.doubleBufferDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
                    }
                }
                //sometimes we pass the current date in, in this case no
                //Value traversal needs to be performed
                if (this.currentDate != selectedDate.momentDate) {
                    this.currentDate.set("date", selectedDate.momentDate.get("date"));
                    this.currentDate.set("month", selectedDate.momentDate.get("month"));
                    this.currentDate.set("year", selectedDate.momentDate.get("year"));
                }
                if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) {
                    (!this.endOfDay) ? this.currentDate.startOf("day") : this.currentDate.endOf("day");
                }
                this._fixCurrentDate();
                if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                    this.doubleBufferDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
                }
                if (!this.pickerOnlyMode || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                    this.updateModel(this.currentDate.toDate());
                }
                this.onDateSelection.emit({
                    $picker: this,
                    $date: this.currentDate.toDate()
                });
                /*in case of a date mode we are done*/
                if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE && !this.pickerOnlyMode) {
                    this.close(event);
                }
            }
        };
        /**
         * select a date from the outside
         * @param selectedDate
         * @private
         */
        DatePicker.prototype.selectMonth = function (selectedDate, event) {
            this.stopEventPropagation(event);
            if (!selectedDate.invalid) {
                if (!this._ngModel) {
                    this.currentDate = moment.tz(new Date(), this.getTimezone());
                    this.currentDate.set("month", selectedDate.momentDate.get("month"));
                }
                else {
                    //we also have to update our currently selected date
                    this.currentDate.set("month", selectedDate.momentDate.get("month"));
                    this.currentDate.set("year", selectedDate.momentDate.get("year"));
                }
                this._fixCurrentDate();
                /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                 this._selectDate(new PickerDate(false, this.currentDate, 1, true));
                 }*/
                this.onMonthSelection.emit({
                    $picker: this,
                    $date: this.currentDate.toDate()
                });
                this.goBackInView(event);
            }
        };
        ;
        /**
         * select a date from the outside
         * @param selectedDate
         * @private
         */
        DatePicker.prototype.selectYear = function (selectedDate, event) {
            this.stopEventPropagation(event);
            if (!selectedDate.invalid) {
                if (!this._ngModel) {
                    this.currentDate = moment.tz(new Date(), this.getTimezone());
                    this.currentDate.set("year", selectedDate.momentDate.get("year"));
                }
                else {
                    var value = moment.tz(this._ngModel, this.getTimezone());
                    this.currentDate.set("year", selectedDate.momentDate.get("year"));
                }
                this._fixCurrentDate();
                /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                 this._selectDate(new PickerDate(false, this.currentDate, 1, true));
                 }*/
                this.onYearSelection.emit({
                    $picker: this,
                    $date: this.currentDate.toDate()
                });
                this.goBackInView(event);
            }
        };
        ;
        DatePicker.prototype.stopEventPropagation = function (event) {
            if (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        };
        /**
         * updates the picker views from the currentDate
         * the currentDate is a positional placeholder for the pickers
         * it is used to store also temporary selections until
         * they are traversed into the model via pickDate
         *
         * @private
         */
        DatePicker.prototype.updatePickerData = function () {
            this.monthPickerData = ViewModelBuilder_1.ViewModelBuilder.calculateDateView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
            this.yearPickerData = ViewModelBuilder_1.ViewModelBuilder.calculateMonthView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
            this.decadePickerData = ViewModelBuilder_1.ViewModelBuilder.calculateYearView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
            var offset = this.currentDate.get("year") % 20 - 1;
            this.decadeFrom = moment.tz(this.currentDate.toDate(), this.getTimezone()).subtract(offset, "year").format("YYYY");
            var offset = this.currentDate.get("year") % 20 - 1;
            var nextDecadeOffset = 20 - offset - 1;
            this.decadeTo = moment.tz(this.currentDate.toDate(), this.getTimezone()).add(nextDecadeOffset, "year").format("YYYY");
        };
        ;
        /**
         * opens the date picker
         *
         * @private
         */
        DatePicker.prototype.openPicker = function (event) {
            var _this = this;
            this.stopEventPropagation(event);
            var timezone = this.timezone || moment.tz.guess();
            this.currentDate = (this._ngModel) ? moment.tz(this._ngModel, timezone) : moment.tz(new Date(), timezone);
            this.updatePickerData();
            //this.pickerVisible = true;
            BehavioralFixes_1.BehavioralFixes.openDropDown(this.elementRef.nativeElement, this);
            if (!this.documentClickHandler) {
                setTimeout(function () {
                    BehavioralFixes_1.BehavioralFixes.registerDocumentBindings(_this.elementRef.nativeElement, _this);
                }, 100);
            }
        };
        ;
        /**
         * goes the the previous month
         * @private
         */
        DatePicker.prototype.prevMonth = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = this.currentDate.subtract(1, "month");
            this.updatePickerData();
        };
        ;
        /**
         * goes to the next month
         * @private
         */
        DatePicker.prototype.nextMonth = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = this.currentDate.add(1, "month");
            this.updatePickerData();
        };
        ;
        /**
         * goes to the previous year
         * @private
         */
        DatePicker.prototype.prevYear = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = this.currentDate.subtract(1, "year");
            this.updatePickerData();
        };
        ;
        /**
         * goes to the next year
         * @private
         */
        DatePicker.prototype.nextYear = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = this.currentDate.add(1, "year");
            this.updatePickerData();
        };
        ;
        /**
         * goes to the previous year
         * @private
         */
        DatePicker.prototype.prevDecade = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = this.currentDate.subtract(20, "year");
            this.updatePickerData();
        };
        ;
        /**
         * goes to the next year
         * @private
         */
        DatePicker.prototype.nextDecade = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = this.currentDate.add(20, "year");
            this.updatePickerData();
        };
        ;
        /**
         * clears the selection
         * @private
         */
        DatePicker.prototype.clear = function (event) {
            this.stopEventPropagation(event);
            this.innerSelection = "";
        };
        ;
        /**
         * jumps to today in the selection
         * @private
         */
        DatePicker.prototype.today = function (event) {
            this.stopEventPropagation(event);
            this.currentDate = moment.tz(new Date(), this.getTimezone());
            if (this.pickerMode == PickerConstants.DEFAULT_PICKER_MODE) {
                this.currentDate.startOf("day");
            }
            this._fixCurrentDate();
            this.updateModel(this.currentDate.toDate());
            this.close(event);
        };
        ;
        /**
         * closes the data picker
         * @private
         */
        DatePicker.prototype.close = function (event) {
            this.stopEventPropagation(event);
            this.view = PickerConstants.DEFAULT_PICKER_MODE;
            this.viewStack = [];
            this.pickerVisible = false;
            BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(this.elementRef.nativeElement, this);
            BehavioralFixes_1.BehavioralFixes.closeDropDown(this.elementRef.nativeElement, this);
            this.elementRef.nativeElement.querySelectorAll("input[type=text]")[0].focus();
        };
        ;
        /**
         * set for double buffered mode
         *
         * @private
         */
        DatePicker.prototype.set = function (event) {
            this.stopEventPropagation(event);
            if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                this.currentDate = moment.tz(this.doubleBufferDate.toDate(), this.getTimezone());
            }
            this.updateModel(this.currentDate.toDate());
        };
        ;
        /**
         * switches to the month view
         * @private
         */
        DatePicker.prototype.switchToMonthView = function (event) {
            this.stopEventPropagation(event);
            this.viewStack.unshift(this.view);
            this.view = PickerConstants.PICKER_VIEW_MONTH;
            BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.elementRef.nativeElement);
        };
        ;
        /**
         * switches to the year view
         * @private
         */
        DatePicker.prototype.switchToYearView = function (event) {
            this.stopEventPropagation(event);
            this.viewStack.unshift(this.view);
            this.view = PickerConstants.PICKER_VIEW_YEAR;
            BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.elementRef.nativeElement);
        };
        ;
        /**
         * switches to the time view
         * @private
         */
        DatePicker.prototype.switchToTimeView = function (event) {
            this.stopEventPropagation(event);
            this.viewStack.unshift(this.view);
            this.view = PickerConstants.PICKER_VIEW_TIME;
            BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.elementRef.nativeElement);
        };
        ;
        /**
         * goes back one view
         * @private
         */
        DatePicker.prototype.goBackInView = function (event) {
            this.stopEventPropagation(event);
            this.updatePickerData();
            this.view = this.viewStack.shift();
            BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.elementRef.nativeElement);
        };
        ;
        DatePicker.prototype.validate = function (c) {
            if (!this.validDate(this.innerSelection)) {
                return {
                    validDate: {
                        valid: false,
                    }
                };
            }
            else if (!this.validateDateRange(this.parseDate(this.innerSelection))) {
                return {
                    dateRange: {
                        valid: false,
                    }
                };
            }
        };
        DatePicker.prototype.ngOnDestroy = function () {
            BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(this.elementRef.nativeElement, this);
        };
        DatePicker.prototype.validDate = function (viewValue) {
            if (!viewValue) {
                return true;
            }
            return moment.tz(viewValue, this.getDateFormat(), this.getTimezone()).isValid();
        };
        DatePicker.prototype.validateDateRange = function (data) {
            if (data == null) {
                return true; //empty value allowed
            }
            var timezone = this.timezone || moment.tz.guess();
            var newValue = moment.tz(data, timezone);
            var momentStartDate = (this.startDate) ? moment.tz(this.startDate, timezone).startOf("day") : null;
            var momentEndDate = (this.endDate) ? moment.tz(this.endDate, timezone).endOf("day") : null;
            var isInvalid = false;
            if (momentStartDate) {
                isInvalid = isInvalid || newValue.isBefore(momentStartDate);
            }
            if (!isInvalid && momentEndDate) {
                isInvalid = isInvalid || newValue.isAfter(momentEndDate);
            }
            return !isInvalid;
        };
        ;
        /*
         * registers the internal parsers, validators and formatters
         * into the ngModel for the date string conversion
         */
        DatePicker.prototype.parseDate = function (data) {
            if (data == "") {
                return null;
            }
            var parsedData = (this.endOfDay) ? moment.tz(data, this.getDateFormat(), this.getTimezone()).endOf("day").toDate() : moment.tz(data, this.getDateFormat(), this.getTimezone()).toDate();
            var startDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
            var endDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
            if (startDate && moment.tz(parsedData, this.getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
                return this.startDate;
            }
            if (endDate && moment.tz(parsedData, this.getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
                return this.endDate;
            }
            return parsedData;
        };
        ;
        /**
         * formats after the given timezone and date format
         * (if no timezone is used then the default one is used and the date format is
         * DD.MM.YYYY
         */
        DatePicker.prototype.formatDate = function (data) {
            if (data == null) {
                return "";
            }
            var timezone = this.timezone || moment.tz.guess();
            return moment.tz(data, timezone).format(this.getDateFormat());
        };
        DatePicker.prototype.writeValue = function (obj) {
            this._ngModel = obj;
            if (obj) {
                this.innerSelection = this.formatDate(obj);
            }
            else {
                this.innerSelection = "";
            }
        };
        DatePicker.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        DatePicker.prototype.registerOnTouched = function (fn) {
            // throw new Error('Method not implemented.');
        };
        DatePicker.prototype.setDisabledState = function (isDisabled) {
            // throw new Error('Method not implemented.');
        };
        DatePicker.prototype.onChange = function (event) {
            try {
                //we double validate if it fails, we propagate the last valid value upwards
                if (!this.validate(null)) {
                    this._ngModel = this.parseDate(event.target.value);
                }
                this.propagateChange(this._ngModel);
            }
            catch (e) {
            }
        };
        return DatePicker;
    }());
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], DatePicker.prototype, "startDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], DatePicker.prototype, "endDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "dateFormat", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "buttonLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatePicker.prototype, "endOfDay", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "buttonStyleClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "pickerOnlyMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "view", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "pickerMode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatePicker.prototype, "timezone", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatePicker.prototype, "appendToBody", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatePicker.prototype, "onYearSelection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatePicker.prototype, "onMonthSelection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DatePicker.prototype, "onDateSelection", void 0);
    DatePicker = DatePicker_1 = __decorate([
        core_1.Component({
            selector: "date-picker",
            template: template(),
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return DatePicker_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return DatePicker_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DatePicker);
    exports.DatePicker = DatePicker;
    var DatePicker_1;
});
define("typescript_ng2/helperComponents/RangeInput", ["require", "exports", "@angular/core", "@angular/forms"], function (require, exports, core_2, forms_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RangeInput = RangeInput_1 = (function () {
        function RangeInput(elementRef) {
            this.elementRef = elementRef;
        }
        RangeInput.prototype.ngOnChanges = function (changes) {
            if (changes.ngModel) {
                this.inputText = changes.ngModel.currentValue.toString();
            }
        };
        RangeInput.prototype.ngOnInit = function () {
        };
        RangeInput.prototype.validate = function (c) {
            var val = parseInt(this.inputText);
            if (isNaN(val)) {
                return {
                    validNumber: {
                        valid: false,
                    }
                };
            }
            else if (('undefined' != typeof this.from && this.from > val) ||
                ('undefined' != typeof this.to && this.to < val)) {
                return {
                    outOfRange: {
                        valid: false,
                    }
                };
            }
        };
        RangeInput.prototype.changedExtraHandler = function (data) {
            if (!this.validate(null)) {
                this._ngModel = parseInt(data);
            }
            this.onChangeHandler(this._ngModel);
        };
        RangeInput.prototype.keyDown = function (event) {
            var keyCode = event.keyCode;
            if (keyCode > 57) {
                event.preventDefault();
                return false;
            }
            if (keyCode >= 48 && keyCode <= 57) {
                var finalValue = parseInt(event.target.value + String.fromCharCode(keyCode));
                if (('undefined' != typeof this.from && this.from > finalValue) ||
                    ('undefined' != typeof this.to && this.to < finalValue)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            }
        };
        RangeInput.prototype.writeValue = function (obj) {
            if ("undefined" != typeof obj && null != obj) {
                this._ngModel = obj;
                this.inputText = this._ngModel.toString();
            }
        };
        RangeInput.prototype.registerOnChange = function (fn) {
            this.onChangeHandler = fn;
        };
        RangeInput.prototype.registerOnTouched = function (fn) {
        };
        return RangeInput;
    }());
    __decorate([
        core_2.Input(),
        __metadata("design:type", Number)
    ], RangeInput.prototype, "from", void 0);
    __decorate([
        core_2.Input(),
        __metadata("design:type", Number)
    ], RangeInput.prototype, "to", void 0);
    RangeInput = RangeInput_1 = __decorate([
        core_2.Component({
            selector: "internal-range-input",
            template: "<input type=\"text\" [(ngModel)]=\"inputText\" (ngModelChange)=\"changedExtraHandler($event)\"\n                      (keydown)=\"keyDown($event)\">",
            providers: [
                {
                    provide: forms_2.NG_VALUE_ACCESSOR,
                    useExisting: core_2.forwardRef(function () { return RangeInput_1; }),
                    multi: true,
                },
                {
                    provide: forms_2.NG_VALIDATORS,
                    useExisting: core_2.forwardRef(function () { return RangeInput_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [core_2.ElementRef])
    ], RangeInput);
    exports.RangeInput = RangeInput;
    var RangeInput_1;
});
define("typescript_ng2/datePicker/transcludeDirectives/AdditionalContentDate", ["require", "exports", "@angular/core"], function (require, exports, core_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalContentDate = (function () {
        function AdditionalContentDate() {
        }
        return AdditionalContentDate;
    }());
    AdditionalContentDate = __decorate([
        core_3.Directive({ selector: 'additional-content-date' })
    ], AdditionalContentDate);
    exports.AdditionalContentDate = AdditionalContentDate;
});
define("typescript_ng2/datePicker/transcludeDirectives/AdditionalButtonsDate", ["require", "exports", "@angular/core"], function (require, exports, core_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalButtonsDate = (function () {
        function AdditionalButtonsDate() {
        }
        return AdditionalButtonsDate;
    }());
    AdditionalButtonsDate = __decorate([
        core_4.Directive({ selector: 'additional-buttons-date' })
    ], AdditionalButtonsDate);
    exports.AdditionalButtonsDate = AdditionalButtonsDate;
});
define("typescript_ng2/datePicker/transcludeDirectives/AdditionalContentYear", ["require", "exports", "@angular/core"], function (require, exports, core_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalContentYear = (function () {
        function AdditionalContentYear() {
        }
        return AdditionalContentYear;
    }());
    AdditionalContentYear = __decorate([
        core_5.Directive({ selector: 'additional-content-year' })
    ], AdditionalContentYear);
    exports.AdditionalContentYear = AdditionalContentYear;
});
define("typescript_ng2/datePicker/transcludeDirectives/AdditionalContentMonth", ["require", "exports", "@angular/core"], function (require, exports, core_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalContentMonth = (function () {
        function AdditionalContentMonth() {
        }
        return AdditionalContentMonth;
    }());
    AdditionalContentMonth = __decorate([
        core_6.Directive({ selector: 'additional-content-month' })
    ], AdditionalContentMonth);
    exports.AdditionalContentMonth = AdditionalContentMonth;
});
define("typescript_ng2/datePicker/transcludeDirectives/AdditionalButtonsMonth", ["require", "exports", "@angular/core"], function (require, exports, core_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalButtonsMonth = (function () {
        function AdditionalButtonsMonth() {
        }
        return AdditionalButtonsMonth;
    }());
    AdditionalButtonsMonth = __decorate([
        core_7.Directive({ selector: 'additional-buttons-month' })
    ], AdditionalButtonsMonth);
    exports.AdditionalButtonsMonth = AdditionalButtonsMonth;
});
define("typescript_ng2/datePicker/transcludeDirectives/AdditionalButtonsYear", ["require", "exports", "@angular/core"], function (require, exports, core_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdditionalButtonsYear = (function () {
        function AdditionalButtonsYear() {
        }
        return AdditionalButtonsYear;
    }());
    AdditionalButtonsYear = __decorate([
        core_8.Directive({ selector: 'additional-buttons-year' })
    ], AdditionalButtonsYear);
    exports.AdditionalButtonsYear = AdditionalButtonsYear;
});
define("typescript_ng2/eventPicker/EventPicker", ["require", "exports", "@angular/core", "@angular/forms", "typescript/utils/DatePickerTypes", "typescript/utils/DateUtils", "typescript/utils/ViewModelBuilder"], function (require, exports, core_9, forms_3, DatePickerTypes_3, DateUtils_2, ViewModelBuilder_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EventPicker = EventPicker_1 = (function () {
        function EventPicker() {
            this.eventSelected = new core_9.EventEmitter(false);
            this.onChangeEmitter = function () {
            };
            this.rangeModelIdx = {};
        }
        EventPicker.prototype.ngOnChanges = function (changes) {
            if (changes.startDate) {
                if (!changes.startDate.currentValue) {
                    this.startDate = moment.tz(DateUtils_2.DateUtils.getTimezone(this.timezone)).startOf("day").toDate();
                    this.updateRange(this.events);
                }
                else {
                    this.startDate = changes.startDate.currentValue;
                    this.updateRange(this.events);
                }
            }
            if (changes.endDate) {
                if (!changes.endDate.currentValue) {
                    this.endDate = moment.tz(DateUtils_2.DateUtils.getTimezone(this.timezone)).endOf("day").toDate();
                    this.updateRange(this.events);
                }
                else {
                    this.endDate = changes.endDate.currentValue;
                    this.updateRange(this.events);
                }
            }
            if (changes.events) {
                this.updateRange(changes.events.currentValue);
                this.rangeModelIdx = ViewModelBuilder_2.ViewModelBuilder.buildModelIdx(changes.events.currentValue, DateUtils_2.DateUtils.getTimezone(this.timezone));
            }
        };
        EventPicker.prototype.ngOnInit = function () {
            this.updateRange(this.events);
        };
        EventPicker.prototype.eventPresent = function (moment) {
            if (this.events) {
                return this.rangeModelIdx[moment.format("DD.MM.YYYY")];
            }
            return null;
        };
        EventPicker.prototype.isActive = function (currentMoment) {
            var startMoment = moment.tz(this.startDate, this.timezone);
            var endMoment = moment.tz(this.endDate, this.timezone);
            return currentMoment && currentMoment.isBetween(startMoment.subtract(1, "day"), endMoment.add(1, "day"), "day");
        };
        EventPicker.prototype.isSelectedDate = function (selectedDate) {
            if (!this._ngModel) {
                return false;
            }
            return DateUtils_2.DateUtils.isSameDay(this._ngModel, selectedDate.momentDate);
        };
        EventPicker.prototype.selectDate = function (selectDate) {
            if (!selectDate.event) {
                return;
            }
            this._ngModel = selectDate.momentDate;
            this.eventSelected.emit({ $event: selectDate.event });
            this.updateRange(this.events);
            this.onChangeEmitter(this._ngModel.toDate());
        };
        /**
         * checks if the current picker date is today
         * @param selectedDate
         * @returns {boolean}
         * @private
         */
        EventPicker.prototype.isToday = function (selectedDate) {
            return DateUtils_2.DateUtils.isToday(this.timezone, selectedDate.momentDate);
        };
        ;
        //implemented interfaces
        EventPicker.prototype.writeValue = function (obj) {
            if (obj) {
                this._ngModel = moment.tz(obj, this.timezone).startOf("day");
            }
            else {
                this._ngModel = null;
            }
        };
        EventPicker.prototype.registerOnChange = function (fn) {
            this.onChangeEmitter = fn;
        };
        EventPicker.prototype.registerOnTouched = function (fn) {
        };
        EventPicker.prototype.setDisabledState = function (isDisabled) {
        };
        EventPicker.prototype.validate = function (c) {
            return undefined;
        };
        EventPicker.prototype.registerOnValidatorChange = function (fn) {
        };
        EventPicker.prototype.updateRange = function (rangeModel) {
            this.pickerPage = ViewModelBuilder_2.ViewModelBuilder.calculateEventDateView(rangeModel, this.startDate, this.endDate, DateUtils_2.DateUtils.getTimezone(this.timezone));
        };
        return EventPicker;
    }());
    __decorate([
        core_9.Input(),
        __metadata("design:type", String)
    ], EventPicker.prototype, "timezone", void 0);
    __decorate([
        core_9.Input(),
        __metadata("design:type", Date)
    ], EventPicker.prototype, "startDate", void 0);
    __decorate([
        core_9.Input(),
        __metadata("design:type", Date)
    ], EventPicker.prototype, "endDate", void 0);
    __decorate([
        core_9.Input(),
        __metadata("design:type", DatePickerTypes_3.EventModel)
    ], EventPicker.prototype, "events", void 0);
    __decorate([
        core_9.Output(),
        __metadata("design:type", core_9.EventEmitter)
    ], EventPicker.prototype, "eventSelected", void 0);
    EventPicker = EventPicker_1 = __decorate([
        core_9.Component({
            selector: "event-picker",
            template: "\n            <div class=\"event-picker\">\n                <table *ngFor=\"let datePickerPage of pickerPage.months\">\n                    <thead>\n                    <tr>\n                        <td class=\"calendarMonth no-link\" colspan=\"8\"> {{datePickerPage.month}}\n                            {{datePickerPage.year}}\n                        </td>\n                    </tr>\n                    <tr>\n                        <td class=\"calendarWeek\"><!-- week of year --></td>\n                        <td class=\"dayOfWeek\" *ngFor=\"let dayOfWeek of datePickerPage.dayOfWeek\"\n                            (click)=\"selectDate(dayOfWeek)\">{{dayOfWeek}}\n                        </td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr *ngFor=\"let week of datePickerPage.weeks\">\n                        <td class=\"calendarWeek\">{{week.calendarWeek}}</td>\n                        <td class=\"day {{ day.event && day.event.importance ? day.event.importance : ''}}\" *ngFor=\"let day of week.days\"\n                            [ngClass]=\"{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : isSelectedDate(day), 'today': isToday(day), 'noevent': !day.event , 'event': day.event }\"\n                            (click)=\"selectDate(day)\">{{day.day}}\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        ",
            providers: [
                {
                    provide: forms_3.NG_VALUE_ACCESSOR,
                    useExisting: core_9.forwardRef(function () { return EventPicker_1; }),
                    multi: true,
                },
                {
                    provide: forms_3.NG_VALIDATORS,
                    useExisting: core_9.forwardRef(function () { return EventPicker_1; }),
                    multi: true,
                }
            ]
        })
    ], EventPicker);
    exports.EventPicker = EventPicker;
    var EventPicker_1;
});
define("@werpu/picker", ["require", "exports", "@angular/core", "typescript_ng2/datePicker/DatePicker", "typescript_ng2/helperComponents/RangeInput", "@angular/forms", "@angular/common", "typescript_ng2/datePicker/transcludeDirectives/AdditionalContentDate", "typescript_ng2/datePicker/transcludeDirectives/AdditionalButtonsDate", "typescript_ng2/datePicker/transcludeDirectives/AdditionalContentYear", "typescript_ng2/datePicker/transcludeDirectives/AdditionalContentMonth", "typescript_ng2/datePicker/transcludeDirectives/AdditionalButtonsMonth", "typescript_ng2/datePicker/transcludeDirectives/AdditionalButtonsYear", "@angular/http", "typescript_ng2/eventPicker/EventPicker"], function (require, exports, core_10, DatePicker_2, RangeInput_2, forms_4, common_1, AdditionalContentDate_1, AdditionalButtonsDate_1, AdditionalContentYear_1, AdditionalContentMonth_1, AdditionalButtonsMonth_1, AdditionalButtonsYear_1, http_1, EventPicker_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DatePickerModule = (function () {
        function DatePickerModule() {
        }
        return DatePickerModule;
    }());
    DatePickerModule = __decorate([
        core_10.NgModule({
            id: "picker",
            imports: [forms_4.FormsModule, forms_4.ReactiveFormsModule, http_1.HttpModule, common_1.CommonModule],
            declarations: [
                DatePicker_2.DatePicker,
                EventPicker_2.EventPicker,
                RangeInput_2.RangeInput,
                AdditionalButtonsDate_1.AdditionalButtonsDate,
                AdditionalButtonsMonth_1.AdditionalButtonsMonth,
                AdditionalButtonsYear_1.AdditionalButtonsYear,
                AdditionalContentDate_1.AdditionalContentDate,
                AdditionalContentMonth_1.AdditionalContentMonth,
                AdditionalContentYear_1.AdditionalContentYear
            ],
            exports: [
                DatePicker_2.DatePicker,
                EventPicker_2.EventPicker,
                AdditionalButtonsDate_1.AdditionalButtonsDate,
                AdditionalButtonsMonth_1.AdditionalButtonsMonth,
                AdditionalButtonsYear_1.AdditionalButtonsYear,
                AdditionalContentDate_1.AdditionalContentDate,
                AdditionalContentMonth_1.AdditionalContentMonth,
                AdditionalContentYear_1.AdditionalContentYear
            ]
        })
    ], DatePickerModule);
    exports.DatePickerModule = DatePickerModule;
});
//# sourceMappingURL=DatepickerFinal-amd.js.map