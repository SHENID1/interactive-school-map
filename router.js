import Router from 'express';
import Controller from "./Controller.js";
import cors from "cors";
import fileUpload from "express-fileupload";
const router = new Router()


router.use(cors());
router.use(fileUpload({}))

// scheme
router.get('/scheme/:floor', Controller.getFloorScheme); // get scheme by floor
router.post('/scheme', Controller.createFloorScheme); // create scheme

// cabData
router.get('/cabdata/:floor', Controller.getCabData)
router.put('/cabdata', Controller.updateCabData)

// evacuation
router.get('/evacuation/:floor', Controller.getEvacuation)

// timetable
router.get('/timetable/:dayid', Controller.getTimetable)
router.put('/timetable', Controller.UpdateTimetable)
router.post('/timetable', Controller.createTimetable)
router.delete('/timetable/:id', Controller.DeleteTimetable)


export default router;