<template>
  <v-main>
    <SubHeaderSearch
      title="My Routines"
      subtitle="This are the actual routines"
    />
    <v-row class="pa-10">
      <RoutineCard
        img-src="@/assets/workout_placeholder.png"
        routine-name="Piernas lunes"
        cycles="4"
        exercises="20"
        duration="1h 30min"
      />
      <RoutineCard
        img-src="@/assets/workout_placeholder.png"
        routine-name="Piernas lunes"
        cycles="4"
        exercises="20"
        duration="1h 30min"
      />
      <RoutineCard
        img-src="@/assets/workout_placeholder.png"
        routine-name="Piernas lunes"
        cycles="4"
        exercises="20"
        duration="1h 30min"
      />
      <RoutineCard
        img-src="@/assets/workout_placeholder.png"
        routine-name="Piernas lunes"
        cycles="4"
        exercises="20"
        duration="1h 30min"
      />
      <RoutineCard
        img-src="@/assets/workout_placeholder.png"
        routine-name="Piernas lunes"
        cycles="4"
        exercises="20"
        duration="1h 30min"
      />
    </v-row>
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutineCard from "@/components/RoutineCard";
export default {
  name: "RoutinesView",
  components: { RoutineCard, SubHeaderSearch },
};
</script>

<style scoped></style>
