import {EventPickerPage} from "./eventPicker.component";
import {AppComponent} from "./app.component";
import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {APP_BASE_HREF} from "@angular/common";
import {DatePickerPage} from "./datePicker.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {DatePickerModule} from 'picker';

const appRoutes: Routes = [
    { path: 'index.html', redirectTo: "datePicker", pathMatch: 'full'},
    { path: '', redirectTo: "datePicker", pathMatch: 'full'},
    { path: 'datePicker', component: DatePickerPage},
    { path: 'eventPicker',      component: EventPickerPage }
];
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(
            appRoutes
        ),
        DatePickerModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [DatePickerPage, EventPickerPage],
    providers: [{provide: APP_BASE_HREF, useValue : '/angular-bootstrap-picker/demo_angular2/build/' }],
    entryComponents: [DatePickerPage, EventPickerPage]
})
export class AppRoutingModule { }
