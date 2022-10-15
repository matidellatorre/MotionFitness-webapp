<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">New Cycle</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-text-field type="text" label="Cycle Name" v-model="cycle.name" />
        <v-text-field type="number" label="Reps" v-model.number="cycle.repetitions" />
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed'); createCycle()" class="mr-5 rounded-xl" color="secondary">Create Cycle</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { mapActions } from "pinia";
import {useCycleStore} from "@/store/CycleStore";
import {Cycle} from "@/api/cycle";

export default {
  name: "CreateCyclePopUp",
  data() {
    return {
      dialog: this.show,
      count: this.cycleCount,
      cycle: new Cycle(null,this.cycleCount+1,1),
    }
  },
  props: {
    show: Boolean,
    routineId: Number,
    cycleCount: Number,
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
    cycleCount: function() {
      this.cycle.order = this.cycleCount+1
    }
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
    async createCycle() {
      try {
        await this.$createCycle(this.routineId, this.cycle);
        this.setResult(this.routine)
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