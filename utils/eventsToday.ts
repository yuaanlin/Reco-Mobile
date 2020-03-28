import RecoCalendar from "../classes/RecoCalendar";
import RecoEvent from "../classes/RecoEvent";

export default function eventsToDispay(calendars: Array<RecoCalendar>, date: Date) {
    var eventsToDispay: Array<RecoEvent> = [];
    calendars.map(calendar => {
        calendar.events.map(event => {
            event = new RecoEvent(event);
            if (
                event.startTime.getFullYear() === date.getFullYear() &&
                event.startTime.getMonth() === date.getMonth() &&
                event.startTime.getDate() === date.getDate() &&
                !event.isAllDayEvent()
            ) {
                eventsToDispay.push(event);
            }

            return null;
        });

        return null;
    });
    eventsToDispay.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    return eventsToDispay;
}