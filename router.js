import Router from 'express';
import Controller from "./Controller.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import authMiddleware from "./middlewares/auth-middleware.js";
const router = new Router()
import dotenv from "dotenv";
import corsOptions from "./cors-options.js";
dotenv.config();
router.use(cors(corsOptions));
router.use(fileUpload({}))

// scheme
router.get('/scheme/all', Controller.getAllScheme); // get scheme for every floor, grouped
router.get('/scheme/:floor', Controller.getFloorScheme); // get scheme by floor
router.post('/scheme', authMiddleware, Controller.createFloorScheme); // create scheme
router.put('/scheme', authMiddleware, Controller.updateFloorScheme)

// cabData
router.get('/cabdata/all', Controller.getAllCabData) // get cabdata for every floor, grouped
router.get('/cabdata/:floor', Controller.getCabData)
router.put('/cabdata',authMiddleware, Controller.updateCabData)

// evacuation
router.get('/evacuation/all', Controller.getAllEvacuation) // get evacuation for every floor, grouped
router.get('/evacuation/:floor', Controller.getEvacuation)

// timetable
router.get('/timetable/:dayid', Controller.getTimetable)
router.put('/timetable',authMiddleware, Controller.UpdateTimetable)
router.post('/timetable',authMiddleware, Controller.createTimetable)
router.delete('/timetable/:id',authMiddleware, Controller.DeleteTimetable)

// events
router.get('/events/bytes', authMiddleware, Controller.getBytes)
router.post('/events/bytes', authMiddleware, Controller.clearBytes)
router.get('/events', Controller.getEvents)
router.get('/events/:id', Controller.getEvent)
router.get('/events/floor/:floor', Controller.getEventByFloor)
router.put('/events', authMiddleware, Controller.UpdateEvents)
router.post('/events', authMiddleware, Controller.CreateEvents)
router.post('/events/upload/', authMiddleware, Controller.Upload_Image)
router.delete('/events/upload/:fileName', authMiddleware, Controller.Delete_Image)
router.delete('/events/:id', authMiddleware, Controller.DeleteEvents)

export default router;