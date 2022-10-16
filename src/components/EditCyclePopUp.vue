<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Edit Cycle</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-form ref="form" v-model="validCycle">
          <v-text-field type="text" label="Cycle Name" v-model="cycle.name" :rules="nameRules" required />
          <v-text-field type="number" label="Reps" v-model.number="cycle.repetitions" />
        </v-form>
        <div class="d-flex justify-center my-3">
          <v-btn :disabled="!validCycle" @click="$emit('popUpClosed'); modifyCycle()" class="mr-5 rounded-xl" color="secondary">Save Cycle</v-btn>
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
import { Cycle } from "@/api/cycle";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "EditCyclePopUp",
  components: {AlertPopUp},
  data() {
    return {
      dialog: this.show,
      count: this.cycleCount,
      cycle: new Cycle('', 0, 0),
      validCycle: false,
      showError: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
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
      $modifyCycle: 'modify',
    }),
    async modifyCycle() {
      try {
        await this.$modifyCycle(this.routineId, this.cycle);
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