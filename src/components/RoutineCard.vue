<template>
  <div>
  <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'details', params: { id: routine.id, routineName: routine.name, editable: allowEditing ? 'e':'n' }}">
  <v-card  dark
      class="mx-auto rounded-xl ma-3"
      max-width="344"
          transition="scale-transition"
  >
    <v-img
        v-bind:src="require('@/assets/routine-photos/'+routine.metadata.image)"
        height="150px"
    ></v-img>
    <v-card-title>
      {{ routine.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ routine.detail }}
    </v-card-subtitle>
    <v-card-actions v-if="allowEditing" class="justify-end pa-0">
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
    routine: Object,
    allowEditing: Boolean,
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $deleteRoutine: 'delete',
    }),
    async deleteRoutine() {
      try {
        await this.$deleteRoutine(this.routine);
      } catch(e) {
        console.log(e);
      }
    },
    deleteR(){
      this.deleteRoutine()
    },
  },
  async deleteRoutine() {
    try {
      await this.$deleteRoutine(this.routine.id);
    } catch(e) {
      console.log(e);
    }
  },
};
</script>

<style scoped></style>
