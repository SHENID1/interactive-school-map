import Router from 'express';
import Controller from "./Controller.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import authMiddleware from "./middlewares/auth-middleware.js";
const router = new Router()
import dotenv from "dotenv";
dotenv.config();
router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus:200
}));
router.use(fileUpload({}))
// console.log(process.env.CLIENT_URL)

// scheme
router.get('/scheme/:floor', Controller.getFloorScheme); // get scheme by floor
router.post('/scheme', authMiddleware, Controller.createFloorScheme); // create scheme
router.put('/scheme', authMiddleware, Controller.updateFloorScheme)

// cabData
router.get('/cabdata/:floor', Controller.getCabData)
router.put('/cabdata',authMiddleware, Controller.updateCabData)

// evacuation
router.get('/evacuation/:floor', Controller.getEvacuation)

// timetable
router.get('/timetable/:dayid', Controller.getTimetable)
router.put('/timetable',authMiddleware, Controller.UpdateTimetable)
router.post('/timetable',authMiddleware, Controller.createTimetable)
router.delete('/timetable/:id',authMiddleware, Controller.DeleteTimetable)

// events
router.get('/events', Controller.getEvents)
router.put('/events', Controller.UpdateEvents)
router.post('/events', Controller.CreateEvents)
router.delete('/events/:id', Controller.DeleteEvents)

export default router;