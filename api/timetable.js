import axios from "axios";
import Data from "./getData";
import {ApiUrl} from "./index";

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


    static getDay(day) {
        let getDay
        if (!day) {
            let now = new Date();
            getDay = now.getDay();
        }
        else getDay = day
        // getDay = 4;
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
        // const getDay = 4;
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
        // console.log(date);
        let timeTable = [
            {lessonTime: "08:40 - 09:25", subject: "Не найдено", i: 1},
            {lessonTime: "09:35 - 10:20", subject: "Не найдено", i: 2},
            {lessonTime: "10:40 - 11:25", subject: "Не найдено", i: 3},
            {lessonTime: "11:35 - 12:20", subject: "Не найдено", i: 4},
            {lessonTime: "12:30 - 13:15", subject: "Не найдено", i: 5},
            {lessonTime: "13:35 - 14:20", subject: "Не найдено", i: 6},
            {lessonTime: "14:40 - 15:25", subject: "Не найдено", i: 7},
            {lessonTime: "15:35 - 17:00", subject: "Не найдено", i: 8},
        ]
        for (let i = 0; i < date.length; i++) {
            for (let t = 0; t < date[i].timetable.length; t++) {
                if (id === date[i].timetable[t].id) {
                    let h = date[i].timetable[t];
                    timeTable[h.num - 1].subject = + date[i].num + date[i].letter + " " + h.subject;
                    if (h.group) {
                        timeTable[h.num - 1].subject = date[i].num + date[i].letter + " (" + h.group + ")гр. " + h.subject;
                    }
                    if (h.time !== "" && h.time !== undefined) {
                        timeTable[h.num - 1].lessonTime = h.time;
                    }
                }
            }
        }
        return timeTable
    }

    static getTimetableDiningRoom = () =>  [
        {lessonTime: "09:25 - 09:35", subject: "Завтрак (6 - 8)", i: 1},
        {lessonTime: "10:20 - 10:40", subject: "Завтрак (9 - 11)", i: 2},
        {lessonTime: "11:25 - 11:35", subject: "Буфет", i: 3},
        {lessonTime: "12:20 - 12:30", subject: "Буфет", i: 4},
        {lessonTime: "13:15 - 13:35", subject: "Обед (6 - 8)", i: 5},
        {lessonTime: "14:20 - 14:40", subject: "Обед (9 - 11)", i: 6},
        ]
}