import { NgModule }      from '@angular/core';
import {DatePicker} from "./datePicker/DatePicker";
import {RangeInput} from "./helperComponents/RangeInput";


import * as mom from "moment";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


declare global {

    var moment: typeof mom;
    type Moment = mom.Moment;
}


@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [
        DatePicker,
        RangeInput
    ],
    exports: [
        RangeInput,
        DatePicker
    ]
})
export class DatePickerModule {}