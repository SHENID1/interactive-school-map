import React from 'react';
import {App, Result} from 'antd';
import {Link} from "react-router-dom";
import cl from "./style.module.css";
const Page404 = () => {
    document.title = "404 - Не найдено"
    return (
        <App>
            <Result
                status="404"
                title="404"
                subTitle="Извините, страница, которую вы посетили, не существует."
                extra={<Link className={cl.button} to={'/'}>Открыть карту</Link>}
            />
        </App>
    );
};

export default Page404;