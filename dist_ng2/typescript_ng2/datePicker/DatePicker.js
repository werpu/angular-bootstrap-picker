"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference path="../../../node_modules/@types/moment-range/index.d.ts" />
/// <reference path="../../../node_modules/@types/moment-timezone/index.d.ts" />
var core_1 = require("@angular/core");
var DatePickerTypes_1 = require("../../typescript/utils/DatePickerTypes");
var BehavioralFixes_1 = require("../../typescript/utils/BehavioralFixes");
var DateUtils_1 = require("../../typescript/utils/DateUtils");
var ViewModelBuilder_1 = require("../../typescript/utils/ViewModelBuilder");
var forms_1 = require("@angular/forms");
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
        BehavioralFixes_1.BehavioralFixes.registerPopupBindings(this.elementRef.nativeElement);
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
            this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
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
            this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
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
                    this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
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
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
    };
    ;
    DatePicker.prototype.prevHour = function (event) {
        if (!this.isValidHour(this.currentDate.get("hour") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "hour");
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
    };
    ;
    DatePicker.prototype.nextMinute = function (event) {
        if (!this.isValidMinute(this.currentDate.get("minute") + 1)) {
            return;
        }
        this.currentDate.add(1, "minute");
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
    };
    ;
    DatePicker.prototype.prevMinute = function (event) {
        if (!this.isValidMinute(this.currentDate.get("minute") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "minute");
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
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
        BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(this);
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
        BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(this);
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
//# sourceMappingURL=DatePicker.js.map