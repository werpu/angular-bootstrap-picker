import { NgModule }      from '@angular/core';
import {DatePicker} from "./datePicker/DatePicker";
import {RangeInput} from "./helperComponents/RangeInput";


import * as mom from "moment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {AdditionalContentDate} from "./datePicker/transcludeDirectives/AdditionalContentDate";
import {AdditionalButtonsDate} from "./datePicker/transcludeDirectives/AdditionalButtonsDate";
import {AdditionalContentYear} from "./datePicker/transcludeDirectives/AdditionalContentYear";
import {AdditionalContentMonth} from "./datePicker/transcludeDirectives/AdditionalContentMonth";
import {AdditionalButtonsMonth} from "./datePicker/transcludeDirectives/AdditionalButtonsMonth";
import {AdditionalButtonsYear} from "./datePicker/transcludeDirectives/AdditionalButtonsYear";
import {HttpModule} from "@angular/http";
import {EventPicker} from "./eventPicker/EventPicker";


declare global {

    var moment: typeof mom;
    type Moment = mom.Moment;
}


@NgModule({
    imports: [FormsModule, ReactiveFormsModule,HttpModule, CommonModule],
    declarations: [
        DatePicker,
        EventPicker,
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
        EventPicker,
        AdditionalButtonsDate,
        AdditionalButtonsMonth,
        AdditionalButtonsYear,
        AdditionalContentDate,
        AdditionalContentMonth,
        AdditionalContentYear
    ]
})
export class DatePickerModule {}