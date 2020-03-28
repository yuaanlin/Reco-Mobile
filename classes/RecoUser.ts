import RecoCalendar from "./RecoCalendar";

export default class RecoUser {
    username: string;
    calendars: Array<RecoCalendar>;

    constructor(JSONObject: RecoUser = defaultRecoUser) {
        this.username = JSONObject.username;
        this.calendars = JSONObject.calendars.map(calendar => {
            return new RecoCalendar(calendar);
        });
    }
}

export const defaultRecoUser: RecoUser = {
    username: "",
    calendars: []
};