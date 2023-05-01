import SyncStorage from 'sync-storage';

export default class Data{
    static getData(key){
        return JSON.parse(SyncStorage.get(key));
    }
}