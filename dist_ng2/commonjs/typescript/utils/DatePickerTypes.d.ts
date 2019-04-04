/// <reference types="moment" />
/// <reference types="moment-range" />
/// <reference types="moment-timezone" />
import * as moment from 'moment';
/**
 * Typescript 1.8 string enums
 * see http://stackoverflow.com/questions/15490560/create-an-enum-with-string-values-in-typescript
 *
 * This works with json conversion and theoretically should work both ways
 */
export declare type Importance = "LOW" | "MEDIUM" | "HIGH" | "NONE";
export declare const Importance: {
    LOW: Importance;
    MEDIUM: Importance;
    HIGH: Importance;
    NONE: Importance;
};
export declare class EventModelValue {
    numberOfEvents: number;
    importance: Importance;
    data: any;
    day: Date;
}
export declare class EventModel {
    data: Array<EventModelValue>;
}
export declare class BaseDate {
    invalid: boolean;
    momentDate: moment.Moment;
    constructor(invalid: boolean, momentDate: moment.Moment);
}
/**
 * internal model class for a single date picker date
 * for the date view
 */
export declare class PickerDate extends BaseDate {
    day: number;
    sameMonth: boolean;
    event: EventModelValue;
    constructor(invalid: boolean, momentDate: moment.Moment, day: number, sameMonth: boolean, event?: EventModelValue);
}
/**
 * Simple picker month data structure for the month view
 */
export declare class PickerMonth extends BaseDate {
    month: string;
    sameYear: boolean;
    constructor(invalid: boolean, momentDate: moment.Moment, month: string, sameYear: boolean);
}
/**
 * simple picker year data structure for the year view
 */
export declare class PickerYear extends BaseDate {
    year: number;
    constructor(invalid: boolean, momentDate: moment.Moment, year: number);
}
export declare class PickerWeek {
    days: Array<PickerDate>;
    calendarWeek: number;
    constructor(calendarWeek: number, days?: Array<PickerDate>);
}
/**
 * page model for the date picker page
 */
export declare class DatePickerPage {
    month: string;
    dayOfWeek: Array<string>;
    weeks: Array<PickerWeek>;
    year: number;
    constructor(year: number, month: string, dayOfWeek?: Array<string>, weeks?: Array<PickerWeek>);
}
export declare class EventPickerPage {
    months: Array<DatePickerPage>;
}
/**
 * we have a 3x4 row for the months of the year
 */
export declare class MonthPickerPage {
    row: Array<Array<PickerMonth>>;
    year: number;
    constructor(year: number, monthRow?: Array<Array<PickerMonth>>);
}
export declare class YearPickerPage {
    row: Array<Array<PickerYear>>;
    constructor(yearRow?: Array<Array<PickerYear>>);
}
/**
 * time picker mode
 */
export declare class TimeModel {
    hour: number;
    minutes: number;
    constructor(hour: number, minutes: number);
}
