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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RangeInput_1 = require("./helperComponents/RangeInput");
var DatePickerView_1 = require("./datePicker/DatePickerView");
var DatePickerController_1 = require("./datePicker/DatePickerController");
var EventPicker_1 = require("./eventPicker/EventPicker");
var DatePickerService_1 = require("./services/DatePickerService");
var DatePicker = (function () {
    function DatePicker() {
        this.template = DatePickerView_1._DatePickerView.template;
        this.controllerAs = DatePickerView_1._DatePickerView.controllerAs;
        this.bindings = DatePickerView_1._DatePickerView.bindings;
        this.transclude = DatePickerView_1._DatePickerView.transclude;
        this.require = DatePickerView_1._DatePickerView.require;
        this.controller = ["$scope", "$element", "$timeout", DatePickerController_1._DatePickerController];
    }
    return DatePicker;
}());
exports.DatePicker = DatePicker;
//note this code is ported from github please do not change it here
angular.module('werpu.bootstrap.picker', [])
    .component("datePicker", new DatePicker())
    .component("internalRangeInput", new RangeInput_1.RangeInput())
    .component("eventPicker", new EventPicker_1.EventPicker())
    .service("datePickerService", DatePickerService_1.DatePickerService);
//# sourceMappingURL=DatePicker.js.map