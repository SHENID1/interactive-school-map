import React, {useRef, useState} from 'react';
import RaspTable from "./rasptable";
// import {Carousel, Select, Modal} from "antd";
import Data from "../../api/getData"
import CabData from "../../api/cabdata";
import Timetable from "../../api/timetable";
import {Text, View, StyleSheet, Image, TouchableOpacity, Modal} from "react-native";


const getOptions = (dataObj) => {

    let list = [];
    for (let i = 0; i < dataObj.length; i++) {
        let Class = dataObj[i];
        list.push({value: Class.letter + Class.num, label: Class.num + Class.letter, s: [Class.letter, Class.num]})
    }
    list = timeTableSort(list)
    return list;
}
const RBList = {
    // 0: "Пн",
    1: "Вт",
    2: "Ср",
    3: "Чт",
    4: "Пт",
    5: "Сб",
    // 6: "Вс",
}


const Timetable = (props) => {
    // const {confirm} = Modal; // инициализация модалки
    // const showDeleteConfirm = (obj1, obj2) => {
    //     confirm({
    //         title: 'Какой кабинет хотите открыть?',
    //         content: (
    //             <View>
    //                 <p>{obj2.name} - {obj2.description}</p>
    //                 <p>{obj1.name} - {obj1.description}</p>
    //             </View>
    //         ),
    //         okText: obj1.name,
    //         cancelText: obj2.name,
    //         onOk() {
    //             setOpenTimeTable(false);
    //             props.modal_object(obj1);
    //         },
    //         onCancel() {
    //             setOpenTimeTable(false);
    //             props.modal_object(obj2);
    //         },
    //     });
    // };
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
            <View style={styles.tt} onClick={openTimetable}>
                <Image source={require("../../images/icons/timetable_icon.png")} alt="" style={styles.icon}/>
            </View>
            <Modal visible={openTimeTable} style={[styles.timetable]}>
                <Text style={styles.x}
                      onClick={() => setOpenTimeTable(false)}
                >X
                </Text>
                <View style={styles.header}>
                    <View style={styles.cc}><Text>Расписание для {Class.slice(1) + Class.slice(0, 1)}</Text>
                        {/*<Select*/}
                        {/*    defaultValue={"Н10"}*/}
                        {/*    style={{width: 120, paddingLeft: "20px"}}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    options={getOptions(Data.getData('TimetableThursday'))}/>*/}
                    </View>
                    <View style={styles.contB}>
                        <TouchableOpacity onPress={() => changeDay(0)}>
                            <View>
                                style={[(dayId === 0) ? styles.RBSelected : {}, styles.RB, styles.RBStart]}>
                                <Text>Пн</Text>
                            </View>
                        </TouchableOpacity>
                        {RBList.map((el) =>
                            <TouchableOpacity onPress={() => changeDay(0)}>
                            <View>
                                style={[(dayId === 0) ? styles.RBSelected : {}, styles.RB, styles.RBStart]}>
                                <Text>el</Text>
                            </View>
                            </TouchableOpacity>
                        )}
                        {/*<View onClick={() => changeDay(1)}*/}
                        {/*     style={[(dayId === 1) ? styles.RBSelected : "", styles.RB]}>Вт*/}
                        {/*</View>*/}
                        {/*<View onClick={() => changeDay(2)}*/}
                        {/*     style={[(dayId === 2) ? styles.RBSelected : "", styles.RB]}>Ср*/}
                        {/*</View>*/}
                        {/*<View onClick={() => changeDay(3)}*/}
                        {/*     style={[(dayId === 3) ? styles.RBSelected : "", styles.RB]}>Чт*/}
                        {/*</View>*/}
                        {/*<View onClick={() => changeDay(4)}*/}
                        {/*     style={[(dayId === 4) ? styles.RBSelected : "", styles.RB]}>Пт*/}
                        {/*</View>*/}
                        {/*<View onClick={() => changeDay(5)}*/}
                        {/*     style={[(dayId === 5) ? styles.RBSelected : "", styles.RB]}>Сб*/}
                        {/*</View>*/}
                        <View onPress={() => changeDay(6)}
                              style={[(dayId === 6) ? styles.RBSelected : "", styles.RB, styles.RBEnd]}>
                            <Text>Вс</Text>
                        </View>
                    </View>
                </View>

                {/*<img src={require("../../../../images/p1.jpg")} alt={""} width={"auto"} height={"90%"} onClick={(e)=> e.stopPropagation()}/>*/}
                {/*<View style={styles.timetable_wrapper}>*/}
                {/*    <View style={styles.container}>*/}
                {/*        <Carousel dotPosition={"top"} draggable ref={carRef} initialSlide={initValue}*/}
                {/*                  onSwipe={(t) => onSwipe(t)} dots={false}>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={1}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 1)}/>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={2}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 2)}/>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={3}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 3)}/>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={4}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 4)}/>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={5}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 5)}/>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={6}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 6)}/>*/}
                {/*            <RaspTable openModaleCab={setMO} usedDay={dayId} dayId={7}*/}
                {/*                       data={CabData.getTable(Class.slice(1), Class.slice(0, 1), 0)}/>*/}
                {/*        </Carousel>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </Modal>
        </>
    );
};

export default Timetable;

const styles = StyleSheet.create({
        tt: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B3FAFF",
            marginTop: 10,
            borderRadius: 10,
            width: 50,
            height: 50,
        },
        icon: {
            marginTop: 3,
            height: 48,
            width: 48,
        },
        contB: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            width: 420,
            height: 53,
            zIndex: 100,
            marginTop: 5,
            // box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2),
        },
        RB: {
            width: 60,
            height: 53,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        #RBStart: {
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
        },
        #RBEnd: {
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
        },
        RBSelected: {
            backgroundColor: "#e9e9e9",
        },
        ttNotFound: {
            display: "flex",
            justifyContent: "center",
        },
        contTTNF: {
            backgroundColor: "rgba(0,0,0,0.33)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: 20,
        },
        contTTNF_B: {
            paddingTop: 10,
            justifySelf: "center",
            fontSize: 22,
            color: "white",
        },
        #first1: {
            marginLeft: 5,
            /*border-right: 1px solid black;*/
        },
        #first2: {
            marginLeft: 5,
            /*border-right: 1px solid black;*/
        },
        Two: {
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderLeftColor: "black",
            borderLeftWidth: 1,
            borderStyle: "solid",
        },
        Two1: {
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            borderLeftColor: "black",
            borderStyle: "solid",
            borderLeftWidth: 1,
        },
        x: {
            position: "absolute",
            top: -10,
            right: 25,
            fontSize: 30,
            zIndex: 9999,
            // font-family: "grafity",
        },
        // .x:hover{
        //     color: rgba(0,0,0,0.68),
        //     cursor: pointer,
        // }
        timetable: {
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
            /*background-color: #ffffff;*/
            display: "flex",
            flexDirection: "column",
            /*background-image: url("fon1.jpg");*/
            // backgroundColor: "#f2f3da",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            justifyContent: "flex-start",
        },
        timetable_wrapper: {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
        },
        none: {
            display: "none",
        },
        thead: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        rasp: {
            marginTop: 0,
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            /*display: grid;*/
            /*place-items: center;*/
            /*grid-template-columns: repeat(3, 600px);*/
            /*grid-template-rows: repeat(2, 337px);*/
            /*column-gap:  15px;*/
            /*row-gap: 15px;*/
            /*justify-items: stretch;*/
        },
        header: {
            width: "100%",
            /*position: absolute;*/
            top: 5,
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            /*margin-bottom: 50px;*/
        },
        cc: {
            display: "flex",
            alignItems: "center",
        },
        headerH1: {
            fontSize: 50,
            marginTop: 5,
        },
        container: {
            width: "100%",
            height: "auto",
            overflowY: "auto",
        },
        // raspTable: {
        //     marginTop: 23,
        //     borderColor: 'black',
        //     borderWidth: 1,
        //     borderStyle: 'solid',
        //     width: 600,
        //     borderCollapse: "collapse",
        //     // display: grid,
        //     borderRadius: 5,
        //     backgroundColor: "white",
        // },
        // #main: {
        //     // display: grid,
        //     // place-items: center,
        //     height: 31,
        //     margin: 0 0 0 0,
        //     font-size: 20px,
        // }
        //
        // .rasp th {
        //     border-top: 1px solid black,
        // }
        // .r100b{
        //     text-overflow: ellipsis,
        //     width: 337px,
        // }
    }
)