import { SET_SELECTED_EVENT } from "./actions";
import RecoEvent from "../../classes/RecoEvent";

interface setSelectedEvent {
    type: typeof SET_SELECTED_EVENT
    data: RecoEvent
  }

export type selectedEventActions = setSelectedEvent;