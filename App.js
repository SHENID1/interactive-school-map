//import FButton from "./components/f_button";
import React, {useEffect, useState} from "react";
//import ModalInfo from "./components/ModalInfo/ModalInfo";
import Floor from "./components/floors/floor";
//import Search from "./components/search/search";
import {Fl} from "./context/fl";
import {Ev} from "./context/ev";
//import Timetable from "./components/timetable/timetable";
import MainLoader from "./components/mainloader/main_loader";
import Load from "./api/load";
import Data from "./api/getData"
import {Platform, StatusBar, StyleSheet, View} from "react-native"
//import Evacuation from "./components/evacuation/evacuation";
import SyncStorage from 'sync-storage';

function App() {

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

    useEffect(()=>{
        (Load.loadData().then((v) => {
            if (v) setIsLoading(false)
        }, (e) =>{
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
            <View styles={style.App}>
                {/*<div className={"map"} id="map">*/}
                {/*    <Search data={allData} editFloor={editFloor} modal_object={modal_object} fl={floor}/>*/}
                {/*    <div className="rightContainer">*/}
                {/*        <FButton starting_floor={floor} edit={editFloor}></FButton>*/}
                {/*        <Timetable modal_object={modal_object}/>*/}
                {/*        <Evacuation/>*/}
                {/*    </div>*/}
                {/*    <div className="floors">*/}
                {/*        <Floor num="4" used={floor === 4} cabData={dataFour} SchemeData={dataSchemeFour}*/}
                {/*               mo={modal_object}></Floor>*/}
                {/*        <Floor num="3" used={floor === 3} cabData={dataThree} SchemeData={dataSchemeThree}*/}
                {/*               mo={modal_object}></Floor>*/}
                {/*        <Floor num="2" used={floor === 2} cabData={dataTwo} SchemeData={dataSchemeTwo}*/}
                {/*               mo={modal_object}></Floor>*/}
                {/*        <Floor num="1" used={floor === 1} cabData={dataOne} SchemeData={dataSchemeOne}*/}
                {/*               mo={modal_object}></Floor>*/}
                {/*        <Floor num="-1" used={floor === -1} cabData={dataMOne} SchemeData={dataSchemeMOne}*/}
                {/*               mo={modal_object}></Floor>*/}
                {/*    </div>*/}
                {/*    <ModalInfo active={modalActive} sma={sma} dataObj={ModalObg}/>*/}
                {/*</div>*/}
            </View>
            </Ev.Provider>
        </Fl.Provider>
    );
}

export default App;

const style = StyleSheet.create({
    App: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
});