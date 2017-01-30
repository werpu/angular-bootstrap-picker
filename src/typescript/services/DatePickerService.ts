import {EventModelValue, Importance, EventModel} from "../utils/DatePickerTypes";
/**
 * factory service which exposes the interfaces used by the picker and needed for the functionality
 */
export class DatePickerService {

    /**
     * creates a single model with the existing interfaces
     *
     * @param numberOfEvents
     * @param importance
     * @param date
     * @param data
     * @returns {EventModelValue}
     */
    createEventModelValue(numberOfEvents: number, importance: string, date: Date, data ?: any): EventModelValue {
        var retVal = new EventModelValue();
        retVal.numberOfEvents = numberOfEvents;
        retVal.importance = <Importance> importance;
        retVal.day = date;
        if (data) {
            retVal.data = data;
        }
        return retVal;
    }

    /**
     * creates an entier event model from the given events
     * @param events
     * @returns {EventModel}
     */
    createEventEventModel(events: EventModelValue[]): EventModel {
        var retVal = new EventModel();
        retVal.data = events;
        return retVal;
    }

}