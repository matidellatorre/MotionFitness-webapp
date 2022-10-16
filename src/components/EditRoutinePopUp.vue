<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Edit Routine</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-form ref="form" v-model="validRoutine">
          <v-text-field type="text" label="Routine Name" v-model="routine.name" :rules="nameRules" required />
          <v-text-field type="text" label="Description" v-model="routine.detail" />
        </v-form>
        <div class="d-flex justify-center my-3">
          <v-btn :disabled="!validRoutine" @click="$emit('popUpClosed'); modifyRoutine()" class="mr-5 rounded-xl" color="secondary">Save</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <AlertPopUp :show="showError" @popUpClosed="showError=false" />
  </div>
</template>

<script>

import { useRoutineStore } from "@/store/RoutineStore";
import {mapActions} from "pinia";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "EditRoutinePopUp",
  components: {AlertPopUp},
  data() {
    return {
      dialog: this.show,
      mail: String,
      code: String,
      routine: {...this.routineToEdit},
      validRoutine: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      showError: false
    }
  },
  props: {
    show: Boolean,
    routineToEdit: Object
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $modifyRoutine: 'modify',
    }),
    async modifyRoutine() {
      try {
        await this.$modifyRoutine(this.routine)
      } catch(e) {
        this.showError=true
      }
    },
    abort() {
      this.controller.abort()
    }
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
    routineToEdit: function() {
      this.routine = {...this.routineToEdit};
    }
  },
};
</script>

<style scoped>

</style>