import React from 'react';
import {Text, StyleSheet, Button} from "react-native"
import {TouchableOpacity, View} from "react-native";


const SelButton = ({name, selected, onClick}) => {

    return (
        // <><Button
        //     disabled={selected}
        //     style={ selected ? style.selected : style.selBtn}
        //     onPress={() => onClick(name)}
        //     title={name}
        //     color="#f194ff"
        // />
        <TouchableOpacity disabled={selected} onPress={() => onClick(name)}>
            <View style={[selected ? style.selected : {backgroundColor: "#00ff4c00"} , style.selBtn]}>
                <Text>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SelButton;


const style = StyleSheet.create({
    selected: {
        backgroundColor: "#00b3ff8b",
    },
    selBtn: {
        height: 50,
        width: 50,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        cursor: "pointer",
        color: "#000000"
    }
});