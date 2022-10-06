<template>
  <v-sheet dark class=" mx-auto text-center rounded-xl" color="primary" max-width="200">
    <h4 class="pa-3">{{ name }}</h4>
    <p>{{ reps }} repetitions</p>
    <p>{{ time }} s</p>
    <p class="pb-3">{{ weight }} {{ unit }}</p>
  </v-sheet>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    name: String,
    reps: Number,
    time: Number,
    weight: Number,
    unit: String
  }
}
</script>

<style scoped>

</style>