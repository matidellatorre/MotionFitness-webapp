import { Api } from "./api.js";

export { CycleApi, Cycle }

class CycleApi {
  static getUrl(routineId, slug) {
    return `${Api.baseUrl}/routines${ routineId ? `/${routineId}` : ""}/cycles${ slug ? `/${slug}` : ""}`;
  }

  static async add(routineId, cycle, controller) {
   return await Api.post(CycleApi.getUrl(routineId), true, cycle, controller);
  }

  static async modify(routineId, cycleId, cycle, controller) {
    return await Api.put(CycleApi.getUrl(routineId, cycleId), true, cycle, controller);
  }

  static async delete(routineId, cycleId, controller) {
    return await Api.delete(CycleApi.getUrl(routineId, cycleId), true, controller);
  }

  static async get(routineId, cycleId, controller) {
    return await Api.get(CycleApi.getUrl(routineId, cycleId),true,  controller);
  }

  static async getAll(routineId, controller) {
    return await Api.get(CycleApi.getUrl(routineId), true, controller);
  }
}

class Cycle {
  constructor(id, name, reps) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.reps = reps;
  }
}
