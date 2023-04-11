export default class Data{
    static getData(key){
        return JSON.parse(localStorage.getItem(key));
    }
}