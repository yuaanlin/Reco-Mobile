import RecoEvent from "../../classes/RecoEvent";
import { Animated, PanResponderInstance } from "react-native";

export interface EventListScreenProps {
    navigation: any
}

export interface EventListScreenStates {
    eventToDisplay: Array<RecoEvent>;
    ScrollViewLeft: Animated.Value;
    panResponder: PanResponderInstance;
}
