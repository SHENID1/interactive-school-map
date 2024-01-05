import React, {useContext} from 'react';
import EventIcon  from "../../images/icons/Event_icon.png"
import {EventContext} from "../../context/eventContext";
import {View, StyleSheet, TouchableOpacity, Image} from "react-native";



const EventRight = () => {
    const {isEventPointVisible, setIsEventPointVisible} = useContext(EventContext);

    return (
        <>
            <TouchableOpacity onPress={() => setIsEventPointVisible(!isEventPointVisible)}>
                <View style={isEventPointVisible ? styles.icon_active : styles.icon}>
                   <Image source={EventIcon} alt="" style={styles.img}/>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default EventRight;

const styles = StyleSheet.create({
    icon: {
        height: 50,
        width: 50,
        backgroundColor: "#b3faff",
        borderRadius: 10,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    icon_active: {
        height: 50,
        width: 50,
        borderRadius: 10,
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "#51d4ff",
    },
    img: {
        height: 50,
        width: 36,
    },
})