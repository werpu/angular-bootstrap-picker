import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
/**
 * A simple range input which allows a numeric input within a certain range
 */
export class RangeInput implements IComponentOptions {

    template = () => {
        return `
           <input type="text" ng-model="ctrl.inputText" />
        `;
    };

    controllerAs = "ctrl";

    bindings: any = {
        from:"<",
        to: "<"
    };

    require: any = {
        "ngModel": 'ngModel',
    };

    controller: any = ["$scope", "$element", "$timeout",
        function ($scope: IScope, $element: JQuery, $timeout: ITimeoutService) {
            $scope.$watch('ctrl.inputText', (newval: string, oldval: string) => {
                if (newval != oldval) {
                    this.ngModel.$setViewValue(newval);
                }
            });

            this.$postLink = () => {
                //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                this.ngModel.$render = () => {
                    this.inputText = this.ngModel.$viewValue;
                };
                $element.find("input").on("keydown", (event: JQueryEventObject) => {
                    var keyCode = event.keyCode;
                    if(keyCode > 57) {
                        event.preventDefault();
                        return false;
                    }
                    if(keyCode >= 48 && keyCode <= 57) {
                        var finalValue = angular.element(event.target).val() + String.fromCharCode(keyCode);
                        if((('undefined' != typeof this.from) && this.from > finalValue) ||
                            (('undefined' != typeof this.to && this.to < finalValue))) {
                            event.preventDefault();
                            return false;
                        }
                    }
                });
            }
        }
    ];

}