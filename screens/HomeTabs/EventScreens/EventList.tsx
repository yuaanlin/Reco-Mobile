import React from "react";
import { Text, View, Animated, Dimensions, PanResponder, Easing } from "react-native";
import { Grid } from "react-native-easy-grid";
import { EventListScreenProps, EventListScreenStates } from "../types";
import RecoEvent from "../../../classes/RecoEvent";
import eventsToDispay from "../../../utils/eventsToday";
import LinearGradient from "expo-linear-gradient/build/LinearGradient";
import store from "../../../redux/store";
import { setSelectedDate } from "../../../redux/selectedDay/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setSelectedEvent } from "../../../redux/selectedEvent/actions";

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

export default class EventList extends React.Component<EventListScreenProps, EventListScreenStates> {
    _panResponder: any;
    screenWidth = Math.round(Dimensions.get("window").width);
    constructor(props: Readonly<EventListScreenProps>) {
        super(props);
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_evt, gestureState) => {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3);
            },
            onPanResponderMove: (_event, gesture) => {
                Animated.timing(this.state.ScrollViewLeft, {
                    toValue: gesture.dx,
                    duration: 0
                }).start();
            },
            onPanResponderRelease: (_event, gesture) => {
                if (gesture.dx > 60) {
                    this.state.ScrollViewLeft.setValue(-this.screenWidth + gesture.dx);
                    var d = store.getState().selectedDay;
                    d.addDays(-1);
                    store.dispatch(setSelectedDate(d));
                    this.setState({ eventToDisplay: eventsToDispay(store.getState().userState.calendars, d) });
                }
                if (gesture.dx < -60) {
                    this.state.ScrollViewLeft.setValue(this.screenWidth - gesture.dx);
                    var d = store.getState().selectedDay;
                    d.addDays(1);
                    store.dispatch(setSelectedDate(d));
                    this.setState({ eventToDisplay: eventsToDispay(store.getState().userState.calendars, d) });
                }
                Animated.timing(this.state.ScrollViewLeft, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.circle)
                }).start();
            }
        });
        this.state = {
            panResponder,
            eventToDisplay: eventsToDispay(store.getState().userState.calendars, store.getState().selectedDay),
            ScrollViewLeft: new Animated.Value(0)
        };
        this.openEventInfo = this.openEventInfo.bind(this);
    }

    openEventInfo(event: RecoEvent) {
        store.dispatch(setSelectedEvent(event));
        this.props.navigation.navigate("Home", {
            screen: "Events",
            params: {
                screen: "EventInfo"
            }
        });
    }

    render() {
        // 重複事件分欄顯示
        var position = new Map<RecoEvent, number>();
        this.state.eventToDisplay.map(theEvent => {
            this.state.eventToDisplay.map(event => {
                if (
                    event !== theEvent &&
                    event.getBeginDistanse() <= theEvent.getBeginDistanse() &&
                    event.getEndDistanse() > theEvent.getBeginDistanse() &&
                    position.get(theEvent) === undefined
                ) {
                    if (position.get(event) === undefined) {
                        if (event.ignore) {
                            position.set(event, 1);
                            position.set(theEvent, 0);
                        } else {
                            position.set(event, 0);
                            position.set(theEvent, 1);
                        }
                    } else if (position.get(event) === 0) {
                        position.set(theEvent, 1);
                    } else if (position.get(event) === 1) {
                        position.set(theEvent, 0);
                    }
                }
                return null;
            });
            return null;
        });

        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View {...this.state.panResponder.panHandlers}>
                    <Animated.ScrollView
                        style={{
                            left: this.state.ScrollViewLeft,
                            width: "80%"
                        }}
                    >
                        <Grid>
                            <Animated.View style={{ width: "100%", paddingTop: 60, paddingBottom: 60 }}>
                                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}></Text>
                                {this.state.eventToDisplay.map(recoEvent => {
                                    return <EventCard openEventInfo={this.openEventInfo} event={recoEvent} key={recoEvent.id} />;
                                })}
                            </Animated.View>
                        </Grid>
                    </Animated.ScrollView>
                </View>
            </View>
        );
    }
}

interface EventCardProps {
    event: RecoEvent;
    openEventInfo(event: RecoEvent): void;
}

class EventCard extends React.Component<EventCardProps> {
    render() {
        var evnet: RecoEvent = this.props.event;
        var IgnoreText = (
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, marginTop: 6 }}>該事件已被忽略，因為{evnet.ignoreReason}</Text>
        );
        return (
            <View
                style={{
                    shadowColor: "#000000",
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    },
                    margin: 16
                }}
            >
                <TouchableOpacity onPress={() => this.props.openEventInfo(this.props.event)}>
                    <LinearGradient
                        colors={this.props.event.color}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={{
                            width: "100%",
                            borderRadius: 10,
                            opacity: this.props.event.ignore ? 0.2 : 1
                        }}
                    >
                        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", marginStart: 6, padding: 18 }}>
                            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: "bold" }}>
                                {evnet.getDurationString()}
                            </Text>
                            <Text style={{ color: "rgba(255,255,255,1)", fontSize: 18, marginTop: 6, fontWeight: "bold" }}>
                                {evnet.title}
                            </Text>
                            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 6, fontWeight: "bold" }}>
                                {evnet.calendarTitle}
                            </Text>
                            {evnet.ignore ? IgnoreText : null}
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}
