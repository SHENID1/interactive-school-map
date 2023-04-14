import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminPanel from "./components/admin/admin-panel";
// import Appy from "./components/test/antdtest";
import Page404 from "./components/page/404";
// hello world
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/admin/*"} element={<AdminPanel/>}/>
            <Route path={"/"} element={<App/>}/>
            {/*<Route path={"/test"} element={<Appy/>}/>*/}
            <Route path={"*"} element={<Page404/>}/>
        </Routes>
    </BrowserRouter>
);
