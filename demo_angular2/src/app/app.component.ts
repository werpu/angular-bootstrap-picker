import {Component} from '@angular/core';

declare var moment: any;

@Component({
    selector: 'my-app',
    template: `
        <h1>Hello {{name}}</h1>
        <a href="./eventpicker.html">&gt;&gt;To the Event Picker Example</a>

      

        <p>Small Datepicker example</p>
        UTC Date: {{currentDate}}
        <p>
            Europe GMT+1 with picker mode DATE_TIME
            <date-picker [name]="'europe'" [(ngModel)]="currentDate" [startDate]="minDate" [endDate]="maxDate"
                         [timezone]="'Europe/Zurich'" [pickerMode]="'DATE_TIME'"></date-picker>
        </p>
        <p>
            Asia/Tokyo
            <date-picker [name]="asia" [(ngModel)]="currentDate" [startDate]="minDate" [endDate]="maxDate"
                         [timezone]="'Asia/Tokyo'"></date-picker>
        </p>
        <p>
            America/Los Angeles Picker Mode DATE_TIME with boundaries on GMT+1
            <date-picker [name]="'america'" [(ngModel)]="currentDate" [startDate]="minDate" [endDate]="maxDate"
                         [timezone]="'America/Los_Angeles'" [pickerMode]="'DATE_TIME'"></date-picker>
        </p>
        <table>
            <thead>
            <tr>
                <td>
                    <p>Picker Only</p>
                    {{currentDate}}
                </td>
                <td>
                    <p>DateTime Picker-Only - Double buffered</p>
                    {{currentDate}}
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style="vertical-align: top">

                    <date-picker (onDateSelection)="onDateSelection($event)" [name]="pickerOnly"
                                 [pickerOnlyMode]="'SINGLE_BUFFERED'" [(ngModel)]="currentDate"
                                 [startDate]="minDate" [endDate]="maxDate" [timezone]="'Europe/Zurich'"></date-picker>
                </td>
                <td>

                    <date-picker (onDateSelection)="onDateSelection($event)" [name]="pickerOnly"
                                 [pickerOnlyMode]="'DOUBLE_BUFFERED'" [pickerMode]="'DATE_TIME'"
                                 [(ngModel)]="currentDate" [startDate]="minDate" [endDate]="maxDate"
                                 [timezone]="'Europe/Zurich'"></date-picker>
                </td>
            </tr>
            </tbody>
        </table>

        <p>Range Selection</p>
        {{currentDate}}{{currentDate2}}
        <table>
            <tr>
                <td>
                    <date-picker [name]="'pickerRangeFrom'" (onDateSelection)="onDateSelection($event)"
                                 [pickerOnlyMode]="'SINGLE_BUFFERED'" [(ngModel)]="currentDate"
                                 [startDate]="minDate" [endDate]="maxDate" [timezone]="'Europe/Zurich'"></date-picker>
                </td>
                <td>
                    <date-picker [name]="'pickerRangeTo'" (onDateSelection)="onDateSelection($event)"
                                 [pickerOnlyMode]="'SINGLE_BUFFERED'" [(ngModel)]="currentDate2"
                                 [startDate]="currentDate" [endDate]="maxDate" [endOfDay]="true"
                                 [timezone]="'Europe/Zurich'"></date-picker>
                </td>
            </tr>
        </table>


        <p>Additional content</p>
        {{currentDate}}{{currentDate2}}

        <table>
            <tr>
                <td>
                    <date-picker [name]="'pickerRangeFrom'" (onDateSelection)="onDateSelection($event)"
                                 [pickerOnlyMode]="'SINGLE_BUFFERED'" [(ngModel)]="currentDate"
                                 [startDate]="minDate" [endDate]="maxDate" [timezone]="'Europe/Zurich'">

                        <additional-buttons-date>Date Button Area Extra content</additional-buttons-date>
                        <additional-content-date>Date Content Area Extra content</additional-content-date>

                        <additional-buttons-month>Month Button Area Extra content</additional-buttons-month>
                        <additional-content-month>Month Content Area Extra content</additional-content-month>


                        <additional-buttons-year>Year Button Area Extra content</additional-buttons-year>
                        <additional-content-year>Year Content Area Extra content</additional-content-year>


                    </date-picker>
                </td>
            </tr>
        </table>

    `,
})
export class AppComponent {
    name = 'Angular';
    greeting = "Hello World";
    currentDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();
    currentDate2: Date = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();

    minDate = moment.tz(new Date(), "Europe/Zurich").startOf("day").toDate();
    maxDate = moment.tz(new Date(), "Europe/Zurich").endOf("day").add(3, "month").toDate();

    onDateSelection(event: any) {
        console.debug("OnDateSelection called. Picker:", event.$picker, " Date:", event.$date);
    };
}
