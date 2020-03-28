import generateUUID from "../utils/generateUUID";

export default class RecoTodo {
    id: string;
    name: string;
    DeadLine: Date;
    calendarTitle: string;
    description: string;
    color: Array<String>;
    complete: boolean;

    constructor(JSONObject: RecoTodo = defaultTodo) {
        this.id = JSONObject.id === "" ? generateUUID() : JSONObject.id;
        this.name = JSONObject.name;
        this.DeadLine = new Date(JSONObject.DeadLine);
        this.calendarTitle = JSONObject.calendarTitle;
        this.description = JSONObject.description;
        this.color = JSONObject.color;
        this.complete = JSONObject.complete;
    }
}

const defaultTodo: RecoTodo = {
    id: "",
    name: "",
    DeadLine: new Date(),
    calendarTitle: "",
    description: "",
    color: [],
    complete: false
};