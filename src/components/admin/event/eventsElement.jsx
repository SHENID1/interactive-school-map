import React from 'react';
import cl from "./style.module.css";
import {ApiUrl} from "../../../api";
import {Link} from "react-router-dom";
import {RightOutlined} from "@ant-design/icons";

function string_to_date(st) {
    let datetime = st.split("T");
    const date = datetime[0].split("-");
    const time = datetime[1].split(":");
    datetime = date.concat(time);
    datetime = datetime.map((el) => Number(el)).splice(0, 5)
    return new Date(...datetime);
}
function isStartedEvent(dateStart, dateEnd, dateNow) {
    if (dateStart < dateNow && dateNow < dateEnd) return 0;
    if (dateStart < dateNow && dateEnd < dateNow) return 1;
    return -1;
}

const EventsElement = ({data, onclick}) => {
    const dateStart = string_to_date(data.dateStart);
    const dateEnd = string_to_date(data.dateEnd);
    const dateNow = new Date();
    const status = isStartedEvent(dateStart, dateEnd, dateNow);

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
                            {status === -1 ? <><div style={{backgroundColor: "#ff8000"}} className={cl.circle}/><b>Не началось</b></> : <></>}
                            {status === 0 ? <><div  style={{backgroundColor: "#14ff00"}} className={cl.circle}/><b>Уже идёт</b></> : <></>}
                            {status === 1 ? <><div  style={{backgroundColor: "#ff0000"}} className={cl.circle}/><b>Завершилось</b></> : <></>}
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