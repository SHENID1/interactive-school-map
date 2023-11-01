import React, {useEffect, useState} from 'react';
import cl from "./style.module.css"
import EventApi from "../../../api/eventApi";
import EventsElement from "./eventsElement";
import {Button, Skeleton} from "antd";
import {Link} from "react-router-dom";
import {ClearOutlined} from "@ant-design/icons";

const EventAdminCreate = () => {
    const [data, setData] = useState(null)
    const [bytes, setBytes] = useState("Загрузка")
    useEffect(() => {
        EventApi.getEvents().then(setData).catch(() => alert("Не удалось загрузить данные"))
        EventApi.getBytes().then(setBytes).catch(() => alert("Сбой в загрузке"))
    }, []);
    const onclick = () => EventApi.clearBytes().then(() => {
        EventApi.getBytes().then(setBytes).catch(() => alert("Сбой в загрузке"))
    })

    const bytesRounded = Math.round(bytes * 100) / 100
    return (
        <div className={cl.wrapper}>
            <h1 className={cl.h1}>События</h1>
            <Button icon={<ClearOutlined />} type="text" onClick={onclick}>Очистить неиспользуемые изображения (Общий вес {bytesRounded} МБ)</Button>
            <div className={cl.wr}>
                <Link to={'create'} className={cl.wr_1}>Создать событие</Link>
            </div>
            {data ? "" :
                <div className={cl.cont}>
                    <Skeleton loading={data} active avatar/>
                    <Skeleton loading={data} active avatar/>
                    <Skeleton loading={data} active avatar/>
                </div>
            }

            <div className={data ? cl.cont : {display: "none"}}>
                {data ? data.map((el) => <EventsElement data={el} key={el._id} />) : <></>}
            </div>
        </div>
    );
};

export default EventAdminCreate;