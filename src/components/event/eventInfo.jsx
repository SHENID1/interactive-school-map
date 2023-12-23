import React, {useEffect, useState} from 'react';
import cl from "./style.module.css"
import {Button, Skeleton} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import EventsElement from "../admin/event/eventsElement";
import EventApi from "../../api/eventApi";

const EventInfo = ({isOpen, setIsOpen}) => {
    const [data, setData] = useState(false)
    useEffect(() => {
        EventApi.getEvents().then(setData).catch(() => alert("Не удалось загрузить данные"))
    }, []);
    if (!isOpen) return <></>
    return (
        <div className={cl.wrap}>
            <Button icon={<CloseOutlined/>} className={cl.close_button} size={"large"} onClick={()=>setIsOpen(!isOpen)}>Закрыть</Button>
            <h1>Список Событий</h1>
            <div className={cl.grid} >
                {data ? "" :
                    <div className={cl.cont}>
                        <Skeleton loading={!data} active avatar/>
                        <Skeleton loading={!data} active avatar/>
                        <Skeleton loading={!data} active avatar/>
                    </div>
                }
                <div style={data ? {} : {display: "none"}}>
                    {data ? data.map((el) => <EventsElement data={el} key={el._id} />) : <></>}
                </div>
            </div>
        </div>
    );
};

export default EventInfo;