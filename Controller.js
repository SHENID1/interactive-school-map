import SchemeFloors from "./mongoose_scheme/schemefloors.js";
import CabData from './mongoose_scheme/cabdata.js';
import Evacuation from "./mongoose_scheme/evacuation.js";
import Timetable from "./mongoose_scheme/Timetable.js";
import fileService from "./fileService.js";

class Controller {

    //scheme
    async createFloorScheme (req, res) {
        try {
            const {id, points, name, floor} = req.body;
            const post = await SchemeFloors.create({id, points, name, floor});
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getFloorScheme(req, res){
        try {
            const {floor} = req.params;
            const post = await SchemeFloors.find({floor: Number(floor)});
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    //CabData
    async getCabData(req, res){
        try {
            const {floor} = req.params;
            const post = await CabData.find({floor: Number(floor)});
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async updateCabData (req, res) {
        try {
            const data = req.body;
            res.status(200);
            return
            const {imgName} = req.files
            fileService.saveFile(imgName, data.name)

            const post = await CabData.findByIdAndUpdate(req.body._id, req.body, {new: true})
            res.status(200).json(post);
        } catch (e) {
            console.log(e)
            res.status(500).json(e);
        }
    }

    //evacuation
    async getEvacuation(req, res){
        try {
            const {floor} = req.params;
            const post = await Evacuation.find({floor: Number(floor)});
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    //timetable
    async getTimetable(req, res){
        try {
            const {dayid} = req.params;
            const post = await Timetable.find({dayId: Number(dayid)});
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async createTimetable (req, res) {
        try {
            const data = req.body;
            const post = await Timetable.create(data);
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    async UpdateTimetable(req, res) {
        try{
            const tt = req.body
            if (!tt._id) return res.status(400).json({message: "ID не указан"})
            const updatedTT = await Timetable.findByIdAndUpdate(tt._id, tt, {new: true})
            return res.json(updatedTT);
        }
        catch (e){
            return res.status(500).json(e)
        }
    }
    async DeleteTimetable(req, res) {
        try{
            const {id} = req.params;
            if (!id) return res.status(400).json({message: "ID не указан"})
            await Timetable.findByIdAndDelete(id)
            return res.json("ok");
        }
        catch (e){
            return res.status(500).json(e)
        }
    }
}

export default new Controller();