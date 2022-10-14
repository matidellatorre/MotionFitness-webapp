<template>
  <v-list v-if="result.content" color="white" width="100%" class="justify-center text-center align-center">
    <v-list-item class="flex-fill" v-for="cycleExercise in result.content" :key="cycleExercise.order">
      <v-list-item-content>
        <div class="d-flex justify-center">
          <h3>{{cycleExercise.exercise.name}}</h3>
          <v-spacer />
          <div class="d-flex">
            <v-icon>mdi-sync</v-icon>
            <p class="mx-2 text-md-subtitle-1">{{ cycleExercise.repetitions }} repetitions</p>
          </div>
          <div class="d-flex">
            <v-icon>mdi-clock</v-icon>
            <p class="mx-2 text-md-subtitle-1">{{ cycleExercise.duration }} seconds</p>
          </div>
<!--          <h3 class="mx-2">{{ cycleExercise.duration }}</h3>-->
<!--          Queda comentado por si queremos agregarle que tmb muestre el peso-->
          <v-spacer />
          <v-btn class="mr-4" >
            Edit
          </v-btn>
          <v-btn color="red">
            Delete
          </v-btn>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";
import {useCycleStore} from "@/store/CycleStore";
import {useCycleExerciseStore} from "@/store/CycleExerciseStore";

export default {
  name: "ExerciseList",
  data() {
    return {
      cycleExercises: null,
      result: null,
      cycleExercise: null,
      controller: null,
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    ...mapState(useCycleStore, {
      $selectedCycleId: 'selectedCycleId'
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
    }),
    ...mapActions(useCycleExerciseStore, {
      $createCycleExercise: 'create',
      $modifyCycleExercise: 'modify',
      $deleteCycleExercise: 'delete',
      $getCycleExercise: 'get',
      $getAllCycleExercises: 'getAll',
      $getSelectedCycleId: 'getSelectedCycleId'
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    // async createRoutine() {
    //   //FALTA CAMBIAR SPORT POR ROUTINE Y CAMBIAR LA INSTANCIA DEL OBJETO
    //   const index = Math.floor(Math.random() * (999 - 1) + 1)
    //   const sport = new Sport(null, `sport ${index}`, `sport ${index}`);
    //   try {
    //     this.sport = await this.$createSport(sport);
    //     this.setResult(this.sport)
    //   } catch (e) {
    //     this.setResult(e)
    //   }
    // },
    // async modifySport() {
    //   //IDEM ANTERIOR
    //   const index = Math.floor(Math.random() * (999 - 1) + 1)
    //   this.sport.detail = `sport ${index}`;
    //
    //   try {
    //     this.sport = await this.$modifySport(this.sport);
    //     this.setResult(this.sport)
    //   } catch(e) {
    //     this.setResult(e)
    //   }
    // },
    // async deleteSport() {
    //   //IDEM
    //   try {
    //     await this.$deleteSport(this.sport);
    //     this.sport = null
    //     this.clearResult()
    //   } catch(e) {
    //     this.setResult(e)
    //   }
    // },
    async getCycleExercise(cycleId) {
      try {
        await this.$getCycleExercise(cycleId, this.cycle.id);
        this.setResult(this.cycle)
      } catch(e) {
        this.setResult(e)
      }
    },
    async getAllCycleExercises(cycleId) {
      try {
        this.controller = new AbortController()
        const cycleExercises = await this.$getAllCycleExercises(cycleId, this.controller);
        this.controller = null
        this.setResult(cycleExercises)
      } catch(e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    }
  },
  async created() {
    if(this.$getSelectedCycleId){
      this.getAllCycleExercises(this.$getSelectedCycleId)
    }
  }
}

</script>
<style scoped>

</style>