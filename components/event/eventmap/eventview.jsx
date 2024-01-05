import React, {useContext, useEffect, useState} from 'react';
import {Fl} from "../../../context/fl";
import EventApi from "../../../api/eventApi";
import EventPoint from "./eventpoint";
import {EventContext} from "../../../context/eventContext";
import {View, StyleSheet} from "react-native";
import axios from "axios";

const EventView = ({mo}) => {
    const {floor} = useContext(Fl);
    const {isEventPointVisible} = useContext(EventContext);
    const [data, setData] = useState([])

    useEffect(() => {
        EventApi.getEventsByFloor(floor).then((res) => {
            return res
        }).then(data => {
            setData(data)
        })
    }, [floor]);

    const onClick = (data) => {
        data.type = 4
        data.manager = []
        mo(data)
        // console.log(data)
    }
    // console.log(data)
    if (!isEventPointVisible) return <></>

    return (
        <>
            <View style={styles.eventList}>
                {data.map((el) => <EventPoint key={el._id} data={el} handler={onClick}/>)}
            </View>
        </>
    );
};

export default EventView;

const styles = StyleSheet.create({
    eventList: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
    },
})