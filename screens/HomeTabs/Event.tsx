import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EventList from "./EventScreens/EventList";
import EventInfo from "./EventScreens/EventInfo";

// create custom transitioner without the opacity animation, ie. for iOS
function forVertical(props) {
    const { layout, position, scene } = props;

    const index = scene.index;
    const height = layout.initHeight;

    const translateX = 0;
    const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0]
    });

    return {
        transform: [{ translateX }, { translateY }]
    };
}

export default class Event extends React.Component {
    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Navigator mode="modal" headerMode="none">
                <Stack.Screen name="EventList" component={EventList} />
                <Stack.Screen name="EventInfo" component={EventInfo} />
            </Stack.Navigator>
        );
    }
}
