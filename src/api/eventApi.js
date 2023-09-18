import FormData from "form-data";
import $api from "./index";

export default class EventApi {

    static async createEvent(data) {
        try {
            console.log(EventApi.processData(data))
            const form = new FormData();
            form.append('name', data.name);
            form.append('color', data.color);
            form.append('description', data.description);
            form.append('floor', data.floor);
            form.append('x', data.x);
            form.append('y', data.y);
            form.append('image', data.image[0], "q");
            form.append('dateStart', data.datetime[0]);
            form.append('dateEnd', data.datetime[1]);

            const response = await $api.post(`/api/events/`, form, {
                "Content-Type": "multipart/form-data"
            });
            console.log(response);
        }
        catch (e) {
            console.log(e)
        }
    }

    static processData(data) {
        return {
            name: data.name,
            color: data.color,
            description: data.description,
            floor: data.floor,
            x: data.x,
            y: data.y,
            image: data.image[0],
            dateStart: data.datetime[0],
            dateEnd: data.datetime[1],
        }
    }

}