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
        try {
            //cabData

            const CabDataFour = await CabData.getCabDataByFloor(4);
            SetCount((count) => count + 1)
            const CabDataThree = await CabData.getCabDataByFloor(3);
            SetCount((count) => count + 1)
            const CabDataTwo = await CabData.getCabDataByFloor(2);
            SetCount((count) => count + 1)
            const CabDataOne = await CabData.getCabDataByFloor(1);
            SetCount((count) => count + 1)
            const CabDataMOne = await CabData.getCabDataByFloor(-1);
            SetCount((count) => count + 1)
            await Data.setData('CabDataFour', JSON.stringify(CabDataFour));
            await Data.setData('CabDataThree', JSON.stringify(CabDataThree));
            await Data.setData('CabDataTwo', JSON.stringify(CabDataTwo));
            await Data.setData('CabDataOne', JSON.stringify(CabDataOne));
            await Data.setData('CabDataMOne', JSON.stringify(CabDataMOne));

            //Evacuation
            const EvacuationFour = await Evacuation.getEvacuationByFloor(4);
            SetCount((count) => count + 1)
            const EvacuationThree = await Evacuation.getEvacuationByFloor(3);
            SetCount((count) => count + 1)
            const EvacuationTwo = await Evacuation.getEvacuationByFloor(2);
            SetCount((count) => count + 1)
            const EvacuationOne = await Evacuation.getEvacuationByFloor(1);
            SetCount((count) => count + 1)
            const EvacuationMOne = await Evacuation.getEvacuationByFloor(-1);
            SetCount((count) => count + 1)
            await Data.setData('EvacuationFour', JSON.stringify(EvacuationFour));
            await Data.setData('EvacuationThree', JSON.stringify(EvacuationThree));
            await Data.setData('EvacuationTwo', JSON.stringify(EvacuationTwo));
            await Data.setData('EvacuationOne', JSON.stringify(EvacuationOne));
            await Data.setData('EvacuationMOne', JSON.stringify(EvacuationMOne));

            //Scheme
            const SchemeFour = await PolygonScheme.getScheme(4);
            SetCount((count) => count + 1)
            const SchemeThree = await PolygonScheme.getScheme(3);
            SetCount((count) => count + 1)
            const SchemeTwo = await PolygonScheme.getScheme(2);
            SetCount((count) => count + 1)
            const SchemeOne = await PolygonScheme.getScheme(1);
            SetCount((count) => count + 1)
            const SchemeMOne = await PolygonScheme.getScheme(-1);
            SetCount((count) => count + 1)
            await Data.setData('SchemeFour', JSON.stringify(SchemeFour));
            await Data.setData('SchemeThree', JSON.stringify(SchemeThree));
            await Data.setData('SchemeTwo', JSON.stringify(SchemeTwo));
            await Data.setData('SchemeOne', JSON.stringify(SchemeOne));
            await Data.setData('SchemeMOne', JSON.stringify(SchemeMOne));

            //Timetable
            const TimetableMonday = await Timetable.getTimetableByDayId(1);
            SetCount((count) => count + 1)
            const TimetableTuesday = await Timetable.getTimetableByDayId(2);
            SetCount((count) => count + 1)
            const TimetableWednesday = await Timetable.getTimetableByDayId(3);
            SetCount((count) => count + 1)
            const TimetableThursday = await Timetable.getTimetableByDayId(4);
            SetCount((count) => count + 1)
            const TimetableFriday = await Timetable.getTimetableByDayId(5);
            SetCount((count) => count + 1)
            const TimetableSaturday = await Timetable.getTimetableByDayId(6);
            SetCount((count) => count + 1)
            const TimetableSunday = await Timetable.getTimetableByDayId(0);
            SetCount((count) => count + 1)
            await Data.setData('TimetableMonday', JSON.stringify(TimetableMonday));
            await Data.setData('TimetableTuesday', JSON.stringify(TimetableTuesday));
            await Data.setData('TimetableWednesday', JSON.stringify(TimetableWednesday));
            await Data.setData('TimetableThursday', JSON.stringify(TimetableThursday));
            await Data.setData('TimetableFriday', JSON.stringify(TimetableFriday));
            await Data.setData('TimetableSaturday', JSON.stringify(TimetableSaturday));
            await Data.setData('TimetableSunday', JSON.stringify(TimetableSunday));
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