import React from "react";

import { ScrollView } from "react-native-gesture-handler";
import store from "../../redux/store";
import Todolist from "../../components/Todolist";

export default class Todos extends React.Component {
    componentDidMount() {
        store.subscribe(this.forceUpdate.bind(this));
    }
    render() {
        return (
            <ScrollView style={{ padding: 16 }}>
                {store.getState().userState.calendars.map(calendar => {
                    if (
                        calendar.todos.filter(todo => {
                            return !todo.complete;
                        }).length === 0
                    )
                        return null;
                    return <Todolist key={calendar.title} calendar={calendar}></Todolist>;
                })}
            </ScrollView>
        );
    }
}
