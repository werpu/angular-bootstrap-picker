/// <reference path="../../node_modules/@types/angular/index.d.ts" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {enableProdMode} from "@angular/core";
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
