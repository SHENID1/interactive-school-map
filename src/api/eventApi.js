import $api from "./index";
import utc from "dayjs/plugin/utc"
import dayjs from "dayjs";

dayjs.extend(utc)
export default class EventApi {

    static async updateEvent(data) {
        try {
            const prData = EventApi.processDataForUpdate(data);
            return await $api.put(`/api/events/`, prData);
        } catch (e) {
            return "error"
        }
    }

    static async deleteImage(file) {
        const filename = file.response
        const res = await $api.delete(`/api/events/upload/${filename}`,
            {ContentType: 'multipart/form-data'});
        console.log(res)
    }

    static async deleteEvent(id) {
        try {
            await $api.delete(`/api/events/${id}`,
                {ContentType: 'multipart/form-data'});
            return 200;
        } catch (e) {
            return 404;
        }

    }

    static async createEvent(data) {
        try {
            const prData = EventApi.processData(data);
            return await $api.post(`/api/events/`, prData);
        } catch (e) {
            console.log(e)
            return "error"
        }
    }

    static async getEvents() {
        try {
            return (await $api.get('/api/events/')).data;
        } catch (e) {
            return e;
        }

    }
    static async getEventsByFloor(floor) {
        try {
            return (await $api.get(`/api/events/floor/${floor}`)).data;
        } catch (e) {
            return e;
        }

    }

    static async getBytes() {
        try {
            return (await $api.get('/api/events/bytes')).data;
        } catch (e) {
            return e;
        }

    }

    static async clearBytes() {
        try {
            return (await $api.post('/api/events/bytes')).data;
        } catch (e) {
            return e;
        }

    }

    static async getEventById(id) {
        return (await $api.get(`/api/events/${id}`)).data;
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