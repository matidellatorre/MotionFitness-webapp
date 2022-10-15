<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Edit Routine</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-text-field type="text" label="Routine Name" v-model="routine.name" />
        <v-text-field type="text" label="Description" v-model="routine.detail" />
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed'); modifyRoutine()" class="mr-5 rounded-xl" color="secondary">Save Routine</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { useRoutineStore } from "@/store/RoutineStore";
import {mapActions} from "pinia";

export default {
  name: "EditRoutinePopUp",
  data() {
    return {
      dialog: this.show,
      mail: String,
      code: String,
      routine: Object.assign({},this.routineToEdit)
    }
  },
  props: {
    show: Boolean,
    routineToEdit: Object
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $modifyRoutine: 'modify',
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async modifyRoutine() {
      try {
        const response = await this.$modifyRoutine(this.routine);
        this.setResult(response)
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