import React from 'react';
import dayjs from "dayjs";
import EventApi from "../../../api/eventApi";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import Svg, { G, Rect, Path} from "react-native-svg";

const X_c = -25;
const Y_c = -55;
const EventPoint = ({data, handler}) => {
    const dateStart = dayjs(data.dateStart).toDate();
    const dateEnd = dayjs(data.dateEnd).toDate();
    const dateNow = new Date();
    const status = EventApi.isStartedEvent(dateStart, dateEnd, dateNow);
    if (status === 1) return <></>
    return (
        // <  className={cl.point} >
        <TouchableOpacity onPress={() => handler(data)}>
            <View style={[{left: data.x + X_c, top: data.y + Y_c, position: "absolute"}, styles.point]}>
                <Svg style={styles.svg} width="50px" height="70px" viewBox="0 0 48 48"
                     xmlns="http://www.w3.org/2000/svg"
                     fill={data.color}>
                    <G strokeWidth="0px"></G>
                    <G strokeLinecap="round" strokeLinejoin="round"></G>
                    <G>
                        <G>
                            <G>
                                <Rect width="48px" height="48px" fill="none"></Rect>
                            </G>
                            <G>
                                <Path
                                    d="M24,4a12,12,0,0,0-2,23.8V42a2,2,0,0,0,4,0V27.8A12,12,0,0,0,24,4Zm0,16a4,4,0,1,1,4-4A4,4,0,0,1,24,20Z"></Path>
                            </G>
                        </G>
                    </G>
                </Svg>
            </View>
        </TouchableOpacity>
        // </>
    );
};

export default EventPoint;

const styles = StyleSheet.create({
    point: {
        cursor: "pointer",
        zIndex: 100,
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: 20,
    },
    svg: {
        borderRadius: 15,
    },
})