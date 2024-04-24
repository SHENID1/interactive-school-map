import "./styles/app.css"
import FButton from "./components/f_button";
import React, {useEffect, useState} from "react";
import ModalInfo from "./components/ModalInfo/ModalInfo";
import Floor from "./components/floors/floor";
import Search from "./components/search/search";
import {Fl} from "./context/fl";
import {Ev} from "./context/ev";
import Timetable from "./components/timetable/timetable";
import MainLoader from "./components/mainloader/main_loader";
import Load from "./api/load";
import {notification} from 'antd';
import Data from "./api/getData"
import Evacuation from "./components/evacuation/evacuation";
import EventRight from "./components/event/eventRightButton";
import {EventContext} from "./context/eventContext";

function App() {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Произошла ошибка загрузки',
            description:
                "Попробуйте перезагрузить страницу или попробуйте позже",
        });
    };

    // imports database
    const dataFour = Data.getData('CabDataFour');
    const dataThree = Data.getData('CabDataThree');
    const dataTwo = Data.getData('CabDataTwo');
    const dataOne = Data.getData('CabDataOne');
    const dataMOne = Data.getData('CabDataMOne');
    const allData = [dataFour, dataThree, dataTwo, dataOne, dataMOne];
    const dataSchemeFour = Data.getData('SchemeFour');
    const dataSchemeThree = Data.getData('SchemeThree');
    const dataSchemeTwo = Data.getData('SchemeTwo');
    const dataSchemeOne = Data.getData('SchemeOne');
    const dataSchemeMOne = Data.getData('SchemeMOne');
    const [modalActive, setModalActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isEventPointVisible, setIsEventPointVisible] = useState(false)
    if (!localStorage.getItem('started_floor')) {
        localStorage.setItem('started_floor', "1"); // начальное состояние - 1 этаж
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (Load.loadData().then((v) => {
            if (v) setIsLoading(false)
            document.title = `${floor} Этаж - Интерактивная карта школы`;
        }, () => {
            document.title = "Ошибка загрузки"
            openNotificationWithIcon('error')
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])
    const [ModalObg, setModalObj] = useState(null);

    // создаем состояние floor и функцию обновления состояния setFloor
    const [floor, setFloor] = useState(Number(localStorage.getItem('started_floor')));
    //                                        ^ берем начальное состояние из локального хранилища на компьютере

    const editFloor = (floor) => {
        setFloor(Number(floor)); // функция, которая изменяет состояние этажа
    }

    function sma(arg) {
        setModalActive(arg);
        setModalObj(null);
    }

    const modal_object = (obj) => {
        setModalActive(true);
        setModalObj(obj);
    }

    useEffect(() => {
        if (isLoading) document.title = "Интерактивная карта школы";
        else document.title = `${floor} Этаж - Интерактивная карта школы`;
        localStorage.setItem('started_floor', floor.toString());
        // eslint-disable-next-line
    }, [floor])

    if (isLoading) return <><MainLoader/>{contextHolder}</>
    return (
        <Fl.Provider value={{
            floor,
            setFloor
        }}>
            <Ev.Provider value={{
                isVisible, setIsVisible
            }}>
                <EventContext.Provider value={{
                    isEventPointVisible, setIsEventPointVisible
                }}>
                    <div className={isLoading ? "none" : "App"}>
                        <div className={"map"} id="map">
                            <Search data={allData} editFloor={editFloor} modal_object={modal_object} fl={floor}/>
                            <div className="rightContainer">
                                <FButton starting_floor={floor} edit={editFloor}/>
                                <Timetable modal_object={modal_object}/>
                                <Evacuation/>
                                <EventRight/>
                            </div>
                            <div className="floors">
                                <Floor num="4" used={floor === 4} cabData={dataFour} SchemeData={dataSchemeFour}
                                       mo={modal_object}/>
                                <Floor num="3" used={floor === 3} cabData={dataThree} SchemeData={dataSchemeThree}
                                       mo={modal_object}/>
                                <Floor num="2" used={floor === 2} cabData={dataTwo} SchemeData={dataSchemeTwo}
                                       mo={modal_object}/>
                                <Floor num="1" used={floor === 1} cabData={dataOne} SchemeData={dataSchemeOne}
                                       mo={modal_object}/>
                                <Floor num="-1" used={floor === -1} cabData={dataMOne} SchemeData={dataSchemeMOne}
                                       mo={modal_object}/>
                            </div>
                            <ModalInfo active={modalActive} sma={sma} dataObj={ModalObg}/>
                        </div>
                    </div>
                </EventContext.Provider>
            </Ev.Provider>
        </Fl.Provider>
    );
}

export default App;