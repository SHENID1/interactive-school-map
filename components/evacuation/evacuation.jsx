import React, {useState} from 'react';
import EvacuationButton from "./evacuationButton";
import im from "../../images/icons/mchs-logo.jpg"
import {View, Text, Image, StyleSheet, Dimensions, ScrollView, Modal, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const Evacuation = () => {
    const [isOpenRules, setIsOpenRules] = useState(false)

    const OpenRules = () => {
        if (isOpenRules) setIsOpenRules(false)
        else setIsOpenRules(true)
    }
    return (
        <>
            <EvacuationButton OpenRules={OpenRules}/>
            <Modal visible={isOpenRules} animationType="slide" statusBarTranslucent={true}>
                <View style={styles.Rules}>
                    <View style={styles.x}>
                        <Text style={styles.xText} onPress={()=> setIsOpenRules(false)}>X</Text>
                    </View>
                    <View style={styles.safeAreaView}>
                    <ScrollView style={styles.RulesWrapper} contentContainerStyle={styles.homeView}>
                        <Image source={im} alt="" height={115} width={242}/>
                        <Text style={styles.h1}>Памятка</Text>
                        <Text style={styles.bold}>Действия учащихся при возникновении пожара в школе</Text>
                        <Text style={styles.textContent} userSelect={"all"}>
                            1.	При возникновении пожара (вид открытого пламени, запах гари, задымление) немедленно сообщить работнику школы;{"\n"}
                            2.	Не поддаваться панике! Внимательно слушать оповещение по школе и действовать согласно указаниям сотрудников школы. Находится возле учителя. Строго выполнять его распоряжения.{"\n"}
                            3.	Построиться быстро, без паники. Не толкать друг друга. Запомнить кто стоит рядом, кто впереди и позади вас. Важно не потерять никого. Выходить по плану эвакуации. При выходе из здания школы находиться в месте, указанном учителем;{"\n"}
                            4.	Если основные пути эвакуации отрезаны огнем или дымом, а вы находитесь в верхних этажах здания школы. Не пытайтесь проскочить. Зайдите в класс или в другое любое помещение с окнами, где нет дыма. Необходимо позаботиться об изоляции помещения, в котором вы находитесь, от проникновения в него дыма и огня. Закройте дверь и законопатьте тряпками все щели в двери и вентиляционной решетке. Тряпки лучше сначала смочить. В качестве ткани можно использовать занавески с окон, детали одежды;{"\n"}
                            5.	Не открывайте окна! Это может усилить тягу и приток дыма. Если в помещение попал дым, приоткройте окно и лягте на пол. Примерно в 15-ти сантиметрах от пола есть пространство с чистым воздухом. Дышать лучше через мокрую ткань или закрыв органы дыхания одеждой;{"\n"}
                            6.	Нельзя прятаться во время пожара под парту, в шкаф: от огня и дыма спрятаться невозможно;{"\n"}
                            7.	Норматив времени прибытия пожарных подразделений в Москве составляет не более 10 минут. При приезде пожарных необходимо открыть окно и позвать на помощь голосом и взмахами рук. Из горящих и отрезанных дымом помещений пожарные спасают учащихся через окна по ручным пожарным лестницам, спасательным рукавам, с помощью спасательных верёвок. Могут применяться пневматические спасательные устройства и натяжные полотна;{"\n"}
                            8.	Обучающимся не разрешается участвовать в пожаротушении здания и эвакуации его имущества;{"\n"}
                            9.	Обо всех полученных травмах (раны, порезы, ушибы, ожоги и т.д.) обучающиеся и их одноклассники обязаны немедленно сообщить учителю.{"\n"}
                        </Text>
                        <Text style={styles.h1} >Памятка</Text>
                        <Text style={styles.bold}>Действия учащихся в случае вооруженного нападения</Text>
                        <Text style={styles.textContent}>
                        Если вы услышали звук выстрела/взрыв, увидели вооруженного человека, услышали сообщение по громкоговорящей связи, получили информацию от сотрудника охраны/педагога/сотрудника школы о человеке или группе людей, вооруженных огнестрельным оружием:{"\n"}
                        1.	Не паниковать! Действовать по указанию педагога;{"\n"}
                        2.	Скрыться в классе или любом ином помещении;{"\n"}
                        3.	Запереть класс на ключ изнутри (если помещение без замка – забаррикадировать дверь мебелью: парты, стулья);{"\n"}
                        4.	Отойти дальше от входной двери и окон. При наличии в классе дополнительных помещений необходимо изолироваться в них. Не пытаться самостоятельно эвакуироваться, в том числе через окно;{"\n"}
                        5.	Все гаджеты перевести на беззвучный режим, вибросигнал отключить;{"\n"}
                        6.	Позвонить по телефону 112 и сообщить о нападении;{"\n"}
                        7.	Отключить все возможные источники шума и освещение;{"\n"}
                        8.	В случае штурма лечь под парты, прикрыть голову руками и использовать парты как щит;{"\n"}
                        9.	Ждать помощи, она обязательно придет!{"\n"}
                        </Text>
                    </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Evacuation;

const styles = StyleSheet.create({
    Rules: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 9999,
        marginTop: Constants.statusBarHeight,
    },
    none: {
        display: "none",
    },
    x: {
        position: "absolute",
        top: -10,
        right: 25,
        zIndex: 999,
    },
    xText: {
        fontSize: 30,
        // fontFamily: "grafity",
    },
    RulesWrapper: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: 20,
        height: "auto",
        flexGrow: 1,
        marginTop: 0,
        marginBottom: 20,
    },
    textContent: {
        textAlign: "left"
    },
    safeAreaView: {
    },
    homeView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 30
    },
    bold: {
        fontWeight: "bold"
    }
})