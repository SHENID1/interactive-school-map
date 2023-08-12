import SyncStorage from "./syncStorage";

export default class Data {
    static getDataWithJsonParse(key) {
        try {
            const value = SyncStorage.get(key)
            if (value !== undefined) {
                //console.log("getData", value);
                return JSON.parse(value)
            }
            return undefined;

        } catch (e) {
            console.error(e)
        }
    }

    static getData(key) {
        try {
            const value = SyncStorage.get(key)
            if (value !== null) {
                //console.log("getData", value);
                return value;
            }
            return undefined;
        } catch (e) {

        }
    }

    static setData(key, value) {
        try {
            SyncStorage.set(
                key,
                value,
            )
        } catch (e) {
            console.error(e)
        }
    }
}

