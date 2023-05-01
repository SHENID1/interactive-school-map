import React from 'react';
import styled from 'styled-components/native'
import {ActivityIndicator} from 'react-native';
import {Text} from "react-native";

const ContainerView = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
`

const MainLoader = () => {
    return (
        <ContainerView>
            <ActivityIndicator size="large" />
            <Text style={{marginTop: 15}}>Загрузка ...</Text>
        </ContainerView>
    );
};

export default MainLoader;