import RecoEvent from "../../classes/RecoEvent";
import { Animated, PanResponderInstance } from "react-native";

export interface EventsScreenProps {}

export interface EventsScreenStates {
    eventToDisplay: Array<RecoEvent>;
    ScrollViewLeft: Animated.Value;
    panResponder: PanResponderInstance;
}
