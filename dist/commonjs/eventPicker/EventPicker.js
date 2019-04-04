"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils_1 = require("../utils/DateUtils");
var ViewModelBuilder_1 = require("../utils/ViewModelBuilder");
/**
 * rangeModel
 * key: date
 *  values
 */
/**
 * Event picker component which allows to display date ranges
 * and handle corresponding events
 */
var _EventPickerView = (function () {
    function _EventPickerView() {
    }
    return _EventPickerView;
}());
_EventPickerView.template = function () {
    return "\n        <div class=\"event-picker\">\n            <table ng-repeat=\"datePickerPage in ctrl.pickerPage.months\">\n                <thead>\n                     <tr>\n                          <td class=\"calendarMonth no-link\" colspan=\"8\"> {{::datePickerPage.month}} {{::datePickerPage.year}}</td>   \n                    </tr>\n                    <tr>\n                        <td class=\"calendarWeek\"><!-- week of year --></td>\n                        <td class=\"dayOfWeek\" ng-repeat=\"dayOfWeek in datePickerPage.dayOfWeek\" ng-click=\"ctrl.selectDate(dayOfWeek)\">{{::dayOfWeek}}</td>    \n                    </tr>\n                </thead>\n                <tbody>\n                     <tr ng-repeat=\"week in datePickerPage.weeks\">\n                                <td class=\"calendarWeek\">{{::week.calendarWeek}}</td>\n                                <td class=\"day {{::day.event.importance}}\" ng-repeat=\"day in week.days\" ng-class=\"{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl.isSelectedDate(day), 'today': ctrl.isToday(day), 'noevent': !day.event , 'event': day.event }\" ng-click=\"ctrl.selectDate(day)\">{{::day.day}}</td>\n                   </tr>    \n                </tbody>\n            </table>\n        </div>\n        ";
};
_EventPickerView.controllerAs = "ctrl";
_EventPickerView.bindings = {
    timezone: "@",
    startDate: "<",
    endDate: "<",
    events: "<",
    eventSelected: "&"
};
_EventPickerView.require = {
    /*the selected date*/
    "ngModel": 'ngModel'
};
var _EventPickerController = (function () {
    function _EventPickerController($scope, $element, $timeout) {
        var _this = this;
        this.$scope = $scope;
        this.$element = $element;
        this.$timeout = $timeout;
        this.rangeModelIdx = {};
        $scope.$watch('ctrl.startDate', function (newValue, oldValue) {
            if (!newValue) {
                _this.startDate = moment.tz(DateUtils_1.DateUtils.getTimezone(_this.timezone)).startOf("day").toDate();
                _this.updateRange(_this.events);
            }
            else {
                _this.startDate = newValue;
                _this.updateRange(_this.events);
            }
        });
        $scope.$watch('ctrl.endDate', function (newValue, oldValue) {
            if (!newValue) {
                _this.endDate = moment.tz(DateUtils_1.DateUtils.getTimezone(_this.timezone)).endOf("day").toDate();
                _this.updateRange(_this.events);
            }
            else {
                _this.endDate = newValue;
                _this.updateRange(_this.events);
            }
        });
        $scope.$watch("ctrl.events", function (newValue, oldValue) {
            _this.updateRange(newValue);
            _this.rangeModelIdx = ViewModelBuilder_1.ViewModelBuilder.buildModelIdx(newValue, DateUtils_1.DateUtils.getTimezone(_this.timezone));
        }, true);
    }
    _EventPickerController.prototype.updateRange = function (rangeModel) {
        this.pickerPage = ViewModelBuilder_1.ViewModelBuilder.calculateEventDateView(rangeModel, this.startDate, this.endDate, DateUtils_1.DateUtils.getTimezone(this.timezone));
    };
    _EventPickerController.prototype.$postLink = function () {
        var _this = this;
        this.updateRange(this.events);
        /*
         * registers the internal parsers, validators and formatters
         * into the ngModel for the date string conversion
         */
        this.ngModel.$parsers.push(function (data) {
            if ('undefined' == typeof data || null == data || data == "") {
                return null;
            }
            return moment.tz(data, "DD.MM.YYYY", _this.timezone).startOf("day");
        });
    };
    _EventPickerController.prototype.eventPresent = function (moment) {
        if (this.events) {
            return this.rangeModelIdx[moment.format("DD.MM.YYYY")];
        }
        return null;
    };
    _EventPickerController.prototype.isActive = function (currentMoment) {
        var startMoment = moment.tz(this.startDate, this.timezone);
        var endMoment = moment.tz(this.endDate, this.timezone);
        return currentMoment && currentMoment.isBetween(startMoment.subtract(1, "day"), endMoment.add(1, "day"), "day");
    };
    _EventPickerController.prototype.isSelectedDate = function (selectedDate) {
        if (!this.ngModel.$modelValue) {
            return false;
        }
        var modelDate = moment.tz(this.ngModel.$modelValue, this.timezone);
        return DateUtils_1.DateUtils.isSameDay(modelDate, selectedDate.momentDate);
    };
    _EventPickerController.prototype.selectDate = function (selectDate) {
        if (!selectDate.event) {
            return;
        }
        this.ngModel.$setViewValue(selectDate.momentDate.format("DD.MM.YYYY"));
        this.eventSelected({ $event: selectDate.event });
        this.updateRange(this.events);
    };
    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    _EventPickerController.prototype.isToday = function (selectedDate) {
        return DateUtils_1.DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };
    ;
    return _EventPickerController;
}());
var EventPicker = (function () {
    function EventPicker() {
        this.template = _EventPickerView.template;
        this.controllerAs = _EventPickerView.controllerAs;
        this.bindings = _EventPickerView.bindings;
        this.require = _EventPickerView.require;
        this.controller = ["$scope", "$element", "$timeout",
            _EventPickerController
        ];
    }
    return EventPicker;
}());
exports.EventPicker = EventPicker;
//# sourceMappingURL=EventPicker.js.map