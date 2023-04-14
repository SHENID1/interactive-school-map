import React, {useContext} from 'react';
import SelButton from "./button/SelButton";
import {Fl} from "../context/fl";
const FButton = (props) => {
    const {floor, setFloor} = useContext(Fl);
    function click(num){
        num = Number(num);
        props.edit(num);
        setFloor(num);
    }

    return (
        <div className="f_buttons">
            <SelButton name= "4" selected={floor === 4} onClick={click}></SelButton>
            <SelButton name= "3" selected={floor === 3} onClick={click}></SelButton>
            <SelButton name= "2" selected={floor === 2} onClick={click}></SelButton>
            <SelButton name= "1" selected={floor === 1} onClick={click}></SelButton>
            <SelButton name="-1"selected={floor === -1} onClick={click}></SelButton>
        </div>
    );
};

export default FButton;