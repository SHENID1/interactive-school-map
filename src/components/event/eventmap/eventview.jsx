import React, {useContext, useEffect, useState} from 'react';
import {Fl} from "../../../context/fl";
import EventApi from "../../../api/eventApi";
import EventPoint from "./eventpoint";
import {EventContext} from "../../../context/eventContext";

const EventView = ({mo}) => {
    const {floor} = useContext(Fl);
    const {isEventPointVisible} = useContext(EventContext);
    const [data, setData] = useState([])
    useEffect(() => {
        EventApi.getEventsByFloor(floor).then(setData).catch(alert)

    }, [floor]);
    // console.log(data)
    const onClick = (data) => {
        data.type = 4
        data.manager = []
        mo(data)
    }
    if (!isEventPointVisible) return <></>
    return (
        <>
            {data.map((el) => <EventPoint key={el._id} data={el} handler={onClick}/>)}
        </>
    );
};

export default EventView;