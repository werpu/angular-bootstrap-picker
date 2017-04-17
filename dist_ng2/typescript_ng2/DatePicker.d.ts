/// <reference types="moment" />
/// <reference types="moment-range" />
/// <reference types="moment-timezone" />
import * as mom from "moment";
declare global  {
    var moment: typeof mom;
    type Moment = mom.Moment;
}
export declare class DatePickerModule {
}
