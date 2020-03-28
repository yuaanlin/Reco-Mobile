/*
 * action types
 */

import RecoUser from "../../classes/RecoUser";

export const SET_USER_DATA = "SET_USER_DATA";

/*
 * action creators
 */

export function setUserData(data: RecoUser) {
    return { type: SET_USER_DATA, data };
}
