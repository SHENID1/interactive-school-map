import React from 'react';
import EventAdminCreate from "./eventAdminCreate";
import cl from "./style.module.css";

const EventAdminMain = (props) => {

    return (
        <div className={cl.wrapper}>
            <EventAdminCreate/>
        </div>
    );
};

export default EventAdminMain;