export default class UserDto {
    login;
    id;

    constructor(model) {
        this.id = model._id;
        this.login = model.login
    }
}