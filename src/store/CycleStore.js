import { defineStore } from "pinia";
import {CycleApi} from "@/api/cycle";

export const useCycleStore = defineStore("cycle", {
    state: () => ({ items: [] }),
    getters: {
        findIndex() {
            return (cycle) => {
                return this.items.findIndex(item => item.id === cycle.id)
            }
        },
    },
    actions: {
        push(cycle) {
            this.items.push(cycle);
        },
        replace(index, cycle) {
            this.items[index] = cycle;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        replaceAll(cycles) {
            this.items = cycles;
        },
        async create(routineId, cycle) {
            const result = await CycleApi.add(routineId, cycle);
            if (!this.findIndex(result))
                this.push(result);
            return result;
        },
        async modify(routineId, cycle) {
            const result = await CycleApi.modify(routineId, cycle);
            const index = this.findIndex(result);
            if (index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(routineId, cycle) {
            await CycleApi.delete(routineId, cycle.id);
            const index = this.findIndex(cycle);
            if (index >= 0)
                this.splice(index);
        },
        async get(routineId, cycle) {
            const index = this.findIndex(cycle);
            if (index >= 0)
                return this.items[index];

            const result = await CycleApi.get();
            this.push(result);
            return result;
        },
        async getAll(routineId, controller) {
            const result = await CycleApi.getAll(routineId, controller);
            return result;
        }
    },
});
