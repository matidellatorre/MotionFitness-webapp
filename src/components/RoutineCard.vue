<template>
  <div>
  <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'details', params: { id: routine.id, routineName: routine.name }}">
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
    <v-card-actions class="justify-end pa-0">
      <v-btn outlined class="rounded-pill mb-4 mr-4" @click.stop.prevent="showEditingPopUp=true">
        <v-icon color="white">mdi-pencil</v-icon>
      </v-btn>
      <v-btn outlined class="rounded-pill mb-4 mr-4" @click.stop.prevent="deleteR()">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </router-link>
  <EditRoutinePopUp :show="showEditingPopUp" :routine-to-edit="this.routine" @popUpClosed="showEditingPopUp=false" />
  </div>
</template>

<script>
import {mapActions} from "pinia";
import {useRoutineStore} from "@/store/RoutineStore";
import EditRoutinePopUp from "@/components/EditRoutinePopUp";

export default {
  name: "RoutineCard",
  components: {EditRoutinePopUp},
  data() {
    return {
      result: null,
      controller: null,
      showEditingPopUp: false
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
    },
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
