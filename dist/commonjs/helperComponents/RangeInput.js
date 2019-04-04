"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RangeInput = (function () {
    function RangeInput() {
        this.template = function () {
            return "\n           <input type=\"text\" ng-model=\"ctrl.inputText\" />\n        ";
        };
        this.controllerAs = "ctrl";
        this.bindings = {
            from: "<",
            to: "<"
        };
        this.require = {
            "ngModel": 'ngModel',
        };
        this.controller = ["$scope", "$element", "$timeout",
            function ($scope, $element, $timeout) {
                var _this = this;
                $scope.$watch('ctrl.inputText', function (newval, oldval) {
                    if (newval != oldval) {
                        _this.ngModel.$setViewValue(newval);
                    }
                });
                this.$postLink = function () {
                    //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                    _this.ngModel.$render = function () {
                        _this.inputText = _this.ngModel.$viewValue;
                    };
                    $element.find("input").on("keydown", function (event) {
                        var keyCode = event.keyCode;
                        if (keyCode > 57) {
                            event.preventDefault();
                            return false;
                        }
                        if (keyCode >= 48 && keyCode <= 57) {
                            var finalValue = angular.element(event.target).val() + String.fromCharCode(keyCode);
                            if ((('undefined' != typeof _this.from) && _this.from > finalValue) ||
                                (('undefined' != typeof _this.to && _this.to < finalValue))) {
                                event.preventDefault();
                                return false;
                            }
                        }
                    });
                };
            }
        ];
    }
    return RangeInput;
}());
exports.RangeInput = RangeInput;
//# sourceMappingURL=RangeInput.js.map