
declare class EventModelValue {
    numberOfEvents: number;
    importance: string; /*LOW, MEDIUM, HIGH, NONE*/
    data: any;
    day: Date;
}


declare class EventModel {
    /*iso representation of a certain date*/
    data: Array<EventModelValue>;
}


declare class DatePickerService {

    /**
     * creates a single model with the existing interfaces
     *
     * @param numberOfEvents
     * @param importance
     * @param date
     * @param data
     * @returns {EventModelValue}
     */
    createEventModelValue(numberOfEvents: number, importance: string, date: Date, data ?: any): EventModelValue;


    /**
     * creates an entier event model from the given events
     * @param events
     * @returns {EventModel}
     */
    createEventEventModel(events: EventModelValue[]): EventModel;

}