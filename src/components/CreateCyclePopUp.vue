<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">New Cycle</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-form ref="form" v-model="validCycle">
          <v-text-field type="text" label="Cycle Name" v-model="cycle.name" :rules="nameRules" required />
          <v-text-field type="number" label="Reps" v-model.number="cycle.repetitions" :rules="numberRules" />
        </v-form>
        <div class="d-flex justify-center my-3">
          <v-btn :disabled="!validCycle" @click="$emit('popUpClosed'); createCycle()" class="mr-5 rounded-xl" color="secondary">Create Cycle</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <AlertPopUp :show="showError" @popUpClosed="showError=false" />

  </div>
</template>

<script>

import { mapActions } from "pinia";
import {useCycleStore} from "@/store/CycleStore";
import {Cycle} from "@/api/cycle";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "CreateCyclePopUp",
  components: {AlertPopUp},
  data() {
    return {
      dialog: this.show,
      count: this.cycleCount,
      cycle: new Cycle(null,this.cycleCount+1,1),
      validCycle: false,
      showError: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      numberRules: [
        num => num > 0 || 'The number must be grater than zero',
      ],
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
    }),
    async createCycle() {
      try {
        await this.$createCycle(this.routineId, this.cycle);
      } catch(e) {
        this.showError=true
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