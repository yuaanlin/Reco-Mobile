import { Text } from "react-native";
import React from "react";

import store from "../redux/store";
import getDayDescription from "../utils/getDayDescription";

export default class HomeScreenTitle extends React.Component {
    componentDidMount() {
        store.subscribe(this.forceUpdate.bind(this));
    }
    render() {
        return <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{getDayDescription(store.getState().selectedDay)}</Text>;
    }
}
