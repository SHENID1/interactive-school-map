import React, {useContext} from 'react';
import cl from "./style.module.css"
import EventIcon from "../../images/icons/Event_icon.svg"
import {EventContext} from "../../context/eventContext";
// import EventInfo from "./eventInfo";


const EventRight = () => {
    const {isEventPointVisible, setIsEventPointVisible} = useContext(EventContext);

    return (
        <>
            <div className={isEventPointVisible ? cl.icon_active : cl.icon}
                 onClick={() => setIsEventPointVisible(!isEventPointVisible)}>
                <img alt="" src={EventIcon} className={cl.img}/>
            </div>
            {/*<EventInfo isOpen={openEvent} setIsOpen={setOpenEvent}/>*/}
        </>
    );
};

export default EventRight;