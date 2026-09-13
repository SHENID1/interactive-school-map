import axios from "axios";
import {ApiUrl} from "./index";

export default class Bootstrap {
    static async load() {
        const response = await axios.get(`${ApiUrl}/api/bootstrap`);
        return response.data;
    }
}
