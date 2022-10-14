<template>
  <router-link :to="{ name: 'details', params: { id: this.id, routineName: this.routineName }}">
  <v-card  dark
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
      {{ description }}
    </v-card-subtitle>
    <v-card-actions class="justify-end">
      <v-btn width="10" height="40" @click.stop.prevent="print2()">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </router-link>
</template>

<script>
export default {
  name: "RoutineCard",
  props: {
    imgSrc: String,
    routineName: String,
    description: String,
    id: String
  },
  methods: {
    print() {
      console.log('Card')
    },
    print2() {
      console.log('Boton')
    },
  }
};
</script>

<style scoped></style>
