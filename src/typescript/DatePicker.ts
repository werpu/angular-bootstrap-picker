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
import {PickerDate, PickerMonth, PickerYear, DatePickerPage, MonthPickerPage, YearPickerPage} from "./DatePickerTypes";
import {RangeInput} from "./RangeInput";
import Moment = moment.Moment;
import {DateUtils} from "./DateUtils";
import INgModelController = angular.INgModelController;


class PickerConstants {
    static DEFAULT_DATE_FORMAT = "DD.MM.YYYY";
    static DEFAULT_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
    static DEFAULT_PICKER_MODE = "DATE";
    static PICKER_VIEW_DATE = "DATE";
    static PICKER_VIEW_TIME = "TIME";
    static PICKER_VIEW_MONTH = "MONTH";
    static PICKER_VIEW_YEAR = "YEAR";
    static DEFAULT_PICKER_LABEL = "Date";

}

class _DatePickerView {
    static template() {
        var inputArea = `
                <div class="input-group">
                   <input type="text" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection">
                   <span class="input-group-btn">
                       <button type="button" class="picker-open btn btn-default" ng-click="ctrl._openPicker()">
                             <span class="glyphicon glyphicon-align-right glyph-icon glyphicon-calendar"> {{ctrl.buttonLabel}} </span>
                       </button>
                   </span> 
               </div>
               <input type="button" class="picker-close" ng-click="ctrl._close()" value="Close" ng-show="false"/>
        `;


        var inputAreaHidden = `
           <input type="text" style="display: none;" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection">
        `;

        var timePickerSpinning = `
            <div class="time-picker" ng-if="ctrl.view == 'DATE' && ctrl.pickerMode == 'DATE_TIME'" >
                <table>
                   <thead>
                        
                    </thead>
                    <tbody>
                        
                         <tr>
                            <td class="glyphicon glyphicon-chevron-up" ng-class="{'invalid' : !ctrl._isValidHour(ctrl._currentDate.get('hour') + 1)}" ng-click="ctrl._nextHour()">
                            </td>
                            <td></td>
                            <td class="glyphicon glyphicon-chevron-up" ng-class="{'invalid' : !ctrl._isValidMinute(ctrl._currentDate.get('minute') + 1)}" ng-click="ctrl._nextMinute()">
                            </td>
                        </tr>
                        <tr>
                            <td class="selected-hour">
                                <internal-range-input class="hour-input" from="0" to="23" ng-model="ctrl.currentHour"/>    
                            </td>
                            <td class="invalid">:</td>
                            <td class="selected-minute">
                                <internal-range-input class="minute-input" from="0" to="59" ng-model="ctrl.currentMinute"/> 
                            </td>
                        </tr>
                         <tr>
                            <td class="glyphicon glyphicon-chevron-down" ng-class="{'invalid' : !ctrl._isValidHour(ctrl._currentDate.get('hour') - 1)}" ng-click="ctrl._prevHour()">
                            </td>
                            <td></td>
                            <td class="glyphicon glyphicon-chevron-down" ng-class="{'invalid' : !ctrl._isValidMinute(ctrl._currentDate.get('minute') - 1)}" ng-click="ctrl._prevMinute()">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-group bottom-buttons" ng-if="ctrl.view == 'TIME'">
                  <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
                </div>
            </div>
        `;

        var datePicker = `
               <!-- date view - default view -->
               <div class="date-picker" ng-if="ctrl.view == 'DATE'">                
                    <table>
                        <thead>
                            <!-- TODO year forward and backward -->
                        
                            <tr ng-if="ctrl.pickerMode == 'DATE_TIME'">
                                <td colspan="8" class="invalid picker-title" >{{ctrl.innerSelection}}</td>
                            </tr>
                            
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
                                <td class="day" ng-repeat="day in week.days" ng-class="{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl._isSelectedDate(day), 'chosen' : ctrl._isChosenDate(day), 'today': ctrl._isToday(day)}" ng-click="ctrl._selectDate(day)">{{::day.day}}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                
                    ${timePickerSpinning}
                    
                    <div class="additional-content" ng-transclude="additionalContentDate"></div>
                    
                    <div class="button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="additional-buttons" ng-transclude="additionalButtonsDate"></div>
                        <input type="button" class="Sset btn btn-default btn-sm" ng-click="ctrl._set()" value="Set" ng-if="ctrl.pickerOnlyMode == 'DOUBLE_BUFFERED'" />
                        <input type="button" class="clear btn btn-default btn-sm" ng-click="ctrl._clear()" value="Clear" ng-if="!ctrl.pickerOnlyMode" />
                        <input type="button" class="today btn btn-default btn-sm" ng-click="ctrl._today()" value="Today" />
                        <input type="button" class="picker-close btn btn-default btn-sm" ng-click="ctrl._close()" ng-if="!ctrl.pickerOnlyMode" value="Close" ng-if="!ctrl.pickerOnlyMpde" />
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
                            <td ng-repeat="month in monthRow" ng-class="{'invalid': month.invalid, 'selected' : ctrl._isSameMonth(month), 'chosen' : ctrl._isChosenMonth(month), 'today': ctrl._isTodayMonth(month)}"
                            ng-click="ctrl._selectMonth(month)"
                            >{{::month.month}}</td>
                        </tr>
                    </tbody>
                 </table>   
            
                 <div class="additional-content" ng-transclude="additionalContentMonth"></div>
                <div class="button-group bottom-buttons">
                    <div class="additional-buttons" ng-transclude="additionalButtonsMonth"></div>
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
                        <td colspan="3" class="no-link">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>
                        <td><a ng-click="ctrl._nextDecade()" class="glyphicon glyphicon-menu-right"></a></td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="yearrow in ctrl.decadePickerData.row">
                            <td ng-repeat="year in yearrow"
                            ng-class="{'invalid': year.invalid, 'selected' : ctrl._isSameYear(year), 'chosen' : ctrl._isChosenYear(year), 'today': ctrl._isTodayYear(year)}"
                             ng-click="ctrl._selectYear(year)"
                            >{{::year.year}}</td></td>
                        </tr>
                    </table>
                  <div class="additional-content" ng-transclude="additionalContentYear"></div>  
                  <div class="button-group bottom-buttons">
                    <div class="additional-buttons" ng-transclude="additionalButtonsYear"></div>
                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />
                  </div>
            </div>   
        `;


        return `
           <div class="dropdown" ng-if="!ctrl.pickerOnlyMode"> 
                ${inputArea} 
               <div class="dropdown-menu picker-popup">
                    <div class="content" ng-if="ctrl.isOpen">
                       ${datePicker}
                       
                       ${monthPicker}                   
                             
                       ${yearPicker}
                   </div>
               
                </div>
            </div> 
            <div class="dropdown picker-standalone" ng-if="ctrl.pickerOnlyMode">
                 ${inputAreaHidden}
                 <div class="picker-popup">
                  <div class="content"> 
                     ${datePicker}
                           
                     ${monthPicker}                   
                                 
                     ${yearPicker}
                 </div>
                 </div>
            </div>  
                 
        `;
    }

    static bindings = {
        name: "@",
        timezone: "@",
        startDate: "<",
        endDate: "<",
        dateFormat: "@",
        placeholder: "@",
        buttonLabel: "@",
        pickerMode: "@",
        pickerOnlyMode: "@",
        endOfDay: "<",
        /*callback whenever a date is selected*/
        onYearSelection: "&", /*function($picker, $date) callback for the year selection*/
        onMonthSelection: "&", /*function($picker, $date) callback for the month selection*/
        onDateSelection: "&" /*function($picker, $date) callback for the date selection*/
    };

    static require = {
        "ngModel": 'ngModel',
    };

    static transclude = {
        additionalButtonsDate: "?additionalButtonsDate", /*transclusion to add additional buttons*/
        additionalContentDate: "?additionalContentDate", /*transclusion to add additional content*/

        additionalButtonsMonth: "?additionalButtonsMonth", /*transclusion to add additional buttons*/
        additionalContentMonth: "?additionalContentMonth", /*transclusion to add additional content*/

        additionalButtonsYear: "?additionalButtonsYear", /*transclusion to add additional buttons*/
        additionalContentYear: "?additionalContentYear" /*transclusion to add additional content*/
    };

    static controllerAs = "ctrl";
}

class _DatePickerController {

    _currentDate: Moment;

    _doubleBufferDate: Moment;

    visibleDays: Array<any>;

    view: string;

    viewStack: Array<string>;

    ngModel: INgModelController;

    innerSelection: string;

    pickerVisible: boolean;

    selectedDate: PickerDate;

    selectedMonth: PickerMonth;

    selectedYear: PickerYear;

    monthPickerData: DatePickerPage;

    yearPickerData: MonthPickerPage;

    decadePickerData: YearPickerPage;

    decadeFrom: string;

    decadeTo: string;

    documentClickHandler: Function;








    /*bindings implementation*/
    //passed in bindings
    name: string;
    timezone: string;
    startDate: Date;
    endDate: Date;
    dateFormat: string;
    placeholder: string;
    buttonLabel: string;
    pickerMode: string;
    pickerOnlyMode: string;
    endOfDay: boolean;
    /*callback whenever a date is selected*/
    onYearSelection: Function;
    /*function($picker, $date) callback for the year selection*/
    onMonthSelection: Function;
    /*function($picker, $date) callback for the month selection*/
    onDateSelection: Function;
    /*function($picker, $date) callback for the date selection*/


    constructor(private $scope: IScope, private $element: JQuery, private $timeout: ITimeoutService) {

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

        this.buttonLabel = ("undefined" == typeof  this.buttonLabel || null == this.buttonLabel) ?
            PickerConstants.DEFAULT_PICKER_LABEL : this.buttonLabel;
        this.pickerMode = ("undefined" == typeof  this.pickerMode || null == this.pickerMode) ?
            PickerConstants.DEFAULT_PICKER_MODE : this.pickerMode;
        this.visibleDays = [];
        this.view = PickerConstants.PICKER_VIEW_DATE;
        this.viewStack = [];


        /*we do the proper max min date validity checks over our setters*/
        Object.defineProperty(this, "currentHour", {
            get: (): number => {
                if (!this._currentDate) {
                    return 0;
                }
                return this._currentDate.get("hour");
            },
            set: (val: number) => {
                if (!this._isValidHour(val)) {
                    return;
                }
                this._currentDate.set("hour", val);
                this._selectDate(new PickerDate(false, this._currentDate, 1, true));
            }
        });

        Object.defineProperty(this, "currentMinute", {
            get: (): number => {
                if (!this._currentDate) {
                    return 0;
                }
                return this._currentDate.get("minute");
            },
            set: (val: number) => {
                if (!this._isValidMinute(val)) {
                    return;
                }
                this._currentDate.set("minute", val);
                this._selectDate(new PickerDate(false, this._currentDate, 1, true));
            }
        });


        //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
        $scope.$watch('ctrl.innerSelection', (newval: string, oldval: string) => {
            if (newval != oldval) {
                this.ngModel.$setViewValue(newval);
            }
        });

        /**
         * if the startDate shifts and the currentDate is smaller
         * then the min date then we have to shift the date over
         * to the new minDate
         */
        $scope.$watch('ctrl.startDate', (newval: Date, oldval: Date) => {
            if (newval && this._currentDate) {
                var newMinDate = moment.tz(newval, this._getTimezone());
                //no date change or mindate < than the currentDate in the min date, we safely can skip
                //the rest of the date processing
                if (newMinDate.isSameOrBefore(this._currentDate)) {
                    $timeout(() => {
                        this._updatePickerData();
                    });
                    return;
                }

                //otherwise we set the currentDate to the newMinDate
                this._currentDate = (this.endOfDay) ? newMinDate.endOf("day") : newMinDate;

                //currentDate != modelValue?
                var currentModel = moment.tz(this.ngModel.$modelValue, this._getTimezone());
                //if there is a discrepancy we also update the model
                if (this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || this.pickerOnlyMode) {
                    if (!currentModel || currentModel.get("day") != this._currentDate.get("day") ||
                        currentModel.get("month") != this._currentDate.get("month") ||
                        currentModel.get("year") != this._currentDate.get("year")
                    ) {
                        this._selectDate(new PickerDate(false, this._currentDate, 1, true));

                    }
                }
            }
            if (this._currentDate) {
                $timeout(() => {
                    this._updatePickerData();
                });
            }
        });

    }


    /**
     * fetches the current or default timezone
     * @returns {string}
     * @private
     */
    private _getTimezone = (): string => {
        return this.timezone || moment.tz.guess();
    };

    /**
     * fetches the date format set in the component either from outside or by its defaults
     * @returns {string}
     * @private
     */
    private _getDateFormat = (): string => {
        return this.dateFormat || ((this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) ?
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
    private _updateModel = (value: Date) => {
        var innerSelection: any = value;
        for (var cnt = 0; this.ngModel.$formatters && cnt < this.ngModel.$formatters.length; cnt++) {
            innerSelection = this.ngModel.$formatters[cnt](innerSelection);
        }

        this.innerSelection = innerSelection;
        this.$timeout(() => {
            this._updatePickerData();
        });
    };


    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    _isSelectedDate(selectedDate: PickerDate) {
        if (!this.ngModel.$modelValue) {
            return false;
        } else {
            var modelDate = moment.tz(this.ngModel.$modelValue, this._getTimezone());
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
    _isChosenDate(selectedDate: PickerDate) {
        if (!this._doubleBufferDate) {
            return false;
        } else {
            //booga
            var modelDate = this._doubleBufferDate;
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
    _isToday(selectedDate: PickerDate) {
        return DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };

    _isTodayMonth(selectedDate: PickerMonth) {
        return DateUtils.isCurrentMonth(this.timezone, this.selectedDate.momentDate);
    };

    _isSameMonth(selectedMonth: PickerMonth) {
        return DateUtils.isSameMonth(this.timezone, this.ngModel.$modelValue, this.selectedMonth.momentDate);
    };

    _isChosenMonth(selectedMonth: PickerMonth) {
        if (!this._doubleBufferDate) {
            return false;
        }
        var modelDate = this._doubleBufferDate;
        return modelDate.isSame(selectedMonth.momentDate, "month") &&
            modelDate.isSame(selectedMonth.momentDate, "year");
    };


    _isTodayYear(selectedDate: PickerYear) {
        return DateUtils.isCurrentYear(this.timezone, selectedDate.momentDate);
    };

    _isSameYear(selectedYear: PickerYear) {
        return DateUtils.isSameYear(this.timezone, this.ngModel.$modelValue, selectedYear.momentDate);
    };

    _isChosenYear(selectedMonth: PickerYear) {
        if (!this._doubleBufferDate) {
            return false;
        }
        var modelDate = this._doubleBufferDate;
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
    private _isValidTime(hour: number, minute: number): boolean {

        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return false;
        }

        var temporaryDate = moment.tz(this._currentDate.toDate(), this._getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this._getTimezone()).startOf("day") : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this._getTimezone()).endOf("day") : null;

        temporaryDate.set("hour", hour).set("minute", minute);
        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    /**
     * checks for a valid hour, valid means the model date
     * @param hour
     * @returns {boolean}
     * @private
     */
    private _isValidHour(hour: number): boolean {
        if (hour < 0 || hour > 23) {
            return false;
        }
        var temporaryDate = moment.tz(this._currentDate.toDate(), this._getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this._getTimezone()) : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this._getTimezone()) : null;
        temporaryDate.set("hour", hour);

        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    /**
     * checks for a valid minute
     * @param minute
     * @returns {boolean}
     * @private
     */
    private _isValidMinute(minute: number): boolean {
        if (minute < 0 || minute > 59) {
            return false;
        }
        var temporaryDate = moment.tz(this._currentDate.toDate(), this._getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this._getTimezone()) : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this._getTimezone()) : null;
        temporaryDate.set("minute", minute);
        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    _nextHour() {
        if (!this._isValidHour(this._currentDate.get("hour") + 1)) {
            return;
        }
        this._currentDate.add(1, "hour");
        this._selectDate(new PickerDate(false, this._currentDate, 1, true));
    };

    _prevHour() {
        if (!this._isValidHour(this._currentDate.get("hour") - 1)) {
            return;
        }
        this._currentDate.subtract(1, "hour");
        this._selectDate(new PickerDate(false, this._currentDate, 1, true));
    };

    _nextMinute() {
        if (!this._isValidMinute(this._currentDate.get("minute") + 1)) {
            return;
        }
        this._currentDate.add(1, "minute");
        this._selectDate(new PickerDate(false, this._currentDate, 1, true));
    };

    _prevMinute() {
        if (!this._isValidMinute(this._currentDate.get("minute") - 1)) {
            return;
        }
        this._currentDate.subtract(1, "minute");
        this._selectDate(new PickerDate(false, this._currentDate, 1, true));
    };

    /**
     * helper function to push the current date into its max min range
     *
     * @private
     */
    private _fixCurrentDate() {
        var parsedData = this._currentDate;
        var startDate: moment.Moment = (this.startDate) ? moment.tz(this.startDate, this._getTimezone()) : null;
        var endDate: moment.Moment = (this.endDate) ? moment.tz(this.endDate, this._getTimezone()) : null;

        if (startDate && moment.tz(parsedData, this._getTimezone()).isBefore(startDate)) {
            this._currentDate = startDate;
        }
        if (endDate && moment.tz(parsedData, this._getTimezone()).isAfter(endDate)) {
            this._currentDate = endDate;
        }

    };

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    _selectDate(selectedDate: PickerDate) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
                this._currentDate = selectedDate.momentDate;
                if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                    this._doubleBufferDate = moment.tz(this._currentDate.toDate(), this._getTimezone());
                }
            }

            //sometimes we pass the current date in, in this case no
            //Value traversal needs to be performed
            if (this._currentDate != selectedDate.momentDate) {
                this._currentDate.set("date", selectedDate.momentDate.get("date"));
                this._currentDate.set("month", selectedDate.momentDate.get("month"));
                this._currentDate.set("year", selectedDate.momentDate.get("year"));
            }

            if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) {

                (!this.endOfDay) ? this._currentDate.startOf("day") : this._currentDate.endOf("day");
            }

            this._fixCurrentDate();

            if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                this._doubleBufferDate = moment.tz(this._currentDate.toDate(), this._getTimezone());
            }

            if (!this.pickerOnlyMode || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                this._updateModel(this._currentDate.toDate());
            }

            this.onDateSelection({
                $picker: this,
                $date: this._currentDate.toDate()
            });

            /*in case of a date mode we are done*/
            if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE && !this.pickerOnlyMode) {
                this._close();
            }

        }

    }

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    _selectMonth(selectedDate: PickerMonth) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
                this._currentDate = moment.tz(new Date(), this._getTimezone());
                this._currentDate.set("month", selectedDate.momentDate.get("month"));

            } else {
                //we also have to update our currently selected date
                this._currentDate.set("month", selectedDate.momentDate.get("month"));
                this._currentDate.set("year", selectedDate.momentDate.get("year"));
            }
            this._fixCurrentDate();
            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
             this._selectDate(new PickerDate(false, this._currentDate, 1, true));
             }*/
            this.onMonthSelection({
                $picker: this,
                $date: this._currentDate.toDate()
            });
            this._goBackInView();
        }

    };

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    _selectYear(selectedDate: PickerYear) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
                this._currentDate = moment.tz(new Date(), this._getTimezone());
                this._currentDate.set("year", selectedDate.momentDate.get("year"));

            } else {
                var value = moment.tz(this.ngModel.$modelValue, this._getTimezone());
                this._currentDate.set("year", selectedDate.momentDate.get("year"));

            }
            this._fixCurrentDate();
            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
             this._selectDate(new PickerDate(false, this._currentDate, 1, true));
             }*/
            this.onYearSelection({
                $picker: this,
                $date: this._currentDate.toDate()
            });
            this._goBackInView();
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
    _updatePickerData() {
        this.monthPickerData = ViewModelBuilder.calculateDateView(this._currentDate.toDate(), this.startDate, this.endDate, this._getTimezone());
        this.yearPickerData = ViewModelBuilder.calculateMonthView(this._currentDate.toDate(), this.startDate, this.endDate, this._getTimezone());
        this.decadePickerData = ViewModelBuilder.calculateYearView(this._currentDate.toDate(), this.startDate, this.endDate, this._getTimezone());

        var offset = this._currentDate.get("year") % 20 - 1;
        this.decadeFrom = moment.tz(this._currentDate.toDate(), this._getTimezone()).subtract(offset, "year").format("YYYY");

        var offset = this._currentDate.get("year") % 20 - 1;
        var nextDecadeOffset = 20 - offset - 1;
        this.decadeTo = moment.tz(this._currentDate.toDate(), this._getTimezone()).add(nextDecadeOffset, "year").format("YYYY");

    };


    /**
     * opens the date picker
     *
     * @private
     */
    _openPicker() {


        var timezone = this.timezone || moment.tz.guess();

        this._currentDate = (this.ngModel.$modelValue) ? moment.tz(this.ngModel.$modelValue, timezone) : moment.tz(new Date(), timezone);

        this._updatePickerData();
        //this.pickerVisible = true;
        BehavioralFixes.openDropDown(this.$element, this);


        if (!this.documentClickHandler) {
            this.$timeout(() => {
                BehavioralFixes.registerDocumentBindings(this.$element, this);
            });
        }
    };

    /**
     * goes the the previous month
     * @private
     */
    _prevMonth() {
        this._currentDate = this._currentDate.subtract(1, "month");
        this._updatePickerData();
    };

    /**
     * goes to the next month
     * @private
     */
    _nextMonth() {
        this._currentDate = this._currentDate.add(1, "month");
        this._updatePickerData();
    };

    /**
     * goes to the previous year
     * @private
     */
    _prevYear() {
        this._currentDate = this._currentDate.subtract(1, "year");
        this._updatePickerData();
    };

    /**
     * goes to the next year
     * @private
     */
    _nextYear() {
        this._currentDate = this._currentDate.add(1, "year");
        this._updatePickerData();
    };


    /**
     * goes to the previous year
     * @private
     */
    _prevDecade() {
        this._currentDate = this._currentDate.subtract(20, "year");
        this._updatePickerData();
    };

    /**
     * goes to the next year
     * @private
     */
    _nextDecade() {
        this._currentDate = this._currentDate.add(20, "year");
        this._updatePickerData();
    };

    /**
     * clears the selection
     * @private
     */
    _clear() {
        this.innerSelection = "";
    };

    /**
     * jumps to today in the selection
     * @private
     */
    _today() {
        this._currentDate = moment.tz(new Date(), this._getTimezone());
        if (this.pickerMode == PickerConstants.DEFAULT_PICKER_MODE) {
            this._currentDate.startOf("day");
        }
        this._fixCurrentDate();
        this._updateModel(this._currentDate.toDate());
        this._close();
    };

    /**
     * closes the data picker
     * @private
     */
    _close() {
        this.view = PickerConstants.DEFAULT_PICKER_MODE;
        this.viewStack = [];
        this.pickerVisible = false;
        BehavioralFixes.unregisterDocumentBindings(this);
        BehavioralFixes.closeDropDown(this.$element, this);
    };

    /**
     * set for double buffered mode
     *
     * @private
     */
    _set() {
        if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
            this._currentDate = moment.tz(this._doubleBufferDate.toDate(), this._getTimezone());
        }
        this._updateModel(this._currentDate.toDate());
    };

    /**
     * switches to the month view
     * @private
     */
    _switchToMonthView() {
        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_MONTH;
    };

    /**
     * switches to the year view
     * @private
     */
    _switchToYearView() {
        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_YEAR;
    };

    /**
     * switches to the time view
     * @private
     */
    _switchToTimeView() {
        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_TIME;
    };

    /**
     * goes back one view
     * @private
     */
    _goBackInView() {
        this._updatePickerData();
        this.view = this.viewStack.shift();
    };


    $postLink() {
        this.$timeout(() => {
            /**
             * we turn off event propagation
             * for the popup so that a click within the popup
             * does not propagate to its parent elements
             * (we only want to have the popup closed when we click on the outside)
             *
             */
            BehavioralFixes.registerPopupBindings(this.$element);

            /**
             * we change the key handling a little bit
             * an enter should trigger a form submit
             * and a keydown should open the picker
             */
            BehavioralFixes.registerKeyBindings(this.$element);
        });


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

            var parsedData = (this.endOfDay) ? moment.tz(data, this._getDateFormat(), this._getTimezone()).endOf("day").toDate() : moment.tz(data, this._getDateFormat(), this._getTimezone()).toDate();
            var startDate: moment.Moment = (this.startDate) ? moment.tz(this.startDate, this._getTimezone()) : null;
            var endDate: moment.Moment = (this.endDate) ? moment.tz(this.endDate, this._getTimezone()) : null;


            if (startDate && moment.tz(parsedData, this._getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
                return this.startDate;
            }
            if (endDate && moment.tz(parsedData, this._getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
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
        (<any>this.ngModel.$validators).validDate = (data: Date, viewValue: string) => {
            if (!viewValue) {
                return true;
            }
            return moment.tz(viewValue, this._getDateFormat(), this._getTimezone()).isValid();
        };

        /**
         * checks if it is within the allowed date range if there is one
         * @param data
         * @param viewValue
         * @returns {boolean}
         */
        (<any>this.ngModel.$validators).dateRange = (data: Date, viewValue: string) => {
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
            return moment.tz(data, timezone).format(this._getDateFormat());
        });


        //update the picker data if we are in popupOnly mode
        if (this.pickerOnlyMode) {
            this._openPicker();
        }
    }

    $onDestroy() {
        BehavioralFixes.unregisterDocumentBindings(this);
    }


}


export class DatePicker implements IComponentOptions {
    template = _DatePickerView.template;
    controllerAs = _DatePickerView.controllerAs;
    bindings: any = _DatePickerView.bindings;
    transclude: any = _DatePickerView.transclude;
    require: any = _DatePickerView.require;

    controller: any = ["$scope", "$element", "$timeout", _DatePickerController];
}

//note this code is ported from github please do not change it here
(<any>angular).module('werpu.bootstrap.picker', []).component("datePicker", new DatePicker()).component("internalRangeInput", new RangeInput());


