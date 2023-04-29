import React, {useContext} from 'react';
import cl from "./evacuation.module.css";
import {Ev} from "../../context/ev";
import {Fl} from "../../context/fl";
import Str1fl from "../../images/icons/стрелки 1 этажа_Монтажная область 1.svg"
import StrM1fl from "../../images/icons/-1 str_Монтажная область 1.svg"
import Str2fl from "../../images/icons/2 str_Монтажная область 1.svg"
import Str34fl from "../../images/icons/3 str_Монтажная область 1.svg"
const EvacuationST = () => {

    const {floor} = useContext(Fl);
    const {isVisible} = useContext(Ev);

    return (
        <div className={[isVisible ? "" : "none", cl.evacuationWrapper].join(' ')}>
            {floor === 1?   <img src={Str1fl} alt="" className={cl.image} />: <></>}
            {floor === -1?   <img src={StrM1fl} alt="" className={cl.image} />: <></>}
            {floor === 2?   <img src={Str2fl} alt="" className={cl.image} />: <></>}
            {floor === 3?   <img src={Str34fl} alt="" className={cl.image} />: <></>}
            {floor === 4?   <img src={Str34fl} alt="" className={cl.image} />: <></>}
        </div>
    );
};

export default EvacuationST;