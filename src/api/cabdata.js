import axios from "axios";
import Data from "./getData";
import {PlusOutlined} from "@ant-design/icons";
import {ApiUrl} from "./index";
export default class CabData{
    static async getCabDataByFloor(floor){
        try{
            const response = await axios.get(`${ApiUrl}/api/cabdata/${floor}`);
            if (response.data === undefined) return ErrorEvent;
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static getTable = (num, letter, dayId) => {
        let date;
        let timeTable = [
            {lessonTime: "08:40 - 09:25", subject: [], i: 1, ids: []},
            {lessonTime: "09:35 - 10:20", subject: [], i: 2, ids: []},
            {lessonTime: "10:40 - 11:25", subject: [], i: 3, ids: []},
            {lessonTime: "11:35 - 12:20", subject: [], i: 4, ids: []},
            {lessonTime: "12:30 - 13:15", subject: [], i: 5, ids: []},
            {lessonTime: "13:35 - 14:20", subject: [], i: 6, ids: []},
            {lessonTime: "14:40 - 15:25", subject: [], i: 7, ids: []},
            {lessonTime: "15:35 - 17:00", subject: [], i: 8, ids: []},
        ]
        switch (dayId) {
            case (0):
                date = Data.getData('TimetableSunday');
                break;
            case (1):
                date = Data.getData('TimetableMonday');
                break;
            case (2):
                date = Data.getData('TimetableTuesday');
                break;
            case (3):
                date = Data.getData('TimetableWednesday');
                break;
            case (4):
                date = Data.getData('TimetableThursday');
                break;
            case (5):
                date = Data.getData('TimetableFriday');
                break;
            case (6):
                date = Data.getData('TimetableSaturday');
                break;
            default:
                return ErrorEvent;
        }
        for (let i = 0; i < date.length; i++) {
            let d = date[i];
            if (d.num === Number(num) && d.letter === letter) {// num: string, letter: string
                const t = d.timetable;
                for (let j = 0; j < t.length; j++) {
                    let d = t[j];
                    if (d.time !== "" && d.time) timeTable[d.num - 1].lessonTime = d.time;
                    if (d.group) {
                        timeTable[d.num - 1].subject.push(d.subject + ` (${d.group} гр.)`);
                    } else timeTable[d.num - 1].subject.push(d.subject);
                    timeTable[d.num - 1].ids.push([d.id]);
                }
                // console.log(timeTable)
                return timeTable;
            }
        }
        return null; // не нашел если
    }
    static getCabDataById = (id) => {
        const data = [
            Data.getData('CabDataFour'),
            Data.getData('CabDataThree'),
            Data.getData('CabDataTwo'),
            Data.getData('CabDataOne'),
            Data.getData('CabDataMOne')
        ]

        for (let i = 0; i !== 5; i++) {
            let floor_data = data[i];
            for (let d in floor_data) {
                let h = floor_data[d].id;
                if (h === id) {
                    return (floor_data[d])
                }
            }

        }
        return undefined
    }
    static getOptions = () => {

         const timeTableSort = (table) => {
            function compareSl(a, b) {
                if (a.s[1] > b.s[1]) return -1;
                if (a.s[1] === b.s[1] && a.s[0] < b.s[0]) return -1;
                if (a.s[1] === b.s[1] && a.s[0] > b.s[0]) return 1;
                if (a.s[1] < b.s[1]) return 1;
            }
            table.sort(compareSl)
            return table
        }

        const DataList = [
            Data.getData('TimetableSunday'),
            Data.getData('TimetableMonday'),
            Data.getData('TimetableTuesday'),
            Data.getData('TimetableWednesday'),
            Data.getData('TimetableThursday'),
            Data.getData('TimetableFriday'),
            Data.getData('TimetableSaturday')
        ]

        const globalList = [{key: "create", label: "Создать расписание", icon: <PlusOutlined />}]
        for (let day = 0; day < 7; day++) {
            let list = {key: day, label: CabData.parseDay(day), children: []};
            const dataObj = DataList[day]
            for (let i = 0; i < dataObj.length; i++) {
                let Class = dataObj[i];
                list.children.push({key: day + Class.letter + Class.num, label: Class.num + Class.letter, s: [Class.letter, Class.num]})
            }

            list.children = timeTableSort(list.children)
            globalList.push(list)
        }
        // console.log(globalList)
        const el1 = globalList[1]
        globalList[8] = el1
        delete globalList[1]
        return globalList;
    }
    static parseDay = (dayId) => {
        let dayName = ""
        switch (dayId) {
            case (0):
                dayName = "Воскресенье"
                break;
            case (1):
                dayName = "Понедельник"
                break;
            case (2):
                dayName = "Вторник"
                break;
            case (3):
                dayName = "Среда"
                break;
            case (4):
                dayName = "Четверг"
                break;
            case (5):
                dayName = "Пятница"
                break;
            case (6):
                dayName = "Суббота"
                break;
            default:
                return ErrorEvent;
        }
        return dayName
    }

}