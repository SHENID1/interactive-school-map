import React, {useEffect, useState} from "react";
import {Fl} from "./context/fl";
import {Ev} from "./context/ev";
import MainLoader from "./components/mainloader/main_loader";
import {SafeAreaView, StatusBar, StyleSheet, View, Platform} from "react-native"
import Data from "./api/getData"
import FButton from "./components/f_button";
import Floor from "./components/floors/floor";
import ModalInfo from "./components/ModalInfo/ModalInfo";
import Search from "./components/search/search";
import TimetableView from "./components/timetable/timetable";
import Evacuation from "./components/evacuation/evacuation";
import {EventContext} from "./context/eventContext";
import EventRight from "./components/event/eventRightButton";

function App() {

    // imports database
    const dataFour = Data.getDataWithJsonParse('CabDataFour');
    const dataThree = Data.getDataWithJsonParse('CabDataThree');
    const dataTwo = Data.getDataWithJsonParse('CabDataTwo');
    const dataOne = Data.getDataWithJsonParse('CabDataOne');
    const dataMOne = Data.getDataWithJsonParse('CabDataMOne');
    const allData = [dataFour, dataThree, dataTwo, dataOne, dataMOne];
    const dataSchemeFour = Data.getDataWithJsonParse('SchemeFour');
    const dataSchemeThree = Data.getDataWithJsonParse('SchemeThree');
    const dataSchemeTwo = Data.getDataWithJsonParse('SchemeTwo');
    const dataSchemeOne = Data.getDataWithJsonParse('SchemeOne');
    const dataSchemeMOne = Data.getDataWithJsonParse('SchemeMOne');


    const [modalActive, setModalActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isEventPointVisible, setIsEventPointVisible] = useState(false)

    if (!Data.getData('started_floor')) {
        Data.setData('started_floor', "1"); // начальное состояние - 1 этаж
    }


    const [isLoading, setIsLoading] = useState(true);
    const [ModalObg, setModalObj] = useState(null);

    // создаем состояние floor и функцию обновления состояния setFloor
    const [floor, setFloor] = useState(Number(Data.getData('started_floor')));
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
        if (!Data.getData('started_floor')) {
            Data.setData('started_floor', floor.toString());
        }
        // eslint-disable-next-line
    }, [floor])

    if (isLoading) return <MainLoader isLoading={isLoading} setIsLoading={setIsLoading}/>
    // console.log()

    return (
        <Fl.Provider value={{
            floor,
            setFloor
        }}>
            <Ev.Provider value={{
                isVisible, setIsVisible
            }}>
                <EventContext.Provider value={{
                    isEventPointVisible, setIsEventPointVisible
                }}>
                    <SafeAreaView style={styles.App}>
                        <StatusBar
                            backgroundColor="white"
                            barStyle={"dark-content"}
                            showHideTransition={"none"}
                            hidden={false}
                        />
                        <Search data={allData} editFloor={editFloor} modal_object={modal_object} fl={floor}/>
                        <View style={styles.RightContainer}>
                            <FButton starting_floor={floor} edit={editFloor}/>
                            <TimetableView modal_object={modal_object}/>
                            <Evacuation/>
                            <EventRight/>
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
                    </SafeAreaView>
                </EventContext.Provider>
            </Ev.Provider>
        </Fl.Provider>
    );
}

export default App;

const styles = StyleSheet.create({
    App: {
        flex: 1,
        backgroundColor: "#f2f3da",
        // fontFamily: "Montserrat"
    },
    RightContainer: {
        zIndex: 100,
        position: "absolute",
        top: 45 + (Platform.OS === "ios" ? StatusBar.currentHeight : 0),
        right: 0,
        height: 370,
        width: 50,
    },
    text: {
        fontSize: 25,
    },
});
