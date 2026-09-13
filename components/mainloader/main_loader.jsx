import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, Image, View} from 'react-native';
import {Text, StyleSheet} from "react-native";
import Constants from "expo-constants";
import Data from "../../api/getData";
import Bootstrap from "../../api/bootstrap";


const MainLoader = ({setIsLoading, isLoading}) => {
    const [count, SetCount] = useState(0)
    const [isError, setIsError] = useState(false)
    const AllCount = 1
    async function loadData() {
        try {
            const {cabData, evacuation, scheme, timetable} = await Bootstrap.load();
            SetCount(1)

            const floorKeys = [['Four', 4], ['Three', 3], ['Two', 2], ['One', 1], ['MOne', -1]];
            const dayKeys = [['Monday', 1], ['Tuesday', 2], ['Wednesday', 3], ['Thursday', 4], ['Friday', 5], ['Saturday', 6], ['Sunday', 0]];

            await Promise.all([
                ...floorKeys.map(([suffix, floor]) => Data.setData(`CabData${suffix}`, JSON.stringify(cabData[floor] || []))),
                ...floorKeys.map(([suffix, floor]) => Data.setData(`Evacuation${suffix}`, JSON.stringify(evacuation[floor] || []))),
                ...floorKeys.map(([suffix, floor]) => Data.setData(`Scheme${suffix}`, JSON.stringify(scheme[floor] || []))),
                ...dayKeys.map(([suffix, dayId]) => Data.setData(`Timetable${suffix}`, JSON.stringify(timetable[dayId] || []))),
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
                <View style={[styles.progressBar, {flex: count / AllCount}, isError ? {backgroundColor: "red"} : {backgroundColor: "black"}]}/>
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