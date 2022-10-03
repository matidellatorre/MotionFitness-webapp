<template>
  <v-main>
    <SubHeaderSearch
      title="My Routines"
      subtitle="This are the actual routines"
    />
    <v-container>
      <v-row justify="start">
        <v-col>
          <NewRoutineCard/>
        </v-col>
        <v-col cols="4" v-for="routine in routines" :key="routine.id">
          <RoutineCard
            img-src="@/assets/workout_placeholder.png"
            :routine-name=routine.name
            :cycles=routine.cycles
            :exercises=routine.exercises
            :duration=routine.duration
          />
        </v-col>
      </v-row>
    </v-container >
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutineCard from "@/components/RoutineCard";
import NewRoutineCard from "@/components/NewRoutineCard";
export default {
  name: "RoutinesView",
  components: { NewRoutineCard, RoutineCard, SubHeaderSearch },
  data() {
    return {
      routines: [
        { id: 0, name: "Hombros Lunes", cycles:4, exercises: 10, duration:"2hs" },
        { id: 1, name: "Piernas Jueves", cycles:5, exercises: 12, duration:"1h 30min" },
        { id: 2, name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
        { id: 3, name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
        { id: 4, name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
      ],
    };
  },
};
</script>

<style scoped></style>
