import React from 'react';
import {View} from "react-native";
import {Image} from "react-native";
import MovableView from "react-native-movable-view";

const Map = () => {
    return (
        <View>
            <MovableView>
                <Image source={require('../../src/images/floor/1.png')}/>
            </MovableView>
        </View>
    );
};

export default Map;