import { createStore } from "redux";
import AppStates from "./reducers";

let store = createStore(AppStates);

export default store;