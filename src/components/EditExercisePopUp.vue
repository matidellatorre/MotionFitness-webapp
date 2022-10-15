<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card class="pa-10 rounded-xl justify-center">
        <h1 class="text-center secondary--text mb-5">Edit Exercise</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
          <v-text-field type="number" label="Reps" v-model.number="cycleExercise.repetitions" />
          <v-text-field type="number" label="Duration" v-model.number="cycleExercise.duration" />
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed'); edit()" class="mr-5 rounded-xl" color="secondary">Save</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {Exercise} from "@/api/exercise";
import {CycleExercise} from "@/api/cycleExercise";
import { mapActions, mapState } from "pinia";
import { useExerciseStore } from "@/store/ExerciseStore";
import { useCycleExerciseStore } from "@/store/CycleExerciseStore";
import { useCycleStore } from "@/store/CycleStore";

export default {
  name: "EditExercisePopUp",
  data() {
    return {
      dialog: this.show,
      exercise: new Exercise(null, "exercise"),
      cycleExercise: new CycleExercise(null, 5, 8),
    }
  },
  props: {
    show: Boolean,
    editingCycleExercise: Object,
  },
  methods: {
    async edit() {
        this.modifyCycleExercise();
    },
    async modifyCycleExercise(){
      await this.$modifyCycleExercise(this.$cycleId, this.cycleExercise);
    },
    ...mapActions(useExerciseStore, {
      $getAllExercises: 'getAll',
      $createExercise: 'create',
    }),
    ...mapActions(useCycleExerciseStore, {
      $modifyCycleExercise: 'modify',
    }),
  },
  computed: {
    ...mapState(useCycleStore, {
      $cycleId: state => state.selectedCycleId,
    }),
    ...mapState(useCycleExerciseStore, {
      $cycleExercises: state => state.items,
    }),
  },
  watch: {
    show: function() {
      this.dialog = this.show
    },
    editingCycleExercise: function() {
      this.cycleExercise = {...this.editingCycleExercise};
    }
  },
};
</script>

<style scoped>
</style>