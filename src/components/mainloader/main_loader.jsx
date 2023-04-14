import React from 'react';
import {Spin} from "antd";
import cl from "./loader.module.css";

const MainLoader = () => {
    return (
        <div className={cl.container}>
            <Spin tip="Загрузка..."/>
        </div>
    );
};

export default MainLoader;