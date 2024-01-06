import axios from "axios";
import Data from "./getData";
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
                if (h === id) {
                    return (floor_data[d])
                }
            }

        }
        return undefined
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