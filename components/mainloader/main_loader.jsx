import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, Image, View} from 'react-native';
import {Text, StyleSheet} from "react-native";
import Constants from "expo-constants";
import CabData from "../../api/cabdata";
import Data from "../../api/getData";
import Evacuation from "../../api/evacuation";
import PolygonScheme from "../../api/scheme";
import Timetable from "../../api/timetable";


const MainLoader = ({setIsLoading, isLoading}) => {
    const [count, SetCount] = useState(0)
    const [isError, setIsError] = useState(false)
    const AllCount = 22
    async function loadData() {
        const tick = (value) => {
            SetCount((count) => count + 1)
            return value;
        }
        try {
            const [
                CabDataFour, CabDataThree, CabDataTwo, CabDataOne, CabDataMOne,
                EvacuationFour, EvacuationThree, EvacuationTwo, EvacuationOne, EvacuationMOne,
                SchemeFour, SchemeThree, SchemeTwo, SchemeOne, SchemeMOne,
                TimetableMonday, TimetableTuesday, TimetableWednesday, TimetableThursday, TimetableFriday, TimetableSaturday, TimetableSunday,
            ] = await Promise.all([
                CabData.getCabDataByFloor(4).then(tick),
                CabData.getCabDataByFloor(3).then(tick),
                CabData.getCabDataByFloor(2).then(tick),
                CabData.getCabDataByFloor(1).then(tick),
                CabData.getCabDataByFloor(-1).then(tick),
                Evacuation.getEvacuationByFloor(4).then(tick),
                Evacuation.getEvacuationByFloor(3).then(tick),
                Evacuation.getEvacuationByFloor(2).then(tick),
                Evacuation.getEvacuationByFloor(1).then(tick),
                Evacuation.getEvacuationByFloor(-1).then(tick),
                PolygonScheme.getScheme(4).then(tick),
                PolygonScheme.getScheme(3).then(tick),
                PolygonScheme.getScheme(2).then(tick),
                PolygonScheme.getScheme(1).then(tick),
                PolygonScheme.getScheme(-1).then(tick),
                Timetable.getTimetableByDayId(1).then(tick),
                Timetable.getTimetableByDayId(2).then(tick),
                Timetable.getTimetableByDayId(3).then(tick),
                Timetable.getTimetableByDayId(4).then(tick),
                Timetable.getTimetableByDayId(5).then(tick),
                Timetable.getTimetableByDayId(6).then(tick),
                Timetable.getTimetableByDayId(0).then(tick),
            ]);

            await Promise.all([
                Data.setData('CabDataFour', JSON.stringify(CabDataFour)),
                Data.setData('CabDataThree', JSON.stringify(CabDataThree)),
                Data.setData('CabDataTwo', JSON.stringify(CabDataTwo)),
                Data.setData('CabDataOne', JSON.stringify(CabDataOne)),
                Data.setData('CabDataMOne', JSON.stringify(CabDataMOne)),
                Data.setData('EvacuationFour', JSON.stringify(EvacuationFour)),
                Data.setData('EvacuationThree', JSON.stringify(EvacuationThree)),
                Data.setData('EvacuationTwo', JSON.stringify(EvacuationTwo)),
                Data.setData('EvacuationOne', JSON.stringify(EvacuationOne)),
                Data.setData('EvacuationMOne', JSON.stringify(EvacuationMOne)),
                Data.setData('SchemeFour', JSON.stringify(SchemeFour)),
                Data.setData('SchemeThree', JSON.stringify(SchemeThree)),
                Data.setData('SchemeTwo', JSON.stringify(SchemeTwo)),
                Data.setData('SchemeOne', JSON.stringify(SchemeOne)),
                Data.setData('SchemeMOne', JSON.stringify(SchemeMOne)),
                Data.setData('TimetableMonday', JSON.stringify(TimetableMonday)),
                Data.setData('TimetableTuesday', JSON.stringify(TimetableTuesday)),
                Data.setData('TimetableWednesday', JSON.stringify(TimetableWednesday)),
                Data.setData('TimetableThursday', JSON.stringify(TimetableThursday)),
                Data.setData('TimetableFriday', JSON.stringify(TimetableFriday)),
                Data.setData('TimetableSaturday', JSON.stringify(TimetableSaturday)),
                Data.setData('TimetableSunday', JSON.stringify(TimetableSunday)),
            ]);
            return true;
        } catch (e) {
            throw new Error(e.message)
        }
    }
    useEffect(() => {
        loadData().then((v) => {
            if (v) setIsLoading(false)
        }, (e) => {
            setIsError(true)
            alert(e)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])


    return (
        <View style={styles.container}>
            <Image source={require("../../assets/SHENID_interactive_map_logo.png")} style={styles.image}/>
            <Text style={styles.textLogo}>Интерактивная карта школы</Text>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>{!isError ? "Загрузка ...": "Ошибка\nПерезапустите приложение"}</Text>
            <View style={[styles.progressContainer]}>
                <View style={[styles.progressBar, {flex: 0.0454545454545455 * count}, isError ? {backgroundColor: "red"} : {backgroundColor: "black"}]}/>
                <Text style={styles.progress_text}>{count}/{AllCount}</Text>
            </View>
            {isError ? <Button title={"Запустить приложение принудительно"} onPress={() => setIsLoading(false)}/>
            : <></>}

        </View>
    );
};

export default MainLoader;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: Constants.statusBarHeight,
    },
    progressContainer: {
        width: 100,
        height: 50,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#626262",
        marginBottom: 15,
    },
    text: {
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15,
        fontSize: 15
    },
    progressBar: {
        zIndex: 4,
        borderRadius: 10,
        justifyContent: "flex-start"
    },
    progress_text: {
        fontWeight: "bold",
        color: "white",
        alignSelf: "center",

        position: "absolute",
        zIndex: 100,
        // backgroundColor: "black"
    },
    image: {
        height: 300,
        width: 300,
        marginTop: 50,
    },
    textLogo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
    },
    button_Error: {
        backgroundColor: "red",
        width: 300,
        height: 50
    }
})