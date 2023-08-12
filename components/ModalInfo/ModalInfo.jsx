import React, {useContext, useEffect} from 'react';
import {Fl} from "../../context/fl";
import Timetable from "../../api/timetable";
import {StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Animated} from "react-native";
import { Table, Row, Rows} from 'react-native-table-component';
import Constants from "expo-constants";

const e = () => {}

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
                        <Row data={[`Расписание на сегодня (${Timetable.getDay()})`]} style={styles.main} textStyle={[styles.textMain]}/>
                        <Rows data={Timetable.getTimeTable(props.dataObj.id)} textStyle={styles.textTable} widthArr={[165, 225]} />
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
                        <Rows data={Timetable.getTimetableDiningRoom()} textStyle={styles.textTable} widthArr={[210, 180]}/>
                    </Table>
                </View>
            </>
    }

    return (
        <TouchableWithoutFeedback onPress={() => props.sma(false)}>
            <View style={props.active ? styles.active : styles.none}>
                <TouchableWithoutFeedback onPress={e}>
                    <Animated.View id={props.active ? "activeAnimation" : "out"} style={styles.modal}>

                        <View style={styles.modal__content}>
                            {info}
                        </View>

                    </Animated.View>
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
    },
    textTable: {
        textAlign: "left",
        paddingLeft: 5,
        height: 40,
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