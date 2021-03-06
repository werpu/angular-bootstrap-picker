import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';

import {DatePickerModule} from '@werpu/picker';
import {FormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {ROUTER_PROVIDERS} from "@angular/router/src/router_module";


@NgModule({
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
