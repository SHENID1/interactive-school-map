import axios from "axios";
import Data from "./getData";
import {ApiUrl} from "./index";

export default class Evacuation{
    static async getEvacuationByFloor(floor){
        try{
            const response = await axios.get(`${ApiUrl}/api/evacuation/${floor}`);
            if (response.data === undefined) return ErrorEvent;
            return response.data;
        }
        catch (e){
            throw new Error(e.message)
        }
    }

    static getEvacuationList(floor){
        const dataFour = Data.getData('EvacuationFour');
        const dataThree = Data.getData('EvacuationThree');
        const dataTwo = Data.getData('EvacuationTwo');
        const dataOne = Data.getData('EvacuationOne');
        const dataMOne = Data.getData('EvacuationMOne');
        let data;
        switch (floor){
            case 4:
                data = dataFour;
                break;
            case 3:
                data = dataThree;
                break;
            case 2:
                data = dataTwo;
                break;
            case 1:
                data = dataOne;
                break;
            case -1:
                data = dataMOne;
                break;
            default:
                console.log("Error in evacuation.jsx 41 NO DATA")
                data = [];
        }
        return data
    }
}