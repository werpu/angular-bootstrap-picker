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

import Moment = moment.Moment;

/**
 * A set of moment based utils classes
 */
export class DateUtils {

    /**
     * checks if the selected date is today within the given timezone
     *
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isToday(timezone: string, selectedDate: Moment): boolean {
        var modelDate = moment.tz(new Date(), DateUtils.getTimezone(timezone));
        return modelDate.isSame(selectedDate, "date")
            && modelDate.isSame(selectedDate, "month")
            && modelDate.isSame(selectedDate, "year");
    };

    /**
     * checks if both dates are the same
     *
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isSameDay(selectedDate: Moment,  dateToCompare: Moment): boolean {

        return dateToCompare.isSame(selectedDate, "date")
            && dateToCompare.isSame(selectedDate, "month")
            && dateToCompare.isSame(selectedDate, "year");
    };

    /**
     * checks if the given month is the current month within the given timezone
     *
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isCurrentMonth(timezone: string, selectedDate: Moment): boolean {
        var modelDate = moment.tz(new Date(), DateUtils.getTimezone(timezone));
        return modelDate.isSame(selectedDate, "month")
            && modelDate.isSame(selectedDate, "year");
    };

    /**
     * Checks if the given moment value is the same as the selected month within the given timehzone
     * @param timeZone
     * @param modelValue
     * @param selectedMonth
     * @returns {boolean}
     */
    static isSameMonth(timeZone: string, modelValue: Moment, selectedMonth: Moment): boolean {
        var modelDate = moment.tz(modelValue, DateUtils.getTimezone(timeZone));
        return modelDate.isSame(selectedMonth, "month")
            && modelDate.isSame(selectedMonth, "year");
    };

    /**
     * checks if the current year is the same as the given year within the given timezone
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isCurrentYear(timezone: string, selectedDate: Moment): boolean {
        var modelDate = moment.tz(new Date(), DateUtils.getTimezone(timezone));
        return modelDate.isSame(selectedDate, "year");

    };

    /**
     * checks if the moment dates match within the given timehone
     * @param timezone
     * @param modelValue
     * @param selectedMonth
     * @returns {boolean}
     */
    static isSameYear(timezone: string, modelValue: Moment, selectedMonth: Moment): boolean {
        var modelDate = moment.tz(modelValue, DateUtils.getTimezone(timezone));
        return modelDate.isSame(selectedMonth, "year");
    };

    /**
     * fetches the given timezone or the default one depending on the incoming values
     *
     * @param timeZone
     * @returns {string}
     */
    static getTimezone(timeZone: string): string {
        return timeZone || moment.tz.guess();
    };


}