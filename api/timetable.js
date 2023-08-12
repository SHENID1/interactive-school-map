import axios from "axios";
import Data from "./getData";
import $api, {ApiUrl} from "./index";

export default class Timetable{
    static async getTimetableByDayId(dayId){
        try{
            const response = await axios.get(`${ApiUrl}api/timetable/${dayId}`);
            if (response.data === undefined) return ErrorEvent;
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static async UpdateTimetableById(data){
        try{
            const response = await $api.put(`api/timetable/`, data);
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static async DeleteTimetableById(data){
        try{
            await $api.delete(`api/timetable/${data._id}`);
            return true;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static async CreateTimetable(data){
        try{
            const response = await $api.post(`api/timetable/`, data);
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }


    static getFullTable = (num, letter, dayId) => {
        let date;
        switch (dayId) {
            case (0):
                date = Data.getDataWithJsonParse('TimetableSunday');
                break;
            case (1):
                date = Data.getDataWithJsonParse('TimetableMonday');
                break;
            case (2):
                date = Data.getDataWithJsonParse('TimetableTuesday');
                break;
            case (3):
                date = Data.getDataWithJsonParse('TimetableWednesday');
                break;
            case (4):
                date = Data.getDataWithJsonParse('TimetableThursday');
                break;
            case (5):
                date = Data.getDataWithJsonParse('TimetableFriday');
                break;
            case (6):
                date = Data.getDataWithJsonParse('TimetableSaturday');
                break;
            default:
                return ErrorEvent;
        }
        for (let i = 0; i < date.length; i++) {
            let d = date[i];
            if (d.num === Number(num) && d.letter === letter) {// num: string, letter: string
                return d;
            }
        }
        return null; // не нашел если
    }
    static getC_EL_List = () => {

        const DataList = [
            Data.getDataWithJsonParse('TimetableSunday'),
            Data.getDataWithJsonParse('TimetableMonday'),
            Data.getDataWithJsonParse('TimetableTuesday'),
            Data.getDataWithJsonParse('TimetableWednesday'),
            Data.getDataWithJsonParse('TimetableThursday'),
            Data.getDataWithJsonParse('TimetableFriday'),
            Data.getDataWithJsonParse('TimetableSaturday')
        ]

        const globalList = ["create"]
        for (let day = 0; day < 7; day++) {
            const dataObj = DataList[day]
            for (let i = 0; i < dataObj.length; i++) {
                let Class = dataObj[i];
                globalList.push(day + Class.letter + Class.num)
            }
        }

        return globalList;
    }
    static getDay(day) {
        let getDay
        if (!day) {
            let now = new Date();
            getDay = now.getDay();
        }
        else getDay = day
        switch (getDay) {
            case (0):
                return "Воскресенье";
            case (1):
                return "Понедельник"
            case (2):
                return "Вторник"
            case (3):
                return "Среда"
            case (4):
                return "Четверг"
            case (5):
                return "Пятница"
            case (6):
                return "Суббота"
            default:
                return "Не найдено"
        }
    }
    static getDayWithDay(day) {
        switch (day) {
            case (0):
                return "Воскресенье";
            case (1):
                return "Понедельник"
            case (2):
                return "Вторник"
            case (3):
                return "Среда"
            case (4):
                return "Четверг"
            case (5):
                return "Пятница"
            case (6):
                return "Суббота"
            default:
                return "Не найдено"
        }
    }
    static compareSl(a, b) {
        if ((a.s[1] > b.s[1]) || (a.s[1] === b.s[1] && a.s[0] < b.s[0])) return -1;
        if (a.s[1] === b.s[1] && a.s[0] > b.s[0]) return 1;
        if (a.s[1] < b.s[1]) return 1;

    }
    static timeTableSort (table) {
        table.sort(self.compareSl)
        return table
    }

    static getCabNum = (id) => {
        if (!id) return ""
        const data = [
            Data.getDataWithJsonParse('CabDataFour'),
            Data.getDataWithJsonParse('CabDataThree'),
            Data.getDataWithJsonParse('CabDataTwo'),
            Data.getDataWithJsonParse('CabDataOne'),
            Data.getDataWithJsonParse('CabDataMOne')
        ]
        for (let i = 0; i !== 5; i++) {
            let floor_data = data[i];
            for (let d in floor_data) {
                let h = floor_data[d].id;
                if (h === id[0]) {
                    return (floor_data[d].name)
                }
            }

        }
        return "?"
    }
    static getTimeTable(id) {
        let now = new Date();
        const getDay = now.getDay();
        // const getDay = 1;
        let date = {};
        switch (getDay) {
            case (0):
                date = Data.getDataWithJsonParse('TimetableSunday')
                break;
            case (1):
                date = Data.getDataWithJsonParse('TimetableMonday')
                break;
            case (2):
                date = Data.getDataWithJsonParse('TimetableTuesday')
                break;
            case (3):
                date = Data.getDataWithJsonParse('TimetableWednesday')
                break;
            case (4):
                date = Data.getDataWithJsonParse('TimetableThursday')
                break;
            case (5):
                date = Data.getDataWithJsonParse('TimetableFriday')
                break;
            case (6):
                date = Data.getDataWithJsonParse('TimetableSaturday')
                break;
            default:
                return ErrorEvent
        }

        let timeTable = [
            ["1 урок (08:40 - 09:25)", "Не найдено"],
            ["2 урок (09:35 - 10:20)", "Не найдено"],
            ["3 урок (10:40 - 11:25)", "Не найдено"],
            ["4 урок (11:35 - 12:20)", "Не найдено"],
            ["5 урок (12:30 - 13:15)", "Не найдено"],
            ["6 урок (13:35 - 14:20)", "Не найдено"],
            ["7 урок (14:40 - 15:25)", "Не найдено"],
            ["8 урок (15:35 - 17:00)", "Не найдено"],
        ]
        for (let i = 0; i < date.length; i++) {
            for (let t = 0; t < date[i].timetable.length; t++) {
                if (id === date[i].timetable[t].id) {
                    let h = date[i].timetable[t];
                    timeTable[h.num - 1][1] = +date[i].num + date[i].letter + " " + h.subject;
                    if (h.group) {
                        timeTable[h.num - 1][1] = date[i].num + date[i].letter + " (" + h.group + ")гр. " + h.subject;
                    }
                    if (h.time !== "" && h.time !== undefined) {
                        timeTable[h.num - 1][0] = `${h.num} урок (${h.time})`;
                    }
                }
            }
        }
        return timeTable
    }

    static getTimetableDiningRoom = () =>  [
        ["1 переменна (09:25 - 09:35)", "Завтрак (6 - 8)"],
        ["2 переменна (10:20 - 10:40)", "Завтрак (9 - 11)"],
        ["3 переменна (11:25 - 11:35)", "Буфет"],
        ["4 переменна (12:20 - 12:30)", "Буфет"],
        ["5 переменна (13:15 - 13:35)", "Обед (6 - 8)"],
        ["6 переменна (14:20 - 14:40)", "Обед (9 - 11)"],
    ]

}