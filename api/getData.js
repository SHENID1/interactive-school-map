import SyncStorage from 'sync-storage';
import styled from 'styled-components/native'

export default class Data{
    static getData(key){
        const data = SyncStorage.get(key)
        // console.log(data)
        if (data !== undefined){
            return JSON.parse(data);
        }
        return data
    }
}

