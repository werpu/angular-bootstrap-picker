"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RangeInput = RangeInput_1 = (function () {
    function RangeInput(elementRef) {
        this.elementRef = elementRef;
    }
    RangeInput.prototype.ngOnChanges = function (changes) {
        if (changes.ngModel) {
            this.inputText = changes.ngModel.currentValue.toString();
        }
    };
    RangeInput.prototype.ngOnInit = function () {
    };
    RangeInput.prototype.validate = function (c) {
        var val = parseInt(this.inputText);
        if (isNaN(val)) {
            return {
                validNumber: {
                    valid: false,
                }
            };
        }
        else if (val < this.from || val > this.to) {
            return {
                outOfRange: {
                    valid: false,
                }
            };
        }
    };
    RangeInput.prototype.changedExtraHandler = function (data) {
        if (!this.validate(null)) {
            this._ngModel = parseInt(data);
        }
        this.onChangeHandler(this._ngModel);
    };
    RangeInput.prototype.keyDown = function (event) {
        var keyCode = event.keyCode;
        if (keyCode > 57) {
            event.preventDefault();
            return false;
        }
        if (keyCode >= 48 && keyCode <= 57) {
            var finalValue = parseInt(event.target.value + String.fromCharCode(keyCode));
            if (('undefined' != typeof this.from && this.from > finalValue) ||
                ('undefined' != typeof this.to && this.to < finalValue)) {
                event.preventDefault();
                return false;
            }
            return true;
        }
    };
    RangeInput.prototype.writeValue = function (obj) {
        if ("undefined" != typeof obj && null != obj) {
            this._ngModel = obj;
            this.inputText = this._ngModel.toString();
        }
    };
    RangeInput.prototype.registerOnChange = function (fn) {
        this.onChangeHandler = fn;
    };
    RangeInput.prototype.registerOnTouched = function (fn) {
    };
    return RangeInput;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RangeInput.prototype, "from", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RangeInput.prototype, "to", void 0);
RangeInput = RangeInput_1 = __decorate([
    core_1.Component({
        selector: "internal-range-input",
        template: "<input type=\"text\" [(ngModel)]=\"inputText\" (ngModelChange)=\"changedExtraHandler($event)\"\n                      (keydown)=\"keyDown($event)\">",
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return RangeInput_1; }),
                multi: true,
            },
            {
                provide: forms_1.NG_VALIDATORS,
                useExisting: core_1.forwardRef(function () { return RangeInput_1; }),
                multi: true,
            }
        ]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], RangeInput);
exports.RangeInput = RangeInput;
var RangeInput_1;
//# sourceMappingURL=RangeInput.js.map