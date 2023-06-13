import React from 'react';
import {View, StyleSheet, Text, Image} from "react-native";


const CabList = ({List, HoverTo, HoverFrom, mo}) => {
    const man = require("../../../images/icons/men_wc.png");
    const woman = require("../../../images/icons/women_wc.png");
    const dressing_room = require("../../../images/icons/icon-dressing-room.png");
    return (
        <View>

            {List.map(cab =>
                <View key={cab.id} onClick={()=> mo(cab)} style={{top: cab.top , left: cab.left, fontSize: cab.fontsize + styles.cabName}} onMouseOver={()=> HoverTo(cab.id)}
                     onMouseOut={()=> HoverFrom()}>
                    {cab.name === "WC"?
                        <Image height={cab.fontsize} width={cab.fontsize} source={cab.pol === "мужской"?man:woman} alt={cab.name}/>
                        :cab.name === "DR"?
                            <Image height={cab.fontsize} width={cab.fontsize} source={dressing_room} alt={cab.name}/>
                         :<Text>cab.name</Text> //+ "(" + cab.id + ")"
                    }
                </View>
            )}
        </View>
    );
};

export default CabList;

const styles = StyleSheet.create({
    cabName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        position: "absolute",
        borderRadius: 3,
        top: 0,
        left: 0,
        zIndex: 3,
        cursor: "pointer",
    }
})