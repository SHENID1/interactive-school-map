import React, {useContext} from 'react';
import icon from "../../images/icons/icon-exit.png";
import RulesIcon from "../../images/icons/rules-icon-button.png"
import {Ev} from "../../context/ev";
import cl from "./evacuation.module.css";

const EvacuationButton = (props) => {
    const {isVisible, setIsVisible} = useContext(Ev);

    function editOnClick(){
        if (isVisible === true){
            setIsVisible(false);
        }
        else{
            setIsVisible(true);
        }
    }
    return (
        <>
            <div className={isVisible ? cl.ActiveEvacuationButton : cl.EvacuationButton}
                 onClick={()=>editOnClick()}>
                <img  width={"44px"} height={"44px"} src={icon} alt=""/>
            </div>
            <div className={isVisible ? cl.EvRulesButton : 'none'}
            onClick={()=> props.OpenRules()}>
                <img  width={"45px"} height={"45px"} src={RulesIcon} alt=""/>
            </div>
        </>
    );
};

export default EvacuationButton;