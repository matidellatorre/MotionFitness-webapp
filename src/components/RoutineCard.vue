<template>
  <v-card dark
      class="mx-auto rounded-xl ma-3"
      max-width="344"
          transition="scale-transition"
  >
    <v-img
        src="@/assets/workout_placeholder.png"
        height="150px"
    ></v-img>

    <v-card-title>
      {{ routineName }}
    </v-card-title>

    <v-card-subtitle>
      {{ cycles }} cycles, {{ exercises }} exercises
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
          color="secondary"
          text
      >
        View
      </v-btn>
    </v-card-actions>
  </v-card>
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
