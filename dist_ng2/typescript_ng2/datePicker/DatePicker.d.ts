/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference path="../../../node_modules/@types/moment-range/index.d.ts" />
/// <reference path="../../../node_modules/@types/moment-timezone/index.d.ts" />
import { EventEmitter, ElementRef, SimpleChanges, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { PickerMonth, PickerDate, PickerYear, DatePickerPage, MonthPickerPage, YearPickerPage } from "../../typescript/utils/DatePickerTypes";
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from "@angular/forms";
export declare class DatePicker implements Validator, OnInit, OnDestroy, OnChanges, ControlValueAccessor {
    private elementRef;
    placeholder: string;
    name: string;
    startDate: Date;
    endDate: Date;
    dateFormat: string;
    buttonLabel: string;
    endOfDay: boolean;
    buttonStyleClass: string;
    pickerOnlyMode: string;
    view: string;
    pickerMode: string;
    timezone: string;
    onYearSelection: EventEmitter<any>;
    onMonthSelection: EventEmitter<any>;
    onDateSelection: EventEmitter<any>;
    _ngModel: Date;
    innerSelection: string;
    monthPickerData: DatePickerPage;
    yearPickerData: MonthPickerPage;
    decadePickerData: YearPickerPage;
    decadeFrom: string;
    decadeTo: string;
    documentClickHandler: Function;
    currentDate: Moment;
    /**
     * internal controller vars
     */
    doubleBufferDate: Moment;
    visibleDays: Array<any>;
    pickerVisible: boolean;
    selectedDate: PickerDate;
    selectedMonth: PickerMonth;
    isOpen: boolean;
    private viewStack;
    private propagateChange;
    constructor(elementRef: ElementRef);
    yearSelection(): void;
    ngOnInit(): void;
    currentMinute: number;
    currentHour: number;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * fetches the current or default timezone
     * @returns {string}
     * @private
     */
    private getTimezone;
    /**
     * fetches the date format set in the component either from outside or by its defaults
     * @returns {string}
     * @private
     */
    private getDateFormat;
    /**
     * formats a date by using the controls appended parsers
     * this has to be done this way because somone could decorate
     * the control from outside
     *
     * @param value
     * @private
     */
    private updateModel;
    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isSelectedDate(selectedDate: PickerDate): boolean;
    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isChosenDate(selectedDate: PickerDate): boolean;
    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isToday(selectedDate: PickerDate): boolean;
    isTodayMonth(selectedDate: PickerMonth): boolean;
    isSameMonth(selectedMonth: PickerMonth): boolean;
    isChosenMonth(selectedMonth: PickerMonth): boolean;
    isTodayYear(selectedDate: PickerYear): boolean;
    isSameYear(selectedYear: PickerYear): boolean;
    isChosenYear(selectedMonth: PickerYear): boolean;
    /**
     * checks if the time given is valid in the scope of the date selected
     *
     * @param hour
     * @param minute
     * @returns {boolean}
     * @private
     */
    private isValidTime(hour, minute);
    /**
     * checks for a valid hour, valid means the model date
     * @param hour
     * @returns {boolean}
     * @private
     */
    private isValidHour(hour);
    /**
     * checks for a valid minute
     * @param minute
     * @returns {boolean}
     * @private
     */
    private isValidMinute(minute);
    nextHour(event: UIEvent): void;
    prevHour(event: UIEvent): void;
    nextMinute(event: UIEvent): void;
    prevMinute(event: UIEvent): void;
    /**
     * helper function to push the current date into its max min range
     *
     * @private
     */
    private _fixCurrentDate();
    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectDate(selectedDate: PickerDate, event?: UIEvent): void;
    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectMonth(selectedDate: PickerMonth, event?: UIEvent): void;
    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectYear(selectedDate: PickerYear, event?: UIEvent): void;
    stopEventPropagation(event: UIEvent): void;
    /**
     * updates the picker views from the currentDate
     * the currentDate is a positional placeholder for the pickers
     * it is used to store also temporary selections until
     * they are traversed into the model via pickDate
     *
     * @private
     */
    updatePickerData(): void;
    /**
     * opens the date picker
     *
     * @private
     */
    openPicker(event?: UIEvent): void;
    /**
     * goes the the previous month
     * @private
     */
    prevMonth(event?: UIEvent): void;
    /**
     * goes to the next month
     * @private
     */
    nextMonth(event?: UIEvent): void;
    /**
     * goes to the previous year
     * @private
     */
    prevYear(event: UIEvent): void;
    /**
     * goes to the next year
     * @private
     */
    nextYear(event: UIEvent): void;
    /**
     * goes to the previous year
     * @private
     */
    prevDecade(event: UIEvent): void;
    /**
     * goes to the next year
     * @private
     */
    nextDecade(event: UIEvent): void;
    /**
     * clears the selection
     * @private
     */
    clear(event: UIEvent): void;
    /**
     * jumps to today in the selection
     * @private
     */
    today(event: UIEvent): void;
    /**
     * closes the data picker
     * @private
     */
    close(event: UIEvent): void;
    /**
     * set for double buffered mode
     *
     * @private
     */
    set(event: UIEvent): void;
    /**
     * switches to the month view
     * @private
     */
    switchToMonthView(event: UIEvent): void;
    /**
     * switches to the year view
     * @private
     */
    switchToYearView(event: UIEvent): void;
    /**
     * switches to the time view
     * @private
     */
    switchToTimeView(event: UIEvent): void;
    /**
     * goes back one view
     * @private
     */
    goBackInView(event: UIEvent): void;
    validate(c: AbstractControl): ValidationErrors | any;
    ngOnDestroy(): void;
    private validDate(viewValue);
    private validateDateRange(data);
    private parseDate(data);
    /**
     * formats after the given timezone and date format
     * (if no timezone is used then the default one is used and the date format is
     * DD.MM.YYYY
     */
    private formatDate(data);
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    onChange(event: any): void;
}
