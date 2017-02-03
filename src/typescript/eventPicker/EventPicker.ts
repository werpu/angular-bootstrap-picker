import IComponentOptions = angular.IComponentOptions;
import ITimeoutService = angular.ITimeoutService;
import IScope = angular.IScope;
import {PickerMonth, EventPickerPage, PickerDate, EventModel, EventModelValue} from "../utils/DatePickerTypes";
import INgModelOptions = angular.INgModelOptions;
import INgModelController = angular.INgModelController;
import {DateUtils} from "../utils/DateUtils";
import {ViewModelBuilder, RangeModelDictionary} from "../utils/ViewModelBuilder";
import Moment = moment.Moment;


/**
 * rangeModel
 * key: date
 *  values
 */


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
                          <td class="calendarMonth no-link" colspan="8"> {{::datePickerPage.month}} {{::datePickerPage.year}}</td>   
                    </tr>
                    <tr>
                        <td class="calendarWeek"><!-- week of year --></td>
                        <td class="dayOfWeek" ng-repeat="dayOfWeek in datePickerPage.dayOfWeek" ng-click="ctrl.selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    
                    </tr>
                </thead>
                <tbody>
                     <tr ng-repeat="week in datePickerPage.weeks">
                                <td class="calendarWeek">{{::week.calendarWeek}}</td>
                                <td class="day {{::day.event.importance}}" ng-repeat="day in week.days" ng-class="{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl.isSelectedDate(day), 'today': ctrl.isToday(day), 'noevent': !day.event , 'event': day.event }" ng-click="ctrl.selectDate(day)">{{::day.day}}</td>
                   </tr>    
                </tbody>
            </table>
        </div>
        `;
    };

    static controllerAs = "ctrl";

    static bindings: any = {
        timezone: "@",
        startDate: "<",
        endDate: "<",
        events: "<",
        eventSelected:"&"
    };

    static require: any = {
        /*the selected date*/
        "ngModel": 'ngModel'
    };
}


class _EventPickerController {

    /*bindings*/
    timezone: string;
    startDate: Date;
    endDate: Date;
    events: EventModel;
    ngModel: INgModelController;
    pickerPage: EventPickerPage;
    eventSelected: Function;


    private rangeModelIdx: RangeModelDictionary;

    constructor(private $scope: IScope, private $element: JQuery, private $timeout: ITimeoutService) {

        this.rangeModelIdx = {};

        $scope.$watch('ctrl.startDate', (newValue: Date, oldValue: Date) => {
            if (!newValue) {

                this.startDate = moment.tz(DateUtils.getTimezone(this.timezone)).startOf("day").toDate();
                this.updateRange(this.events);
            } else {

                this.startDate = newValue;
                this.updateRange(this.events);
            }
        });

        $scope.$watch('ctrl.endDate', (newValue: Date, oldValue: Date) => {
            if (!newValue) {
                this.endDate = moment.tz(DateUtils.getTimezone(this.timezone)).endOf("day").toDate();
                this.updateRange(this.events);
            } else {
                this.endDate = newValue;
                this.updateRange(this.events);
            }
        });

        $scope.$watch("ctrl.events", (newValue: EventModel, oldValue: EventModel)  => {
            this.updateRange(newValue);
            this.rangeModelIdx = ViewModelBuilder.buildModelIdx(newValue, DateUtils.getTimezone(this.timezone));
        }, true);


    }

    updateRange(rangeModel: EventModel) {
        this.pickerPage = ViewModelBuilder.calculateEventDateView(rangeModel, this.startDate, this.endDate, DateUtils.getTimezone(this.timezone));
    }

    $postLink() {
        this.updateRange(this.events);
        /*
         * registers the internal parsers, validators and formatters
         * into the ngModel for the date string conversion
         */
        this.ngModel.$parsers.push((data: string) => {
            if ('undefined' == typeof data || null == data || data == "") {
                return null;
            }


            return moment.tz(data,"DD.MM.YYYY", this.timezone).startOf("day");
        });
    }




    eventPresent(moment: moment.Moment): EventModelValue {
        if((<any>this).events) {


             return this.rangeModelIdx[moment.format("DD.MM.YYYY")];
        }
        return null;
    }

    isActive(currentMoment: Moment):boolean {
        var startMoment = moment.tz(this.startDate, this.timezone);
        var endMoment = moment.tz(this.endDate, this.timezone);
        return currentMoment && currentMoment.isBetween(startMoment.subtract(1, "day"), endMoment.add(1, "day"), "day");
    }

    isSelectedDate(selectedDate: PickerDate) {
        if(!this.ngModel.$modelValue) {
            return false;
        }
        var modelDate: Moment = moment.tz( this.ngModel.$modelValue, this.timezone);
        return DateUtils.isSameDay(modelDate, selectedDate.momentDate);
    }

    selectDate(selectDate: PickerDate) {
        if(!selectDate.event) {
            return;
        }

        this.ngModel.$setViewValue(selectDate.momentDate.format("DD.MM.YYYY"));
        this.eventSelected({$event: selectDate.event});
        this.updateRange(this.events);
    }

    /**
     * checks if the current picker date is today
     * @param selectedDate
     * @returns {boolean}
     * @private
     */
    isToday(selectedDate: PickerDate) {
        return DateUtils.isToday(this.timezone, selectedDate.momentDate);
    };


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