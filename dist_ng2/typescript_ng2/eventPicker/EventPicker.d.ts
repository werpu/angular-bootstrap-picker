/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference path="../../../node_modules/@types/moment-range/index.d.ts" />
/// <reference path="../../../node_modules/@types/moment-timezone/index.d.ts" />
import { EventEmitter, SimpleChanges, OnInit, OnChanges } from "@angular/core";
import { AbstractControl, ControlValueAccessor, Validator } from "@angular/forms";
import { EventModel, EventModelValue, PickerDate } from "../../typescript/utils/DatePickerTypes";
export declare class EventPicker implements Validator, OnInit, OnChanges, ControlValueAccessor {
    timezone: string;
    startDate: Date;
    endDate: Date;
    events: EventModel;
    eventSelected: EventEmitter<any>;
    private _ngModel;
    private pickerPage;
    private onChangeEmitter;
    private rangeModelIdx;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    eventPresent(moment: Moment): EventModelValue;
    isActive(currentMoment: Moment): boolean;
    isSelectedDate(selectedDate: PickerDate): boolean;
    selectDate(selectDate: PickerDate): void;
    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isToday(selectedDate: PickerDate): boolean;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    registerOnValidatorChange(fn: () => void): void;
    updateRange(rangeModel: EventModel): void;
}
