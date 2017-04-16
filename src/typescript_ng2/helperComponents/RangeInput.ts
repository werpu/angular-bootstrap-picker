import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    forwardRef
} from "@angular/core";
import {
    Validator, ValidationErrors, AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from "@angular/forms";


interface IRangeInput {
    from: string;
    to: string;
    ngModel: any;
    inputText: string;
}


@Component({
    selector: "internal-range-input",
    template: `<input type="text" [(ngModel)]="inputText" (ngModelChange)="changedExtraHandler($event)"
                      (keydown)="keyDown($event)">`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeInput),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RangeInput),
            multi: true,
        }
    ]
})
export class RangeInput implements OnChanges, OnInit, Validator, ControlValueAccessor {


    @Input() from: number;
    @Input() to: number;

    //@Input() ngModel: number;
    //@Output() ngModelChange: EventEmitter<number> = new EventEmitter(false);

    inputText: string;

    onChangeHandler: Function;

    _ngModel: number;

    constructor(private elementRef: ElementRef) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.ngModel) {
            this.inputText = changes.ngModel.currentValue.toString();
        }
    }

    ngOnInit(): void {

    }

    validate(c: AbstractControl): ValidationErrors | any {
        let val = parseInt(this.inputText);
        if (isNaN(val)) {
            return {
                validNumber: {
                    valid: false,
                }
            }
        } else if (('undefined' != typeof this.from && this.from > val) ||
            ('undefined' != typeof this.to && this.to < val)) {
            return {
                outOfRange: {
                    valid: false,
                }
            }
        }
    }

    changedExtraHandler(data: string) {
        if(!this.validate(null)) {
            this._ngModel = parseInt(data);
        }
        this.onChangeHandler(this._ngModel);
    }

    keyDown(event: KeyboardEvent) {
        var keyCode = event.keyCode;
        if (keyCode > 57) {
            event.preventDefault();
            return false;
        }
        if (keyCode >= 48 && keyCode <= 57) {

            var finalValue = parseInt((<any>event.target).value + String.fromCharCode(keyCode));

            if (('undefined' != typeof this.from && this.from > finalValue) ||
                ('undefined' != typeof this.to && this.to < finalValue)) {
                event.preventDefault();
                return false;
            }
            return true;
        }
    }

    writeValue(obj: any): void {
        if ("undefined" != typeof obj && null != obj) {
            this._ngModel = <number> obj;
            this.inputText = this._ngModel.toString();
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeHandler = fn;
    }

    registerOnTouched(fn: any): void {
    }

}