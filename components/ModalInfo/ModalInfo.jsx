import React, {useContext, useEffect} from 'react';
import {Fl} from "../../context/fl";
import Data from "../../api/getData"
import Timetable from "../../api/timetable";
import {StyleSheet, Text, View, Image, TouchableWithoutFeedback, ImageBackground} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// import {Drawer} from '@ant-design/react-native';

const e = () => {}
function getTimeTable(id) {
    let now = new Date();
    const getDay = now.getDay();
    // const getDay = 1;
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
        ["1 урок (08:40 - 09:25)", "Не найдено"],
        ["2 урок (09:35 - 10:20)", "Не найдено"],
        ["3 урок (10:40 - 11:25)", "Не найдено"],
        ["4 урок (11:35 - 12:20)", "Не найдено"],
        ["5 урок (12:30 - 13:15)", "Не найдено"],
        ["6 урок (13:35 - 14:20)", "Не найдено"],
        ["7 урок (14:40 - 15:25)", "Не найдено"],
        ["8 урок (15:35 - 17:00)", "Не найдено"],
    ]
    for (let i = 0; i < date.length; i++) {
        for (let t = 0; t < date[i].timetable.length; t++) {
            if (id === date[i].timetable[t].id) {
                let h = date[i].timetable[t];
                timeTable[h.num - 1][1] = +date[i].num + date[i].letter + " " + h.subject;
                if (h.group) {
                    timeTable[h.num - 1][1] = date[i].num + date[i].letter + " (" + h.group + ")гр. " + h.subject;
                }
                if (h.time !== "" && h.time !== undefined) {
                    timeTable[h.num - 1][0] = `${h.num} урок (${h.time})`;
                }
            }
        }
    }
    return timeTable
}
const getTimetableDiningRoom = [
        ["1 переменна (09:25 - 09:35)", "Завтрак (6 - 8)"],
        ["2 переменна (10:20 - 10:40)", "Завтрак (9 - 11)"],
        ["3 переменна (11:25 - 11:35)", "Буфет"],
        ["4 переменна (12:20 - 12:30)", "Буфет"],
        ["5 переменна (13:15 - 13:35)", "Обед (6 - 8)"],
        ["6 переменна (14:20 - 14:40)", "Обед (9 - 11)"],
    ]

const ModalInfo = (props) => {
    const {floor, setFloor} = useContext(Fl);
    useEffect(() => {
        if (!props.dataObj) return
        if (props.dataObj.floor !== floor) setFloor(props.dataObj.floor);
    }, [props.dataObj, floor, setFloor])
    if (!props.dataObj) {
        return (
            <View style={styles.none}>
                {/*<View style={"out"}></View>*/}
            </View>
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
        if (props.dataObj.imgName) {
            img = <View style={{width: "100%", height: 140}}><ImageBackground source={{uri: `https://pro.rezraf.com/shenid_api/${props.dataObj.name}.jpg`}} style={styles.image} resizeMode="cover"
            borderRadius={20}/></View>
        }

        info =
            <>
                {img}
                <Text style={{fontSize: 25, color: 'black', alignSelf: "center"}}>{numCab}</Text>
                <View style={styles.span}>
                    <Text style={styles.t1}>Учитель:</Text>
                    <Text style={styles.t2}>{teacher}</Text>
                    <Text style={styles.t3}>Учитель:</Text>
                </View>
                <View style={styles.span}>
                    <Text style={styles.t1}>Описание:</Text>
                    <Text style={styles.t2}>{des}</Text>
                    <Text style={styles.t3}>Описание:</Text>
                </View>
                {/*<View style={styles.span}>*/}
                {/*    <Text style={styles.t1}>id:</Text>*/}
                {/*    <Text style={styles.t2}>{props.dataObj.id}</Text>*/}
                {/*    <Text style={styles.t3}>id:</Text>*/}
                {/*</View>*/}
                <View style={styles.rasp}>
                    <Table style={styles.table} borderStyle={{ borderWidth: 1, borderColor: 'black'}} >
                        <Row data={[`Расписание на сегодня (${Timetable.getDay()})`]} style={styles.main} textStyle={styles.textMain}/>
                        <Rows data={getTimeTable(props.dataObj.id)} textStyle={styles.textTable} widthArr={[165, 225]}/>
                    </Table>
                </View>
            </>
    }
    if (props.dataObj.type === 3) {
        info =
            <>
                {/*{img}*/}
                <Text style={{fontSize: 25, color: 'black', alignSelf: "center"}}>Столовая</Text>
                <View style={styles.span}>
                    <Text style={styles.t1}>Этаж:</Text>
                    <Text style={styles.t2}>{props.dataObj.floor}</Text>
                    <Text style={styles.t3}>Этаж:</Text>
                </View>

                <View style={styles.rasp}>
                    <Table style={styles.table} borderStyle={{ borderWidth: 1, borderColor: 'black'}} >
                        <Row data={[`Расписание столовой на (любой день)`]} style={styles.main} textStyle={styles.textMain}/>
                        <Rows data={getTimetableDiningRoom} textStyle={styles.textTable} widthArr={[210, 180]}/>
                    </Table>
                </View>
            </>
    }

    return (
        <TouchableWithoutFeedback onPress={() => props.sma(false)}>
            <View style={props.active ? styles.active : styles.none}>
                <TouchableWithoutFeedback onPress={e}>
                    <View id={props.active ? "activeAnimation" : "out"} style={styles.modal}>

                        <View style={styles.modal__content}>
                            {info}
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
        // <Drawer
        //     sidebar={info}
        //     position="bottom"
        //     open={true}
        //     drawerRef={(el) => (this.drawer = el)}
        //     onOpenChange={this.onOpenChange}
        //     drawerBackgroundColor="#ccc">
        // </Drawer>
    );
};

export default ModalInfo;

const styles = StyleSheet.create({
    none: {
        display: "none"
    },
    active: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        // transition: all 0.5s,
        position: "absolute",
        display: "flex",
        top: 0,
        left: 0,
        zIndex: 1000,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    span: {
        backgroundColor: "rgba(0, 0, 0, 0.18)",
        borderRadius: 7,
        height: 30,
        marginTop: 5,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    t1: {
        marginLeft: 7,
        borderRadius: 3,
        fontWeight: 400,
    },

    t2: {
        fontWeight: "bold",
    },

    t3: {
        opacity: 0,
    },
    rasp: {
        width: "100%",
        marginTop: 15,
        borderRadius: 10
    },
    modal__content: {
        width: "100%",
        textAlign: "center",
        padding: 10,
    },
    modal: {
        justifyContent: "center",
        display: "flex",
        width: "100%",
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: "auto",
    },
    main: {
        backgroundColor: "rgba(0, 0, 0, 0.09)",
        height: 40,
        fontWeight: "bold",
    },
    textMain: {
        textAlign: "center",
        height: 25,
        margin: 0,
        fontSize: 15,
        fontWeight: "bold"
    },
    table: {
        width: "100%",
        /*borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5*/
    },
    textTable: {
        textAlign: "left",
        paddingLeft: 5,
        height: 30,
        textAlignVertical: "center",
        fontWeight: 500
    }
})

// obj types:
// 0 - универсальный тип невидимка
// 1 - класс с расписанием, учителем и банером
// 2 - туалет невидимка
// 3 - Столовая отдельное меню
// 4 - Раздевалки отдельное меню