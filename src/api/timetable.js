import axios from "axios";
import Data from "./getData";
import $api, {ApiUrl} from "./index";

export default class Timetable{
    static async getTimetableByDayId(dayId){
        try{
            const response = await axios.get(`${ApiUrl}/api/timetable/${dayId}`);
            if (response.data === undefined) return ErrorEvent;
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static async UpdateTimetableById(data){
        try{
            const response = await $api.put(`/api/timetable/`, data);
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static async DeleteTimetableById(data){
        try{
            await $api.delete(`/api/timetable/${data._id}`);
            return true;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
    static async CreateTimetable(data){
        try{
            const response = await $api.post(`/api/timetable/`, data);
            console.log(response)
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }

    static getDataByDayId(dayId: Number) {
        switch (dayId) {
            case (0):
                return Data.getData('TimetableSunday');
            case (1):
                return Data.getData('TimetableMonday');
            case (2):
                return Data.getData('TimetableTuesday');
            case (3):
                return Data.getData('TimetableWednesday');
            case (4):
                return Data.getData('TimetableThursday');
            case (5):
                return Data.getData('TimetableFriday');
            case (6):
                return Data.getData('TimetableSaturday');
            default:
                return ErrorEvent;
        }
    }
    static getFullTable = (num, letter, dayId) => {
        let data;
        data = Timetable.getDataByDayId(dayId)
        for (let i = 0; i < data.length; i++) {
            let d = data[i];
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
        return Timetable.getDayWithDay(getDay)

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
}