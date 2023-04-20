import jwt from "jsonwebtoken";
import Token from "../mongoose_scheme/token.js";

class tokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '14d'});
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({user: userId})
        if (tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({user: userId, refreshToken: refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken: refreshToken})
        return tokenData;
    }
    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken: refreshToken})
        return tokenData;
    }

    validateAccessToken(AccessToken){
        try{
            const isLegit = jwt.verify(AccessToken, process.env.JWT_ACCESS_SECRET_KEY);
            return isLegit
        }
        catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken){
        try{
            const isLegit = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
            return isLegit
        }
        catch (e) {
            return null;
        }
    }
}
export default new tokenService;