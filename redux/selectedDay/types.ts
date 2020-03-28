export const SET_SELECTED_DATE = "SET_SELECTED_DATE";

interface setSelectedDate {
    type: typeof SET_SELECTED_DATE
    data: Date
  }

export type selectedDayActions = setSelectedDate;