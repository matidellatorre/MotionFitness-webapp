<template>
  <v-main>
    <SubHeaderSearch :title=routine.name has-search-bar="false" />
    <ExerciseCard name="Ejercicio 1" reps="10" time="30" weight="5" unit="kg"/>
  </v-main>
</template>

<script>
import store from "@/store/routines"
import SubHeaderSearch from "@/components/SubHeaderSearch";
import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: "RoutineDetails",
  components: {ExerciseCard, SubHeaderSearch},
  data(){
    return {
      routineId: this.$route.params.id
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

</style>