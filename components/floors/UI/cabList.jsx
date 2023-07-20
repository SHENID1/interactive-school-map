import React from 'react';
import {View, StyleSheet, Text, Image, TouchableWithoutFeedback } from "react-native";


const CabList = ({List, HoverTo, HoverFrom, mo}) => {
    const man = require("../../../images/icons/men_wc.png");
    const woman = require("../../../images/icons/women_wc.png");
    const dressing_room = require("../../../images/icons/icon-dressing-room.png");
    return (
        <>
            {List.map(cab =>
                <TouchableWithoutFeedback onPress={() => mo(cab)} key={cab.id} >
                <View style={styles.cabName}>
                    {cab.name === "WC"?
                            <Image style={{top: cab.top , left: cab.left, height: cab.fontsize, width: cab.fontsize}} source={cab.pol === "мужской"?man:woman} alt={cab.name}/>
                        :cab.name === "DR"?
                            <Image style={{top: cab.top , left: cab.left, height: cab.fontsize, width: cab.fontsize}} source={dressing_room} alt={cab.name}/>
                         :
                            <Text style={{top: cab.top , left: cab.left, fontSize: cab.fontsize}}>{cab.name}</Text> //+ "(" + cab.id + ")"
                    }
                </View>
                </TouchableWithoutFeedback>
            )}
        </>
    );
};

export default CabList;

const styles = StyleSheet.create({
    cabName: {
        fontSize: 20,
        top: 0,
        left: 0,
        fontWeight: "bold",
        color: "black",
        position: "absolute",
        borderRadius: 3,
        zIndex: 3,
        cursor: "pointer",
    },
    wrapper: {
        position: "relative",
        height: 482,
        width: 645,
    }
})

// ()=> mo(cab)