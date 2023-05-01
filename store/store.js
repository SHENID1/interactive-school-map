import {makeAutoObservable} from "mobx";
import AuthService from "../api/auth/AuthService";
import axios from "axios";
import {ApiUrl} from "../api";
import SyncStorage from 'sync-storage';

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
                SyncStorage.set('remember', 0);
            }
            if (remember) {
                SyncStorage.remove('remember');
            }
            SyncStorage.set('token', response.data.accessToken);
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
            SyncStorage.remove('token');
            SyncStorage.remove('remember')
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
            SyncStorage.set('token', response.data.accessToken);
            this.setAuth(true)
            this.setUser(response.data.user)
        }
        catch (e) {
            throw Error(e.message)
        }
    }

}