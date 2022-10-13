<template>
  <v-list height="100%" width="18%" elevation="3" color="grey1">
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
  </v-list>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useCycleStore} from "@/store/CycleStore";

export default {
  data: () => ({
    selectedItem: 0,
    result: null,
    exercise: null,
    controller: null,
  }),
  props: {
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
    }
  }
}
</script>

<style scoped>

</style>