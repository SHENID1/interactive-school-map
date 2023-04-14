import React, {useContext} from 'react';
import strelka from '../../images/icons/strelka.svg';
import cl from "./evacuation.module.css";
import {Ev} from "../../context/ev";
import {Fl} from "../../context/fl";
import Data from "../../api/getData"
import Str1fl from "../../images/icons/стрелки 1 этажа_Монтажная область 1.svg"
import StrM1fl from "../../images/icons/-1 str_Монтажная область 1.svg"

const EvacuationST = () => {

    const {floor} = useContext(Fl);
    const {isVisible} = useContext(Ev);

    const dataFour = Data.getData('EvacuationFour');
    const dataThree = Data.getData('EvacuationThree');
    const dataTwo = Data.getData('EvacuationTwo');
    //const dataOne = Data.getData('EvacuationOne');
    //const dataMOne = Data.getData('EvacuationMOne');
    let data;
    switch (floor){
        case 4:
            data = dataFour;
            break;
        case 3:
            data = dataThree;
            break;
        case 2:
            data = dataTwo;
            break;
        case 1:
            data = undefined;
            break;
        case -1:
            data = undefined;
            break;
        default:
            console.log("Error in evacuation.jsx 41 NO DATA")
            data = [];
    }
    return (
        <div className={[isVisible ? "" : "none", cl.evacuationWrapper].join(' ')}>
            {floor === 1?   <img src={Str1fl} alt="" className={cl.image} />: <></>}
            {floor === -1?   <img src={StrM1fl} alt="" className={cl.image} />: <></>}
            {data?.map(str =>
                <img key={Math.random()} src={strelka} className={cl.evacuation} alt="" style={{zIndex:999,top:`${str.y}px`, left:`${str.x}px` ,transform: `rotate(${str.deg}deg)`}}/>)
            }
        </div>
    );
};

export default EvacuationST;