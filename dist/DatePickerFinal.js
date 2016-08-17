(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
"use strict";
/**
 * Some bootstrtrap behavioral fixes
 */
var BehavioralFixes = (function () {
    function BehavioralFixes() {
    }
    /**
     * we register some keyboard events
     * to override the default behavior
     *
     * @param $element
     */
    BehavioralFixes.registerKeyBindings = function ($element) {
        $element.on("keydown", function (event, controller) {
            /*
             * enter should trigger a form submit
             */
            if (event.keyCode == 13 /*enter*/) {
                event.preventDefault();
                $element.parents("form").find("input[type=submit]").click();
                return false;
            }
            /*
             * arrow down should open the date picker
             */
            if (event.keyCode == 40 /*arrow down*/) {
                $element.find(".picker-open").click();
                return false;
            }
            /*
             * escape should close it
             */
            if (event.keyCode == 27 /*escape*/) {
                $element.find(".picker-close").click();
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
    BehavioralFixes.registerDocumentBindings = function ($element, controller) {
        if (!controller.documentClickHandler) {
            var clickHandler = function () {
                //if event target not child of element we close
                var target = event.target;
                var isChild = false;
                $element.find(".picker-popup, .picker-popup *").each(function (cnt, element) {
                    isChild = isChild || element == target;
                    if (isChild) {
                        return false;
                    }
                });
                if (!isChild) {
                    BehavioralFixes.unregisterDocumentBindings(controller);
                    $element.find(".picker-close").click();
                }
            };
            angular.element(document).bind("click", clickHandler);
            controller.documentClickHandler = clickHandler;
        }
    };
    /**
     * we also have to unregister global events
     *
     * @param clickHandler
     * @param controller
     */
    BehavioralFixes.unregisterDocumentBindings = function (controller) {
        if (controller.documentClickHandler) {
            angular.element(document).unbind("click", controller.documentClickHandler);
            controller.documentClickHandler = null;
        }
    };
    return BehavioralFixes;
}());
exports.BehavioralFixes = BehavioralFixes;

},{}],2:[function(require,module,exports){
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
"use strict";
var BehavioralFixes_1 = require("./BehavioralFixes");
var ViewModelBuilder_1 = require("./ViewModelBuilder");
var DatePicker = (function () {
    function DatePicker() {
        this.template = function () {
            return "\n           <div class=\"input-group\">\n               <input type=\"text\" placeholder=\"{{ctrl.placeholder}}\" class=\"form-control\" name=\"{{ctrl.name}}\" ng-model=\"ctrl.innerSelection\"></input>\n               <span class=\"input-group-btn\">\n                   <button class=\"picker-open btn btn-default\" ng-click=\"ctrl._openPicker()\">\n                         <span class=\"glyphicon glyphicon-align-right glyph-icon glyphicon-calendar\"> {{ctrl.buttonLabel}} </span>\n                   </button>\n               </span> \n           </div>\n           <input type=\"button\" class=\"picker-close\" ng-click=\"ctrl._close()\" value=\"Close\" ng-show=\"false\"/>\n           <!-- date view - default view -->\n           <div class=\"picker-popup date-picker\" ng-show=\"ctrl.pickerVisible && ctrl.view == 'DATE'\">                \n                <table>\n                    <thead>\n                        <!-- TODO year forward and backward -->\n                       \n                        <tr>\n                            <td><a class=\"prev glyphicon glyphicon-menu-left\" ng-click=\"ctrl._prevMonth()\"></a><td colspan=\"2\" ng-click=\"ctrl._switchToMonthView()\">{{ctrl._currentDate.format(\"MMMM\")}}</td><td><a class=\"next glyphicon glyphicon-menu-right\" ng-click=\"ctrl._nextMonth()\"></a></td>\n                            <td><a class=\"prev glyphicon glyphicon-menu-left\" ng-click=\"ctrl._prevYear()\"></a></td><td colspan=\"2\" ng-click=\"ctrl._switchToYearView()\">{{ctrl.monthPickerData.year}}</td><td><a class=\"next glyphicon glyphicon-menu-right\" ng-click=\"ctrl._nextYear()\"></a></td>\n                        </tr>\n                        <tr>\n                            <td class=\"calendarWeek\"><!-- week of year --></td>\n                            <td class=\"dayOfWeek\" ng-repeat=\"dayOfWeek in ctrl.monthPickerData.dayOfWeek\" ng-click=\"ctrl._selectDate(dayOfWeek)\">{{::dayOfWeek}}</td>    \n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat=\"week in ctrl.monthPickerData.weeks\">\n                            <td class=\"calendarWeek\">{{::week.calendarWeek}}</td>\n                            <td class=\"day\" ng-repeat=\"day in week.days\" ng-class=\"{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl._isSelectedDate(day), 'today': ctrl._isToday(day)}\" ng-click=\"ctrl._selectDate(day)\">{{::day.day}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n                <input type=\"button\" class=\"clear btn btn-default btn-sm\" ng-click=\"ctrl._clear()\" value=\"Clear\" />\n                <input type=\"button\" class=\"today btn btn-default btn-sm\" ng-click=\"ctrl._today()\" value=\"Today\" />\n                <input type=\"button\" class=\"picker-close btn btn-default btn-sm\" ng-click=\"ctrl._close()\" value=\"Close\" />\n           </div>\n           \n           <!-- month view -->\n            <div class=\"picker-popup month-picker\" ng-show=\"ctrl.pickerVisible && ctrl.view == 'MONTH'\">\n                 <table>\n                    <thead>\n                          <tr>\n                          <td><a class=\"prev glyphicon glyphicon-menu-left\" ng-click=\"ctrl._prevYear()\" class=\"glyphicon glyphicon-menu-left\"></a></td>\n                          <td ng-click=\"ctrl._switchToYearView()\">{{ctrl.monthPickerData.year}}</td>\n                          <td><a class=\"next glyphicon glyphicon-menu-right\" ng-click=\"ctrl._nextYear()\"></a></td>\n                          </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat=\"monthRow in ctrl.yearPickerData.row\">\n                            <td ng-repeat=\"month in monthRow\" ng-class=\"{'invalid': month.invalid, 'selected' : ctrl._isSameMonth(month), 'today': ctrl._isSameMonth(month)}\"\n                            ng-click=\"ctrl._selectMonth(month)\"\n                            >{{::month.month}}</td>\n                        </tr>\n                    </tbody>\n                 </table>   \n            \n            \n                <input type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"ctrl._goBackInView()\" value=\"Back\" />\n            </div>    \n                 \n            <!-- year view -->  \n            <div class=\"picker-popup year-picker\" ng-show=\"ctrl.pickerVisible && ctrl.view == 'YEAR'\">\n                  <table>\n                    <thead>\n                    <tr>\n                        <td><a ng-click=\"ctrl._prevDecade()\" class=\"glyphicon glyphicon-menu-left\"></a></td>\n                        <td colspan=\"3\">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>\n                        <td><a ng-click=\"ctrl._nextDecade()\" class=\"glyphicon glyphicon-menu-right\"></a></td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat=\"yearrow in ctrl.decadePickerData.row\">\n                            <td ng-repeat=\"year in yearrow\"\n                            ng-class=\"{'invalid': year.invalid, 'selected' : ctrl._isSameYear(year), 'today': ctrl._isSameYear(year)}\"\n                             ng-click=\"ctrl._selectYear(year)\"\n                            >{{::year.year}}</td></td>\n                        </tr>\n                  </table>\n                <input type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"ctrl._goBackInView()\" value=\"Back\" />\n            </div>      \n                 \n        ";
        };
        this.controllerAs = "ctrl";
        this.bindings = {
            name: "@",
            timezone: "@",
            startDate: "<",
            endDate: "<",
            dateFormat: "@",
            placeholder: "@",
            buttonLabel: "@"
        };
        this.require = {
            "ngModel": 'ngModel',
        };
        this.controller = ["$scope", "$element", "$timeout",
            function ($scope, $element, $timeout) {
                var _this = this;
                this.buttonLabel = ("undefined" == typeof this.buttonLabel || null == this.buttonLabel) ? "Date" : this.buttonLabel;
                this.visibleDays = [];
                this.view = "DATE";
                this.viewStack = [];
                /**
                 * fetches the current or default timezone
                 * @returns {string}
                 * @private
                 */
                var _getTimezone = function () {
                    return _this.timezone || moment.tz.guess();
                };
                var _getDateFormat = function () {
                    return _this.dateFormat || "DD.MM.YYYY";
                };
                /**
                 * formats a date by using the controls appended parsers
                 * this has to be done this way because somone could decorate
                 * the control from outside
                 *
                 * @param value
                 * @private
                 */
                var _format = function (value) {
                    var innerSelection = value;
                    for (var cnt = 0; _this.ngModel.$formatters && cnt < _this.ngModel.$formatters.length; cnt++) {
                        innerSelection = _this.ngModel.$formatters[cnt](innerSelection);
                    }
                    _this.innerSelection = innerSelection;
                };
                /**
                 * checks if the current picker date is the selected one
                 * @param selectedDate
                 * @returns {boolean}
                 * @private
                 */
                this._isSelectedDate = function (selectedDate) {
                    if (!_this.ngModel.$modelValue) {
                        return false;
                    }
                    else {
                        var modelDate = moment.tz(_this.ngModel.$modelValue, _getTimezone());
                        return modelDate.isSame(selectedDate.momentDate, "date") &&
                            modelDate.isSame(selectedDate.momentDate, "month") &&
                            modelDate.isSame(selectedDate.momentDate, "year");
                    }
                };
                /**
                 * checks if the current picker date is today
                 * @param selectedDate
                 * @returns {boolean}
                 * @private
                 */
                this._isToday = function (selectedDate) {
                    var modelDate = moment.tz(new Date(), _getTimezone());
                    return modelDate.isSame(selectedDate.momentDate, "date") &&
                        modelDate.isSame(selectedDate.momentDate, "month") &&
                        modelDate.isSame(selectedDate.momentDate, "year");
                };
                this._isTodayMonth = function (selectedDate) {
                    var modelDate = moment.tz(new Date(), _getTimezone());
                    return modelDate.isSame(selectedDate.momentDate, "month") &&
                        modelDate.isSame(selectedDate.momentDate, "year");
                };
                this._isSameMonth = function (selectedMonth) {
                    var modelDate = moment.tz(new Date(), _getTimezone());
                    return modelDate.isSame(selectedMonth.momentDate, "month") &&
                        modelDate.isSame(selectedMonth.momentDate, "year");
                };
                this._isTodayYear = function (selectedDate) {
                    var modelDate = moment.tz(new Date(), _getTimezone());
                    return modelDate.isSame(selectedDate.momentDate, "year");
                };
                this._isSameYear = function (selectedMonth) {
                    var modelDate = moment.tz(new Date(), _getTimezone());
                    return modelDate.isSame(selectedMonth.momentDate, "year");
                };
                /**
                 * select a date from the outside
                 * @param selectedDate
                 * @private
                 */
                this._selectDate = function (selectedDate) {
                    if (!selectedDate.invalid) {
                        _format(selectedDate.momentDate.toDate());
                        _this._close();
                    }
                };
                /**
                 * select a date from the outside
                 * @param selectedDate
                 * @private
                 */
                this._selectMonth = function (selectedDate) {
                    if (!selectedDate.invalid) {
                        if (!_this.ngModel.$modelValue) {
                            _this._currentDate = selectedDate;
                        }
                        else {
                            //we also have to update our currently selected date
                            _this._currentDate.set("month", selectedDate.momentDate.get("month"));
                            _this._currentDate.set("year", selectedDate.momentDate.get("year"));
                        }
                        _this._goBackInView();
                    }
                };
                /**
                 * select a date from the outside
                 * @param selectedDate
                 * @private
                 */
                this._selectYear = function (selectedDate) {
                    if (!selectedDate.invalid) {
                        if (!_this.ngModel.$modelValue) {
                            _format(selectedDate.momentDate.toDate());
                        }
                        else {
                            var value = moment.tz(_this.ngModel.$modelValue, _getTimezone());
                            value.set("year", selectedDate.momentDate.get("year"));
                            _format(value.toDate());
                        }
                        _this._goBackInView();
                    }
                };
                this._updatePickerData = function () {
                    _this.monthPickerData = ViewModelBuilder_1.ViewModelBuilder.calculateDateView(_this._currentDate.toDate(), _this.startDate, _this.endDate, _getTimezone());
                    _this.yearPickerData = ViewModelBuilder_1.ViewModelBuilder.calculateMonthView(_this._currentDate.toDate(), _this.startDate, _this.endDate, _getTimezone());
                    _this.decadePickerData = ViewModelBuilder_1.ViewModelBuilder.calculateYearView(_this._currentDate.toDate(), _this.startDate, _this.endDate, _getTimezone());
                    var offset = _this._currentDate.get("year") % 20 - 1;
                    _this.decadeFrom = moment.tz(_this._currentDate.toDate(), _getTimezone()).subtract("year", offset).format("YYYY");
                    var offset = _this._currentDate.get("year") % 20 - 1;
                    var nextDecadeOffset = 20 - offset - 1;
                    _this.decadeTo = moment.tz(_this._currentDate.toDate(), _getTimezone()).add("year", nextDecadeOffset).format("YYYY");
                };
                /**
                 * opens the date picker
                 * @private
                 */
                this._openPicker = function () {
                    var timezone = _this.timezone || moment.tz.guess();
                    _this._currentDate = (_this.ngModel.$modelValue) ? moment.tz(_this.ngModel.$modelValue, timezone) : moment.tz(new Date(), timezone);
                    _this._updatePickerData();
                    _this.pickerVisible = true;
                    if (!_this.documentClickHandler) {
                        $timeout(function () {
                            BehavioralFixes_1.BehavioralFixes.registerDocumentBindings($element, _this);
                        });
                    }
                };
                /**
                 * goes the the previous month
                 * @private
                 */
                this._prevMonth = function () {
                    _this._currentDate = _this._currentDate.subtract(1, "month");
                    _this._updatePickerData();
                };
                /**
                 * goes to the next month
                 * @private
                 */
                this._nextMonth = function () {
                    _this._currentDate = _this._currentDate.add(1, "month");
                    _this._updatePickerData();
                };
                /**
                 * goes to the previous year
                 * @private
                 */
                this._prevYear = function () {
                    _this._currentDate = _this._currentDate.subtract(1, "year");
                    _this._updatePickerData();
                };
                /**
                 * goes to the next year
                 * @private
                 */
                this._nextYear = function () {
                    _this._currentDate = _this._currentDate.add(1, "year");
                    _this._updatePickerData();
                };
                /**
                 * goes to the previous year
                 * @private
                 */
                this._prevDecade = function () {
                    _this._currentDate = _this._currentDate.subtract(20, "year");
                    _this._updatePickerData();
                };
                /**
                 * goes to the next year
                 * @private
                 */
                this._nextDecade = function () {
                    _this._currentDate = _this._currentDate.add(20, "year");
                    _this._updatePickerData();
                };
                /**
                 * clears the selection
                 * @private
                 */
                this._clear = function () {
                    _this.innerSelection = "";
                };
                /**
                 * jumps to today in the selection
                 * @private
                 */
                this._today = function () {
                    _this.innerSelection = _this.ngModel.$formatters[0](new Date());
                    _this._close();
                };
                /**
                 * closes the data picker
                 * @private
                 */
                this._close = function () {
                    _this.view = "DATE";
                    _this.viewStack = [];
                    _this.pickerVisible = false;
                    BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(_this);
                };
                this._switchToMonthView = function () {
                    _this.viewStack.unshift(_this.view);
                    _this.view = "MONTH";
                };
                this._switchToYearView = function () {
                    _this.viewStack.unshift(_this.view);
                    _this.view = "YEAR";
                };
                this._goBackInView = function () {
                    _this._updatePickerData();
                    _this.view = _this.viewStack.shift();
                };
                //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                $scope.$watch('ctrl.innerSelection', function (newval, oldval) {
                    if (newval != oldval) {
                        _this.ngModel.$setViewValue(newval);
                    }
                });
                this.$postLink = function () {
                    /**
                     * we change the key handling a little bit
                     * an enter should trigger a form submit
                     * and a keydown should open the picker
                     */
                    BehavioralFixes_1.BehavioralFixes.registerKeyBindings($element);
                    //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                    _this.ngModel.$render = function () {
                        _this.innerSelection = _this.ngModel.$viewValue;
                    };
                    /*
                     * registers the internal parsers, validators and formatters
                     * into the ngModel for the date string conversion
                     */
                    _this.ngModel.$parsers.push(function (data) {
                        if (data == "") {
                            return null;
                        }
                        //TODO move this into the formatting loop
                        if (_this.startDate && data === moment.tz(_this.startDate, _getTimezone()).format(_getDateFormat())) {
                            return _this.startDate;
                        }
                        if (_this.endDate && data === moment.tz(_this.endDate, _getTimezone()).format(_getDateFormat())) {
                            return _this.endDate;
                        }
                        return moment.tz(data, _getDateFormat(), _getTimezone()).toDate();
                    });
                    /**
                     * checks if the input is valid
                     * @param data
                     * @param viewValue
                     * @returns {boolean}
                     */
                    _this.ngModel.$validators.validDate = function (data, viewValue) {
                        if (!viewValue) {
                            return true;
                        }
                        return moment.tz(viewValue, _getDateFormat(), _getTimezone()).isValid();
                    };
                    /**
                     * checks if it is within the allowed date range if there is one
                     * @param data
                     * @param viewValue
                     * @returns {boolean}
                     */
                    _this.ngModel.$validators.dateRange = function (data, viewValue) {
                        if (data == null) {
                            return true; //empty value allowed
                        }
                        var timezone = _this.timezone || moment.tz.guess();
                        var newValue = moment.tz(data, timezone);
                        var momentStartDate = (_this.startDate) ? moment.tz(_this.startDate, timezone).startOf("day") : null;
                        var momentEndDate = (_this.endDate) ? moment.tz(_this.endDate, timezone).endOf("day") : null;
                        var isInvalid = false;
                        if (momentStartDate) {
                            isInvalid = isInvalid || newValue.isBefore(momentStartDate);
                        }
                        if (!isInvalid && momentEndDate) {
                            isInvalid = isInvalid || newValue.isAfter(momentEndDate);
                        }
                        return !isInvalid;
                    };
                    /**
                     * formats after the given timezone and date format
                     * (if no timezone is used then the default one is used and the date format is
                     * DD.MM.YYYY
                     */
                    _this.ngModel.$formatters.push(function (data) {
                        if (data == null) {
                            return "";
                        }
                        var timezone = _this.timezone || moment.tz.guess();
                        return moment.tz(data, timezone).format(_getDateFormat());
                    });
                };
                this.$onDestroy = function () {
                    BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(_this);
                };
            }
        ];
    }
    return DatePicker;
}());
angular.module('werpu.bootstrap.picker', []).component("datePicker", new DatePicker());

},{"./BehavioralFixes":1,"./ViewModelBuilder":4}],3:[function(require,module,exports){
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
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
/**
 * internal model class for a single date picker date
 * for the date view
 */
var PickerDate = (function (_super) {
    __extends(PickerDate, _super);
    function PickerDate(invalid, momentDate, day, sameMonth) {
        _super.call(this, invalid, momentDate);
        this.day = day;
        this.sameMonth = sameMonth;
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
        _super.call(this, invalid, momentDate);
        this.month = month;
        this.sameYear = sameYear;
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
        _super.call(this, invalid, momentDate);
        this.year = year;
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
    function DatePickerPage(year, dayOfWeek, weeks) {
        if (dayOfWeek === void 0) { dayOfWeek = []; }
        if (weeks === void 0) { weeks = []; }
        this.dayOfWeek = dayOfWeek;
        this.weeks = weeks;
        this.year = year;
    }
    return DatePickerPage;
}());
exports.DatePickerPage = DatePickerPage;
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

},{}],4:[function(require,module,exports){
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
"use strict";
var DatePickerTypes_1 = require("./DatePickerTypes");
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
        var start = moment.tz(newValue, timezone).startOf("year").startOf("month").startOf("day").subtract("year", offset);
        var end = moment.tz(newValue, timezone).endOf("year").endOf("month").endOf("day").add("year", nextDecadeOffset);
        var momentStartDate = (startDate) ? moment.tz(startDate, timezone).startOf("year").startOf("month").startOf("day") : null;
        var momentEndDate = (endDate) ? moment.tz(endDate, timezone).endOf("year").endOf("month").endOf("day") : null;
        var cnt = 0;
        var pickerPage = new DatePickerTypes_1.YearPickerPage();
        var range1 = moment.range(start, end);
        range1.by("year", function (date) {
            if (cnt % 5 == 0) {
                pickerPage.row.push([]);
            }
            var isInvalid = false;
            if (momentStartDate) {
                isInvalid = isInvalid || (date.startOf("day").isBefore(momentStartDate) && date.endOf("day").isBefore(momentStartDate));
            }
            if (!isInvalid && momentEndDate) {
                isInvalid = isInvalid || (date.startOf("day").isAfter(momentEndDate) && date.endOf("day").isAfter(momentEndDate));
            }
            pickerPage.row[pickerPage.row.length - 1].push(new DatePickerTypes_1.PickerYear(isInvalid, date, parseInt(date.tz(timezone).format("YYYY"))));
            cnt++;
        });
        return pickerPage;
    };
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
            if (cnt % 3 == 0) {
                pickerPage.row.push([]);
            }
            var isInvalid = false;
            if (momentStartDate) {
                isInvalid = isInvalid || (date.startOf("day").isBefore(momentStartDate) && date.endOf("day").isBefore(momentStartDate));
            }
            if (!isInvalid && momentEndDate) {
                isInvalid = isInvalid || (date.startOf("day").isAfter(momentEndDate) && date.endOf("day").isAfter(momentEndDate));
            }
            pickerPage.row[pickerPage.row.length - 1].push(new DatePickerTypes_1.PickerMonth(isInvalid, date, date.tz(timezone).format("MMMM"), date.tz(timezone).isSame(momentDate, "year")));
            cnt++;
        });
        return pickerPage;
    };
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
        var end = moment.tz(newValue, timezone).endOf("month").endOf("week");
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
        return new DatePickerTypes_1.DatePickerPage(momentDate.get("year"), dayOfWeek, weeks);
    };
    return ViewModelBuilder;
}());
exports.ViewModelBuilder = ViewModelBuilder;

},{"./DatePickerTypes":3}]},{},[2]);
