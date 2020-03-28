export const SET_DATE = "SET_DATE";

export function setSelectedDate(data: Date) {
    return { type: SET_DATE, data };
}
