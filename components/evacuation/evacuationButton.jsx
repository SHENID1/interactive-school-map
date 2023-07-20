import React, {useContext} from 'react';
import icon from "../../images/icons/icon-exit.png";
import RulesIcon from "../../images/icons/rules-icon-button.png"
import {Ev} from "../../context/ev";
import {View, Image, StyleSheet, TouchableOpacity } from "react-native";
// import cl from "./evacuation.module.css";


const EvacuationButton = (props) => {
    const {isVisible, setIsVisible} = useContext(Ev);

    const editOnClick = () => setIsVisible(!isVisible);

    return (
        <>
            <TouchableOpacity onPress={() => editOnClick()}>
                <View style={isVisible ? styles.ActiveEvacuationButton : styles.EvacuationButton}>
                    <Image style={{width: 45, height: 45}} alt="" source={icon} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.OpenRules()}>
                <View style={isVisible ? styles.EvRulesButton : styles.none}>
                    <Image style={{width: 45, height: 45}} alt="" source={RulesIcon}/>
                </View>
            </TouchableOpacity >
        </>
    );
};

export default EvacuationButton;

const styles = StyleSheet.create({
    ActiveEvacuationButton: {
        width: 50,
        height: 50,
        marginTop: 10,
        backgroundColor: "rgb(20, 255, 0)",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    EvacuationButton: {
        width: 50,
        height: 50,
        marginTop: 10,
        backgroundColor: "#B3FAFF",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    EvRulesButton: {
        width: 50,
        height: 50,
        marginTop: 10,
        backgroundColor: "#B3FAFF",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    none: {
        display: "none"
    }
})