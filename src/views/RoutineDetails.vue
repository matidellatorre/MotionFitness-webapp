<template>
  <v-main>
    <SubHeaderSearch :title=routine.name has-search-bar="false" />
    <ThirdHeader left-text="Cycles" right-text="Exercices"></ThirdHeader>
    <div class="d-flex flex-fill fill-height">
      <LateralList />
      <v-container>
        <v-row justify="start">
          <v-col cols="4" v-for="exercise in exercises" :key="exercise.id">
            <exercise-card :name="exercise.name" :reps="exercise.reps" :time="exercise.time" :weight="exercise.weight" :unit="exercise.unit" />
          </v-col>
        </v-row>
      </v-container >
    </div>
  </v-main>
</template>

<script>
import store from "@/store/routines"
import SubHeaderSearch from "@/components/SubHeaderSearch";
import LateralList from "@/components/LateralList";
import ThirdHeader from "@/components/ThirdHeader";
import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: "RoutineDetails",
  components: { ExerciseCard, ThirdHeader, LateralList, SubHeaderSearch},
  data(){
    return {
      routineId: this.$route.params.id,
      exercises: store.exercises,
    }
  },
  computed: {
    routine() {
      return store.routines.find(routine => routine.id === this.routineId) //Basicamente filtramos por id
    }
  }
};
</script>

<style scoped>
LateralList {
  display: inline-block;
}
</style>