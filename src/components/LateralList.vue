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
    <CreateCyclePopUp :show="showCyclePopUp" :routine-id="this.routineId" :cycle-count="cycles.length" @popUpClosed="showCyclePopUp=false"/>
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
    exercise: null,
    controller: null,
    showCyclePopUp: false
  }),
  props: {
    routineId: Number,
    cycles: Array
  },
  computed: {
    ...mapState(useCycleStore, {
      $selectedCycle: state => state.selectedCycle,
    }),
  },
  methods: {
    ...mapActions(useCycleStore, {
      $setSelectedCycle: 'setSelectedCycle',
    }),
  },
  watch: {
    selectedItem: function() {
      this.$setSelectedCycle(this.selectedItem)
    },
  }
}
</script>

<style scoped>

</style>