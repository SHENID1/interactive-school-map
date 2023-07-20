import React from 'react';
import {Polygon} from "react-native-svg"
import {StyleSheet} from "react-native";

const PolygonX = ({dataId, points, isHover, List, mo}) => {
    let obj = List.find(el => el.id === Number(dataId));

    return (
            <Polygon onPress={() => mo(obj)} style={isHover ? styles.cabHover : {}} points={points} fill={isHover ? "#ffc60b9d" : "#ffdba478"}></Polygon>
    );
};

export default PolygonX;

const styles = StyleSheet.create({
    cabHover: {

    }
})
//onPush={() => mo(obj)}