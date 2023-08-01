import SyncStorage from 'sync-storage';

export default class Data{
    static getData(key){
        const data = SyncStorage.get(key)

        if (data !== undefined){
            return JSON.parse(data);
        }
        return data
    }
}

