import {Component} from '@angular/core';
//import {EventModel, EventModelValue} from "../../../src/typescript/utils/DatePickerTypes";
//import {DatePickerService} from "../../../src/typescript/services/DatePickerService";

declare var moment: any;

class DatePickerService {

    /**
     * creates a single model with the existing interfaces
     *
     * @param numberOfEvents
     * @param importance
     * @param date
     * @param data
     * @returns {EventModelValue}
     */
    createEventModelValue(numberOfEvents: number, importance: string, date: Date, data ?: any): any {
        var retVal: any = {};
        retVal.numberOfEvents = numberOfEvents;
        retVal.importance =  importance;
        retVal.day = date;
        if (data) {
            retVal.data = data;
        }
        return retVal;
    }

    /**
     * creates an entier event model from the given events
     * @param events
     * @returns {EventModel}
     */
    createEventEventModel(events: any[]): any {
        var retVal:any = {};
        retVal.data = events;
        return retVal;
    }

}


@Component({
    template: `
        <form #form="ngForm">
            <a routerLink="/datePicker" routerLinkActive="active">&gt;&gt;To the Date Picker Example</a>

            <p>Small Event Picker example</p>
            <p style="display: table;">
                <event-picker name="events" (eventSelected)="eventSelected($event)" [events]="eventData" [startDate]="minDate"
                              [endDate]="maxDate" [(ngModel)]="currentDate"></event-picker>
            </p>
            <pre>{{selectionResult}}</pre>

        </form>`
})
export class EventPickerPage {

    TIME_ZONE = "Europe/Zurich";

    minDate = moment.tz(new Date(), this.TIME_ZONE).startOf("day").add("days", 3).toDate();
    maxDate = moment.tz(new Date(), this.TIME_ZONE).endOf("day").add(3, "month").toDate();

    currentDate: Date = new Date();

    eventData: any;

    selectionResult: string;

    constructor() {
        let datePickerService = new DatePickerService();
        var events = [];
        for (var cnt = 6; cnt < 15; cnt++) {
            events.push(datePickerService.createEventModelValue(cnt + 10, "HIGH", moment.tz(new Date(), this.TIME_ZONE).add("days", cnt).startOf("day").toDate(), "data" + cnt));
        }

        this.eventData = datePickerService.createEventEventModel(events);
    }

    eventSelected(selectedEvent: any) {
        var res = [];
        selectedEvent = selectedEvent.$event;
        res.push("event was selected. Details:");
        res.push("Number of events at that day " + selectedEvent.numberOfEvents);
        res.push("Importance " + selectedEvent.importance);
        res.push("Date " + selectedEvent.day);
        res.push("data " + selectedEvent.data.toString());
        this.selectionResult = res.join("\n");
    };
}