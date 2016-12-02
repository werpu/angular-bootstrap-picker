import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
import {PickerMonth, EventPickerPage} from "../utils/DatePickerTypes";
import INgModelOptions = angular.INgModelOptions;
import INgModelController = angular.INgModelController;
import {DateUtils} from "../utils/DateUtils";
import {ViewModelBuilder} from "../utils/ViewModelBuilder";
import Moment = moment.Moment;


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


class _EventPickerView {
    static template = () => {
        return `
        <div class="event-picker">
            <table ng-repeat="datePickerPage in ctrl.pickerPage.months">
                <thead>
                    <tr>
                        <td class="calendarWeek"><!-- week of year --></td>
                        <td class="dayOfWeek" ng-repeat="dayOfWeek in datePickerPage.dayOfWeek" ng-click="ctrl.selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    
                    </tr>
                </thead>
            </table>
        </div>
        `;
    };

    static controllerAs = "ctrl";

    static bindings: any = {
        timezone: "@",
        startDate: "<",
        endDate: "<"
    };

    static require: any = {
        "ngModel": 'ngModel',
    };
}


class _EventPickerController {

    /*bindings*/
    timezone: string;
    startDate: Date;
    endDate: Date;
    ngModel: INgModelController;

    pickerPage: EventPickerPage;



    constructor(private $scope: IScope, private $element: JQuery, private $timeout: ITimeoutService) {

        this.startDate = moment.tz(DateUtils.getTimezone(this.timezone)).startOf("day").subtract(30, "days").toDate();
        this.endDate = moment.tz(DateUtils.getTimezone(this.timezone)).endOf("day").toDate();


        $scope.$watch('ctrl.startDate', (newValue: Date, oldValue: Date) => {
            if (!newValue) {
                this.startDate = moment.tz(DateUtils.getTimezone(this.timezone)).startOf("day").subtract(30, "days").toDate();
            } else {
                this.startDate = newValue;
            }
        });

        $scope.$watch('ctrl.endDate', (newValue: Date, oldValue: Date) => {
            if (!newValue) {
                this.endDate = moment.tz(DateUtils.getTimezone(this.timezone)).endOf("day").toDate();
            } else {
                this.endDate = newValue;
            }
        });

        $scope.$watch("ctrl.ngModel.$modelValue", (newValue: RangeModel, oldValue: RangeModel) => {
            this.updateRange();
        }, true);
    }

    updateRange() {
        this.pickerPage = ViewModelBuilder.calculateEventDateView(this.startDate, this.endDate, DateUtils.getTimezone(this.timezone));
    }

    $postLink() {
        this.updateRange();
    }

    eventPresent(moment: moment.Moment): RangeModelValue {
        if(this.ngModel.$modelValue) {
            return this.ngModel.$modelValue[moment.toISOString()];
        }
        return null;
    }

    isActive(currentMoment: Moment):boolean {
        var startMoment = moment.tz(this.startDate, this.timezone);
        var endMoment = moment.tz(this.endDate, this.timezone);
        return currentMoment && currentMoment.isBetween(startMoment.subtract(1, "day"), endMoment.add(1, "day"), "day");
    }


}


export class EventPicker implements IComponentOptions {

    template = _EventPickerView.template;

    controllerAs = _EventPickerView.controllerAs;

    bindings: any = _EventPickerView.bindings;

    require: any = _EventPickerView.require;

    controller: any = ["$scope", "$element", "$timeout",
        _EventPickerController
    ];

}