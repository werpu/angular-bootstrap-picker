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
var core_1 = require("@angular/core");
var DatePickerService = (function () {
    function DatePickerService() {
    }
    /**
     * creates a single model with the existing interfaces
     *
     * @param numberOfEvents
     * @param importance
     * @param date
     * @param data
     * @returns {EventModelValue}
     */
    DatePickerService.prototype.createEventModelValue = function (numberOfEvents, importance, date, data) {
        var retVal = {};
        retVal.numberOfEvents = numberOfEvents;
        retVal.importance = importance;
        retVal.day = date;
        if (data) {
            retVal.data = data;
        }
        return retVal;
    };
    /**
     * creates an entier event model from the given events
     * @param events
     * @returns {EventModel}
     */
    DatePickerService.prototype.createEventEventModel = function (events) {
        var retVal = {};
        retVal.data = events;
        return retVal;
    };
    return DatePickerService;
}());
var EventPickerPage = (function () {
    function EventPickerPage() {
        this.TIME_ZONE = "Europe/Zurich";
        this.minDate = moment.tz(new Date(), this.TIME_ZONE).startOf("day").add("days", 3).toDate();
        this.maxDate = moment.tz(new Date(), this.TIME_ZONE).endOf("day").add(3, "month").toDate();
        this.currentDate = new Date();
        var datePickerService = new DatePickerService();
        var events = [];
        for (var cnt = 6; cnt < 15; cnt++) {
            events.push(datePickerService.createEventModelValue(cnt + 10, "HIGH", moment.tz(new Date(), this.TIME_ZONE).add("days", cnt).startOf("day").toDate(), "data" + cnt));
        }
        this.eventData = datePickerService.createEventEventModel(events);
    }
    EventPickerPage.prototype.eventSelected = function (selectedEvent) {
        var res = [];
        selectedEvent = selectedEvent.$event;
        res.push("event was selected. Details:");
        res.push("Number of events at that day " + selectedEvent.numberOfEvents);
        res.push("Importance " + selectedEvent.importance);
        res.push("Date " + selectedEvent.day);
        res.push("data " + selectedEvent.data.toString());
        this.selectionResult = res.join("\n");
    };
    ;
    return EventPickerPage;
}());
EventPickerPage = __decorate([
    core_1.Component({
        template: "\n        <form #form=\"ngForm\">\n            <a routerLink=\"/datePicker\" routerLinkActive=\"active\">&gt;&gt;To the Date Picker Example</a>\n\n            <p>Small Event Picker example</p>\n            <p style=\"display: table;\">\n                <event-picker name=\"events\" (eventSelected)=\"eventSelected($event)\" [events]=\"eventData\" [startDate]=\"minDate\"\n                              [endDate]=\"maxDate\" [(ngModel)]=\"currentDate\"></event-picker>\n            </p>\n            <pre>{{selectionResult}}</pre>\n\n        </form>"
    }),
    __metadata("design:paramtypes", [])
], EventPickerPage);
exports.EventPickerPage = EventPickerPage;
//# sourceMappingURL=eventPicker.component.js.map