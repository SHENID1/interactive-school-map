import React, {useContext} from 'react';
import {Ev} from "../../context/ev";
import {Fl} from "../../context/fl";
import Str1fl from "../../images/icons/стрелки 1 этажа_Монтажная область 1.svg"
import StrM1fl from "../../images/icons/-1 str_Монтажная область 1.svg"
import Str2fl from "../../images/icons/2 str_Монтажная область 1.svg"
import Str34fl from "../../images/icons/3 str_Монтажная область 1.svg"
import styled from "styled-components"
import {StyleSheet, Image} from "react-native";
import {View} from "react-native-web";

const EvacuationST = () => {

    const {floor} = useContext(Fl);
    const {isVisible} = useContext(Ev);

    return (
        <View styles={isVisible ? {} : {display : "none"} + cl.evacuationWrapper}>
            {floor === 1?   <ImageView src={Str1fl}  alt="" />: <></>}
            {floor === -1?  <ImageView src={StrM1fl} alt="" />: <></>}
            {floor === 2?   <ImageView src={Str2fl}  alt="" />: <></>}
            {floor === 3?   <ImageView src={Str34fl} alt="" />: <></>}
            {floor === 4?   <ImageView src={Str34fl} alt="" />: <></>}
        </View>
    );
};

export default EvacuationST;

const ImageView = styled.Image`
  height: 480px;
  z-index: 99 !important;
  width: 640px;
  position: absolute !important;
  top: 0px;
  left: 0px;
`;
const cl = StyleSheet.create({
    evacuationWrapper: {
        zIndex: 1
    }
});
