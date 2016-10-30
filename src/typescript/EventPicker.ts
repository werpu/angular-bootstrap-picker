import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
import {PickerMonth} from "./utils/DatePickerTypes";
import INgModelOptions = angular.INgModelOptions;
import INgModelController = angular.INgModelController;


/**
 * rangeModel
 * key: date
 *  values
 */

export enum Importance {
    LOW, MEDIUM, HIGH, NONE
}


export class RangeModelValue {
    numberOfEvents: number;
    importance: Importance;
    data: any;
}


export class RangeModel {
    /*iso representation of a certain date*/
    data: {[key: string]: RangeModelValue} = {};
}

/**
 * Event picker component which allows to display date ranges
 * and handle corresponding events
 */



class _EventPickerImpl {
    startDate: Date;
    endDate: Date;
    ngModel: INgModelController;

    constructor(private $scope: IScope,private $element: JQuery,private $timeout: ITimeoutService) {
        $scope.$watch('ctrl.startDate',(newValue: Date, oldValue: Date) => {

        });

        $scope.$watch('ctrl.endDate',(newValue: Date, oldValue: Date) => {

        });
    }


}


export class EventPicker implements IComponentOptions {

    template = () => {
        return ``;
    };

    controllerAs = "ctrl";

    bindings: any = {
        timezone: "@",
        startDate: "<",
        endDate: "<"
    };

    require: any = {
        "ngModel": 'ngModel',
    };

    controller: any = ["$scope", "$element", "$timeout",
        _EventPickerImpl
    ];

}