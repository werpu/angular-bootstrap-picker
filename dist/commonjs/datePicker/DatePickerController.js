/// <reference path="../../../node_modules/@types/angular/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatePickerTypes_1 = require("../utils/DatePickerTypes");
var DateUtils_1 = require("../utils/DateUtils");
var ViewModelBuilder_1 = require("../utils/ViewModelBuilder");
var BehavioralFixes_1 = require("../utils/BehavioralFixes");
var _DatePickerController = (function () {
    function _DatePickerController($scope, $element, $timeout) {
        var _this = this;
        this.$scope = $scope;
        this.$element = $element;
        this.$timeout = $timeout;
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
            return _this.dateFormat || ((_this.pickerMode === DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE) ?
                DateUtils_1.PickerConstants.DEFAULT_DATE_FORMAT :
                DateUtils_1.PickerConstants.DEFAULT_DATE_TIME_FORMAT);
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
            for (var cnt = 0; _this.ngModel.$formatters && cnt < _this.ngModel.$formatters.length; cnt++) {
                innerSelection = _this.ngModel.$formatters[cnt](innerSelection);
            }
            _this.innerSelection = innerSelection;
            _this.$timeout(function () {
                _this.updatePickerData();
            });
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
        this.visibleDays = [];
        this.view = DateUtils_1.PickerConstants.PICKER_VIEW_DATE;
        this.viewStack = [];
        $scope.$on("$destroy", function () {
            BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings($element[0], _this);
        });
        /*we do the proper max min date validity checks over our setters*/
        Object.defineProperty(this, "currentHour", {
            get: function () {
                if (!_this.currentDate) {
                    return 0;
                }
                return _this.currentDate.get("hour");
            },
            set: function (val) {
                if (!_this.isValidHour(val)) {
                    return;
                }
                _this.currentDate.set("hour", val);
                _this.selectDate(new DatePickerTypes_1.PickerDate(false, _this.currentDate, 1, true));
            }
        });
        Object.defineProperty(this, "currentMinute", {
            get: function () {
                if (!_this.currentDate) {
                    return 0;
                }
                return _this.currentDate.get("minute");
            },
            set: function (val) {
                if (!_this.isValidMinute(val)) {
                    return;
                }
                _this.currentDate.set("minute", val);
                _this.selectDate(new DatePickerTypes_1.PickerDate(false, _this.currentDate, 1, true));
            }
        });
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
            if (newval && _this.currentDate) {
                var newMinDate = moment.tz(newval, _this.getTimezone());
                //no date change or mindate < than the currentDate in the min date, we safely can skip
                //the rest of the date processing
                if (newMinDate.isSameOrBefore(_this.currentDate)) {
                    $timeout(function () {
                        _this.updatePickerData();
                    });
                    return;
                }
                //otherwise we set the currentDate to the newMinDate
                _this.currentDate = (_this.endOfDay) ? newMinDate.endOf("day") : newMinDate;
                //currentDate != modelValue?
                var currentModel = moment.tz(_this.ngModel.$modelValue, _this.getTimezone());
                //if there is a discrepancy we also update the model
                if (_this.pickerMode != DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE || _this.pickerOnlyMode) {
                    if (!currentModel || currentModel.get("day") != _this.currentDate.get("day") ||
                        currentModel.get("month") != _this.currentDate.get("month") ||
                        currentModel.get("year") != _this.currentDate.get("year")) {
                        _this.selectDate(new DatePickerTypes_1.PickerDate(false, _this.currentDate, 1, true));
                    }
                }
            }
            if (_this.currentDate) {
                $timeout(function () {
                    _this.updatePickerData();
                });
            }
        });
        this.onParentScroll = function () {
            BehavioralFixes_1.BehavioralFixes.closeDropDown(_this.$element[0], _this);
        };
    }
    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    _DatePickerController.prototype.isSelectedDate = function (selectedDate) {
        if (!this.ngModel.$modelValue) {
            return false;
        }
        else {
            var modelDate = moment.tz(this.ngModel.$modelValue, this.getTimezone());
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
    _DatePickerController.prototype.isChosenDate = function (selectedDate) {
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
    _DatePickerController.prototype.isToday = function (selectedDate) {
        return DateUtils_1.DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };
    ;
    _DatePickerController.prototype.isTodayMonth = function (selectedDate) {
        return DateUtils_1.DateUtils.isCurrentMonth(this.timezone, selectedDate.momentDate);
    };
    ;
    _DatePickerController.prototype.isSameMonth = function (selectedMonth) {
        return DateUtils_1.DateUtils.isSameMonth(this.timezone, this.ngModel.$modelValue, selectedMonth.momentDate);
    };
    ;
    _DatePickerController.prototype.isChosenMonth = function (selectedMonth) {
        if (!this.doubleBufferDate) {
            return false;
        }
        var modelDate = this.doubleBufferDate;
        return modelDate.isSame(selectedMonth.momentDate, "month") &&
            modelDate.isSame(selectedMonth.momentDate, "year");
    };
    ;
    _DatePickerController.prototype.isTodayYear = function (selectedDate) {
        return DateUtils_1.DateUtils.isCurrentYear(this.timezone, selectedDate.momentDate);
    };
    ;
    _DatePickerController.prototype.isSameYear = function (selectedYear) {
        return DateUtils_1.DateUtils.isSameYear(this.timezone, this.ngModel.$modelValue, selectedYear.momentDate);
    };
    ;
    _DatePickerController.prototype.isChosenYear = function (selectedMonth) {
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
    _DatePickerController.prototype.isValidTime = function (hour, minute) {
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
    _DatePickerController.prototype.isValidHour = function (hour) {
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
    _DatePickerController.prototype.isValidMinute = function (minute) {
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
    _DatePickerController.prototype.nextHour = function () {
        if (!this.isValidHour(this.currentDate.get("hour") + 1)) {
            return;
        }
        this.currentDate.add(1, "hour");
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
    };
    ;
    _DatePickerController.prototype.prevHour = function () {
        if (!this.isValidHour(this.currentDate.get("hour") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "hour");
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
    };
    ;
    _DatePickerController.prototype.nextMinute = function () {
        if (!this.isValidMinute(this.currentDate.get("minute") + 1)) {
            return;
        }
        this.currentDate.add(1, "minute");
        this.selectDate(new DatePickerTypes_1.PickerDate(false, this.currentDate, 1, true));
    };
    ;
    _DatePickerController.prototype.prevMinute = function () {
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
    _DatePickerController.prototype._fixCurrentDate = function () {
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
    _DatePickerController.prototype.selectDate = function (selectedDate) {
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
            if (this.pickerMode === DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE) {
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
            if (this.pickerMode === DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE && !this.pickerOnlyMode) {
                this.close();
            }
        }
    };
    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    _DatePickerController.prototype.selectMonth = function (selectedDate) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
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
            this.onMonthSelection({
                $picker: this,
                $date: this.currentDate.toDate()
            });
            this.goBackInView();
        }
    };
    ;
    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    _DatePickerController.prototype.selectYear = function (selectedDate) {
        if (!selectedDate.invalid) {
            if (!this.ngModel.$modelValue) {
                this.currentDate = moment.tz(new Date(), this.getTimezone());
                this.currentDate.set("year", selectedDate.momentDate.get("year"));
            }
            else {
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
    ;
    /**
     * updates the picker views from the currentDate
     * the currentDate is a positional placeholder for the pickers
     * it is used to store also temporary selections until
     * they are traversed into the model via pickDate
     *
     * @private
     */
    _DatePickerController.prototype.updatePickerData = function () {
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
    _DatePickerController.prototype.openPicker = function () {
        var _this = this;
        var timezone = this.timezone || moment.tz.guess();
        this.currentDate = (this.ngModel.$modelValue) ? moment.tz(this.ngModel.$modelValue, timezone) : moment.tz(new Date(), timezone);
        this.updatePickerData();
        //this.pickerVisible = true;
        BehavioralFixes_1.BehavioralFixes.openDropDown(this.$element[0], this);
        if (!this.documentClickHandler) {
            this.$timeout(function () {
                BehavioralFixes_1.BehavioralFixes.registerDocumentBindings(_this.$element[0], _this);
            });
        }
    };
    ;
    /**
     * goes the the previous month
     * @private
     */
    _DatePickerController.prototype.prevMonth = function () {
        this.currentDate = this.currentDate.subtract(1, "month");
        this.updatePickerData();
    };
    ;
    /**
     * goes to the next month
     * @private
     */
    _DatePickerController.prototype.nextMonth = function () {
        this.currentDate = this.currentDate.add(1, "month");
        this.updatePickerData();
    };
    ;
    /**
     * goes to the previous year
     * @private
     */
    _DatePickerController.prototype.prevYear = function () {
        this.currentDate = this.currentDate.subtract(1, "year");
        this.updatePickerData();
    };
    ;
    /**
     * goes to the next year
     * @private
     */
    _DatePickerController.prototype.nextYear = function () {
        this.currentDate = this.currentDate.add(1, "year");
        this.updatePickerData();
    };
    ;
    /**
     * goes to the previous year
     * @private
     */
    _DatePickerController.prototype.prevDecade = function () {
        this.currentDate = this.currentDate.subtract(20, "year");
        this.updatePickerData();
    };
    ;
    /**
     * goes to the next year
     * @private
     */
    _DatePickerController.prototype.nextDecade = function () {
        this.currentDate = this.currentDate.add(20, "year");
        this.updatePickerData();
    };
    ;
    /**
     * clears the selection
     * @private
     */
    _DatePickerController.prototype.clear = function () {
        this.innerSelection = "";
    };
    ;
    /**
     * jumps to today in the selection
     * @private
     */
    _DatePickerController.prototype.today = function () {
        this.currentDate = moment.tz(new Date(), this.getTimezone());
        if (this.pickerMode == DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE) {
            this.currentDate.startOf("day");
        }
        this._fixCurrentDate();
        this.updateModel(this.currentDate.toDate());
        this.close();
    };
    ;
    /**
     * closes the data picker
     * @private
     */
    _DatePickerController.prototype.close = function () {
        this.view = DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE;
        this.viewStack = [];
        this.pickerVisible = false;
        BehavioralFixes_1.BehavioralFixes.unregisterDocumentBindings(this.$element[0], this);
        BehavioralFixes_1.BehavioralFixes.closeDropDown(this.$element[0], this);
        this.$element.find("input[type=text]:first").focus();
    };
    ;
    /**
     * set for double buffered mode
     *
     * @private
     */
    _DatePickerController.prototype.set = function () {
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
    _DatePickerController.prototype.switchToMonthView = function () {
        this.viewStack.unshift(this.view);
        this.view = DateUtils_1.PickerConstants.PICKER_VIEW_MONTH;
        BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.$element[0]);
    };
    ;
    /**
     * switches to the year view
     * @private
     */
    _DatePickerController.prototype.switchToYearView = function () {
        this.viewStack.unshift(this.view);
        this.view = DateUtils_1.PickerConstants.PICKER_VIEW_YEAR;
        BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.$element[0]);
    };
    ;
    /**
     * switches to the time view
     * @private
     */
    _DatePickerController.prototype.switchToTimeView = function () {
        this.viewStack.unshift(this.view);
        this.view = DateUtils_1.PickerConstants.PICKER_VIEW_TIME;
        BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.$element[0]);
    };
    ;
    /**
     * goes back one view
     * @private
     */
    _DatePickerController.prototype.goBackInView = function () {
        this.updatePickerData();
        this.view = this.viewStack.shift();
        BehavioralFixes_1.BehavioralFixes.repositionPopup(this, this.$element[0]);
    };
    ;
    _DatePickerController.prototype.$postLink = function () {
        var _this = this;
        this.buttonLabel = ("undefined" == typeof this.buttonLabel || null == this.buttonLabel) ?
            DateUtils_1.PickerConstants.DEFAULT_PICKER_LABEL : this.buttonLabel;
        this.pickerMode = ("undefined" == typeof this.pickerMode || null == this.pickerMode) ?
            DateUtils_1.PickerConstants.DEFAULT_PICKER_MODE : this.pickerMode;
        this.$timeout(function () {
            /**
             * we turn off event propagation
             * for the popup so that a click within the popup
             * does not propagate to its parent elements
             * (we only want to have the popup closed when we click on the outside)
             *
             */
            BehavioralFixes_1.BehavioralFixes.registerPopupBindings(_this.$element[0], _this);
            /**
             * we change the key handling a little bit
             * an enter should trigger a form submit
             * and a keydown should open the picker
             */
            BehavioralFixes_1.BehavioralFixes.registerKeyBindings(_this.$element[0]);
            if (_this.pickerOnlyMode) {
                _this.$scope.$watch("ctrl.ngModel.$modelValue", function (newValue, oldValue) {
                    _this.$timeout(function () {
                        _this.currentDate = (_this.ngModel.$modelValue) ? moment.tz(_this.ngModel.$modelValue, _this.getTimezone()) : moment.tz(new Date(), _this.getTimezone());
                        _this.updatePickerData();
                    });
                });
            }
        });
        //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
        this.ngModel.$render = function () {
            _this.innerSelection = _this.ngModel.$viewValue;
        };
        /*
         * registers the internal parsers, validators and formatters
         * into the ngModel for the date string conversion
         */
        this.ngModel.$parsers.push(function (data) {
            if (data == "") {
                return null;
            }
            var parsedData = (_this.endOfDay) ? moment.tz(data, _this.getDateFormat(), _this.getTimezone()).endOf("day").toDate() : moment.tz(data, _this.getDateFormat(), _this.getTimezone()).toDate();
            var startDate = (_this.startDate) ? moment.tz(_this.startDate, _this.getTimezone()) : null;
            var endDate = (_this.endDate) ? moment.tz(_this.endDate, _this.getTimezone()) : null;
            if (startDate && moment.tz(parsedData, _this.getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
                return _this.startDate;
            }
            if (endDate && moment.tz(parsedData, _this.getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
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
        this.ngModel.$validators.validDate = function (data, viewValue) {
            if (!viewValue) {
                return true;
            }
            return moment.tz(viewValue, _this.getDateFormat(), _this.getTimezone()).isValid();
        };
        /**
         * checks if it is within the allowed date range if there is one
         * @param data
         * @param viewValue
         * @returns {boolean}
         */
        this.ngModel.$validators.dateRange = function (data, viewValue) {
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
        this.ngModel.$formatters.push(function (data) {
            if (data == null) {
                return "";
            }
            var timezone = _this.timezone || moment.tz.guess();
            return moment.tz(data, timezone).format(_this.getDateFormat());
        });
        //update the picker data if we are in popupOnly mode
        if (this.pickerOnlyMode) {
            this.openPicker();
        }
    };
    return _DatePickerController;
}());
exports._DatePickerController = _DatePickerController;
//# sourceMappingURL=DatePickerController.js.map