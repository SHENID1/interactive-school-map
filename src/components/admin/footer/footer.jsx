import React from 'react';
import cl from "./style.module.css"
import {Link} from "react-router-dom";
const Footer = () => {
    return (
        <footer className={cl.main}>
            <div className={cl.h1}>
                Интерактивная карта школы
            </div>
            <div className={cl.container}>
                <div className={cl.column}>
                    <div className={cl.header_column}>
                        <b>Для пользователей:</b>
                    </div>
                    <div className={cl.text}>
                        <Link to={"/"} className={cl.text}>Открыть карту</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;