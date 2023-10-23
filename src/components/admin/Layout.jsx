import React, {useContext} from 'react';
import cl from "./style.module.css";
import logo from "../../images/1566 2022.png";
import {Avatar, Button, Layout, Menu} from 'antd';
import {Link, Outlet} from "react-router-dom";
import {Context} from "../../index";
import Footer from "./footer/footer";
const { Header} = Layout;


const NavOption = [
    {key: 1, label: (<Link to="timetable" >Расписание</Link>)},
    // {key: 2, label: (<Link to="evacuation" >Стрелки эвакуации</Link>)},
    {key: 3, label: (<Link to="scheme" >Схема</Link>)},
    {key: 4, label: (<Link to="cab-data" >Кабинеты</Link>)},
    {key: 5, label: (<Link to="event" >События</Link>)},
]
const ElLayout = () => {
    const {store} = useContext(Context)
    const Exit = () => {
        store.logout()
    };
    return (
        <>
        <Layout>
            <Header className={cl.header}>
                <div className={cl.leftCont}>
                <div className={cl.logo}><img className={cl.logo} alt={""} src={logo}/></div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]} items={NavOption} style={{maxWidth: "600px", borderRadius: "20px"}}/>
                </div>
                <div className={cl.user}>
                    <Avatar style={{ backgroundColor: "#ffc409", verticalAlign: 'middle' }} size="large" gap={4}>
                        {store.user.login}
                    </Avatar>
                    <Button size="middle" className={cl.but} onClick={Exit}>
                        Выйти
                    </Button>
                </div>

            </Header>
            <Outlet/>
            <Footer/>
        </Layout>
        </>
    );
};

export default ElLayout;