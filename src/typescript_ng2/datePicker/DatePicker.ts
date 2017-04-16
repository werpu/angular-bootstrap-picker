/// <reference path="../../../node_modules/moment/moment.d.ts" />
/// <reference path="../../../node_modules/@types/moment-range/index.d.ts" />
/// <reference path="../../../node_modules/@types/moment-timezone/index.d.ts" />
import {
    Component, Input, Output, EventEmitter, ElementRef, SimpleChanges, OnInit, OnDestroy,
    OnChanges, forwardRef
} from "@angular/core";
import {
    PickerMonth, PickerDate, PickerYear, DatePickerPage,
    MonthPickerPage, YearPickerPage
} from "../../typescript/utils/DatePickerTypes";

import {BehavioralFixes} from "../../typescript/utils/BehavioralFixes";
import {DateUtils} from "../../typescript/utils/DateUtils";
import {ViewModelBuilder} from "../../typescript/utils/ViewModelBuilder";
import {elementDef} from "@angular/core/src/view";
import {
    ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from "@angular/forms";


class PickerConstants {
    static DEFAULT_DATE_FORMAT = "DD.MM.YYYY";
    static DEFAULT_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
    static DEFAULT_PICKER_MODE = "DATE";
    static PICKER_VIEW_DATE = "DATE";
    static PICKER_VIEW_TIME = "TIME";
    static PICKER_VIEW_MONTH = "MONTH";
    static PICKER_VIEW_YEAR = "YEAR";
    static DEFAULT_PICKER_LABEL = "Date";

}


var template = () => {
    var inputArea = `

                <div class="input-group">
                   <input type="text" [placeholder]="placeholder" class="form-control" name="{{name}}_inner" [(ngModel)]="innerSelection" (change)="onChange($event)" (keyup)="onChange($event)">
                   <span class="input-group-btn">
                       <button type="button" class="picker-open btn btn-default" (click)="openPicker()">
                             <span [className]="buttonStyleClass" [ngClass]="{'glyphicon glyphicon-align-right glyph-icon glyphicon-calendar': !buttonStyleClass}"> {{buttonLabel}} </span>
                       </button>
                   </span> 
               </div>
               <input type="button" class="picker-close" (click)="close()" value="Close" [hidden]="true"/>
              
        `;

    var inputAreaHidden = `
           <input type="text" style="display: none;"  class="form-control" name="{{name}}_inner" [(ngModel)]="innerSelection" (change)="onChange($event)" (keyup)="onChange($event)">
        `;

    var timePickerSpinning = `
            <div class="time-picker" *ngIf="view == 'DATE' && pickerMode == 'DATE_TIME'" >
                <table>
                   <thead>
                        
                    </thead>
                    <tbody>
                        
                         <tr>
                            <td class="glyphicon glyphicon-chevron-up" [ngClass]="{'invalid' : !isValidHour(currentDate.get('hour') + 1)}" (click)="nextHour($event)">
                            </td>
                            <td></td>
                            <td class="glyphicon glyphicon-chevron-up" [ngClass]="{'invalid' : !isValidMinute(currentDate.get('minute') + 1)}" (click)="nextMinute($event)">
                            </td>
                        </tr>
                        <tr>
                            <td class="selected-hour">
                                <internal-range-input ngDefaultControl class="hour-input" [from]="0" [to]="23" [(ngModel)]="currentHour"></internal-range-input>    
                            </td>
                            <td class="invalid">:</td>
                            <td class="selected-minute">
                                <internal-range-input ngDefaultControl  class="minute-input" [from]="0" [to]="59" [(ngModel)]="currentMinute"></internal-range-input> 
                            </td>
                        </tr>
                         <tr>
                            <td class="glyphicon glyphicon-chevron-down" [ngClass]="{'invalid' : !isValidHour(currentDate.get('hour') - 1)}" (click)="prevHour($event)">
                            </td>
                            <td></td>
                            <td class="glyphicon glyphicon-chevron-down" [ngClass]="{'invalid' : !isValidMinute(currentDate.get('minute') - 1)}" (click)="prevMinute($event)">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-group bottom-buttons" *ngIf="view == 'TIME'">
                  <input type="button" class="btn btn-default btn-sm" (click)="goBackInView($event)" value="Back" >
                </div>
            </div>
        `;

    var datePicker = `
               <!-- date view - default view -->
               <div class="date-picker" *ngIf="view == 'DATE'">                
                    <table>
                        <thead>
                        
                            <tr *ngIf="pickerMode == 'DATE_TIME'">
                                <td colspan="8" class="invalid picker-title" >{{innerSelection}}</td>
                            </tr>
                            
                            <tr>
                                <td><a class="prev glyphicon glyphicon-menu-left" (click)="prevMonth($event)"></a></td><td colspan="2" (click)="switchToMonthView($event)">{{currentDate.format("MMMM")}}</td><td><a class="next glyphicon glyphicon-menu-right" (click)="nextMonth($event)"></a></td>
                                <td><a class="prev glyphicon glyphicon-menu-left" (click)="prevYear($event)"></a></td><td colspan="2" (click)="switchToYearView($event)">{{monthPickerData.year}}</td><td><a class="next glyphicon glyphicon-menu-right" (click)="nextYear($event)"></a></td>
                            </tr>
                            <tr>
                                <td class="calendarWeek"><!-- week of year --></td>
                                <td class="dayOfWeek" *ngFor="let dayOfWeek of monthPickerData.dayOfWeek">{{dayOfWeek}}</td>    
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let week of monthPickerData.weeks">
                                <td class="calendarWeek">{{week.calendarWeek}}</td>
                                <td class="day" *ngFor="let day of week.days" [ngClass]="{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : isSelectedDate(day), 'chosen' : isChosenDate(day), 'today': isToday(day)}" class="{{(day.event) ? day.event.importance : ''}}" (click)="selectDate(day, $event)">{{day.day}}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                
                    ${timePickerSpinning}
                    
                    <div class="additional-content">
                        <ng-content select="additional-content-date"></ng-content>
                    </div>
                    
                    <div class="button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      
                        <ng-content class="additional-buttons" select="additional-buttons-date"></ng-content>
              
                        <input type="button" class="set btn btn-default btn-sm" (click)="set($event)" value="Set" *ngIf="pickerOnlyMode == 'DOUBLE_BUFFERED'" >
                        <input type="button" class="clear btn btn-default btn-sm" (click)="clear($event)" value="Clear" *ngIf="!pickerOnlyMode" >
                        <input type="button" class="today btn btn-default btn-sm" (click)="today($event)" value="Today" >
                        <input type="button" class="picker-close btn btn-default btn-sm" (click)="close($event)" *ngIf="!pickerOnlyMode" value="Close" >
                    </div>
               </div> 
        `;

    var monthPicker = `
            <!-- month view -->
            <div class="month-picker" *ngIf="view == 'MONTH'">
                 <table>
                    <thead>
                          <tr>
                          <td><a class="prev glyphicon glyphicon-menu-left" (click)="prevYear($event)" class="glyphicon glyphicon-menu-left"></a></td>
                          <td (click)="switchToYearView()">{{monthPickerData.year}}</td>
                          <td><a class="next glyphicon glyphicon-menu-right" (click)="nextYear($event)"></a></td>
                          </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let monthRow of yearPickerData.row">
                            <td *ngFor="let month of monthRow" [ngClass]="{'invalid': month.invalid, 'selected' : isSameMonth(month), 'chosen' : isChosenMonth(month), 'today': isTodayMonth(month)}"
                            (click)="selectMonth( month, $event)"
                            >{{month.month}}</td>
                        </tr>
                    </tbody>
                 </table>   
            
                 <div class="additional-content">
                    <ng-content select="additional-content-month"></ng-content>
                 </div>
                <div class="button-group bottom-buttons">
                    <div class="additional-buttons">
                        <ng-content select="additional-buttons-month"></ng-content>
                    </div>
                    <input type="button" class="btn btn-default btn-sm" (click)="goBackInView($event)" value="Back" />
                </div>
            </div>    
        `;

    var yearPicker = `
            <!-- year view -->  
            <div class="year-picker" *ngIf="view == 'YEAR'">
                  <table>
                    <thead>
                    <tr>
                        <td><a (click)="prevDecade($event)" class="glyphicon glyphicon-menu-left"></a></td>
                        <td colspan="3" class="no-link">{{decadeFrom}} - {{decadeTo}}</td>
                        <td><a (click)="nextDecade($event)" class="glyphicon glyphicon-menu-right"></a></td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let yearrow of decadePickerData.row">
                            <td *ngFor="let year of yearrow"
                            [ngClass]="{'invalid': year.invalid, 'selected' : isSameYear(year), 'chosen' : isChosenYear(year), 'today': isTodayYear(year)}"
                             (click)="selectYear(year, $event)"
                            >{{year.year}}</td>
                        </tr>
                    </table>
                  <div class="additional-content">
                        <ng-content select="additional-content-year"></ng-content>
                  </div>  
                  <div class="button-group bottom-buttons">
                    <div class="additional-buttons">
                        <ng-content select="additional-buttons-year"></ng-content>
                    </div>
                    <input type="button" class="btn btn-default btn-sm" (click)="goBackInView($event)" value="Back" />
                  </div>
            </div>   
        `;


    return `
 <!--
           <div [ngClass]="{'dropdown': !pickerOnlyMode, 'dropdown picker-standalone':pickerOnlyMode}" > 
             
               <span *ngIf="!pickerOnlyMode">${inputArea}</span>  
               <span *ngIf="pickerOnlyMode">${inputAreaHidden}</span>  
               <div [ngClass]="{'dropdown-menu picker-popup':!pickerOnlyMode, 'picker-popup': pickerOnlyMode}" (click)="$event.stopImmediatePropagation()">
                    
                    <div class="content" *ngIf="isOpen || pickerOnlyMode">
                       
                      
                   </div>
               
                </div>
            </div> 
-->            
      <div class="dropdown" [ngClass]="{'picker-standalone':pickerOnlyMode}" (click)="$event.stopImmediatePropagation()"> 
             
               <span *ngIf="!pickerOnlyMode">${inputArea}</span>  
               <span *ngIf="pickerOnlyMode">${inputAreaHidden}</span>  
               <div class="picker-popup" [ngClass]="{'dropdown-menu':!pickerOnlyMode}" (click)="$event.stopImmediatePropagation()">
                    <div class="content" *ngIf="isOpen|| pickerOnlyMode">
                       
                       ${datePicker}
                       
                       ${monthPicker}                   
                             
                       ${yearPicker}
                   </div>
               
                </div>
            </div>            
        `;
}

//https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73. thanks
//for providing a dedicated tutorial for a self validating component
@Component({
    selector: "date-picker",
    template: template(),
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() =>  DatePicker),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatePicker),
            multi: true,
        }
    ]
})
export class DatePicker implements Validator, OnInit, OnDestroy, OnChanges, ControlValueAccessor {


    @Input() placeholder: string;
    @Input() name: string;
    @Input() startDate: Date;
    @Input() endDate: Date;
    @Input() dateFormat: string;
    @Input() buttonLabel: string;
    @Input() endOfDay: boolean;
    @Input() buttonStyleClass: string;
    @Input() pickerOnlyMode: string;
    @Input() view: string;
    @Input() pickerMode: string;
    @Input() timezone: string;

    //@Input() ngModel: Date;
    //@Output() ngModelChange: EventEmitter<Date> = new EventEmitter(false);



    @Output() onYearSelection: EventEmitter<any> = new EventEmitter<any>();
    @Output() onMonthSelection: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDateSelection: EventEmitter<any> = new EventEmitter<any>(false);

    _ngModel: Date;
    innerSelection: string;
    monthPickerData: DatePickerPage;
    yearPickerData: MonthPickerPage;
    decadePickerData: YearPickerPage;

    decadeFrom: string;
    decadeTo: string;
    documentClickHandler: Function;


    currentDate: Moment;

    /**
     * internal controller vars
     */
    doubleBufferDate: Moment;
    visibleDays: Array<any>;
    pickerVisible: boolean;
    selectedDate: PickerDate;
    selectedMonth: PickerMonth;

    isOpen: boolean = false;


    private viewStack: any = [];

    private propagateChange = (_: any) => { };


    constructor(private elementRef: ElementRef) {
        /**
         * current date viewed (aka navigational position=
         * @type {Moment}
         * @private
         */
        this.currentDate = null;

        /**
         * double buffer date in double buffer mode
         *
         * @type {Moment}
         * @private
         */
        this.doubleBufferDate = null;

        this.buttonLabel = ("undefined" == typeof  this.buttonLabel || null == this.buttonLabel) ?
            PickerConstants.DEFAULT_PICKER_LABEL : this.buttonLabel;
        this.pickerMode = ("undefined" == typeof  this.pickerMode || null == this.pickerMode) ?
            PickerConstants.DEFAULT_PICKER_MODE : this.pickerMode;
        this.visibleDays = [];
        this.view = PickerConstants.PICKER_VIEW_DATE;
        this.viewStack = [];
    }

    yearSelection() {
        //then when the button is clicked, emit events to the parent.
        this.onYearSelection.emit();
    }

    ngOnInit() {


        /**
         * we turn off event propagation
         * for the popup so that a click within the popup
         * does not propagate to its parent elements
         * (we only want to have the popup closed when we click on the outside)
         *
         */
        BehavioralFixes.registerPopupBindings(this.elementRef.nativeElement);

        /**
         * we change the key handling a little bit
         * an enter should trigger a form submit
         * and a keydown should open the picker
         */
        BehavioralFixes.registerKeyBindings(this.elementRef.nativeElement);

        //with this trick we are able to traverse the outer ngModel view value into the inner ngModel

        //this.innerSelection = this.formatDate(this._ngModel);

        if (this.pickerOnlyMode) {
            this.openPicker();
        }
    }


    get currentMinute(): number {
        if (!this.currentDate) {
            return 0;
        }
        return this.currentDate.get("minute");
    }

    set currentMinute(val: number) {
        if (!this.isValidMinute(val)) {
            return;
        }
        this.currentDate.set("minute", val);
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    }

    /*we do the proper max min date validity checks over our setters*/

    get currentHour(): number {
        if (!this.currentDate) {
            return 0;
        }
        return this.currentDate.get("hour");
    }

    set currentHour(val: number) {
        if (!this.isValidHour(val)) {
            return;
        }
        this.currentDate.set("hour", val);
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    }


    ngOnChanges(changes: SimpleChanges) {

        if (changes.startDate && changes.startDate.previousValue != changes.startDate.currentValue) {
            var newMinDate = moment.tz(changes.startDate.currentValue, this.getTimezone());
            //no date change or mindate < than the currentDate in the min date, we safely can skip
            //the rest of the date processing
            if (newMinDate.isSameOrBefore(this.currentDate)) {
                this.updatePickerData();
                return;
            }

            //otherwise we set the currentDate to the newMinDate
            this.currentDate = (this.endOfDay) ? newMinDate.endOf("day") : newMinDate;

            //currentDate != modelValue?
            var currentModel = moment.tz(this._ngModel, this.getTimezone());
            //if there is a discrepancy we also update the model
            if (this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || this.pickerOnlyMode) {
                if (!currentModel || currentModel.get("day") != this.currentDate.get("day") ||
                    currentModel.get("month") != this.currentDate.get("month") ||
                    currentModel.get("year") != this.currentDate.get("year")
                ) {
                    this.selectDate(new PickerDate(false, this.currentDate, 1, true));

                }
            }
            if (this.currentDate) {
                this.updatePickerData();
            }
        }

    }

    /**
     * fetches the current or default timezone
     * @returns {string}
     * @private
     */
    private getTimezone = (): string => {
        return this.timezone || moment.tz.guess();
    };

    /**
     * fetches the date format set in the component either from outside or by its defaults
     * @returns {string}
     * @private
     */
    private getDateFormat = (): string => {
        return this.dateFormat || ((this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) ?
                PickerConstants.DEFAULT_DATE_FORMAT :
                PickerConstants.DEFAULT_DATE_TIME_FORMAT);
    };


    /**
     * formats a date by using the controls appended parsers
     * this has to be done this way because somone could decorate
     * the control from outside
     *
     * @param value
     * @private
     */
    private updateModel = (value: Date) => {
        var innerSelection: any = value;
        //for (var cnt = 0; this._ngModel.$formatters && cnt < this._ngModel.$formatters.length; cnt++) {
        //    innerSelection = this._ngModel.$formatters[cnt](innerSelection);
        //}
        innerSelection = this.formatDate(value);

        this.innerSelection = innerSelection;

        if(!this.validate(null)) {
            this._ngModel = this.currentDate.toDate();
        }
        this.propagateChange(this._ngModel);
        this.updatePickerData();

        //this.onChange(this.innerSelection);
    };


    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isSelectedDate(selectedDate: PickerDate) {
        if (!this._ngModel) {
            return false;
        } else {
            var modelDate = moment.tz(this._ngModel, this.getTimezone());
            return modelDate.isSame(selectedDate.momentDate, "date") &&
                modelDate.isSame(selectedDate.momentDate, "month") &&
                modelDate.isSame(selectedDate.momentDate, "year");
        }
    };

    /**
     * checks if the current picker date is the selected one
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isChosenDate(selectedDate: PickerDate) {
        if (!this.doubleBufferDate) {
            return false;
        } else {
            //booga
            var modelDate = this.doubleBufferDate;
            return modelDate.isSame(selectedDate.momentDate, "date") &&
                modelDate.isSame(selectedDate.momentDate, "month") &&
                modelDate.isSame(selectedDate.momentDate, "year");
        }
    };

    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isToday(selectedDate: PickerDate) {
        return DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };

    isTodayMonth(selectedDate: PickerMonth) {
        return DateUtils.isCurrentMonth(this.timezone, selectedDate.momentDate);
    };

    isSameMonth(selectedMonth: PickerMonth) {
        return DateUtils.isSameMonth(this.timezone, moment.tz(this._ngModel, this.getTimezone()), selectedMonth.momentDate);
    };

    isChosenMonth(selectedMonth: PickerMonth) {
        if (!this.doubleBufferDate) {
            return false;
        }
        var modelDate = this.doubleBufferDate;
        return modelDate.isSame(selectedMonth.momentDate, "month") &&
            modelDate.isSame(selectedMonth.momentDate, "year");
    };


    isTodayYear(selectedDate: PickerYear) {
        return DateUtils.isCurrentYear(this.timezone, selectedDate.momentDate);
    };

    isSameYear(selectedYear: PickerYear) {
        return DateUtils.isSameYear(this.timezone, moment.tz(this._ngModel, this.getTimezone()), selectedYear.momentDate);
    };

    isChosenYear(selectedMonth: PickerYear) {
        if (!this.doubleBufferDate) {
            return false;
        }
        var modelDate = this.doubleBufferDate;
        return modelDate.isSame(selectedMonth.momentDate, "year");
    };

    /**
     * checks if the time given is valid in the scope of the date selected
     *
     * @param hour
     * @param minute
     * @returns {boolean}
     * @private
     */
    private isValidTime(hour: number, minute: number): boolean {

        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return false;
        }

        var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()).startOf("day") : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()).endOf("day") : null;

        temporaryDate.set("hour", hour).set("minute", minute);
        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    /**
     * checks for a valid hour, valid means the model date
     * @param hour
     * @returns {boolean}
     * @private
     */
    private isValidHour(hour: number): boolean {
        if (hour < 0 || hour > 23) {
            return false;
        }
        var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
        temporaryDate.set("hour", hour);

        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    /**
     * checks for a valid minute
     * @param minute
     * @returns {boolean}
     * @private
     */
    private isValidMinute(minute: number): boolean {
        if (minute < 0 || minute > 59) {
            return false;
        }
        var temporaryDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;
        temporaryDate.set("minute", minute);
        return !temporaryDate.isBefore(momentStartDate) && !temporaryDate.isAfter(momentEndDate);
    };

    nextHour(event: UIEvent) {
        if (!this.isValidHour(this.currentDate.get("hour") + 1)) {
            return;
        }
        this.currentDate.add(1, "hour");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    prevHour(event: UIEvent) {
        if (!this.isValidHour(this.currentDate.get("hour") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "hour");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    nextMinute(event: UIEvent) {
        if (!this.isValidMinute(this.currentDate.get("minute") + 1)) {
            return;
        }
        this.currentDate.add(1, "minute");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    prevMinute(event: UIEvent) {
        if (!this.isValidMinute(this.currentDate.get("minute") - 1)) {
            return;
        }
        this.currentDate.subtract(1, "minute");
        this.selectDate(new PickerDate(false, this.currentDate, 1, true));
    };

    /**
     * helper function to push the current date into its max min range
     *
     * @private
     */
    private _fixCurrentDate() {
        var parsedData = this.currentDate;
        var startDate: Moment = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var endDate: Moment = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;

        if (startDate && moment.tz(parsedData, this.getTimezone()).isBefore(startDate)) {
            this.currentDate = startDate;
        }
        if (endDate && moment.tz(parsedData, this.getTimezone()).isAfter(endDate)) {
            this.currentDate = endDate;
        }

    };

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectDate(selectedDate: PickerDate, event ?: UIEvent) {
        this.stopEventPropagation(event);

        if (!selectedDate.invalid) {
            if (!this._ngModel) {
                this.currentDate = selectedDate.momentDate;
                if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                    this.doubleBufferDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
                }
            }

            //sometimes we pass the current date in, in this case no
            //Value traversal needs to be performed
            if (this.currentDate != selectedDate.momentDate) {
                this.currentDate.set("date", selectedDate.momentDate.get("date"));
                this.currentDate.set("month", selectedDate.momentDate.get("month"));
                this.currentDate.set("year", selectedDate.momentDate.get("year"));
            }

            if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE) {

                (!this.endOfDay) ? this.currentDate.startOf("day") : this.currentDate.endOf("day");
            }

            this._fixCurrentDate();

            if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
                this.doubleBufferDate = moment.tz(this.currentDate.toDate(), this.getTimezone());
            }

            if (!this.pickerOnlyMode || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
                this.updateModel(this.currentDate.toDate());
            }


            this.onDateSelection.emit({
                $picker: this,
                $date: this.currentDate.toDate()
            });

            /*in case of a date mode we are done*/
            if (this.pickerMode === PickerConstants.DEFAULT_PICKER_MODE && !this.pickerOnlyMode) {
                this.close(event);
            }
        }

    }

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectMonth(selectedDate: PickerMonth, event ?: UIEvent) {
        this.stopEventPropagation(event);

        if (!selectedDate.invalid) {
            if (!this._ngModel) {
                this.currentDate = moment.tz(new Date(), this.getTimezone());
                this.currentDate.set("month", selectedDate.momentDate.get("month"));

            } else {
                //we also have to update our currently selected date
                this.currentDate.set("month", selectedDate.momentDate.get("month"));
                this.currentDate.set("year", selectedDate.momentDate.get("year"));
            }
            this._fixCurrentDate();
            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
             this._selectDate(new PickerDate(false, this.currentDate, 1, true));
             }*/
            this.onMonthSelection.emit({
                $picker: this,
                $date: this.currentDate.toDate()
            });
            this.goBackInView(event);
        }

    };

    /**
     * select a date from the outside
     * @param selectedDate
     * @private
     */
    selectYear(selectedDate: PickerYear, event ?: UIEvent) {
        this.stopEventPropagation(event);


        if (!selectedDate.invalid) {
            if (!this._ngModel) {
                this.currentDate = moment.tz(new Date(), this.getTimezone());
                this.currentDate.set("year", selectedDate.momentDate.get("year"));

            } else {
                var value = moment.tz(this._ngModel, this.getTimezone());
                this.currentDate.set("year", selectedDate.momentDate.get("year"));

            }
            this._fixCurrentDate();
            /*if(this.pickerMode != PickerConstants.DEFAULT_PICKER_MODE || (this.pickerOnlyMode && this.pickerOnlyMode != "DOUBLE_BUFFERED")) {
             this._selectDate(new PickerDate(false, this.currentDate, 1, true));
             }*/
            this.onYearSelection.emit({
                $picker: this,
                $date: this.currentDate.toDate()
            });
            this.goBackInView(event);
        }
    };


    stopEventPropagation(event: UIEvent) {
        if (event) {
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }

    /**
     * updates the picker views from the currentDate
     * the currentDate is a positional placeholder for the pickers
     * it is used to store also temporary selections until
     * they are traversed into the model via pickDate
     *
     * @private
     */
    updatePickerData() {
        this.monthPickerData = ViewModelBuilder.calculateDateView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
        this.yearPickerData = ViewModelBuilder.calculateMonthView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());
        this.decadePickerData = ViewModelBuilder.calculateYearView(this.currentDate.toDate(), this.startDate, this.endDate, this.getTimezone());

        var offset = this.currentDate.get("year") % 20 - 1;
        this.decadeFrom = moment.tz(this.currentDate.toDate(), this.getTimezone()).subtract(offset, "year").format("YYYY");

        var offset = this.currentDate.get("year") % 20 - 1;
        var nextDecadeOffset = 20 - offset - 1;
        this.decadeTo = moment.tz(this.currentDate.toDate(), this.getTimezone()).add(nextDecadeOffset, "year").format("YYYY");

    };


    /**
     * opens the date picker
     *
     * @private
     */
    openPicker(event ?: UIEvent) {
        this.stopEventPropagation(event);


        var timezone = this.timezone || moment.tz.guess();

        this.currentDate = (this._ngModel) ? moment.tz(this._ngModel, timezone) : moment.tz(new Date(), timezone);

        this.updatePickerData();
        //this.pickerVisible = true;
        BehavioralFixes.openDropDown(this.elementRef.nativeElement, this);


        if (!this.documentClickHandler) {
            setTimeout(() => {
                BehavioralFixes.registerDocumentBindings(this.elementRef.nativeElement, this);
            }, 100)


        }
    };

    /**
     * goes the the previous month
     * @private
     */
    prevMonth(event ?: UIEvent) {
        this.stopEventPropagation(event);


        this.currentDate = this.currentDate.subtract(1, "month");
        this.updatePickerData();
    };

    /**
     * goes to the next month
     * @private
     */
    nextMonth(event ?: UIEvent) {
        this.stopEventPropagation(event);

        this.currentDate = this.currentDate.add(1, "month");
        this.updatePickerData();
    };

    /**
     * goes to the previous year
     * @private
     */
    prevYear(event: UIEvent) {
        this.stopEventPropagation(event);

        this.currentDate = this.currentDate.subtract(1, "year");
        this.updatePickerData();
    };

    /**
     * goes to the next year
     * @private
     */
    nextYear(event: UIEvent) {
        this.stopEventPropagation(event);

        this.currentDate = this.currentDate.add(1, "year");
        this.updatePickerData();
    };


    /**
     * goes to the previous year
     * @private
     */
    prevDecade(event: UIEvent) {

        this.stopEventPropagation(event);

        this.currentDate = this.currentDate.subtract(20, "year");
        this.updatePickerData();
    };

    /**
     * goes to the next year
     * @private
     */
    nextDecade(event: UIEvent) {

        this.stopEventPropagation(event);

        this.currentDate = this.currentDate.add(20, "year");
        this.updatePickerData();
    };

    /**
     * clears the selection
     * @private
     */
    clear(event: UIEvent) {
        this.stopEventPropagation(event);

        this.innerSelection = "";
    };

    /**
     * jumps to today in the selection
     * @private
     */
    today(event: UIEvent) {
        this.stopEventPropagation(event);

        this.currentDate = moment.tz(new Date(), this.getTimezone());
        if (this.pickerMode == PickerConstants.DEFAULT_PICKER_MODE) {
            this.currentDate.startOf("day");
        }
        this._fixCurrentDate();
        this.updateModel(this.currentDate.toDate());
        this.close(event);
    };

    /**
     * closes the data picker
     * @private
     */
    close(event: UIEvent) {
        this.stopEventPropagation(event);

        this.view = PickerConstants.DEFAULT_PICKER_MODE;
        this.viewStack = [];
        this.pickerVisible = false;
        BehavioralFixes.unregisterDocumentBindings(this);
        BehavioralFixes.closeDropDown(this.elementRef.nativeElement, this);
        this.elementRef.nativeElement.querySelectorAll("input[type=text]")[0].focus();
    };

    /**
     * set for double buffered mode
     *
     * @private
     */
    set(event: UIEvent) {
        this.stopEventPropagation(event);

        if (this.pickerOnlyMode == "DOUBLE_BUFFERED") {
            this.currentDate = moment.tz(this.doubleBufferDate.toDate(), this.getTimezone());
        }
        this.updateModel(this.currentDate.toDate());


    };

    /**
     * switches to the month view
     * @private
     */
    switchToMonthView(event: UIEvent) {
        this.stopEventPropagation(event);

        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_MONTH;
    };

    /**
     * switches to the year view
     * @private
     */
    switchToYearView(event: UIEvent) {
        this.stopEventPropagation(event);

        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_YEAR;
    };

    /**
     * switches to the time view
     * @private
     */
    switchToTimeView(event: UIEvent) {
        this.stopEventPropagation(event);

        this.viewStack.unshift(this.view);
        this.view = PickerConstants.PICKER_VIEW_TIME;
    };

    /**
     * goes back one view
     * @private
     */
    goBackInView(event: UIEvent) {
        this.stopEventPropagation(event);

        this.updatePickerData();
        this.view = this.viewStack.shift();
    };


    validate(c: AbstractControl): ValidationErrors | any {
        if (!this.validDate(this.innerSelection)) {

            return {
                validDate: {
                    valid: false,
                }
            }
        } else
        if (!this.validateDateRange(this.parseDate(this.innerSelection))) {
            return {
                dateRange: {
                    valid: false,
                }
            }
        }
    }


    ngOnDestroy() {
        BehavioralFixes.unregisterDocumentBindings(this);
    }


    private validDate(viewValue: string): boolean {
        if (!viewValue) {
            return true;
        }
        return moment.tz(viewValue, this.getDateFormat(), this.getTimezone()).isValid();
    }

    private validateDateRange(data: Date): boolean {/**
     * checks if it is within the allowed date range if there is one
     * @param data
     * @param viewValue
     * @returns {boolean}
     */

        if (data == null) {
            return true; //empty value allowed
        }

        var timezone = this.timezone || moment.tz.guess();
        var newValue = moment.tz(data, timezone);
        var momentStartDate = (this.startDate) ? moment.tz(this.startDate, timezone).startOf("day") : null;
        var momentEndDate = (this.endDate) ? moment.tz(this.endDate, timezone).endOf("day") : null;

        var isInvalid = false;
        if (momentStartDate) {
            isInvalid = isInvalid || newValue.isBefore(momentStartDate);
        }
        if (!isInvalid && momentEndDate) {
            isInvalid = isInvalid || newValue.isAfter(momentEndDate);
        }

        return !isInvalid;
    };


    /*
     * registers the internal parsers, validators and formatters
     * into the ngModel for the date string conversion
     */
    private parseDate(data: string): Date {
        if (data == "") {
            return null;
        }

        var parsedData = (this.endOfDay) ? moment.tz(data, this.getDateFormat(), this.getTimezone()).endOf("day").toDate() : moment.tz(data, this.getDateFormat(), this.getTimezone()).toDate();
        var startDate: Moment = (this.startDate) ? moment.tz(this.startDate, this.getTimezone()) : null;
        var endDate: Moment = (this.endDate) ? moment.tz(this.endDate, this.getTimezone()) : null;


        if (startDate && moment.tz(parsedData, this.getTimezone()).isBefore(startDate) && startDate.isSame(parsedData, "day") && startDate.isSame(parsedData, "month") && startDate.isSame(parsedData, "year")) {
            return this.startDate;
        }
        if (endDate && moment.tz(parsedData, this.getTimezone()).isAfter(endDate) && endDate.isSame(parsedData, "day") && endDate.isSame(parsedData, "month") && endDate.isSame(parsedData, "year")) {
            return this.endDate;
        }
        return parsedData;
    };

    /**
     * formats after the given timezone and date format
     * (if no timezone is used then the default one is used and the date format is
     * DD.MM.YYYY
     */
    private formatDate(data: Date) {
        if (data == null) {
            return "";
        }
        var timezone = this.timezone || moment.tz.guess();
        return moment.tz(data, timezone).format(this.getDateFormat());
    }


    writeValue(obj: any): void {
        this._ngModel = <Date> obj;
        if (obj) {
            this.innerSelection = this.formatDate(<Date> obj);
        } else {
            this.innerSelection = "";
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange =  fn;
    }

    registerOnTouched(fn: any): void {
        // throw new Error('Method not implemented.');
    }

    setDisabledState(isDisabled: boolean): void {
        // throw new Error('Method not implemented.');
    }

    onChange(event: any) {
        try {
            //we double validate if it fails, we propagate the last valid value upwards
            if(!this.validate(null)) {
                this._ngModel = this.parseDate(event.target.value);
            }
            this.propagateChange(this._ngModel);
        } catch (e) {

        }

    }

}
