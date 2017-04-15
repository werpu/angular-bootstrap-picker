/*
 Copyright (c) 2016 Werner Punz

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */

/// <reference path="../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../node_modules/moment/moment.d.ts" />



import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
import {RangeInput} from "./helperComponents/RangeInput";
import {_DatePickerView} from "./datePicker/DatePickerView";
import {_DatePickerController} from "./datePicker/DatePickerController";

import INgModelController = angular.INgModelController;
import {EventPicker} from "./eventPicker/EventPicker";
import {DatePickerService} from "./services/DatePickerService";

import * as ang1 from "angular";
import * as mom from "moment";


declare global {
    var angular: typeof ang1;
    var moment: typeof mom;
    type Moment = mom.Moment;
}



export class DatePicker implements IComponentOptions {
    template = _DatePickerView.template;
    controllerAs = _DatePickerView.controllerAs;
    bindings: any = _DatePickerView.bindings;
    transclude: any = _DatePickerView.transclude;
    require: any = _DatePickerView.require;
    controller: any = ["$scope", "$element", "$timeout", _DatePickerController];
}


//note this code is ported from github please do not change it here
angular.module('werpu.bootstrap.picker', [])
    .component("datePicker", new DatePicker())
    .component("internalRangeInput", new RangeInput())
    .component("eventPicker", new EventPicker())
    .service("datePickerService", DatePickerService)

;


