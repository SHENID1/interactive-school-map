import React from 'react';
import cl from "./style.module.css";
import logo from "../../images/1566 2022.png";
import {Layout, Menu} from 'antd';
import {Link, Outlet} from "react-router-dom";
const { Header} = Layout;


const NavOption = [
    {key: 1, label: (<Link to="timetable" >Расписание</Link>)},
    {key: 2, label: (<Link to="evacuation" >Стрелки эвакуации</Link>)},
    {key: 3, label: (<Link to="scheme" >Схема</Link>)},
    {key: 4, label: (<Link to="cab-data" >Кабинеты</Link>)}]
const ElLayout = () => {

    return (
        <>
        <Layout>
            <Header className="header">
                <div className={cl.logo}><img className={cl.logo} alt={""} src={logo}/></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]} items={NavOption}/>
            </Header>
            <Outlet/>
        </Layout>
        </>
    );
};

export default ElLayout;