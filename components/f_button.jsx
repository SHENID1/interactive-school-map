import React, {useContext} from 'react';
import SelButton from "./SelButton";
import {Fl} from "../context/fl";
import {Platform, StatusBar, StyleSheet} from "react-native";
import {View} from "react-native";
const topValue = Platform.OS === "android" ? StatusBar.currentHeight : 0;

const FButton = (props) => {
    const {floor, setFloor} = useContext(Fl);
    function click(num) {
        num = Number(num);
        props.edit(num);
        setFloor(num);
    }

    return (
        <View style={style.F_buttons}>
            <SelButton name="4"  selected={floor === 4}  onClick={click}/>
            <SelButton name="3"  selected={floor === 3}  onClick={click}/>
            <SelButton name="2"  selected={floor === 2}  onClick={click}/>
            <SelButton name="1"  selected={floor === 1}  onClick={click}/>
            <SelButton name="-1" selected={floor === -1} onClick={click}/>
        </View>
    );
};

export default FButton;


const style = StyleSheet.create({
    F_buttons: {
        zIndex: 800,
        // position: "absolute",
        // top: 5 + topValue,
        // right: 0,
        height: "auto",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        backgroundColor: "#B3FAFF",
        borderRadius: 20,
        textAlign: "center",
    }
});