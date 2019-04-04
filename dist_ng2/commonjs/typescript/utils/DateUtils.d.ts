/// <reference path="../../../../node_modules/moment/moment.d.ts" />
export declare class PickerConstants {
    static DEFAULT_DATE_FORMAT: string;
    static DEFAULT_DATE_TIME_FORMAT: string;
    static DEFAULT_PICKER_MODE: string;
    static PICKER_VIEW_DATE: string;
    static PICKER_VIEW_TIME: string;
    static PICKER_VIEW_MONTH: string;
    static PICKER_VIEW_YEAR: string;
    static DEFAULT_PICKER_LABEL: string;
}
/**
 * A set of moment based utils classes
 */
export declare class DateUtils {
    /**
     * checks if the selected date is today within the given timezone
     *
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isToday(timezone: string, selectedDate: Moment): boolean;
    /**
     * checks if both dates are the same
     *
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isSameDay(selectedDate: Moment, dateToCompare: Moment): boolean;
    /**
     * checks if the given month is the current month within the given timezone
     *
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isCurrentMonth(timezone: string, selectedDate: Moment): boolean;
    /**
     * Checks if the given moment value is the same as the selected month within the given timehzone
     * @param timeZone
     * @param modelValue
     * @param selectedMonth
     * @returns {boolean}
     */
    static isSameMonth(timeZone: string, modelValue: Moment, selectedMonth: Moment): boolean;
    /**
     * checks if the current year is the same as the given year within the given timezone
     * @param timezone
     * @param selectedDate
     * @returns {boolean}
     */
    static isCurrentYear(timezone: string, selectedDate: Moment): boolean;
    /**
     * checks if the moment dates match within the given timehone
     * @param timezone
     * @param modelValue
     * @param selectedMonth
     * @returns {boolean}
     */
    static isSameYear(timezone: string, modelValue: Moment, selectedMonth: Moment): boolean;
    /**
     * fetches the given timezone or the default one depending on the incoming values
     *
     * @param timeZone
     * @returns {string}
     */
    static getTimezone(timeZone: string): string;
}
