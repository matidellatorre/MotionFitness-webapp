<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Routine Name</h1>
        <h4 class="text-center mlt-4 mb-8">Please enter this routine name to save it</h4>
        <v-text-field type="text" name="Routine Name" v-model="routine.name" />
        <v-textarea type="text" name="Detail" v-model="routine.detail" />
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed'); create()" class="mr-5 rounded-xl" color="secondary">Create Routine</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { useRoutineStore } from "@/store/RoutineStore";
import { Routine } from "@/api/routine";

export default {
  name: "CreateRoutinePopUp",
  data() {
    return {
      dialog: this.show,
      mail: String,
      code: String,
      routine: new Routine,
    }
  },
  props: {
    show: Boolean,
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    canCreate() {
      return this.$isLoggedIn && !this.routine
    },
    canOperate() {
      return this.$isLoggedIn && this.routine
    },
    canAbort() {
      return this.$isLoggedIn && this.controller
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    ...mapActions(useRoutineStore, {
      $createRoutine: 'create',
      $modifyRoutine: 'modify',
      $deleteRoutine: 'delete',
      $getRoutine: 'get',
      $getAllRoutines: 'getAll'
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async modifySport() {
      //IDEM ANTERIOR
      const index = Math.floor(Math.random() * (999 - 1) + 1)
      this.sport.detail = `sport ${index}`;

      try {
        this.sport = await this.$modifySport(this.sport);
        this.setResult(this.sport)
      } catch(e) {
        this.setResult(e)
      }
    },
    async deleteSport() {
      //IDEM
      try {
        await this.$deleteSport(this.sport);
        this.sport = null
        this.clearResult()
      } catch(e) {
        this.setResult(e)
      }
    },
    async create() {
      try {
        await this.$createRoutine(this.routine);
        this.setResult(this.routine)
      } catch(e) {
        this.setResult(e)
      }
    },
    async getAllRoutines() {
      try {
        this.controller = new AbortController()
        const routines = await this.$getAllRoutines(this.controller);
        this.controller = null
        this.setResult(routines)
      } catch(e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    }
  },
};
</script>

<style scoped>

</style>