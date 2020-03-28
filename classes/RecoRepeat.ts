import generateUUID from "../utils/generateUUID";

export default class RecoRepeat {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    cycle: string;
    repeatData: number;
    generated: Array<string>;
    calendarTitle: string;
    description: string;
    location: string;

    constructor(JSONObject: RecoRepeat = defaultRepeat) {
        this.id = JSONObject.id == "" ? generateUUID() : JSONObject.id;
        this.name = JSONObject.name;
        this.startDate = new Date(JSONObject.startDate);
        this.endDate = new Date(JSONObject.endDate);
        this.startTime = new Date(JSONObject.startTime);
        this.endTime = new Date(JSONObject.endTime);
        this.cycle = JSONObject.cycle;
        this.repeatData = JSONObject.repeatData;
        this.generated = JSONObject.generated == undefined ? [] : JSONObject.generated;
        this.calendarTitle = JSONObject.calendarTitle;
        this.description = JSONObject.description;
        this.location = JSONObject.location;
    }
}

const defaultRepeat: RecoRepeat = {
    id: "",
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    cycle: "",
    repeatData: 0,
    generated: [],
    calendarTitle: "",
    location: "",
    description: ""
};