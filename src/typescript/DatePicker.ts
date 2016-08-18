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
import {BehavioralFixes} from "./BehavioralFixes";
import {ViewModelBuilder} from "./ViewModelBuilder";
import {PickerDate, PickerMonth, PickerYear} from "./DatePickerTypes";
import {RangeInput} from "./RangeInput";


class DatePicker implements IComponentOptions {

    template = () => {

        var inputArea = `
             <div class="input-group">
                   <input type="text" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}" ng-model="ctrl.innerSelection"></input>
                   <span class="input-group-btn">
                       <button class="picker-open btn btn-default" ng-click="ctrl._openPicker()">
                             <span class="glyphicon glyphicon-align-right glyph-icon glyphicon-calendar"> {{ctrl.buttonLabel}} </span>
                       </button>
                   </span> 
               </div>
               <input type="button" class="picker-close" ng-click="ctrl._close()" value="Close" ng-show="false"/>
        `;

        var datePicker = `
               <!-- date view - default view -->
               <div class="date-picker" ng-show="ctrl.view == 'DATE'">                
                    <table>
                        <thead>
                            <!-- TODO year forward and backward -->
                           
                            <tr>
                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevMonth()"></a></td><td colspan="2" ng-click="ctrl._switchToMonthView()">{{ctrl._currentDate.format("MMMM")}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextMonth()"></a></td>
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
                        <tfoot ng-if="ctrl.pickerMode != 'DATE'">
                            <tr>
                                <td class="calendarWeek"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <!-- colspan not working for strange kind of reasons -->
                                <td class="glyphicon glyphicon-time" ng-click="ctrl._switchToTimeView()"></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <div class="button-group bottom-buttons">
                        <input type="button" class="clear btn btn-default btn-sm" ng-click="ctrl._clear()" value="Clear" />
                        <input type="button" class="today btn btn-default btn-sm" ng-click="ctrl._today()" value="Today" />
                        <input type="button" class="picker-close btn btn-default btn-sm" ng-click="ctrl._close()" value="Close" />
                    </div>
               </div> 
        `;

        var monthPicker = `
            <!-- month view -->
            <div class="month-picker" ng-if="ctrl.view == 'MONTH'">
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
                            <td ng-repeat="month in monthRow" ng-class="{'invalid': month.invalid, 'selected' : ctrl._isSameMonth(month), 'today': ctrl._isTodayMonth(month)}"
                            ng-click="ctrl._selectMonth(month)"
                            >{{::month.month}}</td>
                        </tr>
                    </tbody>
                 </table>   
            
                <div class="button-group bottom-buttons">
                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
                </div>
            </div>    
        `;

        var yearPicker = `
            <!-- year view -->  
            <div class="year-picker" ng-if="ctrl.view == 'YEAR'">
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
                            ng-class="{'invalid': year.invalid, 'selected' : ctrl._isSameYear(year), 'today': ctrl._isTodayYear(year)}"
                             ng-click="ctrl._selectYear(year)"
                            >{{::year.year}}</td></td>
                        </tr>
                    </table>
                  <div class="button-group bottom-buttons">
                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
                  </div>
            </div>   
        `;

        var timePickerSpinning = `
            <div class="time-picker" ng-if="ctrl.view == 'TIME'">
                <table>
                    <thead>
                        <tr>
                            <td colspan="8" ng-click="ctrl._goBackInView()">{{ctrl.innerSelection}}</td>
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td class="glyphicon glyphicon-chevron-up" ng-class="{'invalid' : !ctrl._isValidHour(ctrl._currentDate.get('hour') + 1)}" ng-click="ctrl._nextHour()">
                            </td>
                            <td class="glyphicon glyphicon-chevron-up" ng-class="{'invalid' : !ctrl._isValidMinute(ctrl._currentDate.get('minute') + 1)}" ng-click="ctrl._nextMinute()">
                            </td>
                        </tr>
                        <tr>
                            <td class="selected-hour">
                                <internal-range-input class="hour-input" from="0" to="23" ng-model="ctrl.currentHour"/>    
                            </td>
                            <td class="selected-minute">
                                <internal-range-input class="minute-input" from="0" to="59" ng-model="ctrl.currentMinute"/> 
                            </td>
                        </tr>
                         <tr>
                            <td class="glyphicon glyphicon-chevron-down" ng-class="{'invalid' : !ctrl._isValidHour(ctrl._currentDate.get('hour') - 1)}" ng-click="ctrl._prevHour()">
                            </td>
                            <td class="glyphicon glyphicon-chevron-down" ng-class="{'invalid' : !ctrl._isValidMinute(ctrl._currentDate.get('minute') - 1)}" ng-click="ctrl._prevMinute()">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-group bottom-buttons">
                  <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
                </div>
            </div>
        `;


        return `
           <div class="dropdown"> 
                ${inputArea}
               <div class="dropdown-menu picker-popup ">
                   ${datePicker}
                   
                   ${monthPicker}                   
                         
                   ${yearPicker}
                   
                   ${timePickerSpinning}
                </div>
            </div>   
                 
        `;
    };

    controllerAs = "ctrl";

    bindings: any = {
        name: "@",
        timezone: "@",
        startDate: "<",
        endDate: "<",
        dateFormat: "@",
        placeholder: "@",
        buttonLabel: "@",
        pickerMode: "@"
    };

    require: any = {
        "ngModel": 'ngModel',
    };

    controller: any = ["$scope", "$element", "$timeout",
        function ($scope: IScope, $element: JQuery, $timeout: ITimeoutService) {

            this.buttonLabel = ("undefined" == typeof  this.buttonLabel || null == this.buttonLabel) ? "Date" : this.buttonLabel;

            this.pickerMode = ("undefined" == typeof  this.pickerMode || null == this.pickerMode) ? "DATE" : this.pickerMode;

            this.visibleDays = [];

            this.view = "DATE";

            this.viewStack = [];

            /**
             * fetches the current or default timezone
             * @returns {string}
             * @private
             */
            var _getTimezone = (): string => {
                return this.timezone || moment.tz.guess();
            };

            var _getDateFormat = (): string => {
                return this.dateFormat || ((this.pickerMode === "DATE") ? "DD.MM.YYYY" : "DD.MM.YYYY HH:mm");
            };


            /**
             * formats a date by using the controls appended parsers
             * this has to be done this way because somone could decorate
             * the control from outside
             *
             * @param value
             * @private
             */
            var _format = (value: Date) => {
                var innerSelection = value;
                for (var cnt = 0; this.ngModel.$formatters && cnt < this.ngModel.$formatters.length; cnt++) {
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
            this._isSelectedDate = (selectedDate: PickerDate) => {
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
            this._isToday = (selectedDate: PickerDate) => {

                var modelDate = moment.tz(new Date(), _getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "date") &&
                    modelDate.isSame(selectedDate.momentDate, "month") &&
                    modelDate.isSame(selectedDate.momentDate, "year");

            };

            this._isTodayMonth = (selectedDate: PickerMonth) => {

                var modelDate = moment.tz(new Date(), _getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "month") &&
                    modelDate.isSame(selectedDate.momentDate, "year");

            };

            this._isSameMonth = (selectedMonth: PickerMonth) => {
                return this._currentDate.isSame(selectedMonth.momentDate, "month") &&
                    this._currentDate.isSame(selectedMonth.momentDate, "year");
            };


            this._isTodayYear = (selectedDate: PickerYear) => {

                var modelDate = moment.tz(new Date(), _getTimezone());
                return modelDate.isSame(selectedDate.momentDate, "year");

            };

            this._isSameYear = (selectedMonth: PickerYear) => {
                return this._currentDate.isSame(selectedMonth.momentDate, "year");
            };

            /**
             * checks if the time given is valid in the scope of the date selected
             *
             * @param hour
             * @param minute
             * @returns {boolean}
             * @private
             */
            this._isValidTime = (hour: number, minute: number): boolean => {

                if(hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                    return false;
                }

                var temporaryDate = moment.tz(this._currentDate.toDate(), _getTimezone());
                var momentStartDate = (this.startDate) ? moment.tz(this.startDate, _getTimezone()).startOf("day") : null;
                var momentEndDate = (this.endDate) ? moment.tz(this.endDate, _getTimezone()).endOf("day") : null;

                temporaryDate.set("hour", hour).set("minute", minute);
                return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
            };

            /**
             * checks for a valid hour
             * @param hour
             * @returns {boolean}
             * @private
             */
            this._isValidHour = (hour: number): boolean => {
                if(hour < 0 || hour > 23) {
                    return false;
                }
                var temporaryDate = moment.tz(this._currentDate.toDate(), _getTimezone());
                var momentStartDate = (this.startDate) ? moment.tz(this.startDate, _getTimezone()) : null;
                var momentEndDate = (this.endDate) ? moment.tz(this.endDate, _getTimezone()) : null;
                temporaryDate.set("hour", hour);

                return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
            };

            /**
             * checks for a valid minute
             * @param minute
             * @returns {boolean}
             * @private
             */
            this._isValidMinute = (minute: number): boolean => {
                if(minute < 0 || minute > 59) {
                    return false;
                }
                var temporaryDate = moment.tz(this._currentDate.toDate(), _getTimezone());
                var momentStartDate = (this.startDate) ? moment.tz(this.startDate, _getTimezone()) : null;
                var momentEndDate = (this.endDate) ? moment.tz(this.endDate, _getTimezone()) : null;
                temporaryDate.set("minute", minute);
                return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
            };

            this._nextHour = () => {
                if(!this._isValidHour(this._currentDate.get("hour") + 1)) {
                    return;
                }
                this._currentDate.add("hour", 1);
                _format(this._currentDate.toDate());
            };

            this._prevHour = () => {
                if(!this._isValidHour(this._currentDate.get("hour") - 1)) {
                    return;
                }
                this._currentDate.subtract("hour", 1);
                _format(this._currentDate.toDate());
            };

            this._nextMinute = () => {
                if(!this._isValidMinute(this._currentDate.get("minute") + 1)) {
                    return;
                }
                this._currentDate.add("minute", 1);
                _format(this._currentDate.toDate());
            };

            this._prevMinute = () => {
                if(!this._isValidMinute(this._currentDate.get("minute") - 1)) {
                    return;
                }
                this._currentDate.subtract("minute", 1);
                _format(this._currentDate.toDate());
            };

            /*we do the proper max min date validity checks over our setters*/
            Object.defineProperty(this, "currentHour", {
                get: (): number => {
                    return this._currentDate.get("hour");
                },
                set: (val: number) => {
                    if(!this._isValidHour(val)) {
                        return;
                    }
                    this._currentDate.set("hour", val);
                    _format(this._currentDate.toDate());
                }
            });

            Object.defineProperty(this, "currentMinute", {
                get: (): number => {
                    return this._currentDate.get("minute");
                },
                set: (val: number) => {
                    if(!this._isValidMinute(val)) {
                        return;
                    }
                    this._currentDate.set("minute", val);
                    _format(this._currentDate.toDate());
                }
            });

            /**
             * helper function to push the current date into its max min range
             * bo
             * @private
             */
            this._fixCurrentDate = () => {
                var parsedData = this._currentDate;
                var startDate: moment.Moment = (this.startDate) ? moment.tz(this.startDate, _getTimezone()) : null;
                var endDate: moment.Moment = (this.endDate) ? moment.tz(this.endDate, _getTimezone()) : null;

                if (startDate && moment.tz(parsedData, _getTimezone()).isBefore(startDate)) {
                    this._currentDate  = startDate;
                }
                if (endDate && moment.tz(parsedData, _getTimezone()).isAfter(endDate)) {
                    this._currentDate  = endDate;
                }

            };

            /**
             * select a date from the outside
             * @param selectedDate
             * @private
             */
            this._selectDate = (selectedDate: PickerDate) => {
                if (!selectedDate.invalid) {
                    if (!this.ngModel.$modelValue) {
                        this._currentDate = selectedDate.momentDate;
                    }

                    //we also have to update our currently selected date
                    this._currentDate.set("date", selectedDate.momentDate.get("date"));
                    this._currentDate.set("month", selectedDate.momentDate.get("month"));
                    this._currentDate.set("year", selectedDate.momentDate.get("year"));
                    if (this.pickerMode === "DATE") {
                        this._currentDate = this._currentDate.startOf("day");
                    }

                    var startDate: moment.Moment = (this.startDate) ? moment.tz(this.startDate, _getTimezone()) : null;
                    var endDate: moment.Moment = (this.endDate) ? moment.tz(this.endDate, _getTimezone()) : null;

                    if(startDate && this._currentDate.isBefore(startDate)) {
                        this._currentDate = startDate;
                    }

                    if(endDate && this._currentDate.isAfter(endDate)) {
                        this._currentDate = endDate;
                    }
                    this._fixCurrentDate();
                    _format(this._currentDate.toDate());
                    /*in case of a date mode we are done*/
                    if (this.pickerMode === "DATE") {
                        this._close();
                    }

                }
            };

            /**
             * select a date from the outside
             * @param selectedDate
             * @private
             */
            this._selectMonth = (selectedDate: PickerMonth) => {
                if (!selectedDate.invalid) {
                    if (!this.ngModel.$modelValue) {
                        this._currentDate = selectedDate;
                    } else {
                        //we also have to update our currently selected date
                        this._currentDate.set("month", selectedDate.momentDate.get("month"));
                        this._currentDate.set("year", selectedDate.momentDate.get("year"));
                    }
                    this._fixCurrentDate();
                    if(this.pickerMode != "DATE") {
                        _format(this._currentDate.toDate());
                    }
                    this._updatePickerData();
                    this._goBackInView();
                }

            };

            /**
             * select a date from the outside
             * @param selectedDate
             * @private
             */
            this._selectYear = (selectedDate: PickerYear) => {
                if (!selectedDate.invalid) {
                    if (!this.ngModel.$modelValue) {
                        this._currentDate = selectedDate;
                    } else {
                        var value = moment.tz(this.ngModel.$modelValue, _getTimezone());
                        this._currentDate.set("year", selectedDate.momentDate.get("year"));

                    }
                    this._fixCurrentDate();
                    if(this.pickerMode != "DATE") {
                        _format(this._currentDate.toDate());
                    }
                    this._updatePickerData();
                    this._goBackInView();
                }
            };


            this._updatePickerData = () => {
                this.monthPickerData = ViewModelBuilder.calculateDateView(this._currentDate.toDate(), this.startDate, this.endDate, _getTimezone());
                this.yearPickerData = ViewModelBuilder.calculateMonthView(this._currentDate.toDate(), this.startDate, this.endDate, _getTimezone());
                this.decadePickerData = ViewModelBuilder.calculateYearView(this._currentDate.toDate(), this.startDate, this.endDate, _getTimezone());

                var offset = this._currentDate.get("year") % 20 - 1;
                this.decadeFrom = moment.tz(this._currentDate.toDate(), _getTimezone()).subtract("year", offset).format("YYYY");

                var offset = this._currentDate.get("year") % 20 - 1;
                var nextDecadeOffset = 20 - offset - 1;
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
                //this.pickerVisible = true;
                $element.find(".dropdown").addClass("open");


                if (!this.documentClickHandler) {
                    $timeout(() => {
                        BehavioralFixes.registerDocumentBindings($element, this);
                    });
                }
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
                this.view = "DATE";
                this.viewStack = [];
                this.pickerVisible = false;
                BehavioralFixes.unregisterDocumentBindings(this);
                $element.find(".dropdown").removeClass("open");
            };

            this._switchToMonthView = () => {
                this.viewStack.unshift(this.view);
                this.view = "MONTH";
            };

            this._switchToYearView = () => {
                this.viewStack.unshift(this.view);
                this.view = "YEAR";
            };


            this._switchToTimeView = () => {
                this.viewStack.unshift(this.view);
                this.view = "TIME";
            };

            this._goBackInView = () => {
                this._updatePickerData();
                this.view = this.viewStack.shift();
            };

            //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
            $scope.$watch('ctrl.innerSelection', (newval: string, oldval: string) => {
                if (newval != oldval) {
                    this.ngModel.$setViewValue(newval);
                }
            });

            this.$postLink = () => {

                /**
                 * we turn off event propagation
                 * for the popup so that a click within the popup
                 * does not propagate to its parent elements
                 * (we only want to have the popup closed when we click on the outside)
                 *
                 */
                BehavioralFixes.registerPopupBindings($element);

                /**
                 * we change the key handling a little bit
                 * an enter should trigger a form submit
                 * and a keydown should open the picker
                 */
                BehavioralFixes.registerKeyBindings($element);

                //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                this.ngModel.$render = () => {
                    this.innerSelection = this.ngModel.$viewValue;
                };

                /*
                 * registers the internal parsers, validators and formatters
                 * into the ngModel for the date string conversion
                 */
                this.ngModel.$parsers.push((data: string) => {
                    if (data == "") {
                        return null;
                    }

                    var parsedData = moment.tz(data, _getDateFormat(), _getTimezone()).toDate();
                    var startDate: moment.Moment = (this.startDate) ? moment.tz(this.startDate, _getTimezone()) : null;
                    var endDate: moment.Moment = (this.endDate) ? moment.tz(this.endDate, _getTimezone()) : null;

                    if (startDate && moment.tz(parsedData, _getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
                        return this.startDate;
                    }
                    if (endDate && moment.tz(parsedData, _getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
                        return this.endDate;
                    }
                    return parsedData;
                });

                /**
                 * checks if the input is valid
                 * @param data
                 * @param viewValue
                 * @returns {boolean}
                 */
                this.ngModel.$validators.validDate = (data: Date, viewValue: string) => {
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
                this.ngModel.$validators.dateRange = (data: Date, viewValue: string) => {
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
                this.ngModel.$formatters.push((data: Date) => {
                    if (data == null) {
                        return "";
                    }
                    var timezone = this.timezone || moment.tz.guess();
                    return moment.tz(data, timezone).format(_getDateFormat());
                });
            };

            this.$onDestroy = () => {
                BehavioralFixes.unregisterDocumentBindings(this);
            }
        }

    ];
}


(<any>angular).module('werpu.bootstrap.picker', []).component("datePicker", new DatePicker()).component("internalRangeInput", new RangeInput());


