"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var eventPicker_component_1 = require("./eventPicker.component");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var datePicker_component_1 = require("./datePicker.component");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var picker_1 = require("@werpu/picker");
var appRoutes = [
    { path: 'index.html', redirectTo: "datePicker", pathMatch: 'full' },
    { path: '', redirectTo: "datePicker", pathMatch: 'full' },
    { path: 'datePicker', component: datePicker_component_1.DatePickerPage },
    { path: 'eventPicker', component: eventPicker_component_1.EventPickerPage }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(appRoutes, { useHash: true }),
            picker_1.DatePickerModule
        ],
        exports: [
            router_1.RouterModule
        ],
        declarations: [datePicker_component_1.DatePickerPage, eventPicker_component_1.EventPickerPage],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }],
        entryComponents: [datePicker_component_1.DatePickerPage, eventPicker_component_1.EventPickerPage]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map