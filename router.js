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
    origin: process.env.CLIENT_URL
}));
router.use(fileUpload({}))

// scheme
router.get('/scheme/:floor', Controller.getFloorScheme); // get scheme by floor
router.post('/scheme',authMiddleware, Controller.createFloorScheme); // create scheme

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


export default router;