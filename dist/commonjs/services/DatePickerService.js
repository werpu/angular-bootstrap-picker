"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DatePickerTypes_1 = require("../utils/DatePickerTypes");
/**
 * factory service which exposes the interfaces used by the picker and needed for the functionality
 */
var DatePickerService = (function () {
    function DatePickerService() {
    }
    /**
     * creates a single model with the existing interfaces
     *
     * @param numberOfEvents
     * @param importance
     * @param date
     * @param data
     * @returns {EventModelValue}
     */
    DatePickerService.prototype.createEventModelValue = function (numberOfEvents, importance, date, data) {
        var retVal = new DatePickerTypes_1.EventModelValue();
        retVal.numberOfEvents = numberOfEvents;
        retVal.importance = importance;
        retVal.day = date;
        if (data) {
            retVal.data = data;
        }
        return retVal;
    };
    /**
     * creates an entier event model from the given events
     * @param events
     * @returns {EventModel}
     */
    DatePickerService.prototype.createEventEventModel = function (events) {
        var retVal = new DatePickerTypes_1.EventModel();
        retVal.data = events;
        return retVal;
    };
    return DatePickerService;
}());
exports.DatePickerService = DatePickerService;
//# sourceMappingURL=DatePickerService.js.map