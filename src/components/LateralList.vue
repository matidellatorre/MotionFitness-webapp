<template>
  <v-list flat class="text-center" height="100%" width="18%" elevation="3" color="grey1">
    <v-list-item-group
        v-model="selectedItem"
        color="secondary"
    >
      <div
        v-for="(cycle, i) in cycles"
        :key="i"
        class="rounded-0"
      >
        <v-card flat v-bind:class="{ class1: i==selectedItem, class2: i!=selectedItem}">
          <v-list-item width="auto">
            <v-list-item-title v-text="cycle.name"></v-list-item-title>
          </v-list-item>
        </v-card>
      </div>
    </v-list-item-group>
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
    cycles: Array,
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
.class1 {
  background-color: white;
  border-radius: 0px;
  margin: 0px 0px;
}
.class2 {
  background-color: rgba(168, 162, 157, 0.34);
  margin: 0.5rem 0.25rem;
  border-radius: 25px;
}
</style>