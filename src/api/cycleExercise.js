import { Api } from "./api.js";

export { CycleExerciseApi, CycleExercise }

class CycleExerciseApi {
    static getUrl(cycleId, exerciseId) {
        return `${Api.baseUrl}/cycles${ cycleId ? `/${cycleId}` : ""}/exercises${ exerciseId ? `/${exerciseId}` : ""}`;
    }

    static async add(cycleId, exerciseId, cycleExercise, controller) {
        return await Api.post(CycleExerciseApi.getUrl(cycleId, exerciseId), true, cycleExercise, controller);
    }

    static async modify(cycleId, exerciseId, exercise, controller) {
        return await Api.put(CycleExerciseApi.getUrl(cycleId, exerciseId), true, exercise, controller);
    }

    static async delete(cycleId, exerciseId, controller) {
        return await Api.delete(CycleExerciseApi.getUrl(cycleId, exerciseId), true, controller);
    }

    static async get(cycleId, exerciseId, controller) {
        return await Api.get(CycleExerciseApi.getUrl(cycleId, exerciseId),true,  controller);
    }

    static async getAll(cycleId, controller) {
        return await Api.get(CycleExerciseApi.getUrl(cycleId), true, controller);
    }
}

class CycleExercise {
    constructor(order, duration, repetitions) {
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}
