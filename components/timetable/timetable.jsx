import React, {useRef, useState} from 'react';
// import {Carousel, Select, Modal} from "antd";
// import Data from "../../api/getData"
// import Timetable from "../../api/timetable";
import {View, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions} from "react-native";
import {Tab, TabView, Text} from '@rneui/themed';
import CabData from "../../api/cabdata";
import RaspTable from "./rasptable";
import {Dialog} from "@rneui/base";
import Constants from "expo-constants";

// const getOptions = (dataObj) => {
//
//     let list = [];
//     for (let i = 0; i < dataObj.length; i++) {
//         let Class = dataObj[i];
//         list.push({value: Class.letter + Class.num, label: Class.num + Class.letter, s: [Class.letter, Class.num]})
//     }
//     list = Timetable.timeTableSort(list)
//     return list;
// }
const RBList = [
    [0, "Пн"],
    [1, "Вт"],
    [2, "Ср"],
    [3, "Чт"],
    [4, "Пт"],
    [5, "Сб"],
    [6, "Вс"],
]


const TimetableView = (props) => {
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
    const [isVisibleDialog, setIsVisibleDialog] = useState(false)
    let initDay = new Date().getDay() - 1;
    if (new Date().getDay() === 0) initDay = 6;
    const [dayId, setDayId] = useState(initDay);
    const [Class, setClass] = useState("Н10");
    const carRef = useRef() // привязка к элементу карусель
    const [index, setIndex] = React.useState(0);
    const [dialogObj, setDialogObj] = useState([])
    const openTimetable = () => setOpenTimeTable(true);
    const changeDay = (e) => {
        setDayId(e);
        // carRef.current.goTo(e, true);
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
            props.modal_object(obj1)
            setDialogObj([obj1, obj2]);
            setIsVisibleDialog(true);
        }
    }

    // const onSwipe = (t) => {
    //     if (t === "left") {
    //         if (dayId === 6) return setDayId(0);
    //         setDayId(dayId + 1);
    //     } else if (t === "right") {
    //         if (dayId === 0) return setDayId(6);
    //         setDayId(dayId - 1);
    //     }
    // }
    // const handleChange = (value) => {
    //     setClass(value);
    // };
    return (
        <>
            <TouchableOpacity onPress={openTimetable}>
                <View style={styles.tt}>
                    <Image source={require("../../images/icons/timetable_icon.png")} alt="" style={styles.icon}/>
                </View>
            </TouchableOpacity>
            <Modal visible={openTimeTable} statusBarTranslucent={true}>
                <View style={styles.timetable}>
                <TouchableWithoutFeedback onPress={() => setOpenTimeTable(false)}>
                    <Text style={styles.x}>
                        X
                    </Text>
                </TouchableWithoutFeedback>

                    <View style={styles.cc}><Text style={styles.headerH1}>Расписание
                        для {Class.slice(1) + Class.slice(0, 1)}</Text>
                        {/*<Select*/}
                        {/*    defaultValue={"Н10"}*/}
                        {/*    style={{width: 120, paddingLeft: "20px"}}*/}
                        {/*    onChange={handleChange}*/}
                        {/*    options={getOptions(Data.getData('TimetableThursday'))}/>*/}
                    </View>

                    <Tab
                        value={index}
                        onChange={(e) => setIndex(e)}
                        indicatorStyle={{
                            backgroundColor: '#000000',
                            height: 3,
                        }}
                        variant="default"
                        scrollable={true}
                    >
                        {RBList.map((el) =>
                            <Tab.Item titleStyle={{fontSize: 12, color: "black"}} key={el[1]} title={el[1]}/>
                        )}
                    </Tab>

                    <TabView value={index} onChange={setIndex} animationType="timing">
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
                    </TabView>
                <Dialog
                    isVisible={isVisibleDialog}
                    onBackdropPress={()=> setIsVisibleDialog(false)}
                    overlayStyle={{backgroundColor: "white"}}
                >
                    <Dialog.Title title="Какой кабинет хотите открыть?"/>
                    <View>
                        <Text>{dialogObj[1]?.name} - {dialogObj[1]?.description}</Text>
                        <Text>{dialogObj[0]?.name} - {dialogObj[0]?.description}</Text>
                    </View>
                    <Dialog.Actions>
                        <Dialog.Button title={dialogObj[0]?.name} onPress={() => {
                            setOpenTimeTable(false);
                            props.modal_object(dialogObj[0])
                        }
                        }/>
                        <Dialog.Button title={dialogObj[1]?.name} onPress={() =>  {
                            setOpenTimeTable(false);
                            props.modal_object(dialogObj[1])
                        }
                        }/>
                    </Dialog.Actions>
                </Dialog>
                </View>
            </Modal>
        </>
    );
};

export default TimetableView;

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
            flexDirection: "row",
            borderRadius: 10,
            width: "auto",
            height: 53,
            zIndex: 100,
            marginTop: 5,
        },
        RB: {
            width: 60,
            height: 53,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        RBStart: {
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
        },
        RBEnd: {
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
        },
        RBSelected: {
            backgroundColor: "#e9e9e9",
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
        first1: {
            marginLeft: 5,
        },
        first2: {
            marginLeft: 5,
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
            top: -5,
            right: 20,
            fontSize: 30,
            zIndex: 9999,
        },
        timetable: {
            width: "100%",
            height: Dimensions.get('window').height,
            zIndex: 999,
            marginTop: Constants.statusBarHeight,
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
        },
        header: {
            width: "100%",
            top: 5,
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
        cc: {
            display: "flex",
            alignItems: "center",
        },
        headerH1: {
            fontSize: 30,
            marginTop: 5,
        },
        container: {
            width: "100%",
            height: "auto",
            overflowY: "auto",
        },
    }
)