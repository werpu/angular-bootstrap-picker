var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)};define("BehavioralFixes",["require","exports"],function(e,t){"use strict";var n=function(){function e(){}return e.registerKeyBindings=function(e){e.on("keydown",function(t,n){return 13==t.keyCode?(t.preventDefault(),e.parents("form").find("input[type=submit]").click(),!1):40==t.keyCode?(e.find(".picker-open").click(),!1):27==t.keyCode?(e.find(".picker-close").click(),!1):void 0})},e.registerDocumentBindings=function(t,n){if(!n.documentClickHandler){var r=function(){e.unregisterDocumentBindings(n),t.find(".picker-close").click()};angular.element(document).bind("click",r),n.documentClickHandler=r}},e.unregisterDocumentBindings=function(e){e.documentClickHandler&&(angular.element(document).unbind("click",e.documentClickHandler),e.documentClickHandler=null)},e.registerPopupBindings=function(e){e.find(".picker-popup").on("click",function(e){e.stopImmediatePropagation(),e.stopPropagation()})},e.openDropDown=function(e,t){t.isOpen=!0,e.find(".dropdown").addClass("open")},e.closeDropDown=function(e,t){t.isOpen=!1,e.find(".dropdown").removeClass("open")},e}();t.BehavioralFixes=n}),define("DatePickerTypes",["require","exports"],function(e,t){"use strict";var n=function(){function e(e,t){this.invalid=e,this.momentDate=t}return e}(),r=function(e){function t(t,n,r,a){e.call(this,t,n),this.day=r,this.sameMonth=a}return __extends(t,e),t}(n);t.PickerDate=r;var a=function(e){function t(t,n,r,a){e.call(this,t,n),this.month=r,this.sameYear=a}return __extends(t,e),t}(n);t.PickerMonth=a;var i=function(e){function t(t,n,r){e.call(this,t,n),this.year=r}return __extends(t,e),t}(n);t.PickerYear=i;var o=function(){function e(e,t){void 0===t&&(t=[]),this.calendarWeek=e,this.days=t}return e}();t.PickerWeek=o;var c=function(){function e(e,t,n){void 0===t&&(t=[]),void 0===n&&(n=[]),this.dayOfWeek=t,this.weeks=n,this.year=e}return e}();t.DatePickerPage=c;var l=function(){function e(e,t){void 0===t&&(t=[]),this.row=t,this.year=e}return e}();t.MonthPickerPage=l;var s=function(){function e(e){void 0===e&&(e=[]),this.row=e}return e}();t.YearPickerPage=s;var u=function(){function e(e,t){this.hour=e,this.minutes=t}return e}();t.TimeModel=u}),define("ViewModelBuilder",["require","exports","DatePickerTypes"],function(e,t,n){"use strict";var r=function(){function e(){}return e.calculateYearView=function(e,t,r,a){e||(e=new Date);var i=moment.tz(e,a),o=i.get("year")%20-1,c=20-o-1,l=moment.tz(e,a).startOf("year").startOf("month").startOf("day").subtract("year",o),s=moment.tz(e,a).endOf("year").endOf("month").endOf("day").add("year",c),u=t?moment.tz(t,a).startOf("year").startOf("month").startOf("day"):null,d=r?moment.tz(r,a).endOf("year").endOf("month").endOf("day"):null,m=0,D=new n.YearPickerPage,f=moment.range(l,s);return f.by("year",function(e){m%5==0&&D.row.push([]);var t=!1;u&&(t=t||e.startOf("day").isBefore(u)&&e.endOf("day").isBefore(u)),!t&&d&&(t=t||e.startOf("day").isAfter(d)&&e.endOf("day").isAfter(d)),D.row[D.row.length-1].push(new n.PickerYear(t,e,parseInt(e.tz(a).format("YYYY")))),m++}),D},e.calculateMonthView=function(e,t,r,a){e||(e=new Date);var i=moment.tz(e,a),o=moment.tz(e,a).startOf("year").startOf("month").startOf("day"),c=moment.tz(e,a).endOf("year").endOf("month").endOf("day"),l=t?moment.tz(t,a).startOf("month").startOf("day"):null,s=r?moment.tz(r,a).endOf("month").endOf("day"):null,u=moment.range(o,c),d=0,m=new n.MonthPickerPage(i.get("year"));return u.by("month",function(e){d%3==0&&m.row.push([]);var t=!1;l&&(t=t||e.startOf("day").isBefore(l)&&e.endOf("day").isBefore(l)),!t&&s&&(t=t||e.startOf("day").isAfter(s)&&e.endOf("day").isAfter(s)),m.row[m.row.length-1].push(new n.PickerMonth(t,e,e.tz(a).format("MMMM"),e.tz(a).isSame(i,"year"))),d++}),m},e.calculateDateView=function(e,t,r,a){e||(e=new Date);var i=moment.tz(e,a),o=moment.tz(e,a).startOf("month").startOf("week"),c=moment.tz(e,a).startOf("month").startOf("week").add("days",41),l=t?t:null,s=r?r:null,u=moment.range(o,c),d=[],m=[],D=0;return u.by("day",function(e){D%7==0&&d.push(new n.PickerWeek(e.tz(a).get("week")));var t=!1;l&&(t=t||e.startOf("day").isBefore(l)&&e.endOf("day").isBefore(l)),!t&&s&&(t=t||e.startOf("day").isAfter(s)&&e.endOf("day").isAfter(s)),d[d.length-1].days.push(new n.PickerDate(t,e,e.tz(a).get("date"),e.tz(a).isSame(i,"month"))),m.length<7&&m.push(e.tz(a).format("ddd")),D++}),new n.DatePickerPage(i.get("year"),m,d)},e}();t.ViewModelBuilder=r}),define("RangeInput",["require","exports"],function(e,t){"use strict";var n=function(){function e(){this.template=function(){return'\n           <input type="text" ng-model="ctrl.inputText" />\n        '},this.controllerAs="ctrl",this.bindings={from:"<",to:"<"},this.require={ngModel:"ngModel"},this.controller=["$scope","$element","$timeout",function(e,t,n){var r=this;e.$watch("ctrl.inputText",function(e,t){e!=t&&r.ngModel.$setViewValue(e)}),this.$postLink=function(){r.ngModel.$render=function(){r.inputText=r.ngModel.$viewValue},t.find("input").on("keydown",function(e){var t=e.keyCode;if(t>57)return e.preventDefault(),!1;if(t>=48&&t<=57){var n=angular.element(e.target).val()+String.fromCharCode(t);if("undefined"!=typeof r.from&&r.from>n||"undefined"!=typeof r.to&&r.to<n)return e.preventDefault(),!1}})}}]}return e}();t.RangeInput=n}),define("DatePicker",["require","exports","BehavioralFixes","ViewModelBuilder","DatePickerTypes","RangeInput"],function(e,t,n,r,a,i){"use strict";var o=function(){function e(){}return e.DEFAULT_DATE_FORMAT="DD.MM.YYYY",e.DEFAULT_DATE_TIME_FORMAT="DD.MM.YYYY HH:mm",e.DEFAULT_PICKER_MODE="DATE",e.PICKER_VIEW_DATE="DATE",e.PICKER_VIEW_TIME="TIME",e.PICKER_VIEW_MONTH="MONTH",e.PICKER_VIEW_YEAR="YEAR",e.DEFAULT_PICKER_LABEL="Date",e}(),c=function(){function e(){this.template=function(){var e='\n                <div class="input-group">\n                   <input type="text" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection"></input>\n                   <span class="input-group-btn">\n                       <button type="button" class="picker-open btn btn-default" ng-click="ctrl._openPicker()">\n                             <span class="glyphicon glyphicon-align-right glyph-icon glyphicon-calendar"> {{ctrl.buttonLabel}} </span>\n                       </button>\n                   </span> \n               </div>\n               <input type="button" class="picker-close" ng-click="ctrl._close()" value="Close" ng-show="false"/>\n        ',t='\n           <input type="text" style="display: none;" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection"></input>\n        ',n='\n            <div class="time-picker" ng-if="ctrl.view == \'DATE\' && ctrl.pickerMode == \'DATE_TIME\'" >\n                <table>\n                   <thead>\n                        \n                    </thead>\n                    <tbody>\n                        \n                         <tr>\n                            <td class="glyphicon glyphicon-chevron-up" ng-class="{\'invalid\' : !ctrl._isValidHour(ctrl._currentDate.get(\'hour\') + 1)}" ng-click="ctrl._nextHour()">\n                            </td>\n                            <td></td>\n                            <td class="glyphicon glyphicon-chevron-up" ng-class="{\'invalid\' : !ctrl._isValidMinute(ctrl._currentDate.get(\'minute\') + 1)}" ng-click="ctrl._nextMinute()">\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class="selected-hour">\n                                <internal-range-input class="hour-input" from="0" to="23" ng-model="ctrl.currentHour"/>    \n                            </td>\n                            <td class="invalid">:</td>\n                            <td class="selected-minute">\n                                <internal-range-input class="minute-input" from="0" to="59" ng-model="ctrl.currentMinute"/> \n                            </td>\n                        </tr>\n                         <tr>\n                            <td class="glyphicon glyphicon-chevron-down" ng-class="{\'invalid\' : !ctrl._isValidHour(ctrl._currentDate.get(\'hour\') - 1)}" ng-click="ctrl._prevHour()">\n                            </td>\n                            <td></td>\n                            <td class="glyphicon glyphicon-chevron-down" ng-class="{\'invalid\' : !ctrl._isValidMinute(ctrl._currentDate.get(\'minute\') - 1)}" ng-click="ctrl._prevMinute()">\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class="button-group bottom-buttons" ng-if="ctrl.view == \'TIME\'">\n                  <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />\n                </div>\n            </div>\n        ',r='\n               <!-- date view - default view -->\n               <div class="date-picker" ng-if="ctrl.view == \'DATE\'">                \n                    <table>\n                        <thead>\n                            <!-- TODO year forward and backward -->\n                        \n                            <tr ng-if="ctrl.pickerMode == \'DATE_TIME\'">\n                                <td colspan="8" class="invalid picker-title" >{{ctrl.innerSelection}}</td>\n                            </tr>\n                            \n                            <tr>\n                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevMonth()"></a></td><td colspan="2" ng-click="ctrl._switchToMonthView()">{{ctrl._currentDate.format("MMMM")}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextMonth()"></a></td>\n                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevYear()"></a></td><td colspan="2" ng-click="ctrl._switchToYearView()">{{ctrl.monthPickerData.year}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextYear()"></a></td>\n                            </tr>\n                            <tr>\n                                <td class="calendarWeek"><!-- week of year --></td>\n                                <td class="dayOfWeek" ng-repeat="dayOfWeek in ctrl.monthPickerData.dayOfWeek" ng-click="ctrl._selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    \n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr ng-repeat="week in ctrl.monthPickerData.weeks">\n                                <td class="calendarWeek">{{::week.calendarWeek}}</td>\n                                <td class="day" ng-repeat="day in week.days" ng-class="{\'outside\': !day.sameMonth, \'invalid\': day.invalid, \'selected\' : ctrl._isSelectedDate(day), \'chosen\' : ctrl._isChosenDate(day), \'today\': ctrl._isToday(day)}" ng-click="ctrl._selectDate(day)">{{::day.day}}</td>\n                            </tr>\n                        </tbody>\n                        \n                    </table>\n                \n                    '+n+'\n                    \n                    <div class="button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <input type="button" class="Sset btn btn-default btn-sm" ng-click="ctrl._set()" value="Set" ng-if="ctrl.pickerOnlyMode == \'DOUBLE_BUFFERED\'" />\n                        <input type="button" class="clear btn btn-default btn-sm" ng-click="ctrl._clear()" value="Clear" ng-if="!ctrl.pickerOnlyMode" />\n                        <input type="button" class="today btn btn-default btn-sm" ng-click="ctrl._today()" value="Today" />\n                        <input type="button" class="picker-close btn btn-default btn-sm" ng-click="ctrl._close()" ng-if="!ctrl.pickerOnlyMode" value="Close" ng-if="!ctrl.pickerOnlyMpde" />\n                    </div>\n               </div> \n        ',a='\n            <!-- month view -->\n            <div class="month-picker" ng-if="ctrl.view == \'MONTH\'">\n                 <table>\n                    <thead>\n                          <tr>\n                          <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl._prevYear()" class="glyphicon glyphicon-menu-left"></a></td>\n                          <td ng-click="ctrl._switchToYearView()">{{ctrl.monthPickerData.year}}</td>\n                          <td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl._nextYear()"></a></td>\n                          </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="monthRow in ctrl.yearPickerData.row">\n                            <td ng-repeat="month in monthRow" ng-class="{\'invalid\': month.invalid, \'selected\' : ctrl._isSameMonth(month), \'chosen\' : ctrl._isChosenMonth(month), \'today\': ctrl._isTodayMonth(month)}"\n                            ng-click="ctrl._selectMonth(month)"\n                            >{{::month.month}}</td>\n                        </tr>\n                    </tbody>\n                 </table>   \n            \n                <div class="button-group bottom-buttons">\n                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />\n                </div>\n            </div>    \n        ',i='\n            <!-- year view -->  \n            <div class="year-picker" ng-if="ctrl.view == \'YEAR\'">\n                  <table>\n                    <thead>\n                    <tr>\n                        <td><a ng-click="ctrl._prevDecade()" class="glyphicon glyphicon-menu-left"></a></td>\n                        <td colspan="3" class="no-link">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>\n                        <td><a ng-click="ctrl._nextDecade()" class="glyphicon glyphicon-menu-right"></a></td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="yearrow in ctrl.decadePickerData.row">\n                            <td ng-repeat="year in yearrow"\n                            ng-class="{\'invalid\': year.invalid, \'selected\' : ctrl._isSameYear(year), \'chosen\' : ctrl._isChosenYear(year), \'today\': ctrl._isTodayYear(year)}"\n                             ng-click="ctrl._selectYear(year)"\n                            >{{::year.year}}</td></td>\n                        </tr>\n                    </table>\n                  <div class="button-group bottom-buttons">\n                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl._goBackInView()" value="Back" />\n                  </div>\n            </div>   \n        ';return'\n           <div class="dropdown" ng-if="!ctrl.pickerOnlyMode"> \n                '+e+' \n               <div class="dropdown-menu picker-popup">\n                    <div class="content" ng-if="ctrl.isOpen">\n                       '+r+"\n                       \n                       "+a+"                   \n                             \n                       "+i+'\n                   </div>\n               \n                </div>\n            </div> \n            <div class="dropdown picker-standalone" ng-if="ctrl.pickerOnlyMode">\n                 '+t+'\n                 <div class="picker-popup">\n                  <div class="content"> \n                     '+r+"\n                           \n                     "+a+"                   \n                                 \n                     "+i+"\n                 </div>\n                 </div>\n            </div>  \n                 \n        "},this.controllerAs="ctrl",this.bindings={name:"@",timezone:"@",startDate:"<",endDate:"<",dateFormat:"@",placeholder:"@",buttonLabel:"@",pickerMode:"@",pickerOnlyMode:"@",endOfDay:"<"},this.require={ngModel:"ngModel"},this.controller=["$scope","$element","$timeout",function(e,t,i){var c=this;this.buttonLabel="undefined"==typeof this.buttonLabel||null==this.buttonLabel?o.DEFAULT_PICKER_LABEL:this.buttonLabel,this.pickerMode="undefined"==typeof this.pickerMode||null==this.pickerMode?o.DEFAULT_PICKER_MODE:this.pickerMode,this.visibleDays=[],this.view=o.PICKER_VIEW_DATE,this.viewStack=[];var l=function(){return c.timezone||moment.tz.guess()},s=function(){return c.dateFormat||(c.pickerMode===o.DEFAULT_PICKER_MODE?o.DEFAULT_DATE_FORMAT:o.DEFAULT_DATE_TIME_FORMAT)},u=function(e){for(var t=e,n=0;c.ngModel.$formatters&&n<c.ngModel.$formatters.length;n++)t=c.ngModel.$formatters[n](t);c.innerSelection=t,i(function(){c._updatePickerData()})};this._isSelectedDate=function(e){if(c.ngModel.$modelValue){var t=moment.tz(c.ngModel.$modelValue,l());return t.isSame(e.momentDate,"date")&&t.isSame(e.momentDate,"month")&&t.isSame(e.momentDate,"year")}return!1},this._isChosenDate=function(e){if(c._currentDate){var t=c._currentDate;return t.isSame(e.momentDate,"date")&&t.isSame(e.momentDate,"month")&&t.isSame(e.momentDate,"year")}return!1},this._isToday=function(e){var t=moment.tz(new Date,l());return t.isSame(e.momentDate,"date")&&t.isSame(e.momentDate,"month")&&t.isSame(e.momentDate,"year")},this._isTodayMonth=function(e){var t=moment.tz(new Date,l());return t.isSame(e.momentDate,"month")&&t.isSame(e.momentDate,"year")},this._isSameMonth=function(e){var t=moment.tz(c.ngModel.$modelValue,l());return t.isSame(e.momentDate,"month")&&t.isSame(e.momentDate,"year")},this._isChosenMonth=function(e){var t=c._currentDate;return t.isSame(e.momentDate,"month")&&t.isSame(e.momentDate,"year")},this._isTodayYear=function(e){var t=moment.tz(new Date,l());return t.isSame(e.momentDate,"year")},this._isSameYear=function(e){var t=moment.tz(c.ngModel.$modelValue,l());return t.isSame(e.momentDate,"year")},this._isChosenYear=function(e){var t=c._currentDate;return t.isSame(e.momentDate,"year")},this._isValidTime=function(e,t){if(e<0||e>23||t<0||t>59)return!1;var n=moment.tz(c._currentDate.toDate(),l()),r=c.startDate?moment.tz(c.startDate,l()).startOf("day"):null,a=c.endDate?moment.tz(c.endDate,l()).endOf("day"):null;return n.set("hour",e).set("minute",t),!n.isBefore(r)&&!n.isAfter(a)},this._isValidHour=function(e){if(e<0||e>23)return!1;var t=moment.tz(c._currentDate.toDate(),l()),n=c.startDate?moment.tz(c.startDate,l()):null,r=c.endDate?moment.tz(c.endDate,l()):null;return t.set("hour",e),!t.isBefore(n)&&!t.isAfter(r)},this._isValidMinute=function(e){if(e<0||e>59)return!1;var t=moment.tz(c._currentDate.toDate(),l()),n=c.startDate?moment.tz(c.startDate,l()):null,r=c.endDate?moment.tz(c.endDate,l()):null;return t.set("minute",e),!t.isBefore(n)&&!t.isAfter(r)},this._nextHour=function(){c._isValidHour(c._currentDate.get("hour")+1)&&(c._currentDate.add("hour",1),c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))},this._prevHour=function(){c._isValidHour(c._currentDate.get("hour")-1)&&(c._currentDate.subtract("hour",1),c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))},this._nextMinute=function(){c._isValidMinute(c._currentDate.get("minute")+1)&&(c._currentDate.add("minute",1),c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))},this._prevMinute=function(){c._isValidMinute(c._currentDate.get("minute")-1)&&(c._currentDate.subtract("minute",1),c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))},Object.defineProperty(this,"currentHour",{get:function(){return c._currentDate?c._currentDate.get("hour"):0},set:function(e){c._isValidHour(e)&&(c._currentDate.set("hour",e),c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))}}),Object.defineProperty(this,"currentMinute",{get:function(){return c._currentDate?c._currentDate.get("minute"):0},set:function(e){c._isValidMinute(e)&&(c._currentDate.set("minute",e),c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))}}),this._fixCurrentDate=function(){var e=c._currentDate,t=c.startDate?moment.tz(c.startDate,l()):null,n=c.endDate?moment.tz(c.endDate,l()):null;t&&moment.tz(e,l()).isBefore(t)&&(c._currentDate=t),n&&moment.tz(e,l()).isAfter(n)&&(c._currentDate=n)},this._selectDate=function(e){e.invalid||(c.ngModel.$modelValue||(c._currentDate=e.momentDate),c._currentDate!=e&&(c._currentDate.set("date",e.momentDate.get("date")),c._currentDate.set("month",e.momentDate.get("month")),c._currentDate.set("year",e.momentDate.get("year"))),c.pickerMode===o.DEFAULT_PICKER_MODE&&(c.endOfDay?c._currentDate.endOf("day"):c._currentDate.startOf("day")),c._fixCurrentDate(),(!c.pickerOnlyMode||c.pickerOnlyMode&&"DOUBLE_BUFFERED"!=c.pickerOnlyMode)&&u(c._currentDate.toDate()),c.pickerMode!==o.DEFAULT_PICKER_MODE||c.pickerOnlyMode||c._close())},this._selectMonth=function(e){e.invalid||(c.ngModel.$modelValue?(c._currentDate.set("month",e.momentDate.get("month")),c._currentDate.set("year",e.momentDate.get("year"))):(c._currentDate=moment.tz(new Date,l()),c._currentDate.set("month",e.momentDate.get("month"))),c._fixCurrentDate(),(c.pickerMode!=o.DEFAULT_PICKER_MODE||c.pickerOnlyMode&&"DOUBLE_BUFFERED"!=c.pickerOnlyMode)&&c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)),c._goBackInView())},this._selectYear=function(e){if(!e.invalid){if(c.ngModel.$modelValue){moment.tz(c.ngModel.$modelValue,l());c._currentDate.set("year",e.momentDate.get("year"))}else c._currentDate=moment.tz(new Date,l()),c._currentDate.set("year",e.momentDate.get("year"));c._fixCurrentDate(),(c.pickerMode!=o.DEFAULT_PICKER_MODE||c.pickerOnlyMode&&"DOUBLE_BUFFERED"!=c.pickerOnlyMode)&&c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)),c._goBackInView()}},this._updatePickerData=function(){c.monthPickerData=r.ViewModelBuilder.calculateDateView(c._currentDate.toDate(),c.startDate,c.endDate,l()),c.yearPickerData=r.ViewModelBuilder.calculateMonthView(c._currentDate.toDate(),c.startDate,c.endDate,l()),c.decadePickerData=r.ViewModelBuilder.calculateYearView(c._currentDate.toDate(),c.startDate,c.endDate,l());var e=c._currentDate.get("year")%20-1;c.decadeFrom=moment.tz(c._currentDate.toDate(),l()).subtract("year",e).format("YYYY");var e=c._currentDate.get("year")%20-1,t=20-e-1;c.decadeTo=moment.tz(c._currentDate.toDate(),l()).add("year",t).format("YYYY")},this._openPicker=function(){var e=c.timezone||moment.tz.guess();c._currentDate=c.ngModel.$modelValue?moment.tz(c.ngModel.$modelValue,e):moment.tz(new Date,e),c._updatePickerData(),n.BehavioralFixes.openDropDown(t,c),c.documentClickHandler||i(function(){n.BehavioralFixes.registerDocumentBindings(t,c)})},this._prevMonth=function(){c._currentDate=c._currentDate.subtract(1,"month"),c._updatePickerData()},this._nextMonth=function(){c._currentDate=c._currentDate.add(1,"month"),c._updatePickerData()},this._prevYear=function(){c._currentDate=c._currentDate.subtract(1,"year"),c._updatePickerData()},this._nextYear=function(){c._currentDate=c._currentDate.add(1,"year"),c._updatePickerData()},this._prevDecade=function(){c._currentDate=c._currentDate.subtract(20,"year"),c._updatePickerData()},this._nextDecade=function(){c._currentDate=c._currentDate.add(20,"year"),c._updatePickerData()},this._clear=function(){c.innerSelection=""},this._today=function(){c._currentDate=moment.tz(new Date,l()),c.pickerMode==o.DEFAULT_PICKER_MODE&&c._currentDate.startOf("day"),c._fixCurrentDate(),u(c._currentDate.toDate()),c._close()},this._close=function(){c.view=o.DEFAULT_PICKER_MODE,c.viewStack=[],c.pickerVisible=!1,n.BehavioralFixes.unregisterDocumentBindings(c),n.BehavioralFixes.closeDropDown(t,c)},this._set=function(){u(c._currentDate.toDate())},this._switchToMonthView=function(){c.viewStack.unshift(c.view),c.view=o.PICKER_VIEW_MONTH},this._switchToYearView=function(){c.viewStack.unshift(c.view),c.view=o.PICKER_VIEW_YEAR},this._switchToTimeView=function(){c.viewStack.unshift(c.view),c.view=o.PICKER_VIEW_TIME},this._goBackInView=function(){c._updatePickerData(),c.view=c.viewStack.shift()},e.$watch("ctrl.innerSelection",function(e,t){e!=t&&c.ngModel.$setViewValue(e)}),e.$watch("ctrl.startDate",function(e,t){if(e&&c._currentDate){var n=moment.tz(e,l());if(n.isSameOrBefore(c._currentDate))return void i(function(){c._updatePickerData()});c._currentDate=c.endOfDay?n.endOf("day"):n;var r=moment.tz(c.ngModel.$modelValue,l());(c.pickerMode!=o.DEFAULT_PICKER_MODE||c.pickerOnlyMode)&&(r&&r.get("day")==c._currentDate.get("day")&&r.get("month")==c._currentDate.get("month")&&r.get("year")==c._currentDate.get("year")||c._selectDate(new a.PickerDate(!1,c._currentDate,1,!0)))}c._currentDate&&i(function(){c._updatePickerData()})}),this.$postLink=function(){i(function(){n.BehavioralFixes.registerPopupBindings(t),n.BehavioralFixes.registerKeyBindings(t)}),c.ngModel.$render=function(){c.innerSelection=c.ngModel.$viewValue},c.ngModel.$parsers.push(function(e){if(""==e)return null;var t=c.endOfDay?moment.tz(e,s(),l()).endOf("day").toDate():moment.tz(e,s(),l()).toDate(),n=c.startDate?moment.tz(c.startDate,l()):null,r=c.endDate?moment.tz(c.endDate,l()):null;return n&&moment.tz(t,l()).isBefore(n)&&n.isSame(t,"day")&&n.isSame(t,"month")&&n.isSame(t,"year")?c.startDate:r&&moment.tz(t,l()).isAfter(r)&&r.isSame(t,"day")&&r.isSame(t,"month")&&r.isSame(t,"year")?c.endDate:t}),c.ngModel.$validators.validDate=function(e,t){return!t||moment.tz(t,s(),l()).isValid()},c.ngModel.$validators.dateRange=function(e,t){if(null==e)return!0;var n=c.timezone||moment.tz.guess(),r=moment.tz(e,n),a=c.startDate?moment.tz(c.startDate,n).startOf("day"):null,i=c.endDate?moment.tz(c.endDate,n).endOf("day"):null,o=!1;return a&&(o=o||r.isBefore(a)),!o&&i&&(o=o||r.isAfter(i)),!o},c.ngModel.$formatters.push(function(e){if(null==e)return"";var t=c.timezone||moment.tz.guess();return moment.tz(e,t).format(s())}),c.pickerOnlyMode&&c._openPicker()},this.$onDestroy=function(){n.BehavioralFixes.unregisterDocumentBindings(c)}}]}return e}();angular.module("werpu.bootstrap.picker",[]).component("datePicker",new c).component("internalRangeInput",new i.RangeInput)});
//# sourceMappingURL=./dist/DatePickerFinal-compressed-amd.js.map
