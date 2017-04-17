"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference path="../../../node_modules/@types/moment-range/index.d.ts" />
/// <reference path="../../../node_modules/@types/moment-timezone/index.d.ts" />
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DatePickerTypes_1 = require("../../typescript/utils/DatePickerTypes");
var DateUtils_1 = require("../../typescript/utils/DateUtils");
var ViewModelBuilder_1 = require("../../typescript/utils/ViewModelBuilder");
var EventPicker = EventPicker_1 = (function () {
    function EventPicker() {
        this.eventSelected = new core_1.EventEmitter(false);
        this.onChangeEmitter = function () {
        };
        this.rangeModelIdx = {};
    }
    EventPicker.prototype.ngOnChanges = function (changes) {
        if (changes.startDate) {
            if (!changes.startDate.currentValue) {
                this.startDate = moment.tz(DateUtils_1.DateUtils.getTimezone(this.timezone)).startOf("day").toDate();
                this.updateRange(this.events);
            }
            else {
                this.startDate = changes.startDate.currentValue;
                this.updateRange(this.events);
            }
        }
        if (changes.endDate) {
            if (!changes.endDate.currentValue) {
                this.endDate = moment.tz(DateUtils_1.DateUtils.getTimezone(this.timezone)).endOf("day").toDate();
                this.updateRange(this.events);
            }
            else {
                this.endDate = changes.endDate.currentValue;
                this.updateRange(this.events);
            }
        }
        if (changes.events) {
            this.updateRange(changes.events.currentValue);
            this.rangeModelIdx = ViewModelBuilder_1.ViewModelBuilder.buildModelIdx(changes.events.currentValue, DateUtils_1.DateUtils.getTimezone(this.timezone));
        }
    };
    EventPicker.prototype.ngOnInit = function () {
        this.updateRange(this.events);
    };
    EventPicker.prototype.eventPresent = function (moment) {
        if (this.events) {
            return this.rangeModelIdx[moment.format("DD.MM.YYYY")];
        }
        return null;
    };
    EventPicker.prototype.isActive = function (currentMoment) {
        var startMoment = moment.tz(this.startDate, this.timezone);
        var endMoment = moment.tz(this.endDate, this.timezone);
        return currentMoment && currentMoment.isBetween(startMoment.subtract(1, "day"), endMoment.add(1, "day"), "day");
    };
    EventPicker.prototype.isSelectedDate = function (selectedDate) {
        if (!this._ngModel) {
            return false;
        }
        return DateUtils_1.DateUtils.isSameDay(this._ngModel, selectedDate.momentDate);
    };
    EventPicker.prototype.selectDate = function (selectDate) {
        if (!selectDate.event) {
            return;
        }
        this._ngModel = selectDate.momentDate;
        this.eventSelected.emit({ $event: selectDate.event });
        this.updateRange(this.events);
        this.onChangeEmitter(this._ngModel.toDate());
    };
    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    EventPicker.prototype.isToday = function (selectedDate) {
        return DateUtils_1.DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };
    ;
    //implemented interfaces
    EventPicker.prototype.writeValue = function (obj) {
        if (obj) {
            this._ngModel = moment.tz(obj, this.timezone).startOf("day");
        }
        else {
            this._ngModel = null;
        }
    };
    EventPicker.prototype.registerOnChange = function (fn) {
        this.onChangeEmitter = fn;
    };
    EventPicker.prototype.registerOnTouched = function (fn) {
    };
    EventPicker.prototype.setDisabledState = function (isDisabled) {
    };
    EventPicker.prototype.validate = function (c) {
        return undefined;
    };
    EventPicker.prototype.registerOnValidatorChange = function (fn) {
    };
    EventPicker.prototype.updateRange = function (rangeModel) {
        this.pickerPage = ViewModelBuilder_1.ViewModelBuilder.calculateEventDateView(rangeModel, this.startDate, this.endDate, DateUtils_1.DateUtils.getTimezone(this.timezone));
    };
    return EventPicker;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EventPicker.prototype, "timezone", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], EventPicker.prototype, "startDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], EventPicker.prototype, "endDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", DatePickerTypes_1.EventModel)
], EventPicker.prototype, "events", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EventPicker.prototype, "eventSelected", void 0);
EventPicker = EventPicker_1 = __decorate([
    core_1.Component({
        selector: "event-picker",
        template: "\n            <div class=\"event-picker\">\n                <table *ngFor=\"let datePickerPage of pickerPage.months\">\n                    <thead>\n                    <tr>\n                        <td class=\"calendarMonth no-link\" colspan=\"8\"> {{datePickerPage.month}}\n                            {{datePickerPage.year}}\n                        </td>\n                    </tr>\n                    <tr>\n                        <td class=\"calendarWeek\"><!-- week of year --></td>\n                        <td class=\"dayOfWeek\" *ngFor=\"let dayOfWeek of datePickerPage.dayOfWeek\"\n                            (click)=\"selectDate(dayOfWeek)\">{{dayOfWeek}}\n                        </td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr *ngFor=\"let week of datePickerPage.weeks\">\n                        <td class=\"calendarWeek\">{{week.calendarWeek}}</td>\n                        <td class=\"day {{ day.event && day.event.importance ? day.event.importance : ''}}\" *ngFor=\"let day of week.days\"\n                            [ngClass]=\"{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : isSelectedDate(day), 'today': isToday(day), 'noevent': !day.event , 'event': day.event }\"\n                            (click)=\"selectDate(day)\">{{day.day}}\n                        </td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n        ",
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return EventPicker_1; }),
                multi: true,
            },
            {
                provide: forms_1.NG_VALIDATORS,
                useExisting: core_1.forwardRef(function () { return EventPicker_1; }),
                multi: true,
            }
        ]
    })
], EventPicker);
exports.EventPicker = EventPicker;
var EventPicker_1;
//# sourceMappingURL=EventPicker.js.map