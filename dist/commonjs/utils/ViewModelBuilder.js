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
Object.defineProperty(exports, "__esModule", { value: true });
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
        var start = moment.tz(newValue, timezone).startOf("year").startOf("month").startOf("day").subtract(offset, "year");
        var end = moment.tz(newValue, timezone).endOf("year").endOf("month").endOf("day").add(nextDecadeOffset, "year");
        var momentStartDate = (startDate) ? moment.tz(startDate, timezone).startOf("year").startOf("month").startOf("day") : null;
        var momentEndDate = (endDate) ? moment.tz(endDate, timezone).endOf("year").endOf("month").endOf("day") : null;
        var cnt = 0;
        var pickerPage = new DatePickerTypes_1.YearPickerPage();
        var range1 = moment.range(start, end);
        range1.by("year", function (date) {
            date = moment.tz(date, timezone);
            if (cnt % 5 == 0) {
                pickerPage.row.push([]);
            }
            var isInvalid = false;
            if (momentStartDate) {
                isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isBefore(momentStartDate) && moment.tz(date, timezone).endOf("day").isBefore(momentStartDate));
            }
            if (!isInvalid && momentEndDate) {
                isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isAfter(momentEndDate) && moment.tz(date, timezone).endOf("day").isAfter(momentEndDate));
            }
            pickerPage.row[pickerPage.row.length - 1].push(new DatePickerTypes_1.PickerYear(isInvalid, date, parseInt(date.tz(timezone).format("YYYY"))));
            cnt++;
        });
        return pickerPage;
    };
    ;
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
            date = moment.tz(date, timezone);
            if (cnt % 3 == 0) {
                pickerPage.row.push([]);
            }
            var isInvalid = false;
            if (momentStartDate) {
                isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isBefore(momentStartDate) && moment.tz(date, timezone).endOf("day").isBefore(momentStartDate));
            }
            if (!isInvalid && momentEndDate) {
                isInvalid = isInvalid || (moment.tz(date, timezone).startOf("day").isAfter(momentEndDate) && moment.tz(date, timezone).endOf("day").isAfter(momentEndDate));
            }
            pickerPage.row[pickerPage.row.length - 1].push(new DatePickerTypes_1.PickerMonth(isInvalid, date, moment.tz(date, timezone).format("MMMM"), moment.tz(date, timezone).isSame(momentDate, "year")));
            cnt++;
        });
        return pickerPage;
    };
    ;
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
        var end = moment.tz(newValue, timezone).startOf("month").startOf("week").add(41, "days");
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
        return new DatePickerTypes_1.DatePickerPage(momentDate.get("year"), "", dayOfWeek, weeks);
    };
    ;
    /**
     * calculates the the entire event range for a given start and end date
     * @param newValue
     * @private
     */
    ViewModelBuilder.calculateEventDateView = function (rangeModel, startDate, endDate, timezone) {
        var rangeIdx = ViewModelBuilder.buildModelIdx(rangeModel, timezone);
        var start = moment.tz(startDate, timezone).startOf("month").startOf("week");
        var end = moment.tz(endDate, timezone).startOf("month").startOf("week").add(41, "days");
        var momentStartDate = (startDate) ? startDate : null;
        var momentEndDate = (endDate) ? endDate : null;
        var momentDate = moment.tz(timezone);
        var weeks = [];
        var dayOfWeek = [];
        var cnt = 0;
        var retVal = new DatePickerTypes_1.EventPickerPage();
        var tempEndDate = moment.tz(startDate, timezone).startOf("month").startOf("week").add(41, "days");
        var tempStartDate = moment.tz(startDate, timezone).startOf("month").startOf("week");
        var tempMonth = moment.tz(startDate, timezone);
        do {
            var hasDisplayableValues = false;
            var range1 = moment.range(tempStartDate, tempEndDate);
            range1.by("day", function (date) {
                date = moment.tz(date, timezone).startOf("day");
                if (cnt % 7 == 0) {
                    weeks.push(new DatePickerTypes_1.PickerWeek(date.tz(timezone).get("week")));
                }
                var isInvalid = date.isBefore(momentStartDate, "day") || moment.tz(date, timezone).isAfter(momentEndDate, "day") || moment.tz(date, timezone).endOf("day").isAfter(date.clone().endOf("month"));
                var eventKey = date.format("DD.MM.YYYY");
                var eventModelValue = rangeIdx[eventKey];
                weeks[weeks.length - 1].days.push(new DatePickerTypes_1.PickerDate(isInvalid, date, date.get("date"), date.isSame(tempMonth, "month"), eventModelValue));
                hasDisplayableValues = hasDisplayableValues || (date.isSame(tempMonth, "month") && !isInvalid);
                //We also need to display the work days
                if (dayOfWeek.length < 7) {
                    dayOfWeek.push(date.tz(timezone).format("ddd"));
                }
                cnt++;
            });
            var year = moment.tz(tempEndDate, timezone).startOf("month").subtract(1, "day").get("year");
            var month = moment.tz(tempEndDate, timezone).startOf("month").subtract(1, "day").format("MMM");
            tempStartDate = moment.tz(tempEndDate.add("day", 1), timezone).startOf("month").startOf("week");
            tempEndDate = moment.tz(tempStartDate, timezone).add(41, "days");
            tempMonth.add("month", 1);
            if (hasDisplayableValues) {
                retVal.months.push(new DatePickerTypes_1.DatePickerPage(year, month, dayOfWeek, weeks));
            }
            var weeks = [];
            var dayOfWeek = [];
        } while (tempStartDate.isSameOrBefore(momentEndDate));
        return retVal;
    };
    /**
     * builds a model index for the event model
     *
     * @param eventModel
     * @param timezone
     * @returns {any}
     */
    ViewModelBuilder.buildModelIdx = function (eventModel, timezone) {
        if (!eventModel) {
            return {};
        }
        var rangeIdx = {};
        for (var cnt = 0; cnt < eventModel.data.length; cnt++) {
            var value = eventModel.data[cnt];
            var key = moment.tz(value.day, timezone).format("DD.MM.YYYY");
            rangeIdx[key] = value;
        }
        return rangeIdx;
    };
    return ViewModelBuilder;
}());
exports.ViewModelBuilder = ViewModelBuilder;
//# sourceMappingURL=ViewModelBuilder.js.map