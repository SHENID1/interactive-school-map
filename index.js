import express from "express"
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from "./router.js";
import fileUpload from "express-fileupload";
import cookieParser from 'cookie-parser';
import auth_router from "./auth_router.js";
import errorMiddleware from "./middlewares/error-middleware.js";
import expressIp from 'express-ip'

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express()

mongoose.set('strictQuery', true);
app.use(cookieParser())
app.use(express.json());
app.use(express.static("static"));
app.use(express.static("eventsImage"));
app.use('/api', router);
app.use('/auth', auth_router);
app.use(expressIp().getIpInfoMiddleware);
app.use(fileUpload({}));
app.use(errorMiddleware);

const start = async () => {
    try{
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
        app.listen(PORT, ()=>console.log(`Server started on PORT ${PORT}`))
    }
    catch (e){
        console.log(e);
    }
}

start()