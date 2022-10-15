import { Api } from "./api.js";

export { ExerciseApi, Exercise }

class ExerciseApi {
    static getUrl(slug, params) {
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}${ params ? `?${params}` : ""}`;
    }

    static async add(exercise, controller) {
        return await Api.post(ExerciseApi.getUrl(), true, exercise, controller);
    }

    static async modify(exercise, controller) {
        return await Api.put(ExerciseApi.getUrl(exercise.id), true, exercise, controller);
    }

    static async delete(id, controller) {
        return await Api.delete(ExerciseApi.getUrl(id), true, controller);
    }

    static async get(id, controller) {
        return await Api.get(ExerciseApi.getUrl(id),true,  controller);
    }

    static async getAll(controller) {
        return await Api.get(ExerciseApi.getUrl(null, `page=0&size=30&orderBy=id&direction=asc`), true, controller);
    }
}

class Exercise {
    constructor(name, type) {
        this.name = name;
        this.detail = '';
        this.type = type;
    }
}
