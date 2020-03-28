import { combineReducers } from "redux";
import { SET_USER_DATA } from "./user/actions";
import RecoUser, { defaultRecoUser } from "../classes/RecoUser";
import { userActions } from "./user/types";
import { selectedDayActions, SET_SELECTED_DATE } from "./selectedDay/types";
import { selectedEventActions } from "./selectedEvent/types";
import { SET_SELECTED_EVENT } from "./selectedEvent/actions";
import RecoEvent from "../classes/RecoEvent";

function selectedEvnet(state: RecoEvent, action: selectedEventActions) {
    if (action.data === undefined) return new RecoEvent();

    switch (action.type) {
        case SET_SELECTED_EVENT:
            return action.data;
        default:
            return state;
    }
}

function selectedDay(state: Date, action: selectedDayActions) {
    if (action.data === undefined) return new Date();

    switch (action.type) {
        case SET_SELECTED_DATE:
            return action.data;
        default:
            return state;
    }
}

function userState(state: RecoUser, action: userActions) {
    if (action.data === undefined) return defaultRecoUser;

    switch (action.type) {
        case SET_USER_DATA:
            return action.data;
        default:
            return state;
    }
}

const appStates = combineReducers({
    userState,
    selectedDay,
    selectedEvnet
});

export default appStates;
