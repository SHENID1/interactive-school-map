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
                <div className={cl.column}>
                    <div className={cl.header_column}>
                        <b>Для Администраторов:</b>
                    </div>
                    <div className={cl.text}>
                        <Link to={"/admin/event"} className={cl.text}>События</Link>
                    </div>
                    <div className={cl.text}>
                        <Link to={"/admin/timetable"} className={cl.text}>Расписание</Link>
                    </div>
                </div>
            </div>
            <div className={cl.copyright}>
                Целью данной работы является создание интерактивной карты школы, которая содержит удобный пользователю функционал для легкого ориентирования внутри здания, с возможностью поиска нужного внутреннего помещения, а также получение дополнительной информации по объекту. Для достижения поставленной цели были выполнены следующие задачи: создание интерактивной карты путем наложения интерактивных элементов поверх статичного изображения; внесение базы данных информации и структурирование ее в разрезе кабинетов; реализация перехода между этажами; создание плана эвакуации, а также внесение правил поведения при чрезвычайных происшествиях; создание инструмента для изменения актуальной информации; создание web и мобильной версии карты.
                Данный проект создан на платформе Node.js (React.js) с использованием языков JavaScript, HTML, CSS. Реализована карта каждого этажа здания с возможностью переключения между этажами с помощью панели управления. На каждом этаже есть возможность по щелчку на элемент кабинета посмотреть информацию о нём: фамилию учителя, ответственного за кабинет, расписание кабинета на текущий день и его панораму. В программе создан поиск кабинета по его номеру или по фамилии учителя. Заложенный алгоритм поиска перебирает данные всех кабинетов, генерируя подсказки под поисковой строкой. Кроме того, в разработанной карте есть режимы просмотра расписания обучающихся Школы по классам и режим эвакуации при пожаре. При включении режима эвакуации на схеме отображаются вспомогательные линии, показывающие движение людей в здании от каждого кабинета согласно утвержденному плану эвакуации.            </div>
        </footer>
    );
};

export default Footer;