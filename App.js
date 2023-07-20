import React, {useEffect, useState} from "react";
import {Fl} from "./context/fl";
import {Ev} from "./context/ev";
import MainLoader from "./components/mainloader/main_loader";
import Load from "./api/load";
import {Platform, StatusBar, StyleSheet, View} from "react-native"
import SyncStorage from 'sync-storage';
import Data from "./api/getData"
import FButton from "./components/f_button";
import Floor from "./components/floors/floor";
import ModalInfo from "./components/ModalInfo/ModalInfo";
import Search from "./components/search/search";
//import Timetable from "./components/timetable/timetable";
import Evacuation from "./components/evacuation/evacuation";
import {useFonts} from 'expo-font';


function App() {
    const [loaded] = useFonts({
        Montserrat: require('./assets/fonts/Montserrat.ttf'),
    });


    // imports database
    const dataFour = Data.getData('CabDataFour');
    const dataThree = Data.getData('CabDataThree');
    const dataTwo = Data.getData('CabDataTwo');
    const dataOne = Data.getData('CabDataOne');
    const dataMOne = Data.getData('CabDataMOne');
    const allData = [dataFour, dataThree, dataTwo, dataOne, dataMOne];
    const dataSchemeFour = Data.getData('SchemeFour');
    const dataSchemeThree = Data.getData('SchemeThree');
    const dataSchemeTwo = Data.getData('SchemeTwo');
    const dataSchemeOne = Data.getData('SchemeOne');
    const dataSchemeMOne = Data.getData('SchemeMOne');


    const [modalActive, setModalActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    if (!SyncStorage.get('started_floor')) {
        SyncStorage.set('started_floor', "1"); // начальное состояние - 1 этаж
    }
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (Load.loadData().then((v) => {
            if (v) setIsLoading(false)
        }, (e) => {
            alert(e)
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])
    const [ModalObg, setModalObj] = useState(null);

    // создаем состояние floor и функцию обновления состояния setFloor
    const [floor, setFloor] = useState(Number(SyncStorage.get('started_floor')));
    //                                        ^ берем начальное состояние из локального хранилища на компьютере

    const editFloor = (floor) => {
        setFloor(Number(floor)); // функция, которая изменяет состояние этажа
    }

    function sma(arg) {
        setModalActive(arg);
        setModalObj(null);
    }

    const modal_object = (obj) => {
        setModalActive(true);
        setModalObj(obj);
    }

    useEffect(() => {
        SyncStorage.set('started_floor', floor.toString());
        // eslint-disable-next-line
    }, [floor])

    if (isLoading) return <MainLoader/>
    return (
        <Fl.Provider value={{
            floor,
            setFloor
        }}>
            <Ev.Provider value={{
                isVisible, setIsVisible
            }}>
                <View style={styles.App}>
                    <Search data={allData} editFloor={editFloor} modal_object={modal_object} fl={floor}/>
                    <View style={styles.RightContainer}>
                        <FButton starting_floor={floor} edit={editFloor}/>
                        {/*<Timetable modal_object={modal_object}/>*/}
                        <Evacuation/>
                    </View>
                    <View style={{backgroundColor: "#f2f3da94"}}>
                        <Floor num="4" used={floor === 4} cabData={dataFour} SchemeData={dataSchemeFour}
                               mo={modal_object}/>
                        <Floor num="3" used={floor === 3} cabData={dataThree} SchemeData={dataSchemeThree}
                               mo={modal_object}/>
                        <Floor num="2" used={floor === 2} cabData={dataTwo} SchemeData={dataSchemeTwo}
                               mo={modal_object}/>
                        <Floor num="1" used={floor === 1} cabData={dataOne} SchemeData={dataSchemeOne}
                               mo={modal_object}/>
                        <Floor num="-1" used={floor === -1} cabData={dataMOne} SchemeData={dataSchemeMOne}
                               mo={modal_object}/>
                    </View>
                    <ModalInfo active={modalActive} sma={sma} dataObj={ModalObg}/>
                </View>
            </Ev.Provider>
        </Fl.Provider>
    );
}

export default App;

const styles = StyleSheet.create({
    App: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#f2f3da",
            // fontFamily: "Montserrat"
    },
    RightContainer: {
        zIndex: 100,
        position: "absolute",
        top: 15 + StatusBar.currentHeight,
        right: 0,
        height: 370,
        width: 50,
    },
    text: {
        fontSize: 25,
    },
});
