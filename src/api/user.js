import { Api } from "./api.js";

export { UserApi, Credentials, User }

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), false, credentials, controller);
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl('logout'), true, controller);
    }

    static async get(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller);
    }

    static async create(user, controller) {
        return Api.post(UserApi.getUrl(''),true, user, controller);
    }

}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class User {
    constructor(name, username, email, password) {
        this.username = username;
        this.password = password;
        this.firstName = name;
        this.lastName = "a";
        this.gender = "male";
        this.birthdate = 0;
        this.email = email;
        this.phone = "0";
        this.avatarUrl = "https://flic.kr/p/3ntH2u";
        this.metadata = null;
    }
}