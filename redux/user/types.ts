import RecoUser from "../../classes/RecoUser";
import { setUserData } from "./actions";

export const SET_USER_DATA = "SET_USER_DATA";

interface setUserData {
    type: typeof SET_USER_DATA
    data: RecoUser
  }

export type userActions = setUserData;