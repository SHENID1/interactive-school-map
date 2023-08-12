import React, {useContext} from 'react';
import {Ev} from "../../context/ev";
import {Fl} from "../../context/fl";
import Str1fl from "../../images/EvacuationST/1.png";
import StrM1fl from "../../images/EvacuationST/-1.png";
import Str2fl from "../../images/EvacuationST/2.png";
import Str34fl from "../../images/EvacuationST/34.png";
import {StyleSheet, Image, View} from "react-native";

const EvacuationST = () => {

    const {floor} = useContext(Fl);
    const {isVisible} = useContext(Ev);

    return (
        <View style={!isVisible ? {display : "none"} : styles.evacuationWrapper}>
            {floor === 1  ?   <Image source={Str1fl}  alt="" style={styles.image} />: <></>}
            {floor === -1 ?   <Image source={StrM1fl} alt="" style={styles.image} />: <></>}
            {floor === 2  ?   <Image source={Str2fl}  alt="" style={styles.image} />: <></>}
            {floor === 3  ?   <Image source={Str34fl} alt="" style={styles.image} />: <></>}
            {floor === 4  ?   <Image source={Str34fl} alt="" style={styles.image} />: <></>}
        </View>
    );
};

export default EvacuationST;

const styles = StyleSheet.create({
    evacuationWrapper: {
        zIndex: 3
    },
    image: {
        height: 480,
        zIndex: 1,
        width: 640,
        position: "absolute",
        top: 0,
        left: 0,
    },
});
