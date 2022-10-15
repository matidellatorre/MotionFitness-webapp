import { Api } from "./api.js";

export { RoutineApi, Routine }

class RoutineApi {
  static getUrl(slug, params) {
    return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}${ params ? `?${params}` : ""}`;
  }

  static async add(routine, controller) {
   return await Api.post(RoutineApi.getUrl(), true, routine, controller);
  }

  static async modify(routine, controller) {
    return await Api.put(RoutineApi.getUrl(routine.id), true, routine, controller);
  }

  static async delete(id, controller) {
    return await Api.delete(RoutineApi.getUrl(id), true, controller);
  }

  static async get(id, controller) {
    return await Api.get(RoutineApi.getUrl(id),true,  controller);
  }

  static async getAll(userId, controller) {
    return await Api.get(RoutineApi.getUrl(null, `userId=${userId}&page=0&size=30&orderBy=date&direction=asc`), true, controller);
  }
}

class Routine {
  constructor(name, detail, imageFile) {
    this.name = name;
    this.detail = detail;
    this.isPublic=true;
    this.difficulty="rookie";
    this.metadata = {
      image: imageFile
    }
  }
}
