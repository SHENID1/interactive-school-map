import React from 'react';
import {View} from "react-native";
import {Image} from "react-native";
import MovableView from "react-native-movable-view";
import styled from 'styled-components/native'
import {Svg, Polygon} from "react-native-svg"

const ContView = styled.View`
    z-index: 1;
    height: 482px;
    width: 645px;
    top: 0px;
    left: 0px;
    right: 0;
`;

const Map = () => {
    return (
        <View>
            <MovableView>
                <ContView>
                    <Image source={require('../../src/images/floor/1.png')}/>
                    <Svg height="100" width="100">
                        <Polygon
                            points="40,5 70,80 25,95"
                            fill="lime"
                            stroke="purple"
                            strokeWidth="1"
                        />
                    </Svg>
                </ContView>
            </MovableView>
        </View>
    );
};

export default Map;