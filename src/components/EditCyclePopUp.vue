<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Edit Cycle</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-text-field type="text" label="Cycle Name" v-model="cycle.name" />
        <v-text-field type="number" label="Reps" v-model.number="cycle.repetitions" />
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed'); modifyCycle()" class="mr-5 rounded-xl" color="secondary">Save Cycle</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { mapActions } from "pinia";
import {useCycleStore} from "@/store/CycleStore";

export default {
  name: "EditCyclePopUp",
  data() {
    return {
      dialog: this.show,
      count: this.cycleCount,
      cycle: null
    }
  },
  props: {
    show: Boolean,
    routineId: Number,
    cycleCount: Number,
    cycleToEdit: Object
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
    cycleToEdit: function () {
      this.cycle = {...this.cycleToEdit}
    },
  },
  methods: {
    ...mapActions(useCycleStore, {
      $createCycle: 'create',
      $modifyCycle: 'modify',
      $deleteCycle: 'delete',
      $getCycle: 'get',
      $getAllCycle: 'getAll'
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async modifyCycle() {
      try {
        const res = await this.$modifyCycle(this.routineId, this.cycle);
        this.setResult(res)
      } catch(e) {
        this.setResult(e)
      }
    },
    async createCycle() {
      try {
        console.log(this.cycle)
        const res = await this.$createCycle(this.routineId, this.cycle);
        this.setResult(res)
      } catch(e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    }
  },
};
</script>

<style scoped>

</style>