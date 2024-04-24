import React from 'react';
import classes from "./timetable.module.css";
import Data from "../../api/getData"

function getDay(id) {
    switch (id) {
        case (0):
            return "Воскресенье";
        case (1):
            return "Понедельник"
        case (2):
            return "Вторник"
        case (3):
            return "Среда"
        case (4):
            return "Четверг"
        case (5):
            return "Пятница"
        case (6):
            return "Суббота"
        default:
            return "Не найдено"
    }
}

const getCabNum = (id) => {
    if (!id) return ""
    const data = [
        Data.getData('CabDataFour'),
        Data.getData('CabDataThree'),
        Data.getData('CabDataTwo'),
        Data.getData('CabDataOne'),
        Data.getData('CabDataMOne')
    ]
    for (let i = 0; i !== 5; i++) {
        let floor_data = data[i];
        for (let d in floor_data) {
            let h = floor_data[d].id;
            if (h === id[0]) {
                return (floor_data[d].name)
            }
        }

    }
    return "?"
}


const RaspTable = ({data, dayId, openModaleCab}) => {
    if (data === null || data === undefined) return <div className={classes.ttNotFound}>
        <div className={classes.contTTNF}>
            <img height={"188px"} width={"200px"} alt={""} src={require("../../images/icons/no_lesson.png")}/><b>Уроков
        нет</b></div></div>
    let rows = ""
    for (let i = 0; i < data.length; i++) {
        if (data[i].ids.length > 1) rows += "2fr ";
        else rows += "1fr ";
    }
    return (
        <div className={classes.rasp}>
            <table>
                <thead className={classes.thead}>
                <tr id={classes.main}>
                    <td>{getDay(dayId)}</td>
                </tr>
                </thead>
                <tbody className={classes.tbody} style={{gridTemplateRows: rows}}>
                {
                    data.map(el =>
                        <tr onDoubleClick={() => openModaleCab(el.ids)} className={classes.tr1} key={el.i}
                            style={el.ids.length > 1 ? {height: "61px"} : {height: "30px"}}>
                            {el.ids.length === 1 || el.ids.length === 0?
                                <>
                                    <td id={classes.first1} title={`${el.i} урок (${el.lessonTime})`}>{el.i} урок <span className={classes.lessDec}>({el.lessonTime})</span>
                                    </td>
                                    <td id={classes.two}>
                                        <div className={classes.ItemTwoCabName}>{getCabNum(el.ids[0])}</div>
                                    </td>
                                    <td className={classes.r100}>
                                        <div className={classes.r100b}
                                             title={el.subject.join("/")}>{el.subject.join("/")}</div>
                                    </td>
                                </>

                                :

                                <>
                                    <td id={classes.first2} title={`${el.i} урок (${el.lessonTime})`}>{el.i} урок <span className={classes.lessDec}>({el.lessonTime})</span>
                                    </td>
                                    <td id={classes.two1}>
                                        <div className={classes.ItemTwoCabName1}><span>{getCabNum(el.ids[0])}</span>
                                        </div>
                                        <div className={classes.ItemTwoCabName1} id={classes.two2}>
                                            <span>{getCabNum(el.ids[1])}</span></div>
                                    </td>
                                    <td className={classes.r1001}>
                                        <div className={classes.r100b1} title={el.subject[0]}>
                                            <span>{el.subject[0]}</span></div>
                                        <div className={classes.r100b1} title={el.subject[1]} id={classes.two2}>
                                            <span>{el.subject[1]}</span></div>
                                    </td>
                                </>

                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default RaspTable;