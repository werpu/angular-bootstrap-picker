import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {Validator, ValidationErrors, AbstractControl} from "@angular/forms";


interface IRangeInput {
    from: string;
    to: string;
    ngModel: any;
    inputText: string;
}


@Component({
    selector: "internal-range-input",
    template: `<input type="text" [(ngModel)]="inputText" (ngModelChange)="changedExtraHandler($event)" (keydown)="keyDown($event)" >{{inputText}}`
})
export class RangeInput implements OnChanges, OnInit, Validator {


    @Input() from: number;
    @Input() to: number;

    @Input() ngModel: number;
    @Output() ngModelChange: EventEmitter<number> = new EventEmitter(false);

    inputText: string;


    constructor(private elementRef: ElementRef) {

    }

    ngOnInit(): void {
        this.inputText = (this.ngModel) ? this.ngModel.toString() : "";
    }

    validate(c: AbstractControl): ValidationErrors | any {
        try {
            parseInt(this.inputText)
        } catch (e) {
            return {
                validNumber: {
                    valid: false,
                }
            }
        }

        return null;
    }

    changedExtraHandler(data: string) {
        this.ngModelChange.emit(parseInt(data));
    }

    keyDown(event: KeyboardEvent) {
        var keyCode = event.keyCode;
        if (keyCode > 57) {
            event.preventDefault();
            return false;
        }
        if (keyCode >= 48 && keyCode <= 57) {
            var finalValue = parseInt((<Element> event.target).getAttribute("value") + String.fromCharCode(keyCode));
            if (('undefined' != typeof this.from && this.from > finalValue) ||
                ('undefined' != typeof this.to && this.to < finalValue)) {
                event.preventDefault();
                return false;
            }
            return true;
        }
    }

}