import $api, {ApiUrl} from "./index";
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs";
import axios from "axios";

dayjs.extend(utc)
export default class EventApi {

    static async getEvents() {
        try {
            return (await $api.get('api/events/')).data;
        } catch (e) {
            return e;
        }

    }

    static async getEventsByFloor(floor) {
        try {
            return (await axios.get(`${ApiUrl}/api/events/floor/${floor}`)).data
        } catch (e) {
            return e;
        }

    }


    static async getEventById(id) {
        return (await $api.get(`api/events/${id}`)).data;
    }

    static processData(data) {
        let color = data.color;
        if (typeof color !== "string") {
            color = color.toHexString()

        }

        return {
            name: data.name,
            color: color,
            description: data.description,
            floor: Number(data.floor),
            x: Number(data.x),
            y: Number(data.y),
            image: data.image[0].response,
            dateStart: data.datetime[0].utc().utcOffset(3),
            dateEnd: data.datetime[1].utc().utcOffset(3),
        }
    }

    static processDataForUpdate(data) {
        let color = data.color;
        if (typeof color !== "string") color = color.toHexString()
        // console.log(data.datetime[0].utc().utcOffset(3 * 60), true)
        return {
            _id: data._id,
            name: data.name,
            color: color,
            description: data.description,
            floor: Number(data.floor),
            x: Number(data.x),
            y: Number(data.y),
            image: data.image[0].response,
            dateStart: data.datetime[0].utc().local().format(),
            dateEnd: data.datetime[1].utc().local().format(),
        }
    }

    static isStartedEvent(dateStart, dateEnd, dateNow) {
        if (dateStart < dateNow && dateNow < dateEnd) return 0;
        if (dateStart < dateNow && dateEnd < dateNow) return 1;
        return -1;
    }

}


// return [
//     {
//         "_id": "653407866eb561f50a3405cd",
//         "name": "День открытых дверей",
//         "color": "#d629ed",
//         "description": "«День открытых дверей» - это отличная возможность для родителей и будущих учеников узнать больше о нашей школе, ее правилах, программах и мероприятиях. В этот день, наши двери открыты для всех желающих, чтобы познакомиться со школой, ее преподавателями и администрацией. Мы рады будем ответить на все ваши вопросы и показать вам нашу школу в действии.",
//         "image": "f52d8db3-3952-4a05-9489-90ad8a12e755.jpg",
//         "dateStart": "2023-11-02T08:07:08.000Z",
//         "dateEnd": "2023-11-10T08:07:09.000Z",
//         "x": 278,
//         "y": 183,
//         "floor": 4,
//         "__v": 0
//     },
//     {
//         "_id": "65369b2b2e2cf0bbc4a2c76d",
//         "name": "Школьная Олимпиада по Математике",
//         "color": "#fffb00",
//         "description": "Школьная олимпиада по математике – это традиционное ежегодное мероприятие, которое проводится для выявления наиболее способных и талантливых учеников в области математики. В рамках олимпиады проводятся различные задания по основным темам школьной программы, а также задания повышенной сложности. Победители олимпиады получают возможность участвовать в городских или региональных олимпиадах.",
//         "image": "55a2d872-498c-4882-9e24-46afb0494c01.jpg",
//         "dateStart": "2025-10-16T16:11:16.574Z",
//         "dateEnd": "2025-10-17T16:11:18.574Z",
//         "x": 258,
//         "y": 80,
//         "floor": 4,
//         "__v": 0
//     },
//     {
//         "_id": "6536bc352e2cf0bbc4a2d2d7",
//         "name": "Завершенное событие",
//         "color": "#ff0000",
//         "description": "-",
//         "image": "ce3c431b-8d8f-4e06-8c84-f9c32438bd5c.jpg",
//         "dateStart": "2022-11-10T15:32:00.000Z",
//         "dateEnd": "2022-11-11T15:32:00.000Z",
//         "x": 480,
//         "y": 150,
//         "floor": 4,
//         "__v": 0
//     },
//     {
//         "_id": "6585ddb000fff8bd43b32b5d",
//         "name": "Олимпиадная школа",
//         "color": "#fffb00",
//         "description": "решаем олимпиадные задачи",
//         "image": "a64759b6-83cc-4edd-95d4-7a9f13c6fb10.jpg",
//         "dateStart": "2023-12-28T12:30:00.000Z",
//         "dateEnd": "2023-12-28T17:00:00.000Z",
//         "x": 545,
//         "y": 143,
//         "floor": 4,
//         "__v": 0
//     },
//     {
//         "_id": "65872de5256d718f19439bfe",
//         "name": "ОБАМЭ",
//         "color": "#8b5100",
//         "description": "ОБАМЭ",
//         "image": "8efd2c2c-b9cf-4a93-a64a-8efaebb2df52.jpg",
//         "dateStart": "2023-12-23T18:58:37.514Z",
//         "dateEnd": "2026-12-11T18:58:42.514Z",
//         "x": 429,
//         "y": 316,
//         "floor": 4,
//         "__v": 0
//     }
// ]