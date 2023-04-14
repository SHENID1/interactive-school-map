import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import ElLayout from "./Layout";
import TtMain from "./timetable/tt-main"
import CdMain from "./cabdata/cd-main";
import EvMain from "./evacuation/ev-main";
import SchemeMain from "./scheme/scheme-main";
import Homepage from "./homepage";
import Login from "./login/login";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const AdminPanel = () => {
    document.title = "Панель Администратора";
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [])

    if (!store.isAuth){
        return <Login/>
    }
    return (

        <Routes>
            <Route path="/" element={<ElLayout/>}>
                <Route index element={<Homepage/>}/>
                <Route path="timetable" element={<TtMain/>}/>
                <Route path="cab-data" element={<CdMain/>}/>
                <Route path="evacuation" element={<EvMain/>}/>
                <Route path="scheme" element={<SchemeMain/>}/>
            </Route>
        </Routes>
    );
};
export default observer(AdminPanel);