import User from '../mongoose_scheme/user.js';
import bcrypt from 'bcrypt';
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService{
    async registration(login, password){
        const candidate = await User.findOne({login})
        if (candidate){
            throw ApiError.BadRequest("Логин уже занят")
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({login, password: hashPassword})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }

    async login(login, password) {
        const user = await User.findOne({login})
        if (!user){
            throw ApiError.BadRequest("Пользователь не был найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals){
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: user
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        // console.log(userData, tokenFromDB)
        if (!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findOne({_id: userData.id});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async getAllUsers() {
        const users = await User.find();
        return users;
    }
}
export default new UserService;