import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
import INgModelOptions = angular.INgModelOptions;
import INgModelController = angular.INgModelController;
/**
 * A simple range input which allows a numeric input within a certain range
 */

interface IRangeInput {
    from: string;
    to: string;
    ngModel: INgModelController;
    inputText: string;
}


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
                    (<IRangeInput>this).ngModel.$setViewValue(newval);
                }
            });

            this.$postLink = () => {
                //with this trick we are able to traverse the outer ngModel view value into the inner ngModel
                (<IRangeInput>this).ngModel.$render = () => {
                    (<IRangeInput>this).inputText = (<IRangeInput>this).ngModel.$viewValue;
                };
                $element.find("input").on("keydown", (event: JQueryEventObject) => {
                    var keyCode = event.keyCode;
                    if(keyCode > 57) {
                        event.preventDefault();
                        return false;
                    }
                    if(keyCode >= 48 && keyCode <= 57) {
                        var finalValue = angular.element(event.target).val() + String.fromCharCode(keyCode);
                        if((('undefined' != typeof (<IRangeInput>this).from) && (<IRangeInput>this).from > finalValue) ||
                            (('undefined' != typeof (<IRangeInput>this).to && (<IRangeInput>this).to < finalValue))) {
                            event.preventDefault();
                            return false;
                        }
                    }
                });
            }
        }
    ];

}