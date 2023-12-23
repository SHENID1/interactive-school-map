import React from 'react';
import cl from "./style.module.css";
import dayjs from "dayjs";
import EventApi from "../../../api/eventApi";

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
        <div className={cl.point} style={{left: data.x + X_c, top: data.y + Y_c, position: "absolute"}}
             onClick={() => handler(data)}>
            {/*<svg className={cl.svg} width="30" height="50px" viewBox={`0 0 20 20`} xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path*/}
            {/*        d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"*/}
            {/*        stroke={data.color} fill={data.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*    <path*/}
            {/*        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"*/}
            {/*        stroke={"#000000"} fill={"#eeeeee"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>*/}
            {/*</svg>*/}
            <svg className={cl.svg} width="50" height="70px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
                 fill={data.color}>
                <g strokeWidth="0"></g>
                <g strokeLinecap="round" strokeLinejoin="round"></g>
                <g><title>{data.name}</title>
                    <g>
                        <g>
                            <rect width="48" height="48" fill="none"></rect>
                        </g>
                        <g>
                            <path
                                d="M24,4a12,12,0,0,0-2,23.8V42a2,2,0,0,0,4,0V27.8A12,12,0,0,0,24,4Zm0,16a4,4,0,1,1,4-4A4,4,0,0,1,24,20Z"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        // </>
    );
};

export default EventPoint;