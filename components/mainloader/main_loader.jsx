import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Text, StyleSheet} from "react-native";
import Constants from "expo-constants";


const MainLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={{marginTop: 15}}>Загрузка ...</Text>
        </View>
    );
};

export default MainLoader;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: Constants.statusBarHeight,
    }
})