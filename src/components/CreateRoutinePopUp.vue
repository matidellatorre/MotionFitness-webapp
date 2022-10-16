<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">New Routine</h1>
        <h4 class="text-center mlt-4 mb-8">Please complete the fields below</h4>
        <v-form ref="form"
                 v-model="validRoutine">
        <v-text-field type="text" label="Routine Name" v-model="routine.name" :rules="nameRules" required />
        <v-text-field type="text" label="Description" v-model="routine.detail" />
      </v-form>
        <div class="d-flex justify-center my-3">
          <v-btn :disabled="!validRoutine" @click="$emit('popUpClosed'); create()" class="mr-5 rounded-xl" color="secondary">Create Routine</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <AlertPopUp :show="showError" :message="msg" @popUpClosed="showError=false" />
  </div>
</template>

<script>

import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { useRoutineStore } from "@/store/RoutineStore";
import { Routine } from "@/api/routine";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "CreateRoutinePopUp",
  components: {AlertPopUp},
  data() {
    return {
      dialog: this.show,
      mail: String,
      code: String,
      routine: new Routine(null,"",null),
      validRoutine: false,
      showError: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
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
    async create() {
      const fileName = `routine${Math.floor(Math.random() * 8)+1}.jpeg`
      this.routine.metadata.image = fileName
      try {
        await this.$createRoutine(this.routine);
      } catch(e) {
        this.showError = true
      }
    },
    async getAllRoutines() {
      try {
        this.controller = new AbortController()
        await this.$getAllRoutines(this.controller);
        this.controller = null
      } catch(e) {
        this.showError = true
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