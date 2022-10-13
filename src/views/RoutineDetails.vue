<template>
  <v-main>
    <v-btn v-if="cycles" large color="secondary" fixed right bottom rounded>
      Add exercise
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <SubHeaderSearch :title=$router.currentRoute.params.routineName :has-search-bar=false />
    <ThirdHeader left-text="Cycles" right-text="Exercices"></ThirdHeader>
    <div class="d-flex flex-fill fill-height">
      <LateralList :cycles="this.cycles" :routine-id="$router.currentRoute.params.id" />
      <ExerciseList v-if="cycles" :selectedCycleId="cycles[this.$getSelectedCycle()].id" />
    </div>
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";
import {Credentials} from "@/api/user";
import LateralList from "@/components/LateralList";
import ThirdHeader from "@/components/ThirdHeader";
import {useCycleStore} from "@/store/CycleStore";
import ExerciseList from "@/components/ExerciseList";

export default {
  name: "RoutinesView",
  components: {ExerciseList, LateralList, ThirdHeader, SubHeaderSearch },
  data() {
    return {
      cycles: null,
      result: null,
      cycle: null,
      controller: null,
      // Obtener el id de la rutina actual: $router.currentRoute.params.id
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
      $selectedCycle: state => state.selectedCycle,
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
    ...mapActions(useCycleStore, {
      $createCycle: 'create',
      $modifyCycle: 'modify',
      $deleteCycle: 'delete',
      $getCycle: 'get',
      $getAllCycles: 'getAll',
      $getSelectedCycle: 'getSelectedCycle',
      $setSelectedCycle: 'setSelectedCycle'
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async login() {
      try {
        const credentials = new Credentials('johndoe', '1234567890')
        await this.$login(credentials, true)
        this.clearResult()
      } catch (e) {
        this.setResult(e)
      }
    },
    async logout() {
      await this.$logout()
      this.clearResult()
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
    async getCycle(routineId) {
      try {
        await this.$getCycle(routineId, this.cycle.id);
        this.setResult(this.cycle)
      } catch(e) {
        this.setResult(e)
      }
    },
    async getAllCycles(routineId) {
      try {
        this.controller = new AbortController()
        const cycles = await this.$getAllCycles(routineId, this.controller);
        this.controller = null
        this.setResult(cycles)
      } catch(e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    }
  },
  async created() {
    this.getAllCycles(this.$router.currentRoute.params.id)
  },
  watch: {
    result: function() {
      if (this.result.content)
        this.cycles = this.result.content
    }
  },
};
</script>

<style scoped>
LateralList {
  display: inline-block;
}
</style>