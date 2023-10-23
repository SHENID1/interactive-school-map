import React, {useEffect, useState} from 'react';
import cl from "./style.module.css"
import EventApi from "../../../api/eventApi";
import EventsElement from "./eventsElement";
import {Skeleton} from "antd";
import {Link} from "react-router-dom";

const EventAdminCreate = () => {
    const [data, setdata] = useState(null)
    useEffect(() => {
        EventApi.getEvents().then((res) => setdata(res)).catch(() => alert("Не удалось загрузить данные"))
    }, []);
    const onclick = (data) => {
        console.log(data._id)
    }

    return (
        <div className={cl.wrapper}>
            <h1 className={cl.h1}>События</h1>
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
                {data ? data.map((el) => <EventsElement data={el} key={el._id} onclick={onclick}/>) : <></>}
            </div>
        </div>
    );
};

export default EventAdminCreate;