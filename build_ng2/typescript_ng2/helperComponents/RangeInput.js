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
var RangeInput = (function () {
    function RangeInput(elementRef) {
        this.elementRef = elementRef;
        this.ngModelChange = new core_1.EventEmitter(false);
    }
    RangeInput.prototype.ngOnChanges = function (changes) {
        if (changes.ngModel) {
            this.inputText = changes.ngModel.currentValue.toString();
        }
    };
    RangeInput.prototype.ngOnInit = function () {
    };
    RangeInput.prototype.validate = function (c) {
        try {
            parseInt(this.inputText);
        }
        catch (e) {
            return {
                validNumber: {
                    valid: false,
                }
            };
        }
        return null;
    };
    RangeInput.prototype.changedExtraHandler = function (data) {
        this.ngModelChange.emit(parseInt(data));
    };
    RangeInput.prototype.keyDown = function (event) {
        var keyCode = event.keyCode;
        if (keyCode > 57) {
            event.preventDefault();
            return false;
        }
        if (keyCode >= 48 && keyCode <= 57) {
            var finalValue = parseInt(event.target.getAttribute("value") + String.fromCharCode(keyCode));
            if (('undefined' != typeof this.from && this.from > finalValue) ||
                ('undefined' != typeof this.to && this.to < finalValue)) {
                event.preventDefault();
                return false;
            }
            return true;
        }
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RangeInput.prototype, "ngModel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RangeInput.prototype, "ngModelChange", void 0);
RangeInput = __decorate([
    core_1.Component({
        selector: "internal-range-input",
        template: "<input type=\"text\" [(ngModel)]=\"inputText\" (ngModelChange)=\"changedExtraHandler($event)\" (keydown)=\"keyDown($event)\" >"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], RangeInput);
exports.RangeInput = RangeInput;
//# sourceMappingURL=RangeInput.js.map