import {makeAutoObservable} from "mobx";
import AuthService from "../api/auth/AuthService";
import axios from "axios";
import {ApiUrl} from "../api";

export default class Store {
    user = {};
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    async login(login, password, remember)  {
        try{
            const response = await AuthService.login(login, password);

            if (!remember) {
                this.setAuth(true);
                this.setUser(response.data.user)
                return
            }

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch (e) {
            throw Error(e.message)
        }
    }
    async logout()  {
        try{
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false)
            this.setUser({})
        }
        catch (e) {
            throw Error(e.message)
        }
    }
    async checkAuth()  {
        try{
            const response = await axios.get(`${ApiUrl}/auth/refresh`, {withCredentials: true})
            // console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch (e) {
            throw Error(e.message)
        }
    }

}