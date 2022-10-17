<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
        @click:outside="$emit('popUpClosed')"
    >
      <v-card class="pa-10 rounded-xl justify-center" @click="suggestions=false" :ripple="false" flat>
        <h1 class="text-center secondary--text mb-5">Create {{this.isRest?"Rest":"Exercise"}}</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <div class="d-flex flex-fill justify-center">
          <v-btn width="100px" v-bind:color="isRest==false ? 'secondary' : 'white'" @click="isRest=false">Exercise</v-btn>
          <v-btn width="100px" v-bind:color="isRest==true ? 'secondary' : 'white'" @click="isRest=true">Rest</v-btn>
        </div>
        <v-form ref="form" v-model="validRoutine">
          <div>
            <v-text-field v-model="selectedExercise" label = "Name" :rules="nameRules" />
            <v-card
                id="este" v-if="suggestions"
                class="mx-auto"
                max-width="300"
                tile
            >
              <v-list dense>
                <v-list-item
                    v-for="(item, i) in this.filteredExercises"
                    :key="i"
                    @click="selectedExercise=item.name"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
          <v-row>
            <v-checkbox v-model="hasReps"/>
            <v-text-field v-if="isRest==false" :disabled="!hasReps" type="number" label="Reps" v-model.number="cycleExercise.repetitions" :rules="numberRules" />
          </v-row>
          <v-row>
            <v-checkbox v-model="hasDuration"/>
            <v-text-field type="number" :disabled="!hasDuration" label="Duration" v-model.number="cycleExercise.duration" :rules="numberRules" />
          </v-row>
        </v-form>
        <div class="d-flex justify-center my-3">
          <v-btn :disabled="!validRoutine || (!hasReps && !hasDuration)" @click="$emit('popUpClosed'); create()" class="mr-5 rounded-xl" color="secondary">Create {{ isRest?'Rest' : 'Exercise' }}</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <AlertPopUp :show="showError" />
  </div>
</template>

<script>
import {Exercise} from "@/api/exercise";
import {CycleExercise} from "@/api/cycleExercise";
import { mapActions, mapState } from "pinia";
import { useExerciseStore } from "@/store/ExerciseStore";
import { useCycleExerciseStore } from "@/store/CycleExerciseStore";
import { useCycleStore } from "@/store/CycleStore";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "CreateExercisePopUp",
  components: {AlertPopUp},
  data() {
    return {
      dialog: this.show,
      isRest: false,
      exercise: new Exercise(null, this.isRest ? "rest" : "exercise"),
      cycleExercise: new CycleExercise,
      selectedExercise: '',
      suggestions: false,
      filteredExercises: Array,
      validRoutine: null,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      numberRules: [
        num => num > 0 || 'The number must be grater than zero',
      ],
      showError: false,
      hasReps: true,
      hasDuration: false
    }
  },
  props: {
    show: Boolean,
  },
  methods: {
    async create() {
      const res = this.filterResult(this.selectedExercise);
      this.cycleExercise.order=this.getMaxOrder()+1;
      if (!this.hasReps){
        this.cycleExercise.repetitions = 0
      }
      if (!this.hasDuration){
        this.cycleExercise.duration = 0
      }
      if (res.length===1) {
        try {
          this.$createCycleExercise(this.$cycleId, res[0].id, this.cycleExercise);
        } catch (e) {
          this.showError = true
        }
      } else {
        this.exercise.name=this.selectedExercise;
        this.exercise.type=this.isRest ? "rest" : "exercise";
        const newExercise = await this.$createExercise(this.exercise);
        try {
          this.$createCycleExercise(this.$cycleId, newExercise.id, this.cycleExercise);
        } catch (e) {
          this.showError = true
        }
      }
    },
    filterExercises() {
      if (this.selectedExercise) {
        return this.$exercises.filter(exercise => exercise.name.toLowerCase().includes(this.selectedExercise.toLowerCase()))
      }
      return null
    },
    filterResult() {
      if (this.selectedExercise) {
        return this.$exercises.filter(exercise => exercise.name.toLowerCase() === this.selectedExercise.toLowerCase())
      }
      return null
    },
    getMaxOrder() {
      if(this.$cycleExercises.length===0)
        return 0;
      return Math.max(...this.$cycleExercises.map(item => item.order));
    },
    ...mapActions(useExerciseStore, {
      $getAllExercises: 'getAll',
      $createExercise: 'create',
    }),
    ...mapActions(useCycleExerciseStore, {
      $createCycleExercise: 'create',
      $getMaxOrder: 'getMaxOrder',
    }),
  },
  computed: {
    ...mapState(useExerciseStore, {
      $exercises: state => state.items,
    }),
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
    selectedExercise: function() {
      this.filteredExercises = this.filterExercises();
      this.suggestions = this.selectedExercise !== '';
    },
  },
  async created() {
    this.$getAllExercises();
  }
};
</script>

<style scoped>
#este {
  position: absolute;
  background-color: white;
  z-index: 21;
}
</style>