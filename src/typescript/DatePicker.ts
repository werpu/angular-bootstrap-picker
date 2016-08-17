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

/// <reference path="../../typings/tsd.d.ts" />
import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
import {
    YearPickerPage, MonthPickerPage, DatePickerPage, PickerDate, PickerMonth, PickerYear,
    PickerWeek
} from "./DatePickerTypes";


var _calculateYearView = function (newValue:Date, startDate:Date, endDate:Date, timezone:string):YearPickerPage {

    if (!newValue) {
        newValue = new Date();
    }

    var current = moment.tz(newValue, timezone);

    var offset = current.get("year") % 20 - 1;
    var nextDecadeOffset = 20-offset - 1;


   var start = moment.tz(newValue, timezone).startOf("year").startOf("month").startOf("day").subtract("year", offset);
   var end = moment.tz(newValue, timezone).endOf("year").endOf("month").endOf("day").add("year", nextDecadeOffset);

    var momentStartDate = (startDate) ? moment.tz(startDate, timezone).startOf("year").startOf("month").startOf("day") : null;
    var momentEndDate = (endDate) ? moment.tz(endDate, timezone).endOf("year").endOf("month").endOf("day") : null;

    var cnt = 0;
    var pickerPage = new YearPickerPage();

    var range1 = moment.range(start, end);
    range1.by("year", (date:moment.Moment) => {
        if (cnt % 5 == 0) {
            pickerPage.row.push([]);
        }

        var isInvalid = false;
        if (momentStartDate) {
            isInvalid = isInvalid || date.isBefore(momentStartDate);
        }
        if (!isInvalid && momentEndDate) {
            isInvalid = isInvalid || date.isAfter(momentEndDate);
        }

        pickerPage.row[pickerPage.row.length - 1].push(
            new PickerYear(isInvalid, date, parseInt(date.tz(timezone).format("YYYY")))
        );

        cnt++;
    });
    return pickerPage;
};



var _calculateMonthView = function (newValue:Date, startDate:Date, endDate:Date, timezone:string):MonthPickerPage {
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
    var pickerPage = new MonthPickerPage(momentDate.get("year"));
    range1.by("month", (date:moment.Moment) => {

        if (cnt % 3 == 0) {
            pickerPage.row.push([]);
        }

        var isInvalid = false;
        if (momentStartDate) {
            isInvalid = isInvalid || date.isBefore(momentStartDate);
        }
        if (!isInvalid && momentEndDate) {
            isInvalid = isInvalid || date.isAfter(momentEndDate);
        }

        pickerPage.row[pickerPage.row.length - 1].push(
            new PickerMonth(isInvalid, date, date.tz(timezone).format("MMMM"), date.tz(timezone).isSame(momentDate, "year"))
        );

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
var _calculateDateView = function (newValue:Date, startDate:Date, endDate:Date, timezone:string):DatePickerPage {
    if (!newValue) {
        newValue = new Date();
    }

    var momentDate = moment.tz(newValue, timezone);
    var start = moment.tz(newValue, timezone).startOf("month").startOf("week");
    var end = moment.tz(newValue, timezone).endOf("month").endOf("week");

    var momentStartDate = (startDate) ? moment.tz(startDate, timezone).startOf("day") : null;
    var momentEndDate = (endDate) ? moment.tz(endDate, timezone).endOf("day") : null;


    var range1 = moment.range(start, end);
    var weeks:any = [];
    var dayOfWeek:Array<string> = [];

    var cnt = 0;
    range1.by("day", (date:moment.Moment) => {

        if (cnt % 7 == 0) {
            weeks.push(new PickerWeek(date.tz(timezone).get("week")));
        }

        var isInvalid = false;
        if (momentStartDate) {
            isInvalid = isInvalid || date.isBefore(momentStartDate);
        }
        if (!isInvalid && momentEndDate) {
            isInvalid = isInvalid || date.isAfter(momentEndDate);
        }

        weeks[weeks.length - 1].days.push(
            new PickerDate(isInvalid, date, date.tz(timezone).get("date"), date.tz(timezone).isSame(momentDate, "month"))
        );

        //We also need to display the work days
        if (dayOfWeek.length < 7) {
            dayOfWeek.push(date.tz(timezone).format("ddd"));
        }

        cnt++;

    });

    return new DatePickerPage(momentDate.get("year"), dayOfWeek, weeks);
};


class DatePicker implements IComponentOptions {

    template = () => {
        return `
           <div class="input-group">
               <input type="text" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}" ng-model="ctrl.innerSelection"></input>
               <span class="input-group-btn">
                   <button class="picker-open btn btn-default" ng-click="ctrl._openPicker()">
                         <span class="glyphicon glyphicon-align-right glyph-icon glyphicon-calendar"> Date </span>
                   </button>
               </span>
           </div>
           <!-- date view - default view -->
           <div class="picker-popup date-picker" ng-if="ctrl.pickerVisible && ctrl.view == 'DATE'">                
                <table>
                    <thead>
                        <!-- TODO year forward and backward -->
                       
                        <tr>
                            <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevMonth()"></a><td colspan="2" ng-click="ctrl._switchToMonthView()">{{ctrl._currentDate.format("MMMM")}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextMonth()"></a></td>
                            <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevYear()"></a></td><td colspan="2" ng-click="ctrl._switchToYearView()">{{ctrl.monthPickerData.year}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextYear()"></a></td>
                        </tr>
                        <tr>
                            <td class="calendarWeek"><!-- week of year --></td>
                            <td class="dayOfWeek" ng-repeat="dayOfWeek in ctrl.monthPickerData.dayOfWeek" ng-click="ctrl._selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="week in ctrl.monthPickerData.weeks">
                            <td class="calendarWeek">{{::week.calendarWeek}}</td>
                            <td class="day" ng-repeat="day in week.days" ng-class="{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl._isSelectedDate(day), 'today': ctrl._isToday(day)}" ng-click="ctrl._selectDate(day)">{{::day.day}}</td>
                        </tr>
                    </tbody>
                </table>
                <input type="button" class="clear btn btn-default btn-sm" ng-click="ctrl._clear()" value="Clear" />
                <input type="button" class="today btn btn-default btn-sm" ng-click="ctrl._today()" value="Today" />
                <input type="button" class="picker-close btn btn-default btn-sm" ng-click="ctrl._close()" value="Close" />
           </div>
           
           <!-- month view -->
            <div class="picker-popup month-picker" ng-if="ctrl.pickerVisible && ctrl.view == 'MONTH'">
                 <table>
                    <thead>
                          <tr>
                          <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevYear()" class="glyphicon glyphicon-menu-left"></a></td>
                          <td ng-click="ctrl._switchToYearView()">{{ctrl.monthPickerData.year}}</td>
                          <td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextYear()"></a></td>
                          </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="monthRow in ctrl.yearPickerData.row">
                            <td ng-repeat="month in monthRow" ng-class="{'invalid': month.invalid, 'selected' : ctrl._isSameMonth(month), 'today': ctrl._isSameMonth(month)}"
                            ng-click="ctrl._selectMonth(month)"
                            >{{::month.month}}</td>
                        </tr>
                    </tbody>
                 </table>   
            
            
                <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
            </div>    
                 
            <!-- year view -->  
            <div class="picker-popup year-picker" ng-if="ctrl.pickerVisible && ctrl.view == 'YEAR'">
                  <table>
                    <thead>
                    <tr>
                        <td><a ng-click="ctrl._prevDecade()" class="glyphicon glyphicon-menu-left"></a></td>
                        <td colspan="3">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>
                        <td><a ng-click="ctrl._nextDecade()" class="glyphicon glyphicon-menu-right"></a></td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="yearrow in ctrl.decadePickerData.row">
                            <td ng-repeat="year in yearrow"
                            ng-class="{'invalid': year.invalid, 'selected' : ctrl._isSameYear(year), 'today': ctrl._isSameYear(year)}"
                             ng-click="ctrl._selectYear(year)"
                            >{{::year.year}}</td></td>
                        </tr>
                  </table>
                <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
            </div>      
                 
        `;
    };

    controllerAs = "ctrl";

    bindings:any = {
        name: "@",
        timezone: "@",
        startDate: "<",
        endDate: "<",
        dateFormat: "@",
        placeholder: "@"
    };

    require:any = {
        "ngModel": 'ngModel',
    };

    controller:any = ["$scope",
        function ($scope:IScope) {

            this.visibleDays = [];

            this.view = "DATE";

            this.viewStack = [];

            /**
             * fetches the current or default timezone
             * @returns {string}
             * @private
             */
            var _getTimezone = ():string => {
                return this.timezone || moment.tz.guess();
            };

            var _getDateFormat = ():string => {
                return this.dateFormat || "DD.MM.YYYY";
            };


            /**
             * formats a date by using the controls appended parsers
             * this has to be done this way because somone could decorate
             * the control from outside
             *
             * @param value
             * @private
             */
            var _format = (value:Date) => {
                var innerSelection = value;
                for(var cnt = 0;this.ngModel.$formatters && cnt < this.ngModel.$formatters.length; cnt++) {
                    innerSelection = this.ngModel.$formatters[cnt](innerSelection);
                }

                this.innerSelection = innerSelection;
            };


            /**
             * checks if the current picker date is the selected one
             * @param selectedDate
             * @returns {boolean}
             * @private
             */
            this._isSelectedDate = (selectedDate:PickerDate) => {
                if (!this.ngModel.$modelValue) {
                    return false;
                } else {
                    var modelDate = moment.tz(this.ngModel.$modelValue, _getTimezone());
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
            this._isToday = (selectedDate:PickerDate) => {

                var modelDate = moment.tz(new Date(), _getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "date") &&
                    modelDate.isSame(selectedDate.momentDate, "month") &&
                    modelDate.isSame(selectedDate.momentDate, "year");

            };

            this._isTodayMonth = (selectedDate:PickerMonth) => {

                var modelDate = moment.tz(new Date(), _getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "month") &&
                    modelDate.isSame(selectedDate.momentDate, "year");

            };

            this._isSameMonth = (selectedMonth:PickerMonth) => {
                var modelDate = moment.tz(new Date(), _getTimezone());

                return modelDate.isSame(selectedMonth.momentDate, "month") &&
                    modelDate.isSame(selectedMonth.momentDate, "year");
            };


            this._isTodayYear = (selectedDate:PickerYear) => {

                var modelDate = moment.tz(new Date(), _getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "year");

            };

            this._isSameYear = (selectedMonth:PickerYear) => {
                var modelDate = moment.tz(new Date(), _getTimezone());

                return modelDate.isSame(selectedMonth.momentDate, "year");
            };


            /**
             * select a date from the outside
             * @param selectedDate
             * @private
             */
            this._selectDate = (selectedDate:PickerDate) => {
                if (!selectedDate.invalid) {
                    _format(selectedDate.momentDate.toDate());

                    this.pickerVisible = false;
                }
            };

            /**
             * select a date from the outside
             * @param selectedDate
             * @private
             */
            this._selectMonth = (selectedDate:PickerMonth) => {
                if (!selectedDate.invalid) {
                    if(!this.ngModel.$modelValue) {
                        this._currentDate = selectedDate;
                    } else {
                        //we also have to update our currently selected date
                        this._currentDate.set("month", selectedDate.momentDate.get("month"));
                        this._currentDate.set("year", selectedDate.momentDate.get("year"));
                    }
                    this._goBackInView();
                }
            };

            /**
             * select a date from the outside
             * @param selectedDate
             * @private
             */
            this._selectYear = (selectedDate:PickerYear) => {
                if (!selectedDate.invalid) {
                    if(!this.ngModel.$modelValue) {
                        _format(selectedDate.momentDate.toDate());
                    } else {
                        var value = moment.tz(this.ngModel.$modelValue, _getTimezone());
                        value.set("year", selectedDate.momentDate.get("year"));
                        _format(value.toDate());
                    }

                    this._goBackInView();
                }
            };


            this._updatePickerData = () => {
                this.monthPickerData = _calculateDateView(this._currentDate.toDate(), this.startDate, this.endDate, _getTimezone());
                this.yearPickerData = _calculateMonthView(this._currentDate.toDate(), this.startDate, this.endDate, _getTimezone());
                this.decadePickerData = _calculateYearView(this._currentDate.toDate(), this.startDate, this.endDate, _getTimezone());

                var offset = this._currentDate.get("year") % 20 - 1;
                this.decadeFrom = moment.tz(this._currentDate.toDate(), _getTimezone()).subtract("year", offset).format("YYYY");

                var offset = this._currentDate.get("year")  % 20 - 1;
                var nextDecadeOffset = 20-offset-1;
                this.decadeTo = moment.tz(this._currentDate.toDate(), _getTimezone()).add("year", nextDecadeOffset).format("YYYY");

            };


            /**
             * opens the date picker
             * @private
             */
            this._openPicker = () => {

                var timezone = this.timezone || moment.tz.guess();

                this._currentDate = (this.ngModel.$modelValue) ? moment.tz(this.ngModel.$modelValue, timezone) : moment.tz(new Date(), timezone);

                this._updatePickerData();
                this.pickerVisible = true;
            };

            /**
             * goes the the previous month
             * @private
             */
            this._prevMonth = () => {
                this._currentDate = this._currentDate.subtract(1, "month");
                this._updatePickerData();
            };

            /**
             * goes to the next month
             * @private
             */
            this._nextMonth = () => {
                this._currentDate = this._currentDate.add(1, "month");
                this._updatePickerData();
            };

            /**
             * goes to the previous year
             * @private
             */
            this._prevYear = () => {
                this._currentDate = this._currentDate.subtract(1, "year");
                this._updatePickerData();
            };

            /**
             * goes to the next year
             * @private
             */
            this._nextYear = () => {
                this._currentDate = this._currentDate.add(1, "year");
                this._updatePickerData();
            };


            /**
             * goes to the previous year
             * @private
             */
            this._prevDecade = () => {
                this._currentDate = this._currentDate.subtract(20, "year");
                this._updatePickerData();
            };

            /**
             * goes to the next year
             * @private
             */
            this._nextDecade = () => {
                this._currentDate = this._currentDate.add(20, "year");
                this._updatePickerData();
            };

            /**
             * clears the selection
             * @private
             */
            this._clear = () => {
                this.innerSelection = "";
            };

            /**
             * jumps to today in the selection
             * @private
             */
            this._today = () => {
                this.innerSelection = this.ngModel.$formatters[0](new Date());
                this._close();
            };

            /**
             * closes the data picker
             * @private
             */
            this._close = () => {
                this.pickerVisible = false;
            };

            this._switchToMonthView = () => {
                this.viewStack.unshift(this.view);
                this.view = "MONTH";
            };

            this._switchToYearView = () => {
                this.viewStack.unshift(this.view);
                this.view = "YEAR";
            };

            this._goBackInView = () => {
                this._updatePickerData();
                this.view = this.viewStack.shift();
            };

            //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
            $scope.$watch('ctrl.innerSelection', (newval:string, oldval:string) => {
                if (newval != oldval) {
                    this.ngModel.$setViewValue(newval);
                }
            });

            this.$postLink = () => {
                //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                this.ngModel.$render = () => {
                    this.innerSelection = this.ngModel.$viewValue;
                };

                /*
                 * registers the internal parsers, validators and formatters
                 * into the ngModel for the date string conversion
                 */
                this.ngModel.$parsers.push((data:string) => {
                    if (data == "") {
                        return null;
                    }
                    return moment.tz(data, _getDateFormat(), _getTimezone()).toDate();
                });

                /**
                 * checks if the input is valid
                 * @param data
                 * @param viewValue
                 * @returns {boolean}
                 */
                this.ngModel.$validators.validDate = (data:Date, viewValue:string) => {
                    if (!viewValue) {
                        return true;
                    }
                    return moment.tz(viewValue, _getDateFormat(), _getTimezone()).isValid();
                };

                /**
                 * checks if it is within the alllowed date range if there is one
                 * @param data
                 * @param viewValue
                 * @returns {boolean}
                 */
                this.ngModel.$validators.dateRange = (data:Date, viewValue:string) => {
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

                /**
                 * formats after the given timezone and date format
                 * (if no timezone is used then the default one is used and the date format is
                 * DD.MM.YYYY
                 */
                this.ngModel.$formatters.push((data:Date) => {
                    if (data == null) {
                        return "";
                    }
                    var timezone = this.timezone || moment.tz.guess();
                    return moment.tz(data, timezone).format(_getDateFormat());
                });
            }
        }
    ];
}


(<any>angular).module('bootstrap.picker', []).component("datePicker", new DatePicker());


