import React, {useContext, useEffect, useState} from 'react';
import CabList from "./UI/cabList";
import PolygonX from "./UI/PolygonX";
import {Fl} from "../../context/fl";
import EvacuationST from "../evacuation/evacuationst";
import {StyleSheet, View, Image, Dimensions} from "react-native";
import {Svg} from "react-native-svg"


function getFloor(props) {
    let floorImage;
    if (props.num === "1") {
        floorImage = require('../../images/floor/1.png');
    } else if (props.num === "2") {
        floorImage = require('../../images/floor/2.png');
    } else if (props.num === "3") {
        floorImage = require('../../images/floor/3.png');
    } else if (props.num === "-1") {
        floorImage = require('../../images/floor/m1.png');
    } else if (props.num === "4") {
        floorImage = require('../../images/floor/4.png');
    }
    return floorImage;
}

const Floor = (props) => {
    const [hoverCab, setHoverCab] = useState("None"); // для привязки к выделению svg полигона и надписи выше нее
    const [scale, setScale] = useState(1); // масштаб карты (приближение)
    const [isPressed, setIsPressed] = useState(false); // зажата левая кнопка мыши или нет
    const [beforeXY, setBeforeXY] = useState([]); // сохрание старых координат для получения траектории
    const [translateXY, setTranslateXY] = useState([0, 0]); // тут хранятся координаты для перетаскивания карты
    const [vectorXY, setVectorXY] = useState(0) // сохранение старого вектора для увеличения на устройствах с тачпадом
    let img;
    if (props.num){
        img = getFloor(props); // получение ссылки на изображение
    }
    else{
        img = require(`../../images/floor/1.png`); // получение ссылки на изображение
    }
    // console.log(img)
    const {floor} = useContext(Fl); // получаем номер текущего этажа из глобально стейта
    let translateBorder = [(Dimensions.get('window').width / 2) - 322, (Dimensions.get('window').height / 2) - 241]; // граница карты
    if (translateBorder[0] < 0 || translateBorder[1] < 0) translateBorder = [240, 220]; // граница карты
    // const translateBorder = [638, 229]; // граница карты
    // console.log(translateBorder)

    const calculateVec = ([x1, y1], [x2, y2]) => {
        return Math.abs(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)))
    }

    const get_mo = (obj) => {
        if (!obj) return;
        if (obj.type === 2 || obj.type === 0) return;
        props.mo(obj);
    }

    function hoverTo(dataId) {
        setHoverCab(dataId);
    }

    function hoverOut() {
        setHoverCab("None");
    }

    useEffect(() => {
        setScale(1); // обнуление масштабировании при переходе на другой этаж
    }, [floor])
    
    const translateMap = (ev) => {
        if (isPressed) {
            let newXY = [ev.nativeEvent.pageX, ev.nativeEvent.pageY]; // новый координаты
            if (ev.nativeEvent.pageX) {
                const sc = ev.nativeEvent.touches;
                newXY = [sc[0].pageX, sc[0].pageY]; // новый координаты для телефонов
                if (sc.length === 2) {
                    if (calculateVec(newXY, translateXY) < calculateVec(newXY, [sc[1].pageX, sc[1].pageY])) newXY = [sc[1].pageX, sc[1].pageY];
                    const vecNow = calculateVec([sc[0].pageX, sc[0].pageY], [sc[1].pageX, sc[1].pageY])
                    if (vectorXY !== 0) onWheel((vectorXY - vecNow) / 10)
                    setVectorXY(vecNow)
                }
                if (sc.length > 2) return
                //setVectorXY(0)
            }
            // 1 получаем измение по оси x
            let X = translateXY[0];
            let Y = translateXY[1];
            if (newXY[0] > beforeXY[0]) {
                X += (newXY[0] - beforeXY[0]) / scale;
            } else if (newXY[0] < beforeXY[0]) {
                X -= (beforeXY[0] - newXY[0]) / scale;

            }

            if (Math.abs(X) > translateBorder[0]) X = translateXY[0];
            if (Math.abs(X) > translateBorder[0]) {
                setTranslateXY([0, 0]);
                setBeforeXY([]);
                setIsPressed(false);
                setScale(1);
                return;
            }
            // 2 получаем измение по оси y
            if (newXY[1] > beforeXY[1]) {
                Y += (newXY[1] - beforeXY[1]) / scale;
            } else if (newXY[1] < beforeXY[1]) {
                Y += -(beforeXY[1] - newXY[1]) / scale;
            }
            if (Math.abs(Y) > translateBorder[1]) Y = translateXY[1];
            if (Math.abs(Y) > translateBorder[1]) {
                setTranslateXY([0, 0]);
                setBeforeXY([]);
                setIsPressed(false);
                setScale(1);
                return;
            }
            // if ((Math.abs(X) > translateBorder[0]) || (Math.abs(Y) > translateBorder[1])) return
            // if (calculateVec([translateXY[0], translateXY[1]],[X, Y]) > 100) return;

            setTranslateXY([X, Y]);
            setBeforeXY(newXY);
        }
    }

    const mouseDown = (e) => {
        setIsPressed(true);
        setBeforeXY([e.nativeEvent.pageX, e.nativeEvent.pageY]);
    }
    const onWheel = (y) => {
        // прокрутка колесиком мыши
        if (y > 0) { // - уменьшение
            if (scale > 0) {
                let b = scale + parseFloat(`-0.${y}`)
                if (b <= 0.8) setScale(0.6);
                else setScale(b);
            }
        }
        if (y < 0) { // + увеличение
            if (scale < 5) {
                let b = scale + parseFloat(`0.${-y}`)
                if (b >= 4) setScale(4);
                else setScale(b);
            }
        }
    }
    const mouseUp = (e) => {
        setIsPressed(false);
        setBeforeXY([]);
        setVectorXY(0)
    }
    if (!props.used) return <></>

    return (
        <View
            style={[styles.floor_is_used, isPressed ? styles.pressed : {}, styles.floor]}
            onTouchStart={mouseDown}
            onTouchMove={translateMap}
            onTouchEnd={mouseUp}
                >
                <View
                     style={[styles.wrapper, {transform: [{scale: scale}, {translateX: translateXY[0]}, {translateY: translateXY[1]}]}]}>
                    <EvacuationST/>
                    <Image source={img} alt=""></Image>
                    <Svg style={styles.svg}>
                        {props.SchemeData.map(el =>
                            <PolygonX key={el.id} isHover={hoverCab === el.id} dataId={el.id} List={props.cabData}
                                      mo={get_mo} points={el.points}></PolygonX>
                        )}
                    </Svg>
                    <CabList List={props.cabData} mo={get_mo} HoverTo={hoverTo} HoverFrom={hoverOut}/>
                </View>
        </View>
        // <Map/>
    );
};

export default Floor;

const styles = StyleSheet.create({
    wrapper: {
        position: "relative",
        height: 482,
        width: 645,
    },
    svg: {
        zIndex: 1,
        height: 482,
        width: 645,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
    },
    floor_is_used: {
        display: "flex"
    },
    pressed: {
        cursor: "grabbing"
    },
    floor: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }
})
