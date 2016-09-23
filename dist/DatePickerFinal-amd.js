var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
define("BehavioralFixes", ["require", "exports"], function (require, exports) {
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
                    BehavioralFixes.unregisterDocumentBindings(controller);
                    $element.find(".picker-close").click();
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
        BehavioralFixes.registerPopupBindings = function ($element) {
            $element.find(".picker-popup").on("click", function (event) {
                event.stopImmediatePropagation();
                event.stopPropagation();
            });
        };
        BehavioralFixes.openDropDown = function ($element, controller) {
            controller.isOpen = true;
            $element.find(".dropdown").addClass("open");
        };
        BehavioralFixes.closeDropDown = function ($element, controller) {
            controller.isOpen = false;
            $element.find(".dropdown").removeClass("open");
        };
        return BehavioralFixes;
    }());
    exports.BehavioralFixes = BehavioralFixes;
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
define("DatePickerTypes", ["require", "exports"], function (require, exports) {
    "use strict";
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
define("ViewModelBuilder", ["require", "exports", "DatePickerTypes"], function (require, exports, DatePickerTypes_1) {
    "use strict";
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
            var end = moment.tz(newValue, timezone).startOf("month").startOf("week").add("days", 41);
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
});
define("RangeInput", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * A simple range input which allows a numeric input within a certain range
     */
    var RangeInput = (function () {
        function RangeInput() {
            this.template = function () {
                return "\n           <input type=\"text\" ng-model=\"ctrl.inputText\" />\n        ";
            };
            this.controllerAs = "ctrl";
            this.bindings = {
                from: "<",
                to: "<"
            };
            this.require = {
                "ngModel": 'ngModel',
            };
            this.controller = ["$scope", "$element", "$timeout",
                function ($scope, $element, $timeout) {
                    var _this = this;
                    $scope.$watch('ctrl.inputText', function (newval, oldval) {
                        if (newval != oldval) {
                            _this.ngModel.$setViewValue(newval);
                        }
                    });
                    this.$postLink = function () {
                        //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                        _this.ngModel.$render = function () {
                            _this.inputText = _this.ngModel.$viewValue;
                        };
                        $element.find("input").on("keydown", function (event) {
                            var keyCode = event.keyCode;
                            if (keyCode > 57) {
                                event.preventDefault();
                                return false;
                            }
                            if (keyCode >= 48 && keyCode <= 57) {
                                var finalValue = angular.element(event.target).val() + String.fromCharCode(keyCode);
                                if ((('undefined' != typeof _this.from) && _this.from > finalValue) ||
                                    (('undefined' != typeof _this.to && _this.to < finalValue))) {
                                    event.preventDefault();
                                    return false;
                                }
                            }
                        });
                    };
                }
            ];
        }
        return RangeInput;
    }());
    exports.RangeInput = RangeInput;
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
define("DatePicker", ["require", "exports", "BehavioralFixes", "ViewModelBuilder", "DatePickerTypes", "RangeInput"], function (require, exports, BehavioralFixes_1, ViewModelBuilder_1, DatePickerTypes_2, RangeInput_1) {
    "use strict";
    var PickerConstants = (function () {
        function PickerConstants() {
        }
        PickerConstants.DEFAULT_DATE_FORMAT = "DD.MM.YYYY";
        PickerConstants.DEFAULT_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
        PickerConstants.DEFAULT_PICKER_MODE = "DATE";
        PickerConstants.PICKER_VIEW_DATE = "DATE";
        PickerConstants.PICKER_VIEW_TIME = "TIME";
        PickerConstants.PICKER_VIEW_MONTH = "MONTH";
        PickerConstants.PICKER_VIEW_YEAR = "YEAR";
        PickerConstants.DEFAULT_PICKER_LABEL = "Date";
        return PickerConstants;
    }());
    var DatePicker = (function () {
        function DatePicker() {
            this.template = function () {
                var inputArea = "\n                <div class=\"input-group\">\n                   <input type=\"text\" placeholder=\"{{ctrl.placeholder}}\" class=\"form-control\" name=\"{{ctrl.name}}_inner\" ng-model=\"ctrl.innerSelection\"></input>\n                   <span class=\"input-group-btn\">\n                       <button type=\"button\" class=\"picker-open btn btn-default\" ng-click=\"ctrl._openPicker()\">\n                             <span class=\"glyphicon glyphicon-align-right glyph-icon glyphicon-calendar\"> {{ctrl.buttonLabel}} </span>\n                       </button>\n                   </span> \n               </div>\n               <input type=\"button\" class=\"picker-close\" ng-click=\"ctrl._close()\" value=\"Close\" ng-show=\"false\"/>\n        ";
                var inputAreaHidden = "\n           <input type=\"text\" style=\"display: none;\" placeholder=\"{{ctrl.placeholder}}\" class=\"form-control\" name=\"{{ctrl.name}}_inner\" ng-model=\"ctrl.innerSelection\"></input>\n        ";
                var timePickerSpinning = "\n            <div class=\"time-picker\" ng-if=\"ctrl.view == 'DATE' && ctrl.pickerMode == 'DATE_TIME'\" >\n                <table>\n                   <thead>\n                        \n                    </thead>\n                    <tbody>\n                        \n                         <tr>\n                            <td class=\"glyphicon glyphicon-chevron-up\" ng-class=\"{'invalid' : !ctrl._isValidHour(ctrl._currentDate.get('hour') + 1)}\" ng-click=\"ctrl._nextHour()\">\n                            </td>\n                            <td></td>\n                            <td class=\"glyphicon glyphicon-chevron-up\" ng-class=\"{'invalid' : !ctrl._isValidMinute(ctrl._currentDate.get('minute') + 1)}\" ng-click=\"ctrl._nextMinute()\">\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class=\"selected-hour\">\n                                <internal-range-input class=\"hour-input\" from=\"0\" to=\"23\" ng-model=\"ctrl.currentHour\"/>    \n                            </td>\n                            <td class=\"invalid\">:</td>\n                            <td class=\"selected-minute\">\n                                <internal-range-input class=\"minute-input\" from=\"0\" to=\"59\" ng-model=\"ctrl.currentMinute\"/> \n                            </td>\n                        </tr>\n                         <tr>\n                            <td class=\"glyphicon glyphicon-chevron-down\" ng-class=\"{'invalid' : !ctrl._isValidHour(ctrl._currentDate.get('hour') - 1)}\" ng-click=\"ctrl._prevHour()\">\n                            </td>\n                            <td></td>\n                            <td class=\"glyphicon glyphicon-chevron-down\" ng-class=\"{'invalid' : !ctrl._isValidMinute(ctrl._currentDate.get('minute') - 1)}\" ng-click=\"ctrl._prevMinute()\">\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"button-group bottom-buttons\" ng-if=\"ctrl.view == 'TIME'\">\n                  <input type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"ctrl._goBackInView()\" value=\"Back\" />\n                </div>\n            </div>\n        ";
                var datePicker = "\n               <!-- date view - default view -->\n               <div class=\"date-picker\" ng-if=\"ctrl.view == 'DATE'\">                \n                    <table>\n                        <thead>\n                            <!-- TODO year forward and backward -->\n                        \n                            <tr ng-if=\"ctrl.pickerMode == 'DATE_TIME'\">\n                                <td colspan=\"8\" class=\"invalid picker-title\" >{{ctrl.innerSelection}}</td>\n                            </tr>\n                            \n                            <tr>\n                                <td><a class=\"prev glyphicon glyphicon-menu-left\" ng-click=\"ctrl._prevMonth()\"></a></td><td colspan=\"2\" ng-click=\"ctrl._switchToMonthView()\">{{ctrl._currentDate.format(\"MMMM\")}}</td><td><a class=\"next glyphicon glyphicon-menu-right\" ng-click=\"ctrl._nextMonth()\"></a></td>\n                                <td><a class=\"prev glyphicon glyphicon-menu-left\" ng-click=\"ctrl._prevYear()\"></a></td><td colspan=\"2\" ng-click=\"ctrl._switchToYearView()\">{{ctrl.monthPickerData.year}}</td><td><a class=\"next glyphicon glyphicon-menu-right\" ng-click=\"ctrl._nextYear()\"></a></td>\n                            </tr>\n                            <tr>\n                                <td class=\"calendarWeek\"><!-- week of year --></td>\n                                <td class=\"dayOfWeek\" ng-repeat=\"dayOfWeek in ctrl.monthPickerData.dayOfWeek\" ng-click=\"ctrl._selectDate(dayOfWeek)\">{{::dayOfWeek}}</td>    \n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr ng-repeat=\"week in ctrl.monthPickerData.weeks\">\n                                <td class=\"calendarWeek\">{{::week.calendarWeek}}</td>\n                                <td class=\"day\" ng-repeat=\"day in week.days\" ng-class=\"{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl._isSelectedDate(day), 'chosen' : ctrl._isChosenDate(day), 'today': ctrl._isToday(day)}\" ng-click=\"ctrl._selectDate(day)\">{{::day.day}}</td>\n                            </tr>\n                        </tbody>\n                        \n                    </table>\n                \n                    " + timePickerSpinning + "\n                    \n                    <div class=\"button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n                        <input type=\"button\" class=\"Sset btn btn-default btn-sm\" ng-click=\"ctrl._set()\" value=\"Set\" ng-if=\"ctrl.pickerOnlyMode == 'DOUBLE_BUFFERED'\" />\n                        <input type=\"button\" class=\"clear btn btn-default btn-sm\" ng-click=\"ctrl._clear()\" value=\"Clear\" ng-if=\"!ctrl.pickerOnlyMode\" />\n                        <input type=\"button\" class=\"today btn btn-default btn-sm\" ng-click=\"ctrl._today()\" value=\"Today\" />\n                        <input type=\"button\" class=\"picker-close btn btn-default btn-sm\" ng-click=\"ctrl._close()\" ng-if=\"!ctrl.pickerOnlyMode\" value=\"Close\" ng-if=\"!ctrl.pickerOnlyMpde\" />\n                    </div>\n               </div> \n        ";
                var monthPicker = "\n            <!-- month view -->\n            <div class=\"month-picker\" ng-if=\"ctrl.view == 'MONTH'\">\n                 <table>\n                    <thead>\n                          <tr>\n                          <td><a class=\"prev glyphicon glyphicon-menu-left\" ng-click=\"ctrl._prevYear()\" class=\"glyphicon glyphicon-menu-left\"></a></td>\n                          <td ng-click=\"ctrl._switchToYearView()\">{{ctrl.monthPickerData.year}}</td>\n                          <td><a class=\"next glyphicon glyphicon-menu-right\" ng-click=\"ctrl._nextYear()\"></a></td>\n                          </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat=\"monthRow in ctrl.yearPickerData.row\">\n                            <td ng-repeat=\"month in monthRow\" ng-class=\"{'invalid': month.invalid, 'selected' : ctrl._isSameMonth(month), 'chosen' : ctrl._isChosenMonth(month), 'today': ctrl._isTodayMonth(month)}\"\n                            ng-click=\"ctrl._selectMonth(month)\"\n                            >{{::month.month}}</td>\n                        </tr>\n                    </tbody>\n                 </table>   \n            \n                <div class=\"button-group bottom-buttons\">\n                    <input type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"ctrl._goBackInView()\" value=\"Back\" />\n                </div>\n            </div>    \n        ";
                var yearPicker = "\n            <!-- year view -->  \n            <div class=\"year-picker\" ng-if=\"ctrl.view == 'YEAR'\">\n                  <table>\n                    <thead>\n                    <tr>\n                        <td><a ng-click=\"ctrl._prevDecade()\" class=\"glyphicon glyphicon-menu-left\"></a></td>\n                        <td colspan=\"3\" class=\"no-link\">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>\n                        <td><a ng-click=\"ctrl._nextDecade()\" class=\"glyphicon glyphicon-menu-right\"></a></td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat=\"yearrow in ctrl.decadePickerData.row\">\n                            <td ng-repeat=\"year in yearrow\"\n                            ng-class=\"{'invalid': year.invalid, 'selected' : ctrl._isSameYear(year), 'chosen' : ctrl._isChosenYear(year), 'today': ctrl._isTodayYear(year)}\"\n                             ng-click=\"ctrl._selectYear(year)\"\n                            >{{::year.year}}</td></td>\n                        </tr>\n                    </table>\n                  <div class=\"button-group bottom-buttons\">\n                    <input type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"ctrl._goBackInView()\" value=\"Back\" />\n                  </div>\n            </div>   \n        ";
                return "\n           <div class=\"dropdown\" ng-if=\"!ctrl.pickerOnlyMode\"> \n                " + inputArea + " \n               <div class=\"dropdown-menu picker-popup\">\n                    <div class=\"content\" ng-if=\"ctrl.isOpen\">\n                       " + datePicker + "\n                       \n                       " + monthPicker + "                   \n                             \n                       " + yearPicker + "\n                   </div>\n               \n                </div>\n            </div> \n            <div class=\"dropdown picker-standalone\" ng-if=\"ctrl.pickerOnlyMode\">\n                 " + inputAreaHidden + "\n                 <div class=\"picker-popup\">\n                  <div class=\"content\"> \n                     " + datePicker + "\n                           \n                     " + monthPicker + "                   \n                                 \n                     " + yearPicker + "\n                 </div>\n                 </div>\n            </div>  \n                 \n        ";
            };
            this.controllerAs = "ctrl";
            this.bindings = {
                name: "@",
                timezone: "@",
                startDate: "<",
                endDate: "<",
                dateFormat: "@",
                placeholder: "@",
                buttonLabel: "@",
                pickerMode: "@",
                pickerOnlyMode: "@",
                endOfDay: "<"
            };
            this.require = {
                "ngModel": 'ngModel',
            };
            this.controller = ["$scope", "$element", "$timeout",
                function ($scope, $element, $timeout) {
                    var _this = this;
                    /**
                     * current date viewed (aka navigational position=
                     * @type {Moment}
                     * @private
                     */
                    this._currentDate = null;
                    /**
                     * double buffer date in double buffer mode
                     *
                     * @type {Moment}
                     * @private
                     */
                    this._doubleBufferDate = null;
                    this.buttonLabel = ("undefined" == typeof this.buttonLabel || null == this.buttonLabel) ?
                        PickerConstants.DEFAULT_PICKER_LABEL : this.buttonLabel;
                    this.pickerMode = ("undefined" == typeof this.pickerMode || null == this.pickerMode) ?
                        PickerConstants.DEFAULT_PICKER_MODE : this.pickerMode;
                    this.visibleDays = [];
                    this.view = PickerConstants.PICKER_VIEW_DATE;
                    this.viewStack = [];
                    /**
                     * fetches the current or default timezone
                     * @returns {string}
                     * @private
                     */
                    var _getTimezone = function () {
                        return _this.timezone || moment.tz.guess();
                    };
                    /**
                     * fetches the date format set in the component either from outside or by its defaults
                     * @returns {string}
                     * @private
                     */
                    var _getDateFormat = function () {
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
                    var _updateModel = function (value) {
                        var innerSelection = value;
                        for (var cnt = 0; _this.ngModel.$formatters && cnt < _this.ngModel.$formatters.length; cnt++) {
                            innerSelection = _this.ngModel.$formatters[cnt](innerSelection);
                        }
                        _this.innerSelection = innerSelection;
                        $timeout(function () {
                            _this._updatePickerData();
                        });
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
                     * checks if the current picker date is the selected one
                     * @param selectedDate
                     * @returns {boolean}
                     * @private
                     */
                    this._isChosenDate = function (selectedDate) {
                        if (!_this._doubleBufferDate) {
                            return false;
                        }
                        else {
                            //booga
                            var modelDate = _this._doubleBufferDate;
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
                        var modelDate = moment.tz(_this.ngModel.$modelValue, _getTimezone());
                        return modelDate.isSame(selectedMonth.momentDate, "month") &&
                            modelDate.isSame(selectedMonth.momentDate, "year");
                    };
                    this._isChosenMonth = function (selectedMonth) {
                        if (!_this._doubleBufferDate) {
                            return false;
                        }
                        var modelDate = _this._doubleBufferDate;
                        return modelDate.isSame(selectedMonth.momentDate, "month") &&
                            modelDate.isSame(selectedMonth.momentDate, "year");
                    };
                    this._isTodayYear = function (selectedDate) {
                        var modelDate = moment.tz(new Date(), _getTimezone());
                        return modelDate.isSame(selectedDate.momentDate, "year");
                    };
                    this._isSameYear = function (selectedMonth) {
                        var modelDate = moment.tz(_this.ngModel.$modelValue, _getTimezone());
                        return modelDate.isSame(selectedMonth.momentDate, "year");
                    };
                    this._isChosenYear = function (selectedMonth) {
                        if (!_this._doubleBufferDate) {
                            return false;
                        }
                        var modelDate = _this._doubleBufferDate;
                        return modelDate.isSame(selectedMonth.momentDate, "year");
                    };
                    /**
                     * checks if the time given is valid in the scope of the date selected
                     *
                     * @param hour
                     * @param minute
                     * @returns {boolean}
                     * @private
                     */
                    this._isValidTime = function (hour, minute) {
                        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                            return false;
                        }
                        var temporaryDate = moment.tz(_this._currentDate.toDate(), _getTimezone());
                        var momentStartDate = (_this.startDate) ? moment.tz(_this.startDate, _getTimezone()).startOf("day") : null;
                        var momentEndDate = (_this.endDate) ? moment.tz(_this.endDate, _getTimezone()).endOf("day") : null;
                        temporaryDate.set("hour", hour).set("minute", minute);
                        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
                    };
                    /**
                     * checks for a valid hour, valid means the model date
                     * @param hour
                     * @returns {boolean}
                     * @private
                     */
                    this._isValidHour = function (hour) {
                        if (hour < 0 || hour > 23) {
                            return false;
                        }
                        var temporaryDate = moment.tz(_this._currentDate.toDate(), _getTimezone());
                        var momentStartDate = (_this.startDate) ? moment.tz(_this.startDate, _getTimezone()) : null;
                        var momentEndDate = (_this.endDate) ? moment.tz(_this.endDate, _getTimezone()) : null;
                        temporaryDate.set("hour", hour);
                        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
                    };
                    /**
                     * checks for a valid minute
                     * @param minute
                     * @returns {boolean}
                     * @private
                     */
                    this._isValidMinute = function (minute) {
                        if (minute < 0 || minute > 59) {
                            return false;
                        }
                        var temporaryDate = moment.tz(_this._currentDate.toDate(), _getTimezone());
                        var momentStartDate = (_this.startDate) ? moment.tz(_this.startDate, _getTimezone()) : null;
                        var momentEndDate = (_this.endDate) ? moment.tz(_this.endDate, _getTimezone()) : null;
                        temporaryDate.set("minute", minute);
                        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
                    };
                    this._nextHour = function () {
                        if (!_this._isValidHour(_this._currentDate.get("hour") + 1)) {
                            return;
                        }
                        _this._currentDate.add("hour", 1);
                        _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                    };
                    this._prevHour = function () {
                        if (!_this._isValidHour(_this._currentDate.get("hour") - 1)) {
                            return;
                        }
                        _this._currentDate.subtract("hour", 1);
                        _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                    };
                    this._nextMinute = function () {
                        if (!_this._isValidMinute(_this._currentDate.get("minute") + 1)) {
                            return;
                        }
                        _this._currentDate.add("minute", 1);
                        _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                    };
                    this._prevMinute = function () {
                        if (!_this._isValidMinute(_this._currentDate.get("minute") - 1)) {
                            return;
                        }
                        _this._currentDate.subtract("minute", 1);
                        _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                    };
                    /*we do the proper max min date validity checks over our setters*/
                    Object.defineProperty(this, "currentHour", {
                        get: function () {
                            if (!_this._currentDate) {
                                return 0;
                            }
                            return _this._currentDate.get("hour");
                        },
                        set: function (val) {
                            if (!_this._isValidHour(val)) {
                                return;
                            }
                            _this._currentDate.set("hour", val);
                            _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                        }
                    });
                    Object.defineProperty(this, "currentMinute", {
                        get: function () {
                            if (!_this._currentDate) {
                                return 0;
                            }
                            return _this._currentDate.get("minute");
                        },
                        set: function (val) {
                            if (!_this._isValidMinute(val)) {
                                return;
                            }
                            _this._currentDate.set("minute", val);
                            _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                        }
                    });
                    /**
                     * helper function to push the current date into its max min range
                     *
                     * @private
                     */
                    this._fixCurrentDate = function () {
                        var parsedData = _this._currentDate;
                        var startDate = (_this.startDate) ? moment.tz(_this.startDate, _getTimezone()) : null;
                        var endDate = (_this.endDate) ? moment.tz(_this.endDate, _getTimezone()) : null;
                        if (startDate && moment.tz(parsedData, _getTimezone()).isBefore(startDate)) {
                            _this._currentDate = startDate;
                        }
                        if (endDate && moment.tz(parsedData, _getTimezone()).isAfter(endDate)) {
                            _this._currentDate = endDate;
                        }
                    };
                    /**
                     * select a date from the outside
                     * @param selectedDate
                     * @private
                     */
                    this._selectDate = function (selectedDate) {
                        if (!selectedDate.invalid) {
                            if (!_this.ngModel.$modelValue) {
                                _this._currentDate = selectedDate.momentDate;
                                if (_this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                                    _this._doubleBufferDate = moment.tz(_this._currentDate.toDate(), _getTimezone());
                                }
                            }
                            //sometimes we pass the current date in, in this case no
                            //Value traversal needs to be performed
                            if (_this._currentDate != selectedDate.momentDate) {
                                _this._currentDate.set("date", selectedDate.momentDate.get("date"));
                                _this._currentDate.set("month", selectedDate.momentDate.get("month"));
                                _this._currentDate.set("year", selectedDate.momentDate.get("year"));
                            }
                            if (_this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) {
                                (!_this.endOfDay) ? _this._currentDate.startOf("day") : _this._currentDate.endOf("day");
                            }
                            _this._fixCurrentDate();
                            if (_this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                                _this._doubleBufferDate = moment.tz(_this._currentDate.toDate(), _getTimezone());
                            }
                            if (!_this.pickerOnlyMode || (_this.pickerOnlyMode && _this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                                _updateModel(_this._currentDate.toDate());
                            }
                            /*in case of a date mode we are done*/
                            if (_this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE && !_this.pickerOnlyMode) {
                                _this._close();
                            }
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
                                _this._currentDate = moment.tz(new Date(), _getTimezone());
                                _this._currentDate.set("month", selectedDate.momentDate.get("month"));
                            }
                            else {
                                //we also have to update our currently selected date
                                _this._currentDate.set("month", selectedDate.momentDate.get("month"));
                                _this._currentDate.set("year", selectedDate.momentDate.get("year"));
                            }
                            _this._fixCurrentDate();
                            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                                this._selectDate(new PickerDate(false, this._currentDate, 1, true));
                            }*/
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
                                _this._currentDate = moment.tz(new Date(), _getTimezone());
                                _this._currentDate.set("year", selectedDate.momentDate.get("year"));
                            }
                            else {
                                var value = moment.tz(_this.ngModel.$modelValue, _getTimezone());
                                _this._currentDate.set("year", selectedDate.momentDate.get("year"));
                            }
                            _this._fixCurrentDate();
                            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                                this._selectDate(new PickerDate(false, this._currentDate, 1, true));
                            }*/
                            _this._goBackInView();
                        }
                    };
                    /**
                     * updates the picker views from the _currentDate
                     * the _currentDate is a positional placeholder for the pickers
                     * it is used to store also temporary selections until
                     * they are traversed into the model via pickDate
                     *
                     * @private
                     */
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
                     *
                     * @private
                     */
                    this._openPicker = function () {
                        var timezone = _this.timezone || moment.tz.guess();
                        _this._currentDate = (_this.ngModel.$modelValue) ? moment.tz(_this.ngModel.$modelValue, timezone) : moment.tz(new Date(), timezone);
                        _this._updatePickerData();
                        //this.pickerVisible = true;
                        BehavioralFixes_1.BehavioralFixes.openDropDown($element, _this);
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
                        _this._currentDate = moment.tz(new Date(), _getTimezone());
                        if (_this.pickerMode == PickerConstants.DEFAULT_PICKER_MODE) {
                            _this._currentDate.startOf("day");
                        }
                        _this._fixCurrentDate();
                        _updateModel(_this._currentDate.toDate());
                        _this._close();
                    };
                    /**
                     * closes the data picker
                     * @private
                     */
                    this._close = function () {
                        _this.view = PickerConstants.DEFAULT_PICKER_MODE;
                        _this.viewStack = [];
                        _this.pickerVisible = false;
                        BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(_this);
                        BehavioralFixes_1.BehavioralFixes.closeDropDown($element, _this);
                    };
                    /**
                     * set for double buffered mode
                     *
                     * @private
                     */
                    this._set = function () {
                        if (_this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                            _this._currentDate = moment.tz(_this._doubleBufferDate.toDate(), _getTimezone());
                        }
                        _updateModel(_this._currentDate.toDate());
                    };
                    /**
                     * switches to the month view
                     * @private
                     */
                    this._switchToMonthView = function () {
                        _this.viewStack.unshift(_this.view);
                        _this.view = PickerConstants.PICKER_VIEW_MONTH;
                    };
                    /**
                     * switches to the year view
                     * @private
                     */
                    this._switchToYearView = function () {
                        _this.viewStack.unshift(_this.view);
                        _this.view = PickerConstants.PICKER_VIEW_YEAR;
                    };
                    /**
                     * switches to the time view
                     * @private
                     */
                    this._switchToTimeView = function () {
                        _this.viewStack.unshift(_this.view);
                        _this.view = PickerConstants.PICKER_VIEW_TIME;
                    };
                    /**
                     * goes back one view
                     * @private
                     */
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
                    /**
                     * if the startDate shifts and the currentDate is smaller
                     * then the min date then we have to shift the date over
                     * to the new minDate
                     */
                    $scope.$watch('ctrl.startDate', function (newval, oldval) {
                        if (newval && _this._currentDate) {
                            var newMinDate = moment.tz(newval, _getTimezone());
                            //no date change or mindate < than the currentDate in the min date, we safely can skip
                            //the rest of the date processing
                            if (newMinDate.isSameOrBefore(_this._currentDate)) {
                                $timeout(function () {
                                    _this._updatePickerData();
                                });
                                return;
                            }
                            //otherwise we set the currentDate to the newMinDate
                            _this._currentDate = (_this.endOfDay) ? newMinDate.endOf("day") : newMinDate;
                            //currentDate != modelValue?
                            var currentModel = moment.tz(_this.ngModel.$modelValue, _getTimezone());
                            //if there is a discrepancy we also update the model
                            if (_this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || _this.pickerOnlyMode) {
                                if (!currentModel || currentModel.get("day") != _this._currentDate.get("day") ||
                                    currentModel.get("month") != _this._currentDate.get("month") ||
                                    currentModel.get("year") != _this._currentDate.get("year")) {
                                    _this._selectDate(new DatePickerTypes_2.PickerDate(false, _this._currentDate, 1, true));
                                }
                            }
                        }
                        if (_this._currentDate) {
                            $timeout(function () {
                                _this._updatePickerData();
                            });
                        }
                    });
                    this.$postLink = function () {
                        $timeout(function () {
                            /**
                             * we turn off event propagation
                             * for the popup so that a click within the popup
                             * does not propagate to its parent elements
                             * (we only want to have the popup closed when we click on the outside)
                             *
                             */
                            BehavioralFixes_1.BehavioralFixes.registerPopupBindings($element);
                            /**
                             * we change the key handling a little bit
                             * an enter should trigger a form submit
                             * and a keydown should open the picker
                             */
                            BehavioralFixes_1.BehavioralFixes.registerKeyBindings($element);
                        });
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
                            var parsedData = (_this.endOfDay) ? moment.tz(data, _getDateFormat(), _getTimezone()).endOf("day").toDate() : moment.tz(data, _getDateFormat(), _getTimezone()).toDate();
                            var startDate = (_this.startDate) ? moment.tz(_this.startDate, _getTimezone()) : null;
                            var endDate = (_this.endDate) ? moment.tz(_this.endDate, _getTimezone()) : null;
                            if (startDate && moment.tz(parsedData, _getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
                                return _this.startDate;
                            }
                            if (endDate && moment.tz(parsedData, _getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
                                return _this.endDate;
                            }
                            return parsedData;
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
                        //update the picker data if we are in popupOnly mode
                        if (_this.pickerOnlyMode) {
                            _this._openPicker();
                        }
                    };
                    this.$onDestroy = function () {
                        BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(_this);
                    };
                }
            ];
        }
        return DatePicker;
    }());
    //note this code is ported from github please do not change it here
    angular.module('werpu.bootstrap.picker', []).component("datePicker", new DatePicker()).component("internalRangeInput", new RangeInput_1.RangeInput());
});
//# sourceMappingURL=DatePickerFinal-amd.js.map