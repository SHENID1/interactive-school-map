import React from 'react';
import {Polygon} from "react-native-svg"
import {TouchableOpacity, StyleSheet} from "react-native";

const PolygonX = ({dataId, points, isHover, List, mo}) => {
    let obj = List.find(el => el.id === Number(dataId));

    return (
        <TouchableOpacity onPush={() => mo(obj)}>
            <Polygon style={isHover ? styles.cabHover : " "} points={points} fill={"#ffdba478"}></Polygon>
        </TouchableOpacity>
    );
};

export default PolygonX;

const styles = StyleSheet.create({
    cabHover: {

    }
})