<template>
  <div id="div-container">
    <v-btn large color="secondary" fixed right bottom rounded @click="showPopUp=true">
      Add exercise
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-list v-if="result" class="justify-center text-center align-center" color="white" width="100%">
      <v-list-item v-for="cycleExercise in result.content" :key="cycleExercise.order" class="flex-fill">
        <v-list-item-content>
          <div class="d-flex justify-center">
            <h3>{{ cycleExercise.exercise.name }}</h3>
            <v-spacer/>
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
            <v-spacer/>
            <v-btn class="mr-4">
              Edit
            </v-btn>
            <v-btn color="red">
              Delete
            </v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <CreateExercisePopUp :show="this.showPopUp" @popUpClosed="showPopUp=false"/>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";
import {useCycleStore} from "@/store/CycleStore";
import {useCycleExerciseStore} from "@/store/CycleExerciseStore";
import CreateExercisePopUp from "@/components/CreateExercisePopUp";

export default {
  name: "ExerciseList",
  components: {CreateExercisePopUp},
  data() {
    return {
      cycleExercises: null,
      result: null,
      cycleExercise: null,
      controller: null,
      // cycleId: null,
      showPopUp: false
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
    ...mapState(useCycleStore, {
      $cycleExercises: state => state.items,
    }),
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
    }),
    ...mapActions(useCycleStore, {
      $setSelectedCycleId: 'setSelectedCycleId',
    }),
    setResult(result) {
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    // canInitialize() {
    //   return this.cycleExercises.length > 0;
    // },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    // async getCycleExercise(cycleId) {
    //   try {
    //     await this.$getCycleExercise(cycleId, this.cycle.id);
    //     this.setResult(this.cycle)
    //   } catch (e) {
    //     this.setResult(e)
    //   }
    // },
    async getAllCycleExercises(cycleId) {
      try {
        this.controller = new AbortController()
        const cycleExercises = await this.$getAllCycleExercises(cycleId, this.controller);
        this.controller = null
        this.setResult(cycleExercises)
      } catch (e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    }
  },
  watch: {
    $selectedCycleId: function () {
      this.getAllCycleExercises(this.$selectedCycleId);
    },
    $cycleExercises: function () {
      this.$setSelectedCycleId(0);
    }
  },
  // async created() {
  //   if(this.canInitialize()){
  //     this.$setSelectedCycleId(0);
  //     console.log(this.$selectedCycleId);
  //   }
  // }
}

</script>
<style scoped>
  #div-container {
    width: 100%;
  }
</style>