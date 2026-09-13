import axios from "axios";
import SyncStorage from "sync-storage";

export const ApiUrl = "https://api.interactive-school-map.shenid.ru";

axios.defaults.timeout = 20000;


const $api = axios.create({
    withCredentials: true,
    baseURL: ApiUrl
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${SyncStorage.get("token")}`
    return config;
})
$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequests = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequests._isRetry = true;
        try {
            const response = await axios.get(`${ApiUrl}/auth/refresh`, {withCredentials: true});
            SyncStorage.set('token', response.data.accessToken)
            return $api.request(originalRequests);
        }
        catch (e) {
            console.log("Не авторизован", e)
        }
    }
    throw error;
})

export default $api;