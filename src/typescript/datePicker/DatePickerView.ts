
export class _DatePickerView {
    static template() {
        var inputArea = `

                <div class="input-group">
                   <input type="text" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection">
                   <span class="input-group-btn">
                       <button type="button" class="picker-open btn btn-default" ng-click="ctrl.openPicker()">
                             <span class="{{ctrl.buttonStyleClass ? ctrl.buttonStyleClass : ''}}" ng-class="{'glyphicon glyphicon-align-right glyph-icon glyphicon-calendar': !ctrl.buttonStyleClass}"> {{ctrl.buttonLabel}} </span>
                       </button>
                   </span> 
               </div>
               <input type="button" class="picker-close" ng-click="ctrl.close()" value="Close" ng-show="false"/>
        `;

        var inputAreaHidden = `
           <input type="text" style="display: none;" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection">
        `;

        var timePickerSpinning = `
            <div class="time-picker" ng-if="ctrl.view == 'DATE' && ctrl.pickerMode == 'DATE_TIME'" >
                <table>
                   <thead>
                        
                    </thead>
                    <tbody>
                        
                         <tr>
                            <td class="glyphicon glyphicon-chevron-up" ng-class="{'invalid' : !ctrl.isValidHour(ctrl.currentDate.get('hour') + 1)}" ng-click="ctrl.nextHour()">
                            </td>
                            <td></td>
                            <td class="glyphicon glyphicon-chevron-up" ng-class="{'invalid' : !ctrl.isValidMinute(ctrl.currentDate.get('minute') + 1)}" ng-click="ctrl.nextMinute()">
                            </td>
                        </tr>
                        <tr>
                            <td class="selected-hour">
                                <internal-range-input class="hour-input" from="0" to="23" ng-model="ctrl.currentHour"/>    
                            </td>
                            <td class="invalid">:</td>
                            <td class="selected-minute">
                                <internal-range-input class="minute-input" from="0" to="59" ng-model="ctrl.currentMinute"/> 
                            </td>
                        </tr>
                         <tr>
                            <td class="glyphicon glyphicon-chevron-down" ng-class="{'invalid' : !ctrl.isValidHour(ctrl.currentDate.get('hour') - 1)}" ng-click="ctrl.prevHour()">
                            </td>
                            <td></td>
                            <td class="glyphicon glyphicon-chevron-down" ng-class="{'invalid' : !ctrl.isValidMinute(ctrl.currentDate.get('minute') - 1)}" ng-click="ctrl.prevMinute()">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="button-group bottom-buttons" ng-if="ctrl.view == 'TIME'">
                  <input type="button" class="btn btn-default btn-sm" ng-click="ctrl.goBackInView()" value="Back" />
                </div>
            </div>
        `;

        var datePicker = `
               <!-- date view - default view -->
               <div class="date-picker" ng-if="ctrl.view == 'DATE'">                
                    <table>
                        <thead>
                            <!-- TODO year forward and backward -->
                        
                            <tr ng-if="ctrl.pickerMode == 'DATE_TIME'">
                                <td colspan="8" class="invalid picker-title" >{{ctrl.innerSelection}}</td>
                            </tr>
                            
                            <tr>
                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl.prevMonth()"></a></td><td colspan="2" ng-click="ctrl.switchToMonthView()">{{ctrl.currentDate.format("MMMM")}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl.nextMonth()"></a></td>
                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl.prevYear()"></a></td><td colspan="2" ng-click="ctrl.switchToYearView()">{{ctrl.monthPickerData.year}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl.nextYear()"></a></td>
                            </tr>
                            <tr>
                                <td class="calendarWeek"><!-- week of year --></td>
                                <td class="dayOfWeek" ng-repeat="dayOfWeek in ctrl.monthPickerData.dayOfWeek" ng-click="ctrl.selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="week in ctrl.monthPickerData.weeks">
                                <td class="calendarWeek">{{::week.calendarWeek}}</td>
                                <td class="day" ng-repeat="day in week.days" ng-class="{'outside': !day.sameMonth, 'invalid': day.invalid, 'selected' : ctrl.isSelectedDate(day), 'chosen' : ctrl.isChosenDate(day), 'today': ctrl.isToday(day)}" class="{{day.event.importance}}" ng-click="ctrl.selectDate(day)">{{::day.day}}</td>
                            </tr>
                        </tbody>
                        
                    </table>
                
                    ${timePickerSpinning}
                    
                    <div class="additional-content" ng-transclude="additionalContentDate"></div>
                    
                    <div class="button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="additional-buttons" ng-transclude="additionalButtonsDate"></div>
                        <input type="button" class="Sset btn btn-default btn-sm" ng-click="ctrl.set()" value="Set" ng-if="ctrl.pickerOnlyMode == 'DOUBLE_BUFFERED'" />
                        <input type="button" class="clear btn btn-default btn-sm" ng-click="ctrl.clear()" value="Clear" ng-if="!ctrl.pickerOnlyMode" />
                        <input type="button" class="today btn btn-default btn-sm" ng-click="ctrl.today()" value="Today" />
                        <input type="button" class="picker-close btn btn-default btn-sm" ng-click="ctrl.close()" ng-if="!ctrl.pickerOnlyMode" value="Close" ng-if="!ctrl.pickerOnlyMpde" />
                    </div>
               </div> 
        `;

        var monthPicker = `
            <!-- month view -->
            <div class="month-picker" ng-if="ctrl.view == 'MONTH'">
                 <table>
                    <thead>
                          <tr>
                          <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl.prevYear()" class="glyphicon glyphicon-menu-left"></a></td>
                          <td ng-click="ctrl.switchToYearView()">{{ctrl.monthPickerData.year}}</td>
                          <td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl.nextYear()"></a></td>
                          </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="monthRow in ctrl.yearPickerData.row">
                            <td ng-repeat="month in monthRow" ng-class="{'invalid': month.invalid, 'selected' : ctrl.isSameMonth(month), 'chosen' : ctrl.isChosenMonth(month), 'today': ctrl.isTodayMonth(month)}"
                            ng-click="ctrl.selectMonth(month)"
                            >{{::month.month}}</td>
                        </tr>
                    </tbody>
                 </table>   
            
                 <div class="additional-content" ng-transclude="additionalContentMonth"></div>
                <div class="button-group bottom-buttons">
                    <div class="additional-buttons" ng-transclude="additionalButtonsMonth"></div>
                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl.goBackInView()" value="Back" />
                </div>
            </div>    
        `;

        var yearPicker = `
            <!-- year view -->  
            <div class="year-picker" ng-if="ctrl.view == 'YEAR'">
                  <table>
                    <thead>
                    <tr>
                        <td><a ng-click="ctrl.prevDecade()" class="glyphicon glyphicon-menu-left"></a></td>
                        <td colspan="3" class="no-link">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>
                        <td><a ng-click="ctrl.nextDecade()" class="glyphicon glyphicon-menu-right"></a></td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="yearrow in ctrl.decadePickerData.row">
                            <td ng-repeat="year in yearrow"
                            ng-class="{'invalid': year.invalid, 'selected' : ctrl.isSameYear(year), 'chosen' : ctrl.isChosenYear(year), 'today': ctrl.isTodayYear(year)}"
                             ng-click="ctrl.selectYear(year)"
                            >{{::year.year}}</td></td>
                        </tr>
                    </table>
                  <div class="additional-content" ng-transclude="additionalContentYear"></div>  
                  <div class="button-group bottom-buttons">
                    <div class="additional-buttons" ng-transclude="additionalButtonsYear"></div>
                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl.goBackInView()" value="Back" />
                  </div>
            </div>   
        `;


        return `
           <div class="dropdown" ng-if="!ctrl.pickerOnlyMode"> 
                ${inputArea} 
               <div class="dropdown-menu picker-popup">
                    <div class="content" ng-if="ctrl.isOpen">
                       ${datePicker}
                       
                       ${monthPicker}                   
                             
                       ${yearPicker}
                   </div>
               
                </div>
            </div> 
            <div class="dropdown picker-standalone" ng-if="ctrl.pickerOnlyMode">
                 ${inputAreaHidden}
                 <div class="picker-popup">
                  <div class="content"> 
                     ${datePicker}
                           
                     ${monthPicker}                   
                                 
                     ${yearPicker}
                 </div>
                 </div>
            </div>  
                 
        `;
    }

    static bindings = {
        name: "@",
        timezone: "@",
        startDate: "<",
        endDate: "<",
        dateFormat: "@",
        placeholder: "@",
        buttonLabel: "@",
        pickerMode: "@",
        pickerOnlyMode: "@",
        endOfDay: "<",
        /*callback whenever a date is selected*/
        onYearSelection: "&", /*function($picker, $date) callback for the year selection*/
        onMonthSelection: "&", /*function($picker, $date) callback for the month selection*/
        onDateSelection: "&", /*function($picker, $date) callback for the date selection*/
        buttonStyleClass: "@?" /*styleclass of the button*/
    };

    static require = {
        "ngModel": 'ngModel',
    };

    static transclude = {
        additionalButtonsDate: "?additionalButtonsDate", /*transclusion to add additional buttons*/
        additionalContentDate: "?additionalContentDate", /*transclusion to add additional content*/

        additionalButtonsMonth: "?additionalButtonsMonth", /*transclusion to add additional buttons*/
        additionalContentMonth: "?additionalContentMonth", /*transclusion to add additional content*/

        additionalButtonsYear: "?additionalButtonsYear", /*transclusion to add additional buttons*/
        additionalContentYear: "?additionalContentYear" /*transclusion to add additional content*/
    };

    static controllerAs = "ctrl";
}