import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import MovableView from "react-native-movable-view";
import {Svg, Polygon} from "react-native-svg"

const Map = () => {
    return (
        <View>
            <MovableView>
                <View style={styles.cont}>
                    <Image source={require('../../src/images/floor/1.png')}/>
                    <Svg height="100" width="100">
                        <Polygon
                            points="40,5 70,80 25,95"
                            fill="lime"
                            stroke="purple"
                            strokeWidth="1"
                        />
                    </Svg>
                </View>
            </MovableView>
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    cont: {
        zIndex: 1,
        height: 482,
        width: 645,
        top: 0,
        left: 0,
        right: 0,
    }
})