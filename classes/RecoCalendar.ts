import RecoEvent from "./RecoEvent";
import RecoRepeat from "./RecoRepeat";
import RecoTodo from "./RecoTodo";

const defaultCalendar: RecoCalendar = {
    title: "",
    color: ["#ffffff", "#ffffff"],
    label: "",
    events: [],
    repeats: [],
    todos: []
};

export default class RecoCalendar {
    /** 行事曆標題 */
    title: string;
    /** 預設色彩 */
    color: Array<string>;
    label: string;
    /** 事件列表 */
    events: Array<RecoEvent>;
    /** 重複事件列表 */
    repeats: Array<RecoRepeat>;
    /** 待辦事項列表 */
    todos: Array<RecoTodo>;

    constructor(JSONObject: RecoCalendar = defaultCalendar) {
        if (JSONObject.todos === undefined) JSONObject.todos = new Array<RecoTodo>();

        this.title = JSONObject.title;
        this.color = JSONObject.color;
        this.label = this.title;
        this.events = JSONObject.events.map(event => {
            event.calendarTitle = this.title;
            return new RecoEvent(event);
        });
        this.todos = JSONObject.todos.map(todo => {
            todo.calendarTitle = this.title;
            return new RecoTodo(todo);
        });
        this.todos.sort((a, b) => {
            return a.DeadLine.getTime() - b.DeadLine.getTime();
        });
        this.repeats =
            JSONObject.repeats === undefined
                ? []
                : JSONObject.repeats.map(repeat => {
                      repeat.calendarTitle = this.title;
                      return new RecoRepeat(repeat);
                  });
    }
}
