import React from 'react';
import {useParams} from "react-router-dom";
import EventApi from "../../../api/eventApi";

const EventUpdate = () => {
    const {id} = useParams()
    EventApi.getEventById(id).then((o)=>console.log(o))
    return (
        <div>
            {id}
        </div>
    );
};

export default EventUpdate;