import React from 'react';
import {Text, View, StyleSheet, FlatList, Image, Dimensions, TouchableHighlight } from "react-native";
import Timetable from "../../api/timetable"




const RaspTable = ({data, dayId, openModaleCab}) => {
    const tableItem = ({item}) => (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => openModaleCab(item.ids)}>
            {item.ids.length === 1 || item.ids.length === 0 ?
                <View style={styles.tr}>
                    <View style={styles.t1}>
                        <Text style={styles.t1_text}>{item.i} урок {"\n"}
                            <Text style={styles.t1Span}>
                                ({item.lessonTime})
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.t2}>
                        <Text style={styles.t2_text}>{Timetable.getCabNum(item.ids[0])}</Text>
                    </View>
                    <View style={styles.t3}>
                        <Text
                            style={styles.t3_text} numberOfLines={10} ellipsizeMode={"tail"}>{item.subject.join("/")}</Text>
                    </View>
                </View>
                :
                <View style={styles.doubleTr}>
                    <View style={styles.double_t1}>
                        <Text style={styles.t1_text}>{item.i} урок {"\n"}
                            <Text style={styles.t1Span}>
                                ({item.lessonTime})
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.t_column}>
                        <View style={[styles.t_row, styles.borderBottom]}>
                            <View style={styles.t2}>
                                <Text style={styles.t2_text}>{Timetable.getCabNum(item.ids[0])}</Text>
                            </View>
                            <View style={styles.t3}>
                                <Text
                                    style={styles.t3_text}>{item.subject[0]}</Text>
                            </View>
                        </View>
                        <View style={styles.t_row}>
                            <View style={styles.t2}>
                                <Text style={styles.t2_text}>{Timetable.getCabNum(item.ids[1])}</Text>
                            </View>
                            <View style={styles.t3}>
                                <Text style={styles.t3_text}>{item.subject[1]}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        </TouchableHighlight>
    )
        if (data === null || data === undefined) return (
            <View style={styles.ttNotFound}>
                <View style={styles.contTTNF}>
                    <Image height={188} width={200} alt=""
                           source={{uri: "https://dnevnik.mos.ru/diary/mfNewSchedule/assets/images/53a9af0c94373e4066a24225f0c893ae.png"}}/>
                    <Text style={styles.contTTNFB}>Уроков нет</Text>
                </View>
            </View>
        )
        let rows = ""
        for (let i = 0; i < data.length; i++) {
            if (data[i].ids.length > 1) rows += "2fr ";
            else rows += "1fr ";
        }
        return (
            <View style={styles.rasp}>
                <Text style={styles.main}>{Timetable.getDay(dayId)}</Text>
                <FlatList data={data} renderItem={tableItem} keyExtractor={item => item.i.toString()}/>
            </View>

        );
    }
;

export default RaspTable;


const styles = StyleSheet.create({
    rasp: {
        width: Dimensions.get('window').width - 20,
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        margin: 10,
    },
    main: {
        height: 40,
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold",
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: "black",
    },
    contTTNF: {
        backgroundColor: "rgba(0,0,0,0.33)",
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
    },
    contTTNFB: {
        paddingTop: 10,
        fontSize: 22,
        color: "white",
    },
    ttNotFound: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    t1: {
        width: 70,
    },
    t1_text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
    t1Span: {
        fontSize: 12,
    },
    t2: {
        width: 40,
        borderLeftColor: "black",
        borderLeftWidth: 1,
        borderRightColor: "black",
        borderRightWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    t2_text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
    },
    t3: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 5,
        width: Dimensions.get('window').width - 110,
        height: 60,
        // backgroundColor: "red",
    },
    t3_text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tr: {
        borderWidth: 1,
        borderColor: "black",
        flexDirection: "row",
        height: 60,
    },
    doubleTr: {
        height: 120,
        borderWidth: 1,
        borderColor: "black",
        flexDirection: "row",
    },
    double_t1: {
        width: 70,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
    },
    t_column: {
        display: "flex",
        flexDirection: "column",
        height: 120,
    },
    t_row: {
        display: "flex",
        flexDirection: "row",
        height: 60,

    },
    borderBottom: {
        borderBottomColor: "black",
        borderBottomWidth: 1,

    }
})