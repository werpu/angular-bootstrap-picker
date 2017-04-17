/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference path="../../../node_modules/@types/moment-range/index.d.ts" />
/// <reference path="../../../node_modules/@types/moment-timezone/index.d.ts" />
import {
    Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnInit, OnDestroy,
    OnChanges, forwardRef
} from "@angular/core";
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from "@angular/forms";
import {EventModel, EventPickerPage, EventModelValue, PickerDate} from "../../typescript/utils/DatePickerTypes";
import {DateUtils} from "../../typescript/utils/DateUtils";
import {RangeModelDictionary, ViewModelBuilder} from "../../typescript/utils/ViewModelBuilder";

declare var moment: any;

@Component({
        selector: "event-picker",
        template: `
            <div class="event-picker">
                <table *ngFor="let datePickerPage of pickerPage.months">
                    <thead>
                    <tr>
                        <td class="calendarMonth no-link" colspan="8"> {{datePickerPage.month}}
                            {{datePickerPage.year}}
                        </td>
                    </tr>
                    <tr>
                        <td class="calendarWeek"><!-- week of year --></td>
                        <td class="dayOfWeek" *ngFor="let dayOfWeek of datePickerPage.dayOfWeek"
                            (click)="selectDate(dayOfWeek)">{{dayOfWeek}}
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr *ngFor="let week of datePickerPage.weeks">
                        <td class="calendarWeek">{{week.calendarWeek}}</td>
                        <td class="day {{ day.event && day.event.importance ? day.event.importance : ''}}" *ngFor="let day of week.days"
                            [ngClass]="{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : isSelectedDate(day), 'today': isToday(day), 'noevent': !day.event , 'event': day.event }"
                            (click)="selectDate(day)">{{day.day}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        `,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => EventPicker),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => EventPicker),
                multi: true,
            }
        ]
    }
)
export class EventPicker implements Validator, OnInit, OnChanges, ControlValueAccessor {



    @Input() timezone: string;
    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() events: EventModel;
    @Output() eventSelected: EventEmitter<any> = new EventEmitter<any>(false);

    private _ngModel: Moment;
    private pickerPage: EventPickerPage;
    private onChangeEmitter: Function = () => {
    };
    private rangeModelIdx: RangeModelDictionary = {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.startDate) {
            if (!changes.startDate.currentValue) {

                this.startDate = moment.tz(DateUtils.getTimezone(this.timezone)).startOf("day").toDate();
                this.updateRange(this.events);
            } else {

                this.startDate = changes.startDate.currentValue;
                this.updateRange(this.events);
            }
        }
        if (changes.endDate) {
            if (!changes.endDate.currentValue) {
                this.endDate = moment.tz(DateUtils.getTimezone(this.timezone)).endOf("day").toDate();
                this.updateRange(this.events);
            } else {
                this.endDate = changes.endDate.currentValue;
                this.updateRange(this.events);
            }
        }
        if (changes.events) {
            this.updateRange(changes.events.currentValue);
            this.rangeModelIdx = ViewModelBuilder.buildModelIdx(changes.events.currentValue, DateUtils.getTimezone(this.timezone));
        }
    }

    ngOnInit(): void {
        this.updateRange(this.events);
    }


    eventPresent(moment: Moment): EventModelValue {
        if ((<any>this).events) {
            return this.rangeModelIdx[moment.format("DD.MM.YYYY")];
        }
        return null;
    }

    isActive(currentMoment: Moment): boolean {
        var startMoment = moment.tz(this.startDate, this.timezone);
        var endMoment = moment.tz(this.endDate, this.timezone);
        return currentMoment && currentMoment.isBetween(startMoment.subtract(1, "day"), endMoment.add(1, "day"), "day");
    }

    isSelectedDate(selectedDate: PickerDate) {
        if (!this._ngModel) {
            return false;
        }


        return DateUtils.isSameDay(this._ngModel, selectedDate.momentDate);
    }

    selectDate(selectDate: PickerDate) {
        if (!selectDate.event) {
            return;
        }

        this._ngModel = selectDate.momentDate;
        this.eventSelected.emit({$event: selectDate.event});
        this.updateRange(this.events);
        this.onChangeEmitter(this._ngModel.toDate());
    }

    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isToday(selectedDate: PickerDate) {
        return DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };


    //implemented interfaces
    writeValue(obj: any): void {
        if (obj) {
            this._ngModel = moment.tz(<Date> obj, this.timezone).startOf("day");
        } else {
            this._ngModel = null;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeEmitter = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    validate(c: AbstractControl): { [key: string]: any; } {
        return undefined;
    }

    registerOnValidatorChange(fn: () => void): void {

    }

    updateRange(rangeModel: EventModel) {
        this.pickerPage = ViewModelBuilder.calculateEventDateView(rangeModel, this.startDate, this.endDate, DateUtils.getTimezone(this.timezone));
    }
}


