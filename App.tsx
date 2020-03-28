import React from "react";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AppearanceProvider } from "react-native-appearance";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();

import store from "./redux/store";
import RecoUser from "./classes/RecoUser";
import { Alert, StatusBar } from "react-native";
import { setUserData } from "./redux/user/actions";
import HomeScreenTitle from "./components/HomeScreenTitle";

export default class App extends React.Component {
    async componentDidMount() {
        store.subscribe(this.forceUpdate.bind(this));
        try {
            const data = await (await fetch("https://us-central1-reco-565ab.cloudfunctions.net/api/userdata/ken20001207")).json();
            var userdata = new RecoUser(data);
            store.dispatch(setUserData(userdata));
        } catch (error) {
            Alert.alert("Fetching Data Failed", error);
        }
    }

    render() {
        return (
            <AppearanceProvider>
                <StatusBar barStyle="light-content" />
                <NavigationContainer theme={DarkTheme}>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={{
                                headerTitle: () => <HomeScreenTitle />,
                                headerStyle: {
                                    backgroundColor: "black",
                                    height: 72
                                }
                            }}
                        />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Settings" component={Settings} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        );
    }
}
