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

    static createEvent(data) {
        try {
            const prData = EventApi.processData(data)
            $api.post(`/api/events/`, prData);

        } catch (e) {
            console.log(e)
        }
    }

    static processData(data) {
        return {
            name: data.name,
            color: data.color,
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