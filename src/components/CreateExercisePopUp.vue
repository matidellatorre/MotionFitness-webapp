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
        <v-text-field type="text" label="Name" v-model="exercise.name"/>
        <v-text-field v-if="isRest==false" type="number" label="Reps" v-model.number="cycleExercise.repetitions" />
        <v-text-field type="number" label="Duration" v-model.number="cycleExercise.duration" />
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

export default {
  name: "CreateExercisePopUp",
  data() {
    return {
      dialog: this.show,
      isRest: false,
      exercise: new Exercise(null,this.isRest?"rest":"exercise"),
      cycleExercise: new CycleExercise(1,30,10)
    }
  },
  props: {
    show: Boolean,
  },
  methods: {
    create() {
      console.log('ejercicio creado')
    }
  },
  watch: {
    show: function() {
      this.dialog = this.show
    }
  }
}
</script>

<style scoped>

</style>