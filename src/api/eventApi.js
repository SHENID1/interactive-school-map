import FormData from "form-data";
import $api from "./index";

export default class EventApi {

    static uploadImage(file) {
        const form = new FormData()
        form.append('image', file)
        const res = $api.post(`/api/events/upload`, form,
            {ContentType: 'multipart/form-data'});
        return res;
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
        }
        catch (e) {
            return e;
        }

    }
    static async getEventById(id) {
        try {
            return (await $api.get(`/api/events/${id}`)).data;
        }
        catch (e) {
            return e;
        }

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
            dateStart: data.datetime[0],
            dateEnd: data.datetime[1],
        }
    }

}