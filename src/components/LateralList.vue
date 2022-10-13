<template>
  <v-list flat class="text-center" height="100%" width="18%" elevation="3" color="grey1">
    <v-list-item-group
        v-model="selectedItem"
        color="secondary"
    >
      <v-list-item
          v-for="(cycle, i) in cycles"
          :key="i"
          width="auto"
      >
        <v-list-item-content>
          <v-list-item-title v-text="cycle.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
<!--    <v-list-item-content v-if="addyingCycle" class="pa-0">-->
<!--      <v-text-field @focusout="addyingCycle=false" v-model="newCycle" class="ma-0 py-0 px-1"></v-text-field>-->
<!--    </v-list-item-content>-->
    <v-btn class="mt-3" color="secondary" rounded @click="showCyclePopUp=true">
      Add cycle
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <CreateCyclePopUp v-if="cycles" :show="showCyclePopUp" :routine-id="this.routineId" :cycle-count="this.cycles.length" @popUpClosed="showCyclePopUp=false"/>
  </v-list>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useCycleStore} from "@/store/CycleStore";
import CreateCyclePopUp from "@/components/CreateCyclePopUp";

export default {
  components: {CreateCyclePopUp},
  data: () => ({
    selectedItem: 0,
    result: null,
    cycle: null,
    controller: null,
    showCyclePopUp: false,
    cycles: Array
  }),
  computed: {
    ...mapState(useCycleStore, {
      $selectedCycleId: state => state.selectedCycleId,
    }),
    ...mapState(useCycleStore, {
      $items: state => state.items,
    }),
  },
  props: {
    routineId: Number,
  },
  methods: {
    ...mapActions(useCycleStore, {
      $createCycle: 'create',
      $modifyCycle: 'modify',
      $deleteCycle: 'delete',
      $getCycle: 'get',
      $getAllCycles: 'getAll',
      $setSelectedCycleId: 'setSelectedCycleId',
      $getSelectedCycleId: 'getSelectedCycleId',
    }),
    setResult(result) {
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async getAllCycles(routineId) {
      try {
        this.controller = new AbortController()
        const cycles = await this.$getAllCycles(routineId, this.controller);
        this.controller = null
        this.setResult(cycles)
      } catch (e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    },
  },
  watch: {
    selectedItem: function() {
      this.$setSelectedCycleId(this.selectedItem)
    },
    //Explicar a gasti
    result: function() {
      if (this.result.content)
        this.cycles = this.result.content
    }
  },
  async created() {
    console.log(this.cycles.length)
    this.getAllCycles(this.$router.currentRoute.params.id)
  },
}
</script>

<style scoped>

</style>