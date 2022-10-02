<template>
  <v-sheet rounded color="grey3" dark height="250px" width="300px">
    <img src="@/assets/workout_placeholder.png" />
    <h2>{{ routineName }}</h2>
    <p>{{ cycles }} cycles - {{ exercises }} exercises</p>
    <p>{{ duration }}</p>
  </v-sheet>
</template>

<script>
export default {
  name: "RoutineCard",
  props: {
    imgSrc: String,
    routineName: String,
    cycles: Number,
    exercises: Number,
    duration: String,
  },
};
</script>

<style scoped></style>
