import React, {useState} from 'react';
import EvacuationButton from "./evacuationButton";
import im from "../../images/icons/mchs-logo.jpg"

const Evacuation = () => {
    const [isOpenRules, setIsOpenRules] = useState(false)

    const OpenRules = () => {
        if (isOpenRules) setIsOpenRules(false)
        else setIsOpenRules(true)
    }
    return (
        <>
            <EvacuationButton OpenRules={OpenRules}/>
            <div className={isOpenRules ? cl.Rules : "none"}>
                <div className={cl.x} onClick={()=> setIsOpenRules(false)}>X</div>
                <div className={cl.RulesWrapper}>
                    <img src={im} alt="" height={'auto'} width={"auto"}/>
                    <h1>Памятка</h1>
                    <h2>Действия учащихся при возникновении пожара в школе</h2>
                    <div className={cl.textContent}>
                        1.	При возникновении пожара (вид открытого пламени, запах гари, задымление) немедленно сообщить работнику школы;<br/>
                        2.	Не поддаваться панике! Внимательно слушать оповещение по школе и действовать согласно указаниям сотрудников школы. Находится возле учителя. Строго выполнять его распоряжения.<br/>
                        3.	Построиться быстро, без паники. Не толкать друг друга. Запомнить кто стоит рядом, кто впереди и позади вас. Важно не потерять никого. Выходить по плану эвакуации. При выходе из здания школы находиться в месте, указанном учителем;<br/>
                        4.	Если основные пути эвакуации отрезаны огнем или дымом, а вы находитесь в верхних этажах здания школы. Не пытайтесь проскочить. Зайдите в класс или в другое любое помещение с окнами, где нет дыма. Необходимо позаботиться об изоляции помещения, в котором вы находитесь, от проникновения в него дыма и огня. Закройте дверь и законопатьте тряпками все щели в двери и вентиляционной решетке. Тряпки лучше сначала смочить. В качестве ткани можно использовать занавески с окон, детали одежды;<br/>
                        5.	Не открывайте окна! Это может усилить тягу и приток дыма. Если в помещение попал дым, приоткройте окно и лягте на пол. Примерно в 15-ти сантиметрах от пола есть пространство с чистым воздухом. Дышать лучше через мокрую ткань или закрыв органы дыхания одеждой;<br/>
                        6.	Нельзя прятаться во время пожара под парту, в шкаф: от огня и дыма спрятаться невозможно;<br/>
                        7.	Норматив времени прибытия пожарных подразделений в Москве составляет не более 10 минут. При приезде пожарных необходимо открыть окно и позвать на помощь голосом и взмахами рук. Из горящих и отрезанных дымом помещений пожарные спасают учащихся через окна по ручным пожарным лестницам, спасательным рукавам, с помощью спасательных верёвок. Могут применяться пневматические спасательные устройства и натяжные полотна;<br/>
                        8.	Обучающимся не разрешается участвовать в пожаротушении здания и эвакуации его имущества;<br/>
                        9.	Обо всех полученных травмах (раны, порезы, ушибы, ожоги и т.д.) обучающиеся и их одноклассники обязаны немедленно сообщить учителю.<br/>
                    </div>
                    <h1>Памятка</h1>
                    <h2>Действия учащихся в случае вооруженного нападения</h2>
                    <div className={cl.textContent}>
                    Если вы услышали звук выстрела/взрыв, увидели вооруженного человека, услышали сообщение по громкоговорящей связи, получили информацию от сотрудника охраны/педагога/сотрудника школы о человеке или группе людей, вооруженных огнестрельным оружием:<br/>
                    1.	Не паниковать! Действовать по указанию педагога;<br/>
                    2.	Скрыться в классе или любом ином помещении;<br/>
                    3.	Запереть класс на ключ изнутри (если помещение без замка – забаррикадировать дверь мебелью: парты, стулья);<br/>
                    4.	Отойти дальше от входной двери и окон. При наличии в классе дополнительных помещений необходимо изолироваться в них. Не пытаться самостоятельно эвакуироваться, в том числе через окно;<br/>
                    5.	Все гаджеты перевести на беззвучный режим, вибросигнал отключить;<br/>
                    6.	Позвонить по телефону 112 и сообщить о нападении;<br/>
                    7.	Отключить все возможные источники шума и освещение;<br/>
                    8.	В случае штурма лечь под парты, прикрыть голову руками и использовать парты как щит;<br/>
                    9.	Ждать помощи, она обязательно придет!<br/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Evacuation;