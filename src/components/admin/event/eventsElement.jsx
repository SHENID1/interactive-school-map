import React from 'react';
import cl from "./style.module.css";
import {ApiUrl} from "../../../api";
import {Link} from "react-router-dom";
import {RightOutlined} from "@ant-design/icons";
import EventApi from "../../../api/eventApi";
import dayjs from "dayjs";


const EventsElement = ({data, onclick}) => {
    const dateStart = dayjs(data.dateStart).toDate();
    const dateEnd = dayjs(data.dateEnd).toDate();
    const dateNow = new Date();
    const status = EventApi.isStartedEvent(dateStart, dateEnd, dateNow);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };
    const des = data.description;

    return (
        <Link to={`events/${data._id}`} color={"#000000"}>
            <div className={cl.event_link} style={{border: `2px solid ${data.color}`}} onClick={() => onclick(data)}>
                <img height={80} className={cl.icon_Image} src={ApiUrl + `/${data.image}`} alt=""/>
                <div className={cl.right_row}>
                    <div className={cl.c1}>
                        <h2><b>{data.name}</b></h2>
                        <div className={cl.text_des}>{des}</div>
                    </div>
                    <div className={cl.c2}>
                        <div className={cl.c2_start}>
                            <b>Время Начала:</b> {dateStart.toLocaleDateString("ru-RU", options)}
                        </div>
                        <div className={cl.st_span}>
                            {status === -1 ? <>
                                <div style={{backgroundColor: "#ff8000"}} className={cl.circle}/>
                                <b>Не началось</b></> : <></>}
                            {status === 0 ? <>
                                <div style={{backgroundColor: "#14ff00"}} className={cl.circle}/>
                                <b>Уже идёт</b></> : <></>}
                            {status === 1 ? <>
                                <div style={{backgroundColor: "#ff0000"}} className={cl.circle}/>
                                <b>Завершилось</b></> : <></>}
                        </div>
                        <div className={cl.c2_end}>
                            <b>Время завершения:</b> {dateEnd.toLocaleDateString("ru-RU", options)}
                        </div>
                    </div>
                    <div className={cl.c3}>
                        <div className="1"><b>Этаж:</b> {data.floor}</div>
                        <div className="2"><b>X:</b> {data.x}</div>
                        <div className="3"><b>Y:</b> {data.y}</div>
                    </div>
                    <div className={cl.c4}>
                        <div className={cl.c4_text}>Открыть</div>
                        <RightOutlined/>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventsElement;