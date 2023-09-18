import React, {useContext, useEffect} from 'react';
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
import EventAdminMain from "./event/eventAdminMain";
import EventCreate from "./event/eventCreate";


const AdminPanel = () => {
    document.title = "Панель Администратора";
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')){
            store.checkAuth()
        }
    }, [store])

    if (!store.isAuth){
        return <Login/>
    }
    if (localStorage.getItem('remember') !== null){
        localStorage.setItem('remember', Number(localStorage.getItem('remember')) + 1)
        if (localStorage.getItem('remember') >= 2){
            store.logout()
            localStorage.removeItem('remember')
            return <Login/>
        }
    }
    return (

        <Routes>
            <Route path="/" element={<ElLayout/>}>
                <Route index element={<Homepage/>}/>
                <Route path="timetable" element={<TtMain/>}/>
                <Route path="cab-data" element={<CdMain/>}/>
                <Route path="evacuation" element={<EvMain/>}/>
                <Route path="scheme" element={<SchemeMain/>}/>
                <Route path="event" element={<EventAdminMain/>}/>
                <Route path="event/create/:floor/:x/:y" element={<EventCreate/>}/>
                <Route path="event/create" element={<EventCreate/>}/>
            </Route>
        </Routes>
    );
};
export default observer(AdminPanel);