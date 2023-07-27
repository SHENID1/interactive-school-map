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
                return d;
            }
        }
        return null; // не нашел если
    }
    static getC_EL_List = () => {

        const DataList = [
            Data.getData('TimetableSunday'),
            Data.getData('TimetableMonday'),
            Data.getData('TimetableTuesday'),
            Data.getData('TimetableWednesday'),
            Data.getData('TimetableThursday'),
            Data.getData('TimetableFriday'),
            Data.getData('TimetableSaturday')
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
        if (a.s[1] > b.s[1]) return -1;
        if (a.s[1] === b.s[1] && a.s[0] < b.s[0]) return -1;
        if (a.s[1] === b.s[1] && a.s[0] > b.s[0]) return 1;
        if (a.s[1] < b.s[1]) return 1;

    }
    static timeTableSort (table) {
        table.sort(self.compareSl)
        return table
    }
}