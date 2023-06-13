import axios from "axios";
import {ApiUrl} from "./index";


export default class PolygonScheme {
    static async getScheme(floor){
        try{
            const response = await axios.get(`${ApiUrl}api/scheme/${floor}`);
            if (response.data === undefined) return ErrorEvent;
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
}