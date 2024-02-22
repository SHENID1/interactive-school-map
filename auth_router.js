import Router from 'express';
import cors from "cors";
import authController from "./auth-controller.js";
import {body} from "express-validator";
import authMiddleware from "./middlewares/auth-middleware.js";
import expressIp from "express-ip";
import dotenv from "dotenv";
const auth_router = new Router()
dotenv.config();

auth_router.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,      //access-control-allow-credentials:true
    optionSuccessStatus:200
}));
// auth_router.use(expressIp().getIpInfoMiddleware);

// auth_router.post('/register',
//     body('login').isString(),
//     body('password').isString(),
//     body('password').isLength({min: 3, max: 30}),
//     authController.register);
auth_router.post('/login', authController.login);
auth_router.post('/logout', authController.logout);
auth_router.get('/refresh', authController.refresh);
auth_router.get('/users',authMiddleware, authController.getUsers);

export default auth_router;
