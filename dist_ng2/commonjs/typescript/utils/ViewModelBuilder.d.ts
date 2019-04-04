import { DatePickerPage, MonthPickerPage, YearPickerPage, EventPickerPage, EventModel, EventModelValue } from "./DatePickerTypes";
export interface RangeModelDictionary {
    [key: string]: EventModelValue;
}
/**
 * utils class to build the various view models
 */
export declare class ViewModelBuilder {
    static calculateYearView(newValue: Date, startDate: Date, endDate: Date, timezone: string): YearPickerPage;
    static calculateMonthView(newValue: Date, startDate: Date, endDate: Date, timezone: string): MonthPickerPage;
    /**
     * calculates the current page for a given date
     * this is the main layout calculation function for the date view
     * for
     * @param newValue
     * @private
     */
    static calculateDateView(newValue: Date, startDate: Date, endDate: Date, timezone: string): DatePickerPage;
    /**
     * calculates the the entire event range for a given start and end date
     * @param newValue
     * @private
     */
    static calculateEventDateView(rangeModel: EventModel, startDate: Date, endDate: Date, timezone: string): EventPickerPage;
    /**
     * builds a model index for the event model
     *
     * @param eventModel
     * @param timezone
     * @returns {any}
     */
    static buildModelIdx(eventModel: EventModel, timezone: string): RangeModelDictionary;
}
