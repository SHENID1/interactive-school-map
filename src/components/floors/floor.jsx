import React, {useContext, useEffect, useRef, useState} from 'react';
import CabList from "./UI/cabList";
import PolygonX from "./UI/PolygonX";
import {Fl} from "../../context/fl";
import EvacuationST from "../evacuation/evacuationst";
import { ContextMenu } from "@ni7r0g3n/react-context-menu";

const contextStyle = {container: {
    backgroundColor: "white",
        fontWeight: "bold",
    },
    row: {
        normal: {
            color: "black",
            backgroundColor: "#F8D9AD",

        },
        hover: {
            backgroundColor: "#ddd1ff",
        },

    },
}

const Floor = (props) => {
    const [hoverCab, setHoverCab] = useState("None"); // для привязки к выделению svg полигона и надписи выше нее
    const [scale, setScale] = useState(1); // масштаб карты (приближение)
    const [isPressed, setIsPressed] = useState(false); // зажата левая кнопка мыши или нет
    const [beforeXY, setBeforeXY] = useState([]); // сохрание старых координат для получения траектории
    const [translateXY, setTranslateXY] = useState([0, 0]); // тут хранятся координаты для перетаскивания карты
    const [vectorXY, setVectorXY] = useState(0) // сохранение старого вектора для увеличения на устройствах с тачпадом
    const [contextXY, setContextXY] = useState([0, 0])

    const img = require(`../../images/floor/${props.num}.png`); // получение ссылки на изображение
    const {floor} = useContext(Fl); // получаем номер текущего этажа из глобально стейта
    const map = useRef();
    let translateBorder = [(window.innerWidth / 2) - 322, (window.innerHeight / 2) - 241]; // граница карты
    if (translateBorder[0] < 0 || translateBorder[1] < 0) translateBorder = [240, 220]; // граница карты
    // const translateBorder = [638, 229]; // граница карты
    // console.log(translateBorder)

    const calculateVec = ([x1, y1], [x2, y2]) => {
        return Math.abs(Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)))
    }
    const onContextMenu = (e) => {
        const XY = [e.nativeEvent.layerX, e.nativeEvent.layerY]
        setContextXY(XY)
        if (e.nativeEvent.target.className.baseVal !== "svg") {
            setContextXY([e.nativeEvent.srcElement.offsetLeft, e.nativeEvent.srcElement.offsetTop])
        }
        e.preventDefault()
        return false
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
    const translateMap = (ev) => {
        if (isPressed) {
            let newXY = [ev.clientX, ev.clientY]; // новый координаты
            if (!ev.clientY) {
                const sc = ev.touches;
                newXY = [sc[0].screenX, sc[0].screenY]; // новый координаты для телефонов
                if (sc.length === 2) {
                    if (calculateVec(newXY, translateXY) < calculateVec(newXY, [sc[1].screenX, sc[1].screenY])) newXY = [sc[1].screenX, sc[1].screenY];
                    const vecNow = calculateVec([sc[0].clientX, sc[0].clientY], [sc[1].clientX, sc[1].clientY])
                    onWheel((vectorXY - vecNow) / 3)
                    setVectorXY(vecNow)
                }
                if (sc.length > 2) return
            }
            // 1 получаем измение по оси x
            let X = translateXY[0];
            let Y = translateXY[1];
            if (newXY[0] > beforeXY[0]) {
                X += (newXY[0] - beforeXY[0]) / scale;
            } else if (newXY[0] < beforeXY[0]) {
                X += -(beforeXY[0] - newXY[0]) / scale;
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
            if (Math.abs(Y) > translateBorder[1]){
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
        setBeforeXY([e.clientX, e.clientY]);
    }
    const mouseUp = () => {
        setIsPressed(false);
        setBeforeXY([]);
    }

    const items = [
        { label: `X:${contextXY[0]} Y:${contextXY[1]}`, disabled: true, disabledClassName: "disabled"},
        { label: "Создать событие", onClick: () =>
                window.location.replace(`${window.location.href}admin/event/create/${floor}/${contextXY[0]}/${contextXY[1]}`)},
    ];



    return (
        <div
            className={[props.used ? "floor_is_used" : "", isPressed ? "pressed" : "", 'floor'].join(' ')}
            onWheel={(e) => onWheel(e.deltaY)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={() => mouseUp()}
            onMouseMove={(e) => translateMap(e)}
            onTouchStart={(e) => mouseDown(e)}
            onTouchMove={(e) => translateMap(e)}
            onTouchEnd={() => mouseUp()}>
            <ContextMenu items={items} menuStyle={contextStyle} animated={false}>
            <div className="wrapper" id="wrapper" ref={map}
                 style={{transform: `scale(${scale}) translate(${translateXY[0]}px, ${translateXY[1]}px)`}}
                 onContextMenu={onContextMenu}>
                <EvacuationST/>
                <img src={img} alt=""/>
                <svg className="svg">
                    {props.SchemeData.map(el =>
                        <PolygonX key={el.id} isHover={hoverCab === el.id} dataId={el.id} List={props.cabData}
                                  mo={get_mo} points={el.points}/>
                    )}
                </svg>
                    <CabList List={props.cabData} mo={get_mo} HoverTo={hoverTo} HoverFrom={hoverOut}/>
            </div>
            </ContextMenu>
        </div>
    );
};

export default Floor;