<template>
  <div id="div-container">
    <v-btn large color="secondary" class="onTop" fixed right bottom rounded @click="showPopUp=true">
      Add exercise
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-list v-if="result" class="justify-center text-center align-center" color="white" width="100%">
      <div v-for="cycleExercise in result.content" :key="cycleExercise.order">
        <v-card class="ma-1 elevation-2">
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex">
                <div class="d-flex align-center">
                  <h3>{{ cycleExercise.exercise.name }}</h3>
                </div>
                <v-spacer />
                <div class="d-flex">
                  <div class="d-flex align-center">
                    <v-icon>mdi-sync</v-icon>
                    <p class="ma-0">{{ cycleExercise.repetitions }} repetitions</p>
                  </div>
                  <div class="d-flex align-center">
                    <v-icon>mdi-clock</v-icon>
                    <p class="ma-0">{{ cycleExercise.duration }} seconds</p>
                  </div>
                </div>
                <v-spacer />
                <div class="d-flex">
                  <v-btn class="mr-4">
                    Edit
                  </v-btn>
                  <v-btn color="red">
                    Delete
                  </v-btn>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
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
.onTop{
  z-index: 20;
}
</style>