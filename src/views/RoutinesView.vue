<template>
  <v-main>
    <SubHeaderSearch
      title="My Routines"
      subtitle="This are the actual routines"
    />
    <v-container>
      <v-row>
        <v-col v-for="routine in routines" :key="routine.name">
          <RoutineCard
              class="ma-3"
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
export default {
  name: "RoutinesView",
  components: {RoutineCard, SubHeaderSearch },
  data() {
    return {
      routines: [
        { name: "Hombros Lunes", cycles:4, exercises: 10, duration:"2hs" },
        { name: "Piernas Jueves", cycles:5, exercises: 12, duration:"1h 30min" },
        { name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
        { name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
        { name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
        { name: "Rutina 3", cycles:3, exercises: 10, duration:"1h" },
      ],
    };
  },
};
</script>

<style scoped></style>
