import { NgModule }      from '@angular/core';
import {DatePicker} from "./datePicker/DatePicker";
import {RangeInput} from "./helperComponents/RangeInput";


import * as mom from "moment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {AdditionalContentDate} from "./datePicker/fakeDirectives/AdditionalContentDate";
import {AdditionalButtonsDate} from "./datePicker/fakeDirectives/AdditionalButtonsDate";
import {AdditionalContentYear} from "./datePicker/fakeDirectives/AdditionalContentYear";
import {AdditionalContentMonth} from "./datePicker/fakeDirectives/AdditionalContentMonth";
import {AdditionalButtonsMonth} from "./datePicker/fakeDirectives/AdditionalButtonsMonth";
import {AdditionalButtonsYear} from "./datePicker/fakeDirectives/AdditionalButtonsYear";
import {HttpModule} from "@angular/http";


declare global {

    var moment: typeof mom;
    type Moment = mom.Moment;
}


@NgModule({
    imports: [FormsModule, ReactiveFormsModule,HttpModule, CommonModule],
    declarations: [
        DatePicker,
        RangeInput,
        AdditionalButtonsDate,
        AdditionalButtonsMonth,
        AdditionalButtonsYear,
        AdditionalContentDate,
        AdditionalContentMonth,
        AdditionalContentYear
    ],
    exports: [
        DatePicker,
        AdditionalButtonsDate,
        AdditionalButtonsMonth,
        AdditionalButtonsYear,
        AdditionalContentDate,
        AdditionalContentMonth,
        AdditionalContentYear
    ]
})
export class DatePickerModule {}