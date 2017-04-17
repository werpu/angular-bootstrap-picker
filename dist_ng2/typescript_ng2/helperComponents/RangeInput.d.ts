import { ElementRef, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Validator, ValidationErrors, AbstractControl, ControlValueAccessor } from "@angular/forms";
export declare class RangeInput implements OnChanges, OnInit, Validator, ControlValueAccessor {
    private elementRef;
    from: number;
    to: number;
    inputText: string;
    onChangeHandler: Function;
    _ngModel: number;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    validate(c: AbstractControl): ValidationErrors | any;
    changedExtraHandler(data: string): void;
    keyDown(event: KeyboardEvent): boolean;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
