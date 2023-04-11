import React, {useRef, useState} from 'react';
import classes from "./timetable.module.css";
import RaspTable from "./rasptable";
import {Carousel, Select, Modal} from "antd";
import Data from "../../api/getData"
import CabData from "../../api/cabdata";


const getOptions = (dataObj) => {
    const timeTableSort = (table) => {
        function compareSl(a, b) {
            if (a.s[1] > b.s[1]) return -1;
            if (a.s[1] === b.s[1] && a.s[0] < b.s[0]) return -1;
            if (a.s[1] === b.s[1] && a.s[0] > b.s[0]) return 1;
            if (a.s[1] < b.s[1]) return 1;
        }
        table.sort(compareSl)
        return table
    }
    let list = [];
    for (let i = 0; i < dataObj.length; i++) {
        let Class = dataObj[i];
        list.push({value: Class.letter + Class.num, label: Class.num + Class.letter, s: [Class.letter, Class.num]})
    }
    list = timeTableSort(list)
    return list;
}



const Timetable = (props) => {
    const {confirm} = Modal; // инициализация модалки
    const showDeleteConfirm = (obj1, obj2) => {
        confirm({
            title: 'Какой кабинет хотите открыть?',
            content: (
                <div>
                    <p>{obj2.name} - {obj2.description}</p>
                    <p>{obj1.name} - {obj1.description}</p>
                </div>
            ),
            okText: obj1.name,
            cancelText: obj2.name,
            onOk() {
                setOpenTimeTable(false);
                props.modal_object(obj1);
            },
            onCancel() {
                setOpenTimeTable(false);
                props.modal_object(obj2);
            },
        });
    };
    const [openTimeTable, setOpenTimeTable] = useState(false);
    let initDay = new Date().getDay() - 1;
    if (new Date().getDay() === 0) initDay = 6;
    const [dayId, setDayId] = useState(initDay);
    const [Class, setClass] = useState("Н10");
    const carRef = useRef() // привязка к элементу карусель

    const initValue = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const openTimetable = () => {
        setOpenTimeTable(true);
    }
    const changeDay = (e) => {
        setDayId(e);
        carRef.current.goTo(e, true);
    }


    const setMO = (list) => { // [12, 46]
        if (!list) return;
        if (list.length === 1) {
            const obj = CabData.getCabDataById(list[0][0]); // получаем данные
            setOpenTimeTable(false);
            props.modal_object(obj);
            return;
        }
        if (list.length === 2) {
            const obj1 = CabData.getCabDataById(list[0][0]); // получаем данные
            const obj2 = CabData.getCabDataById(list[1][0]); // получаем данные
            showDeleteConfirm(obj1, obj2)
        }
    }

    const onSwipe = (t) => {
        if (t === "left") {
            if (dayId === 6) return setDayId(0);
            setDayId(dayId + 1);
        } else if (t === "right") {
            if (dayId === 0) return setDayId(6);
            setDayId(dayId - 1);
        }
    }
    const handleChange = (value) => {
        setClass(value);
    };
    return (
        <>
            <div className={classes.tt} onClick={openTimetable}>
                <img src={require("../../images/icons/timetable_icon.png")} alt={""} width={"48px"}
                     height={"48px"} className={classes.icon}></img>
            </div>
            <div className={[openTimeTable ? "active" : classes.none, classes.timetable].join(' ')}>
                <div className={classes.x}
                     onClick={() => setOpenTimeTable(false)}
                >X
                </div>
                <div className={classes.header}>
                    <div className={classes.cc}><h1>Расписание для {Class.slice(1) + Class.slice(0, 1)}</h1>
                        <Select
                            defaultValue={"Н10"}
                            style={{width: 120, paddingLeft: "20px"}}
                            onChange={handleChange}
                            options={getOptions(Data.getData('TimetableThursday'))}/>
                    </div>
                    <div className={classes.contB}>
                        <div onClick={() => changeDay(0)}
                             className={[(dayId === 0) ? classes.RBSelected : "", classes.RB].join(' ')}
                             id={classes.RBStart}>Пн
                        </div>
                        <div onClick={() => changeDay(1)}
                             className={[(dayId === 1) ? classes.RBSelected : "", classes.RB].join(' ')}>Вт
                        </div>
                        <div onClick={() => changeDay(2)}
                             className={[(dayId === 2) ? classes.RBSelected : "", classes.RB].join(' ')}>Ср
                        </div>
                        <div onClick={() => changeDay(3)}
                             className={[(dayId === 3) ? classes.RBSelected : "", classes.RB].join(' ')}>Чт
                        </div>
                        <div onClick={() => changeDay(4)}
                             className={[(dayId === 4) ? classes.RBSelected : "", classes.RB].join(' ')}>Пт
                        </div>
                        <div onClick={() => changeDay(5)}
                             className={[(dayId === 5) ? classes.RBSelected : "", classes.RB].join(' ')}>Сб
                        </div>
                        <div onClick={() => changeDay(6)}
                             className={[(dayId === 6) ? classes.RBSelected : "", classes.RB].join(' ')}
                             id={classes.RBEnd}>Вс
                        </div>
                    </div>
                </div>

                {/*<img src={require("../../../../images/p1.jpg")} alt={""} width={"auto"} height={"90%"} onClick={(e)=> e.stopPropagation()}/>*/}
                <div className={classes.timetable_wrapper}>
                <div className={classes.container}>
                    <Carousel dotPosition={"top"} draggable ref={carRef} initialSlide={initValue}
                              onSwipe={(t) => onSwipe(t)} dots={false}>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={1}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 1)}/>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={2}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 2)}/>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={3}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 3)}/>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={4}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 4)}/>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={5}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 5)}/>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={6}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 6)}/>
                        <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={7}
                                   data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 0)}/>
                    </Carousel>
                </div>
                </div>
            </div>
        </>
    );
};

export default Timetable;