/// <reference path="../../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../../node_modules/moment/moment.d.ts" />

import INgModelController = angular.INgModelController;
import {
    PickerDate, PickerMonth, PickerYear, DatePickerPage, MonthPickerPage,
    YearPickerPage
} from "../utils/DatePickerTypes";
import IScope = angular.IScope;
import ITimeoutService = angular.ITimeoutService;
import {DateUtils, PickerConstants} from "../utils/DateUtils";
import {ViewModelBuilder} from "../utils/ViewModelBuilder";
import {BehavioralFixes} from "../utils/BehavioralFixes";



export class _DatePickerController {

    /**
     * internal controller vars
     */
    private doubleBufferDate: Moment;
    private visibleDays: Array<any>;
    private pickerVisible: boolean;
    private selectedDate: PickerDate;
    private selectedMonth: PickerMonth;
    private documentClickHandler: Function;


    /*used by view and controller outside of the bindings*/
    currentDate: Moment;
    view: string;
    private viewStack: Array<string>;
    ngModel: INgModelController;
    innerSelection: string;
    monthPickerData: DatePickerPage;
    yearPickerData: MonthPickerPage;
    decadePickerData: YearPickerPage;
    decadeFrom: string;
    decadeTo: string;



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

    buttonStyleClass: string;/*optional stylecass for the button*/


    constructor(private $scope: IScope, private $element: JQuery, private $timeout: ITimeoutService) {

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
                if (!this.currentDate) {
                    return 0;
                }
                return this.currentDate.get("hour");
            },
            set: (val: number) => {
                if (!this.isValidHour(val)) {
                    return;
                }
                this.currentDate.set("hour", val);
                this.selectDate(new PickerDate(false, this.currentDate, 1, true));
            }
        });

        Object.defineProperty(this, "currentMinute", {
            get: (): number => {
                if (!this.currentDate) {
                    return 0;
                }
                return this.currentDate.get("minute");
            },
            set: (val: number) => {
                if (!this.isValidMinute(val)) {
                    return;
                }
                this.currentDate.set("minute", val);
                this.selectDate(new PickerDate(false, this.currentDate, 1, true));
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
            if (newval && this.currentDate) {
                let newMinDate = moment.tz(newval, this.getTimezone());
                //no date change or mindate < than the currentDate in the min date, we safely can skip
                //the rest of the date processing
                if (newMinDate.isSameOrBefore(this.currentDate)) {
                    $timeout(() => {
                        this.updatePickerData();
                    });
                    return;
                }

                //otherwise we set the currentDate to the newMinDate
                this.currentDate = (this.endOfDay) ? newMinDate.endOf("day") : newMinDate;

                //currentDate != modelValue?
                var currentModel = moment.tz(this.ngModel.$modelValue, this.getTimezone());
                //if there is a discrepancy we also update the model
                if (this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || this.pickerOnlyMode) {
                    if (!currentModel || currentModel.get("day") != this.currentDate.get("day") ||
                        currentModel.get("month") != this.currentDate.get("month") ||
                        currentModel.get("year") != this.currentDate.get("year")
                    ) {
                        this.selectDate(new PickerDate(false, this.currentDate, 1, true));

                    }
                }
            }
            if (this.currentDate) {
                $timeout(() => {
                    this.updatePickerData();
                });
            }
        });

    }


    /**
     * fetches the current or default timezone
     * @returns {string}
     * @private
     */
    private getTimezone = (): string => {
        return this.timezone || moment.tz.guess();
    };

    /**
     * fetches the date format set in the component either from outside or by its defaults
     * @returns {string}
     * @private
     */
    private getDateFormat = (): string => {
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
    private updateModel = (value: Date) => {
        var innerSelection: any = value;
        for (var cnt = 0; this.ngModel.$formatters && cnt < this.ngModel.$formatters.length; cnt++) {
            innerSelection = this.ngModel.$formatters[cnt](innerSelection);
        }

        this.innerSelection = innerSelection;
        this.$timeout(() => {
            this.updatePickerData();
        });
    };


    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isSelectedDate(selectedDate: PickerDate) {
        if (!this.ngModel.$modelValue) {
            return false;
        } else {
            var modelDate = moment.tz(this.ngModel.$modelValue, this.getTimezone());
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
    isChosenDate(selectedDate: PickerDate) {
        if (!this.doubleBufferDate) {
            return false;
        } else {
            //booga
            var modelDate = this.doubleBufferDate;
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
    isToday(selectedDate: PickerDate) {
        return DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };

    isTodayMonth(selectedDate: PickerMonth) {
        return DateUtils.isCurrentMonth(this.timezone, this.selectedDate.momentDate);
    };

    isSameMonth(selectedMonth: PickerMonth) {
        return DateUtils.isSameMonth(this.timezone, this.ngModel.$modelValue, selectedMonth.momentDate);
    };

    isChosenMonth(selectedMonth: PickerMonth) {
        if (!this.doubleBufferDate) {
            return false;
        }
        var modelDate = this.doubleBufferDate;
        return modelDate.isSame(selectedMonth.momentDate, "month") &&
            modelDate.isSame(selectedMonth.momentDate, "year");
    };


    isTodayYear(selectedDate: PickerYear) {
        return DateUtils.isCurrentYear(this.timezone, selectedDate.momentDate);
    };

    isSameYear(selectedYear: PickerYear) {
        return DateUtils.isSameYear(this.timezone, this.ngModel.$modelValue, selectedYear.momentDate);
    };

    isChosenYear(selectedMonth: PickerYear) {
        if (!this.doubleBufferDate) {
            return false;
        }
        var modelDate = this.doubleBufferDate;
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
    private isValidTime(hour: number, minute: number): boolean {

        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return false;
        }

        var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()).startOf("day") : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()).endOf("day") : null;

        temporaryDate.set("hour", hour).set("minute", minute);
        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    /**
     * checks for a valid hour, valid means the model date
     * @param hour
     * @returns {boolean}
     * @private
     */
    private isValidHour(hour: number): boolean {
        if (hour < 0 || hour > 23) {
            return false;
        }
        var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
        temporaryDate.set("hour", hour);

        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    /**
     * checks for a valid minute
     * @param minute
     * @returns {boolean}
     * @private
     */
    private isValidMinute(minute: number): boolean {
        if (minute < 0 || minute > 59) {
            return false;
        }
        var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
        temporaryDate.set("minute", minute);
        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    nextHour() {
        if (!this.isValidHour(this.currentDate.get("hour") + 1)) {
            return;
        }
        this.currentDate.add(1, "hour");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    prevHour() {
        if (!this.isValidHour(this.currentDate.get("hour") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "hour");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    nextMinute() {
        if (!this.isValidMinute(this.currentDate.get("minute") + 1)) {
            return;
        }
        this.currentDate.add(1, "minute");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    prevMinute() {
        if (!this.isValidMinute(this.currentDate.get("minute") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "minute");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    /**
     * helper function to push the current date into its max min range
     *
     * @private
     */
    private _fixCurrentDate() {
        var parsedData = this.currentDate;
        var startDate: Moment = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var endDate: Moment = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;

        if (startDate && moment.tz(parsedData, this.getTimezone()).isBefore(startDate)) {
            this.currentDate = startDate;
        }
        if (endDate && moment.tz(parsedData, this.getTimezone()).isAfter(endDate)) {
            this.currentDate = endDate;
        }

    };

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectDate(selectedDate: PickerDate) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
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

            this.onDateSelection({
                $picker: this,
                $date: this.currentDate.toDate()
            });

            /*in case of a date mode we are done*/
            if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE && !this.pickerOnlyMode) {
                this.close();
            }

        }

    }

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectMonth(selectedDate: PickerMonth) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
                this.currentDate = moment.tz(new Date(), this.getTimezone());
                this.currentDate.set("month", selectedDate.momentDate.get("month"));

            } else {
                //we also have to update our currently selected date
                this.currentDate.set("month", selectedDate.momentDate.get("month"));
                this.currentDate.set("year", selectedDate.momentDate.get("year"));
            }
            this._fixCurrentDate();
            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
             this._selectDate(new PickerDate(false, this.currentDate, 1, true));
             }*/
            this.onMonthSelection({
                $picker: this,
                $date: this.currentDate.toDate()
            });
            this.goBackInView();
        }

    };

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectYear(selectedDate: PickerYear) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
                this.currentDate = moment.tz(new Date(), this.getTimezone());
                this.currentDate.set("year", selectedDate.momentDate.get("year"));

            } else {
                var value = moment.tz(this.ngModel.$modelValue, this.getTimezone());
                this.currentDate.set("year", selectedDate.momentDate.get("year"));

            }
            this._fixCurrentDate();
            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
             this._selectDate(new PickerDate(false, this.currentDate, 1, true));
             }*/
            this.onYearSelection({
                $picker: this,
                $date: this.currentDate.toDate()
            });
            this.goBackInView();
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
    updatePickerData() {
        this.monthPickerData = ViewModelBuilder.calculateDateView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
        this.yearPickerData = ViewModelBuilder.calculateMonthView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
        this.decadePickerData = ViewModelBuilder.calculateYearView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());

        var offset = this.currentDate.get("year") % 20 - 1;
        this.decadeFrom = moment.tz(this.currentDate.toDate(), this.getTimezone()).subtract(offset, "year").format("YYYY");

        var offset = this.currentDate.get("year") % 20 - 1;
        var nextDecadeOffset = 20 - offset - 1;
        this.decadeTo = moment.tz(this.currentDate.toDate(), this.getTimezone()).add(nextDecadeOffset, "year").format("YYYY");

    };


    /**
     * opens the date picker
     *
     * @private
     */
    openPicker() {


        var timezone = this.timezone || moment.tz.guess();

        this.currentDate = (this.ngModel.$modelValue) ? moment.tz(this.ngModel.$modelValue, timezone) : moment.tz(new Date(), timezone);

        this.updatePickerData();
        //this.pickerVisible = true;
        BehavioralFixes.openDropDown(this.$element[0], this);


        if (!this.documentClickHandler) {
            this.$timeout(() => {
                BehavioralFixes.registerDocumentBindings(this.$element[0], this);
            });
        }
    };

    /**
     * goes the the previous month
     * @private
     */
    prevMonth() {
        this.currentDate = this.currentDate.subtract(1, "month");
        this.updatePickerData();
    };

    /**
     * goes to the next month
     * @private
     */
    nextMonth() {
        this.currentDate = this.currentDate.add(1, "month");
        this.updatePickerData();
    };

    /**
     * goes to the previous year
     * @private
     */
    prevYear() {
        this.currentDate = this.currentDate.subtract(1, "year");
        this.updatePickerData();
    };

    /**
     * goes to the next year
     * @private
     */
    nextYear() {
        this.currentDate = this.currentDate.add(1, "year");
        this.updatePickerData();
    };


    /**
     * goes to the previous year
     * @private
     */
    prevDecade() {
        this.currentDate = this.currentDate.subtract(20, "year");
        this.updatePickerData();
    };

    /**
     * goes to the next year
     * @private
     */
    nextDecade() {
        this.currentDate = this.currentDate.add(20, "year");
        this.updatePickerData();
    };

    /**
     * clears the selection
     * @private
     */
    clear() {
        this.innerSelection = "";
    };

    /**
     * jumps to today in the selection
     * @private
     */
    today() {
        this.currentDate = moment.tz(new Date(), this.getTimezone());
        if (this.pickerMode == PickerConstants.DEFAULT_PICKER_MODE) {
            this.currentDate.startOf("day");
        }
        this._fixCurrentDate();
        this.updateModel(this.currentDate.toDate());
        this.close();
    };

    /**
     * closes the data picker
     * @private
     */
    close() {
        this.view = PickerConstants.DEFAULT_PICKER_MODE;
        this.viewStack = [];
        this.pickerVisible = false;
        BehavioralFixes.unregisterDocumentBindings(this);
        BehavioralFixes.closeDropDown(this.$element[0] , this);
        this.$element.find("input[type=text]:first").focus();
    };

    /**
     * set for double buffered mode
     *
     * @private
     */
    set() {
        if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
            this.currentDate = moment.tz(this.doubleBufferDate.toDate(), this.getTimezone());
        }
        this.updateModel(this.currentDate.toDate());
    };

    /**
     * switches to the month view
     * @private
     */
    switchToMonthView() {
        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_MONTH;
    };

    /**
     * switches to the year view
     * @private
     */
    switchToYearView() {
        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_YEAR;
    };

    /**
     * switches to the time view
     * @private
     */
    switchToTimeView() {
        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_TIME;
    };

    /**
     * goes back one view
     * @private
     */
    goBackInView() {
        this.updatePickerData();
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
            BehavioralFixes.registerPopupBindings(this.$element[0]);

            /**
             * we change the key handling a little bit
             * an enter should trigger a form submit
             * and a keydown should open the picker
             */
            BehavioralFixes.registerKeyBindings(this.$element[0]);
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

            var parsedData = (this.endOfDay) ? moment.tz(data, this.getDateFormat(), this.getTimezone()).endOf("day").toDate() : moment.tz(data, this.getDateFormat(), this.getTimezone()).toDate();
            var startDate: Moment = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
            var endDate: Moment = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;


            if (startDate && moment.tz(parsedData, this.getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
                return this.startDate;
            }
            if (endDate && moment.tz(parsedData, this.getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
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
            return moment.tz(viewValue, this.getDateFormat(), this.getTimezone()).isValid();
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
            return moment.tz(data, timezone).format(this.getDateFormat());
        });


        //update the picker data if we are in popupOnly mode
        if (this.pickerOnlyMode) {
            this.openPicker();
        }
    }

    $onDestroy() {
        BehavioralFixes.unregisterDocumentBindings(this);
    }


}
