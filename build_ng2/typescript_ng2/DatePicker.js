"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatePicker_1 = require("./datePicker/DatePicker");
var RangeInput_1 = require("./helperComponents/RangeInput");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var AdditionalContentDate_1 = require("./datePicker/transcludeDirectives/AdditionalContentDate");
var AdditionalButtonsDate_1 = require("./datePicker/transcludeDirectives/AdditionalButtonsDate");
var AdditionalContentYear_1 = require("./datePicker/transcludeDirectives/AdditionalContentYear");
var AdditionalContentMonth_1 = require("./datePicker/transcludeDirectives/AdditionalContentMonth");
var AdditionalButtonsMonth_1 = require("./datePicker/transcludeDirectives/AdditionalButtonsMonth");
var AdditionalButtonsYear_1 = require("./datePicker/transcludeDirectives/AdditionalButtonsYear");
var http_1 = require("@angular/http");
var EventPicker_1 = require("./eventPicker/EventPicker");
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    return DatePickerModule;
}());
DatePickerModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, common_1.CommonModule],
        declarations: [
            DatePicker_1.DatePicker,
            EventPicker_1.EventPicker,
            RangeInput_1.RangeInput,
            AdditionalButtonsDate_1.AdditionalButtonsDate,
            AdditionalButtonsMonth_1.AdditionalButtonsMonth,
            AdditionalButtonsYear_1.AdditionalButtonsYear,
            AdditionalContentDate_1.AdditionalContentDate,
            AdditionalContentMonth_1.AdditionalContentMonth,
            AdditionalContentYear_1.AdditionalContentYear
        ],
        exports: [
            DatePicker_1.DatePicker,
            EventPicker_1.EventPicker,
            AdditionalButtonsDate_1.AdditionalButtonsDate,
            AdditionalButtonsMonth_1.AdditionalButtonsMonth,
            AdditionalButtonsYear_1.AdditionalButtonsYear,
            AdditionalContentDate_1.AdditionalContentDate,
            AdditionalContentMonth_1.AdditionalContentMonth,
            AdditionalContentYear_1.AdditionalContentYear
        ]
    })
], DatePickerModule);
exports.DatePickerModule = DatePickerModule;
//# sourceMappingURL=DatePicker.js.map