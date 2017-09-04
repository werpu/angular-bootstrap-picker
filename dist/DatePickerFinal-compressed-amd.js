var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();define("helperComponents/RangeInput",["require","exports"],function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){this.template=function(){return'\n           <input type="text" ng-model="ctrl.inputText" />\n        '},this.controllerAs="ctrl",this.bindings={from:"<",to:"<"},this.require={ngModel:"ngModel"},this.controller=["$scope","$element","$timeout",function(t,e,n){var r=this;t.$watch("ctrl.inputText",function(t,e){t!=e&&r.ngModel.$setViewValue(t)}),this.$postLink=function(){r.ngModel.$render=function(){r.inputText=r.ngModel.$viewValue},e.find("input").on("keydown",function(t){var e=t.keyCode;if(e>57)return t.preventDefault(),!1;if(e>=48&&e<=57){var n=angular.element(t.target).val()+String.fromCharCode(e);if(void 0!==r.from&&r.from>n||void 0!==r.to&&r.to<n)return t.preventDefault(),!1}})}}]}return t}();e.RangeInput=n}),define("datePicker/DatePickerView",["require","exports"],function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.template=function(){var t='\n               \x3c!-- date view - default view --\x3e\n               <div class="date-picker" ng-if="ctrl.view == \'DATE\'">                \n                    <table>\n                        <thead>\n                        \n                            <tr ng-if="ctrl.pickerMode == \'DATE_TIME\'">\n                                <td colspan="8" class="invalid picker-title" >{{ctrl.innerSelection}}</td>\n                            </tr>\n                            \n                            <tr>\n                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl.prevMonth()"></a></td><td colspan="2" ng-click="ctrl.switchToMonthView()">{{ctrl.currentDate.format("MMMM")}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl.nextMonth()"></a></td>\n                                <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl.prevYear()"></a></td><td colspan="2" ng-click="ctrl.switchToYearView()">{{ctrl.monthPickerData.year}}</td><td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl.nextYear()"></a></td>\n                            </tr>\n                            <tr>\n                                <td class="calendarWeek">\x3c!-- week of year --\x3e</td>\n                                <td class="dayOfWeek" ng-repeat="dayOfWeek in ctrl.monthPickerData.dayOfWeek" ng-click="ctrl.selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    \n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr ng-repeat="week in ctrl.monthPickerData.weeks">\n                                <td class="calendarWeek">{{::week.calendarWeek}}</td>\n                                <td class="day" ng-repeat="day in week.days" ng-class="{\'outside\': !day.sameMonth, \'invalid\': day.invalid, \'selected\' : ctrl.isSelectedDate(day), \'chosen\' : ctrl.isChosenDate(day), \'today\': ctrl.isToday(day)}" class="{{day.event.importance}}" ng-click="ctrl.selectDate(day)">{{::day.day}}</td>\n                            </tr>\n                        </tbody>\n                        \n                    </table>\n                \n                    \n            <div class="time-picker" ng-if="ctrl.view == \'DATE\' && ctrl.pickerMode == \'DATE_TIME\'" >\n                <table>\n                   <thead>\n                        \n                    </thead>\n                    <tbody>\n                        \n                         <tr>\n                            <td class="glyphicon glyphicon-chevron-up" ng-class="{\'invalid\' : !ctrl.isValidHour(ctrl.currentDate.get(\'hour\') + 1)}" ng-click="ctrl.nextHour()">\n                            </td>\n                            <td></td>\n                            <td class="glyphicon glyphicon-chevron-up" ng-class="{\'invalid\' : !ctrl.isValidMinute(ctrl.currentDate.get(\'minute\') + 1)}" ng-click="ctrl.nextMinute()">\n                            </td>\n                        </tr>\n                        <tr>\n                            <td class="selected-hour">\n                                <internal-range-input class="hour-input" from="0" to="23" ng-model="ctrl.currentHour"/>    \n                            </td>\n                            <td class="invalid">:</td>\n                            <td class="selected-minute">\n                                <internal-range-input class="minute-input" from="0" to="59" ng-model="ctrl.currentMinute"/> \n                            </td>\n                        </tr>\n                         <tr>\n                            <td class="glyphicon glyphicon-chevron-down" ng-class="{\'invalid\' : !ctrl.isValidHour(ctrl.currentDate.get(\'hour\') - 1)}" ng-click="ctrl.prevHour()">\n                            </td>\n                            <td></td>\n                            <td class="glyphicon glyphicon-chevron-down" ng-class="{\'invalid\' : !ctrl.isValidMinute(ctrl.currentDate.get(\'minute\') - 1)}" ng-click="ctrl.prevMinute()">\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class="button-group bottom-buttons" ng-if="ctrl.view == \'TIME\'">\n                  <input type="button" class="btn btn-default btn-sm" ng-click="ctrl.goBackInView()" value="Back" />\n                </div>\n            </div>\n        \n                    \n                    <div class="additional-content" ng-transclude="additionalContentDate"></div>\n                    \n                    <div class="button-group bottom-buttons col-xs-12 col-sm-12 col-md-12 col-lg-12">\n                        <div class="additional-buttons" ng-transclude="additionalButtonsDate"></div>\n                        <input type="button" class="Sset btn btn-default btn-sm" ng-click="ctrl.set()" value="Set" ng-if="ctrl.pickerOnlyMode == \'DOUBLE_BUFFERED\'" />\n                        <input type="button" class="clear btn btn-default btn-sm" ng-click="ctrl.clear()" value="Clear" ng-if="!ctrl.pickerOnlyMode" />\n                        <input type="button" class="today btn btn-default btn-sm" ng-click="ctrl.today()" value="Today" />\n                        <input type="button" class="picker-close btn btn-default btn-sm" ng-click="ctrl.close()" ng-if="!ctrl.pickerOnlyMode" value="{{ctrl.pickerMode == \'DATE\' ? \'Cancel\' : \'Close\'}}" ng-if="!ctrl.pickerOnlyMpde" />\n                    </div>\n               </div> \n        ',e='\n            \x3c!-- month view --\x3e\n            <div class="month-picker" ng-if="ctrl.view == \'MONTH\'">\n                 <table>\n                    <thead>\n                          <tr>\n                          <td><a class="prev glyphicon glyphicon-menu-left" ng-click="ctrl.prevYear()" class="glyphicon glyphicon-menu-left"></a></td>\n                          <td ng-click="ctrl.switchToYearView()">{{ctrl.monthPickerData.year}}</td>\n                          <td><a class="next glyphicon glyphicon-menu-right" ng-click="ctrl.nextYear()"></a></td>\n                          </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="monthRow in ctrl.yearPickerData.row">\n                            <td ng-repeat="month in monthRow" ng-class="{\'invalid\': month.invalid, \'selected\' : ctrl.isSameMonth(month), \'chosen\' : ctrl.isChosenMonth(month), \'today\': ctrl.isTodayMonth(month)}"\n                            ng-click="ctrl.selectMonth(month)"\n                            >{{::month.month}}</td>\n                        </tr>\n                    </tbody>\n                 </table>   \n            \n                 <div class="additional-content" ng-transclude="additionalContentMonth"></div>\n                <div class="button-group bottom-buttons">\n                    <div class="additional-buttons" ng-transclude="additionalButtonsMonth"></div>\n                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl.goBackInView()" value="Back" />\n                </div>\n            </div>    \n        ',n='\n            \x3c!-- year view --\x3e  \n            <div class="year-picker" ng-if="ctrl.view == \'YEAR\'">\n                  <table>\n                    <thead>\n                    <tr>\n                        <td><a ng-click="ctrl.prevDecade()" class="glyphicon glyphicon-menu-left"></a></td>\n                        <td colspan="3" class="no-link">{{ctrl.decadeFrom}} - {{ctrl.decadeTo}}</td>\n                        <td><a ng-click="ctrl.nextDecade()" class="glyphicon glyphicon-menu-right"></a></td>\n                    </tr>\n                    </thead>\n                    <tbody>\n                        <tr ng-repeat="yearrow in ctrl.decadePickerData.row">\n                            <td ng-repeat="year in yearrow"\n                            ng-class="{\'invalid\': year.invalid, \'selected\' : ctrl.isSameYear(year), \'chosen\' : ctrl.isChosenYear(year), \'today\': ctrl.isTodayYear(year)}"\n                             ng-click="ctrl.selectYear(year)"\n                            >{{::year.year}}</td></td>\n                        </tr>\n                    </table>\n                  <div class="additional-content" ng-transclude="additionalContentYear"></div>  \n                  <div class="button-group bottom-buttons">\n                    <div class="additional-buttons" ng-transclude="additionalButtonsYear"></div>\n                    <input type="button" class="btn btn-default btn-sm" ng-click="ctrl.goBackInView()" value="Back" />\n                  </div>\n            </div>   \n        ';return'\n           <div class="dropdown" ng-if="!ctrl.pickerOnlyMode"> \n                \n\n                <div class="input-group">\n                   <input type="text" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection">\n                   <span class="input-group-btn">\n                       <button type="button" class="picker-open btn btn-default" ng-click="ctrl.openPicker()">\n                             <span class="{{ctrl.buttonStyleClass ? ctrl.buttonStyleClass : \'\'}}" ng-class="{\'glyphicon glyphicon-align-right glyph-icon glyphicon-calendar\': !ctrl.buttonStyleClass}"> {{ctrl.buttonLabel}} </span>\n                       </button>\n                   </span> \n               </div>\n               <input type="button" class="picker-close" ng-click="ctrl.close()" value="Close" ng-show="false"/>\n         \n               <div class="dropdown-menu picker-popup">\n                    <div class="content" ng-if="ctrl.isOpen">\n                       '+t+"\n                       \n                       "+e+"                   \n                             \n                       "+n+'\n                   </div>\n               \n                </div>\n            </div> \n            <div class="dropdown picker-standalone" ng-if="ctrl.pickerOnlyMode">\n                 \n           <input type="text" style="display: none;" placeholder="{{ctrl.placeholder}}" class="form-control" name="{{ctrl.name}}_inner" ng-model="ctrl.innerSelection">\n        \n                 <div class="picker-popup">\n                  <div class="content"> \n                     '+t+"\n                           \n                     "+e+"                   \n                                 \n                     "+n+"\n                 </div>\n                 </div>\n            </div>  \n                 \n        "},t}();n.bindings={name:"@",timezone:"@",startDate:"<",endDate:"<",dateFormat:"@",placeholder:"@",buttonLabel:"@",pickerMode:"@",pickerOnlyMode:"@",endOfDay:"<",onYearSelection:"&",onMonthSelection:"&",onDateSelection:"&",buttonStyleClass:"@?"},n.require={ngModel:"ngModel"},n.transclude={additionalButtonsDate:"?additionalButtonsDate",additionalContentDate:"?additionalContentDate",additionalButtonsMonth:"?additionalButtonsMonth",additionalContentMonth:"?additionalContentMonth",additionalButtonsYear:"?additionalButtonsYear",additionalContentYear:"?additionalContentYear"},n.controllerAs="ctrl",e._DatePickerView=n}),define("utils/DatePickerTypes",["require","exports"],function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Importance={LOW:"LOW",MEDIUM:"MEDIUM",HIGH:"HIGH",NONE:"NONE"};var n=function(){function t(){}return t}();e.EventModelValue=n;var r=function(){function t(){this.data=[]}return t}();e.EventModel=r;var i=function(){function t(t,e){this.invalid=t,this.momentDate=e}return t}();e.BaseDate=i;var a=function(t){function e(e,n,r,i,a){var o=t.call(this,e,n)||this;return o.day=r,o.sameMonth=i,a&&(o.event=a),o}return __extends(e,t),e}(i);e.PickerDate=a;var o=function(t){function e(e,n,r,i){var a=t.call(this,e,n)||this;return a.month=r,a.sameYear=i,a}return __extends(e,t),e}(i);e.PickerMonth=o;var s=function(t){function e(e,n,r){var i=t.call(this,e,n)||this;return i.year=r,i}return __extends(e,t),e}(i);e.PickerYear=s;var c=function(){function t(t,e){void 0===e&&(e=[]),this.calendarWeek=t,this.days=e}return t}();e.PickerWeek=c;var l=function(){function t(t,e,n,r){void 0===n&&(n=[]),void 0===r&&(r=[]),this.dayOfWeek=n,this.weeks=r,this.year=t,this.month=e}return t}();e.DatePickerPage=l;var u=function(){function t(){this.months=[]}return t}();e.EventPickerPage=u;var d=function(){function t(t,e){void 0===e&&(e=[]),this.row=e,this.year=t}return t}();e.MonthPickerPage=d;var m=function(){function t(t){void 0===t&&(t=[]),this.row=t}return t}();e.YearPickerPage=m;var h=function(){function t(t,e){this.hour=t,this.minutes=e}return t}();e.TimeModel=h}),define("utils/DateUtils",["require","exports"],function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t}();n.DEFAULT_DATE_FORMAT="DD.MM.YYYY",n.DEFAULT_DATE_TIME_FORMAT="DD.MM.YYYY HH:mm",n.DEFAULT_PICKER_MODE="DATE",n.PICKER_VIEW_DATE="DATE",n.PICKER_VIEW_TIME="TIME",n.PICKER_VIEW_MONTH="MONTH",n.PICKER_VIEW_YEAR="YEAR",n.DEFAULT_PICKER_LABEL="Date",e.PickerConstants=n;var r=function(){function t(){}return t.isToday=function(e,n){var r=moment.tz(new Date,t.getTimezone(e));return r.isSame(n,"date")&&r.isSame(n,"month")&&r.isSame(n,"year")},t.isSameDay=function(t,e){return e.isSame(t,"date")&&e.isSame(t,"month")&&e.isSame(t,"year")},t.isCurrentMonth=function(e,n){var r=moment.tz(new Date,t.getTimezone(e));return r.isSame(n,"month")&&r.isSame(n,"year")},t.isSameMonth=function(e,n,r){var i=moment.tz(n,t.getTimezone(e));return i.isSame(r,"month")&&i.isSame(r,"year")},t.isCurrentYear=function(e,n){return moment.tz(new Date,t.getTimezone(e)).isSame(n,"year")},t.isSameYear=function(e,n,r){return moment.tz(n,t.getTimezone(e)).isSame(r,"year")},t.getTimezone=function(t){return t||moment.tz.guess()},t}();e.DateUtils=r}),define("utils/ViewModelBuilder",["require","exports","utils/DatePickerTypes"],function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.calculateYearView=function(t,e,r,i){t||(t=new Date);var a=moment.tz(t,i),o=a.get("year")%20-1,s=20-o-1,c=moment.tz(t,i).startOf("year").startOf("month").startOf("day").subtract(o,"year"),l=moment.tz(t,i).endOf("year").endOf("month").endOf("day").add(s,"year"),u=e?moment.tz(e,i).startOf("year").startOf("month").startOf("day"):null,d=r?moment.tz(r,i).endOf("year").endOf("month").endOf("day"):null,m=0,h=new n.YearPickerPage;return moment.range(c,l).by("year",function(t){t=moment.tz(t,i),m%5==0&&h.row.push([]);var e=!1;u&&(e=e||moment.tz(t,i).startOf("day").isBefore(u)&&moment.tz(t,i).endOf("day").isBefore(u)),!e&&d&&(e=e||moment.tz(t,i).startOf("day").isAfter(d)&&moment.tz(t,i).endOf("day").isAfter(d)),h.row[h.row.length-1].push(new n.PickerYear(e,t,parseInt(t.tz(i).format("YYYY")))),m++}),h},t.calculateMonthView=function(t,e,r,i){t||(t=new Date);var a=moment.tz(t,i),o=moment.tz(t,i).startOf("year").startOf("month").startOf("day"),s=moment.tz(t,i).endOf("year").endOf("month").endOf("day"),c=e?moment.tz(e,i).startOf("month").startOf("day"):null,l=r?moment.tz(r,i).endOf("month").endOf("day"):null,u=moment.range(o,s),d=0,m=new n.MonthPickerPage(a.get("year"));return u.by("month",function(t){t=moment.tz(t,i),d%3==0&&m.row.push([]);var e=!1;c&&(e=e||moment.tz(t,i).startOf("day").isBefore(c)&&moment.tz(t,i).endOf("day").isBefore(c)),!e&&l&&(e=e||moment.tz(t,i).startOf("day").isAfter(l)&&moment.tz(t,i).endOf("day").isAfter(l)),m.row[m.row.length-1].push(new n.PickerMonth(e,t,moment.tz(t,i).format("MMMM"),moment.tz(t,i).isSame(a,"year"))),d++}),m},t.calculateDateView=function(t,e,r,i){t||(t=new Date);var a=moment.tz(t,i),o=moment.tz(t,i).startOf("month").startOf("week"),s=moment.tz(t,i).startOf("month").startOf("week").add(41,"days"),c=e||null,l=r||null,u=moment.range(o,s),d=[],m=[],h=0;return u.by("day",function(t){h%7==0&&d.push(new n.PickerWeek(t.tz(i).get("week")));var e=!1;c&&(e=e||t.startOf("day").isBefore(c)&&t.endOf("day").isBefore(c)),!e&&l&&(e=e||t.startOf("day").isAfter(l)&&t.endOf("day").isAfter(l)),d[d.length-1].days.push(new n.PickerDate(e,t,t.tz(i).get("date"),t.tz(i).isSame(a,"month"))),m.length<7&&m.push(t.tz(i).format("ddd")),h++}),new n.DatePickerPage(a.get("year"),"",m,d)},t.calculateEventDateView=function(e,r,i,a){var o=t.buildModelIdx(e,a),s=(moment.tz(r,a).startOf("month").startOf("week"),moment.tz(i,a).startOf("month").startOf("week").add(41,"days"),r||null),c=i||null,l=(moment.tz(a),[]),u=[],d=0,m=new n.EventPickerPage,h=moment.tz(r,a).startOf("month").startOf("week").add(41,"days"),f=moment.tz(r,a).startOf("month").startOf("week"),p=moment.tz(r,a);do{var D=!1;moment.range(f,h).by("day",function(t){t=moment.tz(t,a).startOf("day"),d%7==0&&l.push(new n.PickerWeek(t.tz(a).get("week")));var e=t.isBefore(s,"day")||moment.tz(t,a).isAfter(c,"day")||moment.tz(t,a).endOf("day").isAfter(t.clone().endOf("month")),r=t.format("DD.MM.YYYY"),i=o[r];l[l.length-1].days.push(new n.PickerDate(e,t,t.get("date"),t.isSame(p,"month"),i)),D=D||t.isSame(p,"month")&&!e,u.length<7&&u.push(t.tz(a).format("ddd")),d++});var y=moment.tz(h,a).startOf("month").subtract(1,"day").get("year"),g=moment.tz(h,a).startOf("month").subtract(1,"day").format("MMM");f=moment.tz(h.add("day",1),a).startOf("month").startOf("week"),h=moment.tz(f,a).add(41,"days"),p.add("month",1),D&&m.months.push(new n.DatePickerPage(y,g,u,l));var l=[],u=[]}while(f.isSameOrBefore(c));return m},t.buildModelIdx=function(t,e){if(!t)return{};for(var n={},r=0;r<t.data.length;r++){var i=t.data[r];n[moment.tz(i.day,e).format("DD.MM.YYYY")]=i}return n},t}();e.ViewModelBuilder=r}),define("utils/BehavioralFixes",["require","exports"],function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Array.from||(Array.from=function(){var t=Object.prototype.toString,e=function(e){return"function"==typeof e||"[object Function]"===t.call(e)},n=function(t){var e=Number(t);return isNaN(e)?0:0!==e&&isFinite(e)?(e>0?1:-1)*Math.floor(Math.abs(e)):e},r=Math.pow(2,53)-1,i=function(t){var e=n(t);return Math.min(Math.max(e,0),r)};return function(t){var n=this,r=Object(t);if(null==t)throw new TypeError("Array.from requires an array-like object - not null or undefined");var a,o=arguments.length>1?arguments[1]:void 0;if(void 0!==o){if(!e(o))throw new TypeError("Array.from: when provided, the second argument must be a function");arguments.length>2&&(a=arguments[2])}for(var s,c=i(r.length),l=e(n)?Object(new n(c)):new Array(c),u=0;u<c;)s=r[u],l[u]=o?void 0===a?o(s,u):o.call(a,s,u):s,u+=1;return l.length=c,l}}());var n=function(){function t(){}return t.getParents=function(t,e){Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),n=e.length;--n>=0&&e.item(n)!==this;);return n>-1});for(var n=[];t&&t!==document;t=t.parentNode)e?t.matches&&t.matches(e)&&n.push(t):n.push(t);return n},t.trigger=function(t,e,n){Array.from(t.querySelectorAll(e)).forEach(n)},t.addEventListener=function(t,e,n){Array.from(t.querySelectorAll(e)).forEach(n)},t.registerKeyBindings=function(e){e.addEventListener("keydown",function(n){return 13==n.keyCode?(n.preventDefault(),t.trigger(t.getParents(e,"form")[0],"input[type=submit]",function(t){return t.click()}),!1):40==n.keyCode?(t.trigger(e,".picker-open",function(t){return t.click()}),!1):27==n.keyCode?(t.trigger(e,".picker-close",function(t){return t.click()}),!1):void 0})},t.registerDocumentBindings=function(e,n){if(!n.documentClickHandler){var r=function(){t.unregisterDocumentBindings(n),t.trigger(e,".picker-close",function(t){return t.click()})};document.addEventListener("click",r),n.documentClickHandler=r}},t.unregisterDocumentBindings=function(t){t.documentClickHandler&&(document.removeEventListener("click",t.documentClickHandler),t.documentClickHandler=null)},t.registerPopupBindings=function(t){Array.from(t.querySelectorAll(".picker-popup")).forEach(function(t){t.addEventListener("click",function(t){t.stopImmediatePropagation(),t.stopPropagation()})})},t.openDropDown=function(t,e){e.isOpen=!0,Array.from(t.querySelectorAll(".dropdown")).forEach(function(t){t.classList.add("open")})},t.closeDropDown=function(t,e){e.isOpen=!1,Array.from(t.querySelectorAll(".dropdown")).forEach(function(t){t.classList.remove("open")})},t}();e.BehavioralFixes=n}),define("datePicker/DatePickerController",["require","exports","utils/DatePickerTypes","utils/DateUtils","utils/ViewModelBuilder","utils/BehavioralFixes"],function(t,e,n,r,i,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e,i){var o=this;this.$scope=t,this.$element=e,this.$timeout=i,this.getTimezone=function(){return o.timezone||moment.tz.guess()},this.getDateFormat=function(){return o.dateFormat||(o.pickerMode===r.PickerConstants.DEFAULT_PICKER_MODE?r.PickerConstants.DEFAULT_DATE_FORMAT:r.PickerConstants.DEFAULT_DATE_TIME_FORMAT)},this.updateModel=function(t){for(var e=t,n=0;o.ngModel.$formatters&&n<o.ngModel.$formatters.length;n++)e=o.ngModel.$formatters[n](e);o.innerSelection=e,o.$timeout(function(){o.updatePickerData()})},this.currentDate=null,this.doubleBufferDate=null,this.visibleDays=[],this.view=r.PickerConstants.PICKER_VIEW_DATE,this.viewStack=[],t.$on("$destroy",function(){a.BehavioralFixes.unregisterDocumentBindings(o)}),Object.defineProperty(this,"currentHour",{get:function(){return o.currentDate?o.currentDate.get("hour"):0},set:function(t){o.isValidHour(t)&&(o.currentDate.set("hour",t),o.selectDate(new n.PickerDate(!1,o.currentDate,1,!0)))}}),Object.defineProperty(this,"currentMinute",{get:function(){return o.currentDate?o.currentDate.get("minute"):0},set:function(t){o.isValidMinute(t)&&(o.currentDate.set("minute",t),o.selectDate(new n.PickerDate(!1,o.currentDate,1,!0)))}}),t.$watch("ctrl.innerSelection",function(t,e){t!=e&&o.ngModel.$setViewValue(t)}),t.$watch("ctrl.startDate",function(t,e){if(t&&o.currentDate){var a=moment.tz(t,o.getTimezone());if(a.isSameOrBefore(o.currentDate))return void i(function(){o.updatePickerData()});o.currentDate=o.endOfDay?a.endOf("day"):a;var s=moment.tz(o.ngModel.$modelValue,o.getTimezone());(o.pickerMode!=r.PickerConstants.DEFAULT_PICKER_MODE||o.pickerOnlyMode)&&(s&&s.get("day")==o.currentDate.get("day")&&s.get("month")==o.currentDate.get("month")&&s.get("year")==o.currentDate.get("year")||o.selectDate(new n.PickerDate(!1,o.currentDate,1,!0)))}o.currentDate&&i(function(){o.updatePickerData()})})}return t.prototype.isSelectedDate=function(t){if(this.ngModel.$modelValue){var e=moment.tz(this.ngModel.$modelValue,this.getTimezone());return e.isSame(t.momentDate,"date")&&e.isSame(t.momentDate,"month")&&e.isSame(t.momentDate,"year")}return!1},t.prototype.isChosenDate=function(t){if(this.doubleBufferDate){var e=this.doubleBufferDate;return e.isSame(t.momentDate,"date")&&e.isSame(t.momentDate,"month")&&e.isSame(t.momentDate,"year")}return!1},t.prototype.isToday=function(t){return r.DateUtils.isToday(this.timezone,t.momentDate)},t.prototype.isTodayMonth=function(t){return r.DateUtils.isCurrentMonth(this.timezone,t.momentDate)},t.prototype.isSameMonth=function(t){return r.DateUtils.isSameMonth(this.timezone,this.ngModel.$modelValue,t.momentDate)},t.prototype.isChosenMonth=function(t){if(!this.doubleBufferDate)return!1;var e=this.doubleBufferDate;return e.isSame(t.momentDate,"month")&&e.isSame(t.momentDate,"year")},t.prototype.isTodayYear=function(t){return r.DateUtils.isCurrentYear(this.timezone,t.momentDate)},t.prototype.isSameYear=function(t){return r.DateUtils.isSameYear(this.timezone,this.ngModel.$modelValue,t.momentDate)},t.prototype.isChosenYear=function(t){return!!this.doubleBufferDate&&this.doubleBufferDate.isSame(t.momentDate,"year")},t.prototype.isValidTime=function(t,e){if(t<0||t>23||e<0||e>59)return!1;var n=moment.tz(this.currentDate.toDate(),this.getTimezone()),r=this.startDate?moment.tz(this.startDate,this.getTimezone()).startOf("day"):null,i=this.endDate?moment.tz(this.endDate,this.getTimezone()).endOf("day"):null;return n.set("hour",t).set("minute",e),!n.isBefore(r)&&!n.isAfter(i)},t.prototype.isValidHour=function(t){if(t<0||t>23)return!1;var e=moment.tz(this.currentDate.toDate(),this.getTimezone()),n=this.startDate?moment.tz(this.startDate,this.getTimezone()):null,r=this.endDate?moment.tz(this.endDate,this.getTimezone()):null;return e.set("hour",t),!e.isBefore(n)&&!e.isAfter(r)},t.prototype.isValidMinute=function(t){if(t<0||t>59)return!1;var e=moment.tz(this.currentDate.toDate(),this.getTimezone()),n=this.startDate?moment.tz(this.startDate,this.getTimezone()):null,r=this.endDate?moment.tz(this.endDate,this.getTimezone()):null;return e.set("minute",t),!e.isBefore(n)&&!e.isAfter(r)},t.prototype.nextHour=function(){this.isValidHour(this.currentDate.get("hour")+1)&&(this.currentDate.add(1,"hour"),this.selectDate(new n.PickerDate(!1,this.currentDate,1,!0)))},t.prototype.prevHour=function(){this.isValidHour(this.currentDate.get("hour")-1)&&(this.currentDate.subtract(1,"hour"),this.selectDate(new n.PickerDate(!1,this.currentDate,1,!0)))},t.prototype.nextMinute=function(){this.isValidMinute(this.currentDate.get("minute")+1)&&(this.currentDate.add(1,"minute"),this.selectDate(new n.PickerDate(!1,this.currentDate,1,!0)))},t.prototype.prevMinute=function(){this.isValidMinute(this.currentDate.get("minute")-1)&&(this.currentDate.subtract(1,"minute"),this.selectDate(new n.PickerDate(!1,this.currentDate,1,!0)))},t.prototype._fixCurrentDate=function(){var t=this.currentDate,e=this.startDate?moment.tz(this.startDate,this.getTimezone()):null,n=this.endDate?moment.tz(this.endDate,this.getTimezone()):null;e&&moment.tz(t,this.getTimezone()).isBefore(e)&&(this.currentDate=e),n&&moment.tz(t,this.getTimezone()).isAfter(n)&&(this.currentDate=n)},t.prototype.selectDate=function(t){t.invalid||(this.ngModel.$modelValue||(this.currentDate=t.momentDate,"DOUBLE_BUFFERED"==this.pickerOnlyMode&&(this.doubleBufferDate=moment.tz(this.currentDate.toDate(),this.getTimezone()))),this.currentDate!=t.momentDate&&(this.currentDate.set("date",t.momentDate.get("date")),this.currentDate.set("month",t.momentDate.get("month")),this.currentDate.set("year",t.momentDate.get("year"))),this.pickerMode===r.PickerConstants.DEFAULT_PICKER_MODE&&(this.endOfDay?this.currentDate.endOf("day"):this.currentDate.startOf("day")),this._fixCurrentDate(),"DOUBLE_BUFFERED"==this.pickerOnlyMode&&(this.doubleBufferDate=moment.tz(this.currentDate.toDate(),this.getTimezone())),(!this.pickerOnlyMode||this.pickerOnlyMode&&"DOUBLE_BUFFERED"!=this.pickerOnlyMode)&&this.updateModel(this.currentDate.toDate()),this.onDateSelection({$picker:this,$date:this.currentDate.toDate()}),this.pickerMode!==r.PickerConstants.DEFAULT_PICKER_MODE||this.pickerOnlyMode||this.close())},t.prototype.selectMonth=function(t){t.invalid||(this.ngModel.$modelValue?(this.currentDate.set("month",t.momentDate.get("month")),this.currentDate.set("year",t.momentDate.get("year"))):(this.currentDate=moment.tz(new Date,this.getTimezone()),this.currentDate.set("month",t.momentDate.get("month"))),this._fixCurrentDate(),this.onMonthSelection({$picker:this,$date:this.currentDate.toDate()}),this.goBackInView())},t.prototype.selectYear=function(t){if(!t.invalid){if(this.ngModel.$modelValue){moment.tz(this.ngModel.$modelValue,this.getTimezone());this.currentDate.set("year",t.momentDate.get("year"))}else this.currentDate=moment.tz(new Date,this.getTimezone()),this.currentDate.set("year",t.momentDate.get("year"));this._fixCurrentDate(),this.onYearSelection({$picker:this,$date:this.currentDate.toDate()}),this.goBackInView()}},t.prototype.updatePickerData=function(){this.monthPickerData=i.ViewModelBuilder.calculateDateView(this.currentDate.toDate(),this.startDate,this.endDate,this.getTimezone()),this.yearPickerData=i.ViewModelBuilder.calculateMonthView(this.currentDate.toDate(),this.startDate,this.endDate,this.getTimezone()),this.decadePickerData=i.ViewModelBuilder.calculateYearView(this.currentDate.toDate(),this.startDate,this.endDate,this.getTimezone());var t=this.currentDate.get("year")%20-1;this.decadeFrom=moment.tz(this.currentDate.toDate(),this.getTimezone()).subtract(t,"year").format("YYYY");var t=this.currentDate.get("year")%20-1,e=20-t-1;this.decadeTo=moment.tz(this.currentDate.toDate(),this.getTimezone()).add(e,"year").format("YYYY")},t.prototype.openPicker=function(){var t=this,e=this.timezone||moment.tz.guess();this.currentDate=this.ngModel.$modelValue?moment.tz(this.ngModel.$modelValue,e):moment.tz(new Date,e),this.updatePickerData(),a.BehavioralFixes.openDropDown(this.$element[0],this),this.documentClickHandler||this.$timeout(function(){a.BehavioralFixes.registerDocumentBindings(t.$element[0],t)})},t.prototype.prevMonth=function(){this.currentDate=this.currentDate.subtract(1,"month"),this.updatePickerData()},t.prototype.nextMonth=function(){this.currentDate=this.currentDate.add(1,"month"),this.updatePickerData()},t.prototype.prevYear=function(){this.currentDate=this.currentDate.subtract(1,"year"),this.updatePickerData()},t.prototype.nextYear=function(){this.currentDate=this.currentDate.add(1,"year"),this.updatePickerData()},t.prototype.prevDecade=function(){this.currentDate=this.currentDate.subtract(20,"year"),this.updatePickerData()},t.prototype.nextDecade=function(){this.currentDate=this.currentDate.add(20,"year"),this.updatePickerData()},t.prototype.clear=function(){this.innerSelection=""},t.prototype.today=function(){this.currentDate=moment.tz(new Date,this.getTimezone()),this.pickerMode==r.PickerConstants.DEFAULT_PICKER_MODE&&this.currentDate.startOf("day"),this._fixCurrentDate(),this.updateModel(this.currentDate.toDate()),this.close()},t.prototype.close=function(){this.view=r.PickerConstants.DEFAULT_PICKER_MODE,this.viewStack=[],this.pickerVisible=!1,a.BehavioralFixes.unregisterDocumentBindings(this),a.BehavioralFixes.closeDropDown(this.$element[0],this),this.$element.find("input[type=text]:first").focus()},t.prototype.set=function(){"DOUBLE_BUFFERED"==this.pickerOnlyMode&&(this.currentDate=moment.tz(this.doubleBufferDate.toDate(),this.getTimezone())),this.updateModel(this.currentDate.toDate())},t.prototype.switchToMonthView=function(){this.viewStack.unshift(this.view),this.view=r.PickerConstants.PICKER_VIEW_MONTH},t.prototype.switchToYearView=function(){this.viewStack.unshift(this.view),this.view=r.PickerConstants.PICKER_VIEW_YEAR},
t.prototype.switchToTimeView=function(){this.viewStack.unshift(this.view),this.view=r.PickerConstants.PICKER_VIEW_TIME},t.prototype.goBackInView=function(){this.updatePickerData(),this.view=this.viewStack.shift()},t.prototype.$postLink=function(){var t=this;this.buttonLabel=void 0===this.buttonLabel||null==this.buttonLabel?r.PickerConstants.DEFAULT_PICKER_LABEL:this.buttonLabel,this.pickerMode=void 0===this.pickerMode||null==this.pickerMode?r.PickerConstants.DEFAULT_PICKER_MODE:this.pickerMode,this.$timeout(function(){a.BehavioralFixes.registerPopupBindings(t.$element[0]),a.BehavioralFixes.registerKeyBindings(t.$element[0]),t.pickerOnlyMode&&t.$scope.$watch("ctrl.ngModel.$modelValue",function(e,n){t.$timeout(function(){t.currentDate=t.ngModel.$modelValue?moment.tz(t.ngModel.$modelValue,t.getTimezone()):moment.tz(new Date,t.getTimezone()),t.updatePickerData()})})}),this.ngModel.$render=function(){t.innerSelection=t.ngModel.$viewValue},this.ngModel.$parsers.push(function(e){if(""==e)return null;var n=t.endOfDay?moment.tz(e,t.getDateFormat(),t.getTimezone()).endOf("day").toDate():moment.tz(e,t.getDateFormat(),t.getTimezone()).toDate(),r=t.startDate?moment.tz(t.startDate,t.getTimezone()):null,i=t.endDate?moment.tz(t.endDate,t.getTimezone()):null;return r&&moment.tz(n,t.getTimezone()).isBefore(r)&&r.isSame(n,"day")&&r.isSame(n,"month")&&r.isSame(n,"year")?t.startDate:i&&moment.tz(n,t.getTimezone()).isAfter(i)&&i.isSame(n,"day")&&i.isSame(n,"month")&&i.isSame(n,"year")?t.endDate:n}),this.ngModel.$validators.validDate=function(e,n){return!n||moment.tz(n,t.getDateFormat(),t.getTimezone()).isValid()},this.ngModel.$validators.dateRange=function(e,n){if(null==e)return!0;var r=t.timezone||moment.tz.guess(),i=moment.tz(e,r),a=t.startDate?moment.tz(t.startDate,r).startOf("day"):null,o=t.endDate?moment.tz(t.endDate,r).endOf("day"):null,s=!1;return a&&(s=s||i.isBefore(a)),!s&&o&&(s=s||i.isAfter(o)),!s},this.ngModel.$formatters.push(function(e){if(null==e)return"";var n=t.timezone||moment.tz.guess();return moment.tz(e,n).format(t.getDateFormat())}),this.pickerOnlyMode&&this.openPicker()},t}();e._DatePickerController=o}),define("eventPicker/EventPicker",["require","exports","utils/DateUtils","utils/ViewModelBuilder"],function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(){}return t}();i.template=function(){return'\n        <div class="event-picker">\n            <table ng-repeat="datePickerPage in ctrl.pickerPage.months">\n                <thead>\n                     <tr>\n                          <td class="calendarMonth no-link" colspan="8"> {{::datePickerPage.month}} {{::datePickerPage.year}}</td>   \n                    </tr>\n                    <tr>\n                        <td class="calendarWeek">\x3c!-- week of year --\x3e</td>\n                        <td class="dayOfWeek" ng-repeat="dayOfWeek in datePickerPage.dayOfWeek" ng-click="ctrl.selectDate(dayOfWeek)">{{::dayOfWeek}}</td>    \n                    </tr>\n                </thead>\n                <tbody>\n                     <tr ng-repeat="week in datePickerPage.weeks">\n                                <td class="calendarWeek">{{::week.calendarWeek}}</td>\n                                <td class="day {{::day.event.importance}}" ng-repeat="day in week.days" ng-class="{\'outside\': !day.sameMonth, \'invalid\': day.invalid, \'selected\' : ctrl.isSelectedDate(day), \'today\': ctrl.isToday(day), \'noevent\': !day.event , \'event\': day.event }" ng-click="ctrl.selectDate(day)">{{::day.day}}</td>\n                   </tr>    \n                </tbody>\n            </table>\n        </div>\n        '},i.controllerAs="ctrl",i.bindings={timezone:"@",startDate:"<",endDate:"<",events:"<",eventSelected:"&"},i.require={ngModel:"ngModel"};var a=function(){function t(t,e,i){var a=this;this.$scope=t,this.$element=e,this.$timeout=i,this.rangeModelIdx={},t.$watch("ctrl.startDate",function(t,e){t?(a.startDate=t,a.updateRange(a.events)):(a.startDate=moment.tz(n.DateUtils.getTimezone(a.timezone)).startOf("day").toDate(),a.updateRange(a.events))}),t.$watch("ctrl.endDate",function(t,e){t?(a.endDate=t,a.updateRange(a.events)):(a.endDate=moment.tz(n.DateUtils.getTimezone(a.timezone)).endOf("day").toDate(),a.updateRange(a.events))}),t.$watch("ctrl.events",function(t,e){a.updateRange(t),a.rangeModelIdx=r.ViewModelBuilder.buildModelIdx(t,n.DateUtils.getTimezone(a.timezone))},!0)}return t.prototype.updateRange=function(t){this.pickerPage=r.ViewModelBuilder.calculateEventDateView(t,this.startDate,this.endDate,n.DateUtils.getTimezone(this.timezone))},t.prototype.$postLink=function(){var t=this;this.updateRange(this.events),this.ngModel.$parsers.push(function(e){return void 0===e||null==e||""==e?null:moment.tz(e,"DD.MM.YYYY",t.timezone).startOf("day")})},t.prototype.eventPresent=function(t){return this.events?this.rangeModelIdx[t.format("DD.MM.YYYY")]:null},t.prototype.isActive=function(t){var e=moment.tz(this.startDate,this.timezone),n=moment.tz(this.endDate,this.timezone);return t&&t.isBetween(e.subtract(1,"day"),n.add(1,"day"),"day")},t.prototype.isSelectedDate=function(t){if(!this.ngModel.$modelValue)return!1;var e=moment.tz(this.ngModel.$modelValue,this.timezone);return n.DateUtils.isSameDay(e,t.momentDate)},t.prototype.selectDate=function(t){t.event&&(this.ngModel.$setViewValue(t.momentDate.format("DD.MM.YYYY")),this.eventSelected({$event:t.event}),this.updateRange(this.events))},t.prototype.isToday=function(t){return n.DateUtils.isToday(this.timezone,t.momentDate)},t}(),o=function(){function t(){this.template=i.template,this.controllerAs=i.controllerAs,this.bindings=i.bindings,this.require=i.require,this.controller=["$scope","$element","$timeout",a]}return t}();e.EventPicker=o}),define("services/DatePickerService",["require","exports","utils/DatePickerTypes"],function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.prototype.createEventModelValue=function(t,e,r,i){var a=new n.EventModelValue;return a.numberOfEvents=t,a.importance=e,a.day=r,i&&(a.data=i),a},t.prototype.createEventEventModel=function(t){var e=new n.EventModel;return e.data=t,e},t}();e.DatePickerService=r}),define("DatePicker",["require","exports","helperComponents/RangeInput","datePicker/DatePickerView","datePicker/DatePickerController","eventPicker/EventPicker","services/DatePickerService"],function(t,e,n,r,i,a,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(){this.template=r._DatePickerView.template,this.controllerAs=r._DatePickerView.controllerAs,this.bindings=r._DatePickerView.bindings,this.transclude=r._DatePickerView.transclude,this.require=r._DatePickerView.require,this.controller=["$scope","$element","$timeout",i._DatePickerController]}return t}();e.DatePicker=s,angular.module("werpu.bootstrap.picker",[]).component("datePicker",new s).component("internalRangeInput",new n.RangeInput).component("eventPicker",new a.EventPicker).service("datePickerService",o.DatePickerService)});
//# sourceMappingURL=./dist/DatePickerFinal-compressed-amd.js.map
