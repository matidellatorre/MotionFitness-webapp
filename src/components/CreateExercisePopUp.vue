<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card class="pa-10 rounded-xl justify-center">
        <h1 class="text-center secondary--text mb-5">Create {{this.isRest?"Rest":"Exercise"}}</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <div class="d-flex flex-fill justify-center">
          <v-btn width="100px" v-bind:color="isRest==false ? 'secondary' : 'white'" @click="isRest=false">Exercise</v-btn>
          <v-btn width="100px" v-bind:color="isRest==true ? 'secondary' : 'white'" @click="isRest=true">Rest</v-btn>
        </div>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field type="text" label="Name" v-model="exercise.name"/>
          <v-text-field v-if="isRest==false" type="number" label="Reps" v-model.number="cycleExercise.repetitions" />
          <v-text-field type="number" label="Duration" v-model.number="cycleExercise.duration" />
          <div>
            <v-combobox
              v-model="selectedExercise"
              :items="this.$exercises"
              item-text="name"
              item-value="id"
              @input="handleInput"
              dense
              hide-no-data
              filled
              label="Filled"
            ></v-combobox>
          </div>
        </v-form>
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed'); create()" class="mr-5 rounded-xl" color="secondary">Create Cycle</v-btn>
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

export default {
  name: "CreateExercisePopUp",
  data() {
    return {
      dialog: this.show,
      isRest: false,
      exercise: new Exercise(null, this.isRest ? "rest" : "exercise"),
      cycleExercise: new CycleExercise(1, 30, 10),
      selectedExercise: null,
      exercisesName: Array,
    }
  },
  props: {
    show: Boolean,
  },
  methods: {
    handleInput () {
      this.$nextTick(() => {
        console.log(this.selectedExercise)
      })
    },
    handleSubmit () {
      this.selectedExercise = this.value
    },
    create() {
      if(this.selectedExercise.id){
        console.log("el ejercicio esta creado");
        //Llamo a la funcion de createCycle
      } else {

        console.log("creemos uno nuevo");
        // const res = ExerciseApi.add(this.exercise);
        // console.log(res);
      }


    },
    ...mapActions(useExerciseStore, {
      $getAllExercises: 'getAll',
      $createExercise: 'create',
    }),
  },
  computed: {
    ...mapState(useExerciseStore, {
      $exercises: state => state.items,
    }),
  },
  watch: {
    show: function() {
      this.dialog = this.show
    },
    $exercises: function() {
      this.exercisesName = this.$exercises.map(exercise => exercise.name);
    }
  },
  async created() {
    this.$getAllExercises();
  }
};
</script>

<style scoped>

</style>