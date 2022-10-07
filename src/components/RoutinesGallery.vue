<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="4" xl="3" v-for="routine in filteredRoutines" :key="routine.id">
        <router-link :to="{ name: 'details', params: { id: routine.id }}">
          <RoutineCard
              img-src="@/assets/workout_placeholder.png"
              :routine-name=routine.name
              :cycles=routine.cycles
              :exercises=routine.exercises
              :duration=routine.duration
          />
        </router-link>
      </v-col>
    </v-row>
  </v-container >
</template>

<script>
import RoutineCard from "@/components/RoutineCard";

export default {
  name: "RoutinesGallery",
  components: { RoutineCard },
  props: {
    routines: Object,
    searchQuery: String
  },
  computed: {
    filteredRoutines() {
      return this.routines.filter(routine => routine.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
}
</script>

<style scoped>

</style>