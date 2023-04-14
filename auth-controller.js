import userService from './service/user-service.js'
import {validationResult} from "express-validator";
import ApiError from "./exceptions/api-error.js";
import UserService from "./service/user-service.js";

class authController {
    async register (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Указаны неверные поля', errors.array()))
            }
            const {login, password} = req.body;
            const userData = await userService.registration(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }
    async login (req, res, next) {
        try {
            const {login, password} = req.body;
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch (e) {
            next(e)
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken){
                return res.status(200).json("Токен не найден")
            }
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.refresh(refreshToken)
            res.clearCookie('refreshToken');
            res.cookie('refreshToken', token.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json(token);
        } catch (e) {
            next(e)
        }
    }
    async getUsers (req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            // console.log(req.ipInfo);
            res.status(200).json(users);
        } catch (e) {
            next(e)
        }
    }
}
export default new authController;