import React from "react";
import { View, Text } from "react-native";
import store from "../../../redux/store";
import { LinearGradient } from "expo-linear-gradient";

export default class EventInfo extends React.Component {
    render() {
        const selectedEvent = store.getState().selectedEvnet;
        return (
            <View style={{ padding: 32 }}>
                <LinearGradient
                    colors={selectedEvent.color}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                        borderRadius: 4,
                        marginTop: 16,
                        marginBottom: 16,
                        width: selectedEvent.calendarTitle.length * 24
                    }}
                >
                    <View style={{ padding: 8, marginStart: 8, backgroundColor: "rgba(0,0,0,0.3)" }}>
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>{selectedEvent.calendarTitle}</Text>
                    </View>
                </LinearGradient>
                <Text style={{ fontSize: 24, color: "white", fontWeight: "bold" }}>{selectedEvent.title}</Text>
            </View>
        );
    }
}
