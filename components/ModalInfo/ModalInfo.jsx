import React, {useContext, useEffect} from 'react';
import {Fl} from "../../context/fl";
import Timetable from "../../api/timetable";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ImageBackground,
    Image,
    Animated,
    Dimensions,
    FlatList
} from "react-native";
import EventApi from "../../api/eventApi";
import DateFunctions from "../../api/Day";
import dayjs from "dayjs";
import $api from "../../api";
import AutoScaleImage from "../test/adaptiveimg";
import Adaptiveimg from "../test/adaptiveimg";

const e = () => {
}

const tableItem = ({item}) => (
    <View style={styles.tr}>
        <View style={styles.T1}>
            <Text style={styles.t1_text}>{item.i} урок {"\n"}
                <Text style={styles.t1Span}>
                    ({item.lessonTime})
                </Text>
            </Text>
        </View>
        <View style={styles.T2}>
            <Text
                style={styles.t2_text} numberOfLines={10} ellipsizeMode={"tail"}>{item.subject}</Text>
        </View>
    </View>
)
const DinningTableItem = ({item}) => (
    <View style={styles.tr}>
        <View style={styles.T1_for_dinning}>
            <Text style={styles.t1_text_for_dinning}>{item.i} перемена {"\n"}
                <Text style={styles.t1Span}>
                    ({item.lessonTime})
                </Text>
            </Text>
        </View>
        <View style={styles.T2}>
            <Text
                style={styles.t2_text_for_dinning} numberOfLines={10} ellipsizeMode={"tail"}>{item.subject}</Text>
        </View>
    </View>
)

const ModalInfo = (props) => {
    const {floor, setFloor} = useContext(Fl);
    useEffect(() => {
        if (!props.dataObj) return
        if (props.dataObj.floor !== floor) setFloor(props.dataObj.floor);
    }, [props.dataObj, floor, setFloor])
    if (!props.dataObj) {
        return (
            <View style={styles.none}/>
        )
    }
    const data = Timetable.getTimeTable(props.dataObj.id)
    // console.log(data)
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
            img = <View style={{width: "100%", height: 140}}><ImageBackground
                source={{uri: `https://pro.rezraf.com/shenid_api/${props.dataObj.imgName}`}} style={styles.image}
                resizeMode="cover"
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
                    <View style={styles.main}><Text
                        style={styles.textMain}>{`Расписание на сегодня (${Timetable.getDay()})`}</Text></View>
                    <FlatList data={data} renderItem={tableItem} keyExtractor={item => item.i}/>
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
                    <View style={styles.main}><Text
                        style={styles.textMain}>{"Расписание столовой на (любой день)"}</Text></View>
                    <FlatList data={Timetable.getTimetableDiningRoom()} renderItem={DinningTableItem}
                              keyExtractor={item => item.i}/>
                </View>
            </>
    }
    if (props.dataObj.type === 4) {

        const data = props.dataObj
        let img = <></>
        let ImageUrl = `https://pro.rezraf.com/shenid_api/${data.image}`

        if (data.image) img = <View style={{width: "100%", height: 140}}><ImageBackground
            source={{uri: ImageUrl}} style={styles.image}
            resizeMode="cover"
            borderRadius={20}/></View>
        const dateStart = dayjs(data.dateStart).toDate();
        const dateEnd = dayjs(data.dateEnd).toDate();
        const dateNow = new Date();
        const status = EventApi.isStartedEvent(dateStart, dateEnd, dateNow);
        info =
            <View>
                {img}
                <Text style={{fontSize: 25, color: 'black', alignSelf: "center"}}>{numCab}</Text>
                {status === -1 ? <>
                    <View style={[{backgroundColor: "#ffc68e"}, styles.despan1]}>
                        <Text style={styles.b}>Не началось</Text>
                    </View>
                </> : <></>}
                {status === 0 ? <>
                    <View style={[{backgroundColor: "#14ff00"}, styles.despan1]}>
                        <Text style={styles.b}>Уже идёт</Text></View>
                </> : <></>}
                {status === 1 ? <>
                    <View style={[{backgroundColor: "#ff0000"}, styles.despan1]}>
                        <Text style={styles.b}>Завершилось</Text></View>
                </> : <></>}
                <View style={styles.despan}>
                    <View style={styles.t2}><Text>{des}</Text></View>
                </View>
                <View style={styles.span}>
                    <View style={styles.t1}><Text>🕒 начала:</Text></View>
                    <View style={styles.t2}><Text>{dateStart.toLocaleDateString("ru-RU", DateFunctions.options)}</Text></View>
                    <View style={styles.t3}><Text>🕒 нача</Text></View>
                </View>
                <View style={styles.span}>
                    <View style={styles.t1}><Text>🕒 конца: </Text></View>
                    <View
                        style={styles.t2}><Text>{dateEnd.toLocaleDateString("ru-RU", DateFunctions.options)}</Text></View>
                    <View style={styles.t3}><Text>🕒 окончан</Text></View>
                </View>
                <View style={styles.span}>
                    <View style={styles.t1}><Text>🧭</Text></View>
                    <View style={styles.t2}><Text>{data.floor} Этаж, X:{data.x} Y:{data.y}</Text></View>
                    <View style={styles.t3}><Text>🧭</Text></View>
                </View>
            </View>
    }

    return (
        <TouchableWithoutFeedback onPress={() => props.sma(false)}>
            <View style={[props.active ? styles.active : styles.none, data.color ? {
                borderColor: props.dataObj.color,
                borderStyle: "SOLID",
                borderWidth: "10px"
            } : {}]}>
                <TouchableWithoutFeedback onPress={e}>
                    <Animated.View id={props.active ? "activeAnimation" : "out"} style={styles.modal}>

                        <View style={styles.modal__content}>
                            {info}
                        </View>

                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
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
        backgroundColor: "#00000066",
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
        backgroundColor: "#0000002D",
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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
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
        justifyContent: "center",
        alignItems: "center",
    },
    textMain: {
        height: 25,
        margin: 0,
        fontSize: 15,
        fontWeight: "bold",
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
    },
    tr: {
        borderTopWidth: 1,
        borderColor: "black",
        flexDirection: "row",
        height: 40,
    },
    T1: {
        width: 100,
    },
    T1_for_dinning: {
        width: 120,
    },
    t1_text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
    t1_text_for_dinning: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "center",
    },
    t1Span: {
        fontSize: 12,
    },
    T2: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 5,
        borderLeftWidth: 1,
        borderColor: "black",
        width: Dimensions.get('window').width - 110,
        // backgroundColor: "red",
    },
    t2_text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    t2_text_for_dinning: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    despan: {
        backgroundColor: "#0000002D",
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 7,
        height: "auto",
        minHeight: 30,
        marginTop: 5,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    despan1: {
        borderRadius: 7,
        height: 30,
        marginTop: 5,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    img: {
        width: "100%",
        height:"100%",
    },
    b: {
        fontWeight: "bold",
    },
})

// obj types:
// 0 - универсальный тип невидимка
// 1 - класс с расписанием, учителем и банером
// 2 - туалет невидимка
// 3 - Столовая отдельное меню
// 4 - Раздевалки отдельное меню