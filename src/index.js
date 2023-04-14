import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminPanel from "./components/admin/admin-panel";
import Page404 from "./components/page/404";
import Store from "./store/store";
// import Appy from "./components/test/antdtest";

const store = new Store();

export const Context = createContext({
    store,
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        store
    }}>
    <BrowserRouter>
        <Routes>
            <Route path={"/admin/*"} element={<AdminPanel/>}/>
            <Route path={"/"} element={<App/>}/>
            {/*<Route path={"/test"} element={<Appy/>}/>*/}
            <Route path={"*"} element={<Page404/>}/>
        </Routes>
    </BrowserRouter>
    </Context.Provider>
);
