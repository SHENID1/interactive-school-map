import axios from "axios";


export default class PolygonScheme {
    static async getScheme(floor){
        try{
            const response = await axios.get(`${window.location.origin.slice(0, -5)}:5000/api/scheme/${floor}`);
            if (response.data === undefined) return ErrorEvent;
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }
}