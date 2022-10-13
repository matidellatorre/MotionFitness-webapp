<template >
  <v-main >
    <v-btn @click="showCreationPopUp=true;" large color="secondary" fixed right bottom rounded>
      Add routine
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <SubHeaderSearch @searched="(val) => searchQuery=val"
      title="Routines"
      subtitle="This are your routines"
      :has-search-bar=true />
    <RoutinesGallery v-if="this.result" :routines="this.result.content" :search-query="this.searchQuery" />'
    <CreateRoutinePopUp :show="showCreationPopUp" @popUpClosed="showCreationPopUp=false" />
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutinesGallery from "@/components/RoutinesGallery";
import {useSecurityStore} from "@/store/SecurityStore";
import {mapActions, mapState} from "pinia";
import {useRoutineStore} from "@/store/RoutineStore";
import CreateRoutinePopUp from "@/components/CreateRoutinePopUp";

export default {
  name: "RoutinesView",
  components: {CreateRoutinePopUp, RoutinesGallery, SubHeaderSearch },
  data() {
    return {
      searchQuery: '',
      result: null,
      routine: null,
      controller: null,
      showCreationPopUp: false
    }
  },
  computed: {
    ...mapState(useRoutineStore, {
      $routines: state => state.items,
    }),
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
    // async createRoutine() {
    //   //FALTA CAMBIAR SPORT POR ROUTINE Y CAMBIAR LA INSTANCIA DEL OBJETO
    //   const sport = new Sport(null, `sport ${index}`, `sport ${index}`);
    //   try {
    //     this.sport = await this.$createSport(sport);
    //     this.setResult(this.sport)
    //   } catch (e) {
    //     this.setResult(e)
    //   }
    // },
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
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
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
  async created() {
    this.getAllRoutines()
  },
};
</script>

<style scoped></style>
