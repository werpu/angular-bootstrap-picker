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

/*
 Picker types internally used for the view representation
 */

class BaseDate {
    invalid:boolean;
    momentDate:moment.Moment;


    constructor(invalid:boolean, momentDate:moment.Moment) {
        this.invalid = invalid;
        this.momentDate = momentDate;
    }
}

/**
 * internal model class for a single date picker date
 * for the date view
 */
export class PickerDate extends BaseDate {
    day:number;
    sameMonth:boolean;


    constructor(invalid:boolean, momentDate:moment.Moment, day:number, sameMonth:boolean) {
        super(invalid, momentDate);
        this.day = day;
        this.sameMonth = sameMonth;
    }
}

/**
 * Simple picker month data structure for the month view
 */
export class PickerMonth extends BaseDate {
    month:string;
    sameYear:boolean;


    constructor(invalid:boolean, momentDate:moment.Moment, month:string, sameYear:boolean) {
        super(invalid, momentDate);
        this.month = month;
        this.sameYear = sameYear;
    }
}

/**
 * simple picker year data structure for the year view
 */
export class PickerYear extends BaseDate {
    year:number;


    constructor(invalid:boolean, momentDate:moment.Moment, year:number) {
        super(invalid, momentDate);
        this.year = year;
    }
}


export class PickerWeek {
    days:Array<PickerDate>;
    calendarWeek:number;


    constructor(calendarWeek:number, days:Array<PickerDate> = []) {
        this.calendarWeek = calendarWeek;
        this.days = days;
    }
}

/**
 * page model for the date picker page
 */
export class DatePickerPage {
    dayOfWeek:Array<string>;
    weeks:Array<PickerWeek>;
    year:number;


    constructor(year:number, dayOfWeek:Array<string> = [], weeks:Array<PickerWeek> = []) {
        this.dayOfWeek = dayOfWeek;
        this.weeks = weeks;
        this.year = year;
    }
}

/**
 * we have a 3x4 row for the months of the year
 */
export class MonthPickerPage {
    row:Array<Array<PickerMonth>>;
    year:number;


    constructor(year:number, monthRow:Array<Array<PickerMonth>> = []) {
        this.row = monthRow;
        this.year = year;
    }
}

export class YearPickerPage {
    row:Array<Array<PickerYear>>;

    constructor(yearRow:Array<Array<PickerYear>> = []) {
        this.row = yearRow;
    }
}


/**
 * time picker mode
 */
export class TimeModel {
    /*range 0-23*/
    hour: number;

    /*range 0-59*/
    minutes: number;


    constructor(hour: number, minutes: number) {
        this.hour = hour;
        this.minutes = minutes;
    }
}