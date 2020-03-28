import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Todos from "./HomeTabs/Todos";
import Events from "./HomeTabs/Events";

export default class Home extends React.Component {
    render() {
        const Tab = createBottomTabNavigator();

        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string;
                        if (route.name === "Todos") iconName = focused ? "ios-checkbox" : "ios-checkbox-outline";
                        else if (route.name === "Events") iconName = focused ? "ios-list-box" : "ios-list";
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                })}
                tabBarOptions={{
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray"
                }}
            >
                <Tab.Screen name="Todos" component={Todos} />
                <Tab.Screen name="Events" component={Events} />
            </Tab.Navigator>
        );
    }
}
