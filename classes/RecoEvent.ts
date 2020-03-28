import generateUUID from "../utils/generateUUID";

export default class RecoEvent {
    startTime: Date;
    endTime: Date;
    location: string;
    description: string;
    id: string;
    calendarTitle: string;
    ignore: boolean;
    ignoreReason: string;
    repeatID: string;
    isEmpty: boolean;
    title: string;
    color: Array<string>;

    constructor(JSONObject: RecoEvent = defaultEvent) {
        this.startTime = new Date(JSONObject.startTime);
        this.endTime = new Date(JSONObject.endTime);
        this.location = JSONObject.location == undefined ? "" : JSONObject.location;
        this.description = JSONObject.description == undefined ? "" : JSONObject.description;
        this.id = JSONObject.id == "" ? generateUUID() : JSONObject.id;
        this.calendarTitle = JSONObject.calendarTitle == undefined ? "" : JSONObject.calendarTitle;
        this.ignore = JSONObject.ignore == undefined ? false : JSONObject.ignore;
        this.ignoreReason = JSONObject.ignoreReason == (undefined || "") ? "" : JSONObject.ignoreReason;
        this.repeatID = JSONObject.repeatID == undefined ? "" : JSONObject.repeatID;
        this.isEmpty = JSONObject.isEmpty;
        this.title = JSONObject.title;
        this.color = JSONObject.color;
    }

    /** 事件開始的時間與當日 0 時相距的分鐘數 */
    getBeginDistanse(): number {
        return this.startTime.getHours() * 60 + this.startTime.getMinutes();
    }
    /** 事件結束的時間與當日 0 時相距的分鐘數 */
    getEndDistanse(): number {
        return this.endTime.getHours() * 60 + this.endTime.getMinutes();
    }

    /** 從當天凌晨到事件開始的分鐘數 */
    getDurationBetweenDayBegin(): number {
        return this.startTime.getHours() * 60 + this.startTime.getMinutes();
    }

    /** 從事件結束到當天結束的分鐘數 */
    getDurationBetweenDayEnd(): number {
        return (23 - this.endTime.getHours()) * 60 + (60 - this.endTime.getMinutes());
    }

    getDuration(): number {
        return Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 60000);
    }

    isAllDayEvent() {
        return this.getDuration() >= 1438;
    }

    getStartTimeSrting() {
        return this.startTime.getHours() + ":" + (this.startTime.getMinutes() < 10 ? "0" : "") + this.startTime.getMinutes();
    }

    getEndTimeSting() {
        return this.endTime.getHours() + ":" + (this.endTime.getMinutes() < 10 ? "0" : "") + this.endTime.getMinutes();
    }

    getDurationString() {
        return this.getStartTimeSrting() + " - " + this.getEndTimeSting();
    }
}

const defaultEvent: RecoEvent = {
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    description: "",
    id: "",
    calendarTitle: "",
    ignore: true,
    ignoreReason: "",
    repeatID: "",
    isEmpty: true,
    title: "",
    color: [""],
    getBeginDistanse(): number {
        return this.startTime.getHours() * 60 + this.startTime.getMinutes();
    },
    getEndDistanse(): number {
        return this.endTime.getHours() * 60 + this.endTime.getMinutes();
    },
    getDurationBetweenDayBegin(): number {
        return this.startTime.getHours() * 60 + this.startTime.getMinutes();
    },
    getDurationBetweenDayEnd(): number {
        return (23 - this.endTime.getHours()) * 60 + (60 - this.endTime.getMinutes());
    },
    getDuration(): number {
        return this.endTime.getHours() * 60 + this.endTime.getMinutes() - this.startTime.getHours() * 60 - this.startTime.getMinutes();
    },
    isAllDayEvent() {
        return this.getDuration() >= 1440;
    },
    getStartTimeSrting() {
        return this.startTime.getHours() + ":" + (this.startTime.getMinutes() < 10 ? "0" : "") + this.startTime.getMinutes();
    },
    getEndTimeSting() {
        return this.endTime.getHours() + ":" + (this.endTime.getMinutes() < 10 ? "0" : "") + this.endTime.getMinutes();
    },
    getDurationString() {
        return this.getStartTimeSrting() + " - " + this.getEndTimeSting();
    }
};