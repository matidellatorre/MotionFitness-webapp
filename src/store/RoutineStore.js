import { defineStore } from "pinia";
import { routineApi } from "@/api/routine";

export const useRoutineStore = defineStore("routine", {
    state: () => ({ items: [] }),
    getters: {
        findIndex() {
            return (routine) => {
                return this.items.findIndex(item => item.id === routine.id)
            }
        },
    },
    actions: {
        push(routine) {
            this.items.push(routine);
        },
        replace(index, routine) {
            this.items[index] = routine;
        },
        splice(routine) {
            this.items.splice(routine, 1);
        },
        replaceAll(routines) {
            this.items = routines;
        },
        async create(routine) {
            const result = await routineApi.add(routine);
            if (!this.findIndex(result))
                this.push(result);
            return result;
        },
        async modify(routine) {
            const result = await routineApi.modify(routine);
            const index = this.findIndex(result);
            if (index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(routine) {
            await routineApi.delete(routine.id);
            const index = this.findIndex(routine);
            if (index >= 0)
                this.splice(index);
        },
        async get(routine) {
            const index = this.findIndex(routine);
            if (index >= 0)
                return this.items[index];

            const result = await routineApi.get();
            this.push(result);
            return result;
        },
        async getAll(controller) {
            const result = await routineApi.getAll(controller);
            return result;
        }
    },
});
