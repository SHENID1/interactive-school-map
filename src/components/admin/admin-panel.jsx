import React from 'react';
import {Routes, Route} from "react-router-dom";
import ElLayout from "./Layout";
import TtMain from "./timetable/tt-main"
import CdMain from "./cabdata/cd-main";
import EvMain from "./evacuation/ev-main";
import SchemeMain from "./scheme/scheme-main";
import Homepage from "./homepage";



const AdminPanel = () => {
    document.title = "Панель Администратора";

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
export default AdminPanel;