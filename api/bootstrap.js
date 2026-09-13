import axios from "axios";
import {ApiUrl} from "./index";

// 10 small requests instead of 22 tiny ones or 1 huge one — a single big
// combined response (~50KB) reliably stalls on the current VPS network path,
// so we keep each request comfortably small instead.
const DAY_IDS = [1, 2, 3, 4, 5, 6, 0];

export default class Bootstrap {
    static async load() {
        const [cabData, evacuation, scheme, ...timetableByDay] = await Promise.all([
            axios.get(`${ApiUrl}/api/cabdata/all`).then(r => r.data),
            axios.get(`${ApiUrl}/api/evacuation/all`).then(r => r.data),
            axios.get(`${ApiUrl}/api/scheme/all`).then(r => r.data),
            ...DAY_IDS.map(dayId => axios.get(`${ApiUrl}/api/timetable/${dayId}`).then(r => r.data)),
        ]);

        const timetable = {};
        DAY_IDS.forEach((dayId, i) => {
            timetable[dayId] = timetableByDay[i];
        });

        return {cabData, evacuation, scheme, timetable};
    }
}
