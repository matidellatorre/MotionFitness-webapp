<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="4" xl="3" v-for="routine in filteredRoutines" :key="routine.id">
        <router-link :to="{ name: 'details', params: { id: routine.id, routineName: routine.name }}">
          <RoutineCard
              img-src="@/assets/workout_placeholder.png"
              :routine-name=routine.name
              :description=routine.detail
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
    routines: Array,
    searchQuery: String
  },
  computed: {
    filteredRoutines() {
      if (this.routines){
        return this.routines.filter(routine => routine.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
      return null
    }
  },
}
</script>

<style scoped>

</style>