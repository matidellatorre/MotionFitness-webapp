<template>
  <router-link :to="{ name: 'details', params: { id: routine.id, routineName: routine.name }}">
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
      {{ routine.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ routine.detail }}
    </v-card-subtitle>
    <v-card-actions class="justify-end">
      <v-btn width="10" height="40" @click.stop.prevent="deleteR()">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </router-link>
</template>

<script>
import {mapActions} from "pinia";
import {useRoutineStore} from "@/store/RoutineStore";

export default {
  name: "RoutineCard",
  data() {
    return {
      result: null,
      controller: null,
    }
  },
  props: {
    routine: Object
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $deleteRoutine: 'delete',
    }),
    async deleteRoutine() {
      try {
        await this.$deleteRoutine(this.routine);
        this.clearResult()
      } catch(e) {
        this.setResult(e)
      }
    },
    deleteR(){
      this.deleteRoutine()
    }
  },
  setResult(result){
    this.result = result
  },
  clearResult() {
    this.result = null
  },
  async deleteRoutine() {
    try {
      await this.$deleteRoutine(this.routine.id);
      this.clearResult()
    } catch(e) {
      this.setResult(e)
    }
  },
};
</script>

<style scoped></style>
