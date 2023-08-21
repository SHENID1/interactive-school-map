import SchemeFloors from "./mongoose_scheme/schemefloors.js";
import CabData from './mongoose_scheme/cabdata.js';
import Evacuation from "./mongoose_scheme/evacuation.js";
import Timetable from "./mongoose_scheme/Timetable.js";
import Event from "./mongoose_scheme/event.js";
import fileService from "./service/fileService.js";

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
    async updateFloorScheme (req, res) {
        try {
            // const list = req.body;

            const post = await SchemeFloors.find();
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
            // const data = req.body;
            res.status(200);
            // return
            // const {imgName} = req.files
            // fileService.saveFile(imgName, data.name)
            //
            // const post = await CabData.findByIdAndUpdate(req.body._id, req.body, {new: true})
            // res.status(200).json(post);
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
            const image = req.files
            console.log(image, typeof(data))
            //const Event = await Timetable.create(data);
            res.status(200).json(Event);
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

    //events
    async getEvents(req, res) {
        try {
            const Events = await Event.find()
            return res.json(Events)
        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
    async CreateEvents(req, res) {
        try {
            const data = req.body;
            // console.log(new Date.now().toUTCString())
            if (!req.files.image) return res.status(400).json({message: "Image не указан"})
            const fileName = await fileService.saveFile(req.files.image)
            const Events = await Event.create({...data, image: fileName});
            res.status(200).json(Events);
        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
    async UpdateEvents(req, res) {
        try {

        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
    async DeleteEvents(req, res) {
        try {
            const {id} = req.params;
            if (!id) return res.status(400).json({message: "ID не указан"})
            const {image} = await Event.findByIdAndDelete(id)
            if (!image) return res.status(402).json({message: "Не найдено"})
            await fileService.deleteFile(image)
            return res.json("ok");
        }
        catch (e) {
            return res.status(500).json(e)
        }
    }
}

export default new Controller();