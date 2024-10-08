import React, {useContext, useEffect} from 'react';
import './ModalInfo.css';
import cl from './ModalInfo.module.css';
import {Fl} from "../../context/fl";
import Data from "../../api/getData"
import Timetable from "../../api/timetable";
import DateFunctions from "../../api/Day";
import dayjs from "dayjs";
import EventApi from "../../api/eventApi";
import {ApiUrl} from "../../api";


function getTimeTable(id) {
    let now = new Date();
    const getDay = now.getDay();
    // const getDay = 4;
    let date = {};
    switch (getDay) {
        case (0):
            date = Data.getData('TimetableSunday')
            break;
        case (1):
            date = Data.getData('TimetableMonday')
            break;
        case (2):
            date = Data.getData('TimetableTuesday')
            break;
        case (3):
            date = Data.getData('TimetableWednesday')
            break;
        case (4):
            date = Data.getData('TimetableThursday')
            break;
        case (5):
            date = Data.getData('TimetableFriday')
            break;
        case (6):
            date = Data.getData('TimetableSaturday')
            break;
        default:
            return ErrorEvent
    }
    // console.log(date);
    let timeTable = [
        {lessonTime: "08:40 - 09:25", subject: "Не найдено", i: 1},
        {lessonTime: "09:35 - 10:20", subject: "Не найдено", i: 2},
        {lessonTime: "10:40 - 11:25", subject: "Не найдено", i: 3},
        {lessonTime: "11:35 - 12:20", subject: "Не найдено", i: 4},
        {lessonTime: "12:30 - 13:15", subject: "Не найдено", i: 5},
        {lessonTime: "13:35 - 14:20", subject: "Не найдено", i: 6},
        {lessonTime: "14:40 - 15:25", subject: "Не найдено", i: 7},
        {lessonTime: "15:35 - 17:00", subject: "Не найдено", i: 8},
    ]
    for (let i = 0; i < date.length; i++) {
        for (let t = 0; t < date[i].timetable.length; t++) {
            if (id === date[i].timetable[t].id) {
                let h = date[i].timetable[t];
                timeTable[h.num - 1].subject = +date[i].num + date[i].letter + " " + h.subject;
                if (h.group) {
                    timeTable[h.num - 1].subject = date[i].num + date[i].letter + " (" + h.group + ")гр. " + h.subject;
                }
                if (h.time !== "" && h.time !== undefined) {
                    timeTable[h.num - 1].lessonTime = h.time;
                }
            }
        }
    }
    return timeTable
}


const ModalInfo = (props) => {
    const {floor, setFloor} = useContext(Fl);
    useEffect(() => {
        if (!props.dataObj) return
        if (props.dataObj.floor !== floor) setFloor(props.dataObj.floor);
    }, [props.dataObj, floor, setFloor])
    if (!props.dataObj) {
        return (
            <div className="none">
                <div className="out"></div>
            </div>
        )
    }

    let des = props.dataObj.description;
    let numCab = des;
    let teacher = props.dataObj.manager.join(' ');
    if (props.dataObj.name !== '') {
        numCab = props.dataObj.name;
    }

    // console.log(getTimeTable(70))
    let info = <></>;
    if (props.dataObj.type === 1) { // кабинет
        let img = <></>
        let ImageUrl = `${ApiUrl}/${props.dataObj.imgName}`
        if (props.dataObj.imgName) {
            img = <img src={ImageUrl} alt={""} height={"auto"}
                       width={"100%"}/>
        }

        info =
            <>
                {img}
                <h1>{numCab}</h1>
                <div className="span">
                    <div className="t1">Учитель:</div>
                    <div className="t2">{teacher}</div>
                    <div className="t3">Учитель:</div>
                </div>
                <div className="span">
                    <div className="t1">Описание:</div>
                    <div className="t2">{des}</div>
                    <div className="t3">Описание:</div>
                </div>
                {/*<div className="span">*/}
                {/*    <div className="t1">id:</div>*/}
                {/*    <div className="t2">{props.dataObj.id}</div>*/}
                {/*    <div className="t3">id:</div>*/}
                {/*</div>*/}
                <div className="rasp">
                    <table>
                        <thead>
                        <tr id={"main"}>
                            <td>Расписание на сегодня ({Timetable.getDay()})</td>
                        </tr>
                        </thead>
                        <tbody>
                        {getTimeTable(props.dataObj.id).map(les =>
                            <tr className={"tr1"} key={les.i}>
                                <td id={"first"}>{les.i} урок <span className="lessDec">({les.lessonTime})</span></td>
                                <td className={"r100"}>
                                    <div className="r100b">{les.subject}</div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </>
    }
    if (props.dataObj.type === 3) {
        info =
            <>

                <h1>Столовая</h1>
                <div className="span">
                    <div className="t1">Этаж</div>
                    <div className="t2">{props.dataObj.floor}</div>
                    <div className="t3">Этаж</div>
                </div>

                <div className="rasp">
                    <table>
                        <thead>
                        <tr id="main">
                            <td>Расписание на сегодня ({Timetable.getDay()})</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="tr1" id="stolovay">
                            <td id="first">1 переменна <span className="lessDec">(09:25 - 09:35)</span></td>
                            <td className="r100">
                                <div className="r100b">Завтрак (6 - 8)</div>
                            </td>
                        </tr>
                        <tr className="tr1" id="stolovay">
                            <td id="first">2 переменна <span className="lessDec">(10:20 - 10:40)</span></td>
                            <td className="r100">
                                <div className="r100b">Завтрак (9 - 11)</div>
                            </td>
                        </tr>
                        <tr className="tr1" id="stolovay">
                            <td id="first">3 переменна <span className="lessDec">(11:25 - 11:35)</span></td>
                            <td className="r100">
                                <div className="r100b"></div>
                            </td>
                        </tr>
                        <tr className="tr1" id="stolovay">
                            <td id="first">4 переменна <span className="lessDec">(12:20 - 12:30)</span></td>
                            <td className="r100">
                                <div className="r100b"></div>
                            </td>
                        </tr>
                        <tr className="tr1" id="stolovay">
                            <td id="first">5 переменна <span className="lessDec">(13:15 - 13:35)</span></td>
                            <td className="r100">
                                <div className="r100b">Обед (6 - 8)</div>
                            </td>
                        </tr>
                        <tr className="tr1" id="stolovay">
                            <td id="first">6 переменна <span className="lessDec">(14:20 - 14:40)</span></td>
                            <td className="r100">
                                <div className="r100b">Обед (9 - 11)</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </>
    }
    const data = props.dataObj
    if (props.dataObj.type === 4) {
        // console.log(data);
        let img = <></>
        let ImageUrl = `${ApiUrl}/${data.image}`
        if (data.image) img = <img src={ImageUrl} alt="" className={cl.img}/>
        const dateStart = dayjs(data.dateStart).toDate();
        const dateEnd = dayjs(data.dateEnd).toDate();
        const dateNow = new Date();
        const status = EventApi.isStartedEvent(dateStart, dateEnd, dateNow);
        info =
            <div>
                {img}
                <h1>{numCab}</h1>
                {status === -1 ? <>
                    <div style={{backgroundColor: "#ffc68e"}} className={cl.despan}>
                        <b>Не началось</b>
                    </div>
                </> : <></>}
                {status === 0 ? <>
                    <div style={{backgroundColor: "#14ff00"}} className={cl.despan}>
                        <b>Уже идёт</b></div>
                </> : <></>}
                {status === 1 ? <>
                    <div style={{backgroundColor: "#ff0000"}} className={cl.despan}>
                        <b>Завершилось</b></div>
                </> : <></>}
                <div className={cl.despan}>
                    <div className={cl.t2}>{des}</div>
                </div>
                <div className={cl.span}>
                    <div className={cl.t1}>Время начала:</div>
                    <div className={cl.t2}>{dateStart.toLocaleDateString("ru-RU", DateFunctions.options)}</div>
                    <div className={cl.t3}>Время нача</div>
                </div>
                <div className={cl.span}>
                    <div className={cl.t1}>Время окончания:</div>
                    <div className={cl.t2}>{dateEnd.toLocaleDateString("ru-RU", DateFunctions.options)}</div>
                    <div className={cl.t3}>Время окончан</div>
                </div>
                <div className={cl.span}>
                    <div className={cl.t1}>Местоположение</div>
                    <div className={cl.t2}>{data.floor} Этаж, X:{data.x} Y:{data.y} </div>
                    <div className={cl.t3}>Местоположение</div>
                </div>
            </div>
    }


    return (
        <div className={[props.active ? "active" : "none", ' '].join(' ')} onClick={() => props.sma(false)}>
            <div id={props.active ? "activeAnimation" : "out"} className="modal" style={data.color ? {
                borderColor: props.dataObj.color,
                borderStyle: "SOLID",
                borderWidth: "10px"
            } : {}}>
                <div className="modal__content"
                     onClick={e => e.stopPropagation()}>
                    {info}
                </div>
            </div>
        </div>
    );
};

export default ModalInfo;

// obj types:
// 0 - универсальный тип невидимка
// 1 - класс с расписанием, учителем и банером
// 2 - туалет невидимка
// 3 - Столовая отдельное меню
// 4 - Раздевалки отдельное меню