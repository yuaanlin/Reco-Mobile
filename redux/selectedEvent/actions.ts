import RecoEvent from "../../classes/RecoEvent";

export const SET_SELECTED_EVENT = "SET_SELECTED_EVENT";

export function setSelectedEvent(data: RecoEvent) {
    return { type: SET_SELECTED_EVENT, data };
}
