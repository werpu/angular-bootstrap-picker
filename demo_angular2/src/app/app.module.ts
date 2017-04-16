import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import {DatePickerModule} from 'picker';
import {FormsModule, NgForm} from "@angular/forms";


@NgModule({
  imports:      [ BrowserModule, DatePickerModule, FormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
