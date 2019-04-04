"use strict";
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
//# sourceMappingURL=DatePickerTypes.js.map