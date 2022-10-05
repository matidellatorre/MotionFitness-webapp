<template >
  <v-main >
    <SubHeaderSearch @searched="(val) => searchQuery=val"
      title="My Routines"
      subtitle="This are the actual routines"
      has-search-bar="true"/>
    <v-container>
      <v-row justify="start">
        <v-col cols="4" v-for="routine in filteredRoutines" :key="routine.id">
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
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutineCard from "@/components/RoutineCard";
import store from "@/store/routines"

export default {
  name: "RoutinesView",
  components: { RoutineCard, SubHeaderSearch },
  data() {
    return {
      searchQuery: '',
      routines: store.routines,
    }
  },
  computed: {
    filteredRoutines() {
      return this.routines.filter(routine => routine.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
};
</script>

<style scoped></style>
