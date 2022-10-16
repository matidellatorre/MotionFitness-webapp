<template>
  <v-list flat class="text-center" height="100%" width="18%" color="grey1">
    <v-list-item-group
        v-model="selectedItem"
        color="secondary"
        mandatory
    >
      <div
        v-for="(cycle, i) in cycles"
        :key="i"
        class="rounded-0"
      >
        <v-card flat v-bind:class="{ class1: i==selectedItem, class2: i!=selectedItem}">
          <v-list-item width="auto">
            <v-menu
                v-if="allowEditing"
                top
                offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon color="black">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group v-model="selectedContextItem">
                <v-list-item @click="showEditPopUp=true">
                  <v-icon class="mr-2">mdi-pencil</v-icon>
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteC()">
                  <v-icon class="mr-2 red--text">mdi-delete</v-icon>
                  <v-list-item-title class="red--text">Delete</v-list-item-title>
                </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
            <v-list-item-title v-text="cycle.name"></v-list-item-title>
            <v-chip color="blue" dark >{{ cycle.repetitions }}</v-chip>
          </v-list-item>
        </v-card>
      </div>
    </v-list-item-group>
    <v-btn v-if="allowEditing" class="mt-3" color="secondary" rounded @click="showCyclePopUp=true">
      Add cycle
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <CreateCyclePopUp v-if="this.cycles" :show="showCyclePopUp" :routine-id="this.routineId" :cycle-count="this.cycles.length" @popUpClosed="showCyclePopUp=false"/>
    <EditCyclePopUp :show="showEditPopUp" :routine-id="this.routineId" :cycle-count="this.cycles.length" :cycle-to-edit="this.cycles[selectedItem]" @popUpClosed="showCyclePopUp=false; showEditPopUp=false"/>
  </v-list>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useCycleStore} from "@/store/CycleStore";
import CreateCyclePopUp from "@/components/CreateCyclePopUp";
import EditCyclePopUp from "@/components/EditCyclePopUp";

export default {
  components: {EditCyclePopUp, CreateCyclePopUp},
  data: () => ({
    selectedItem: 0,
    selectedContextItem: null,
    result: null,
    cycle: null,
    controller: null,
    showCyclePopUp: false,
    cycles: Array,
    showEditPopUp: false
  }),
  computed: {
    ...mapState(useCycleStore, {
      $selectedCycleId: state => state.selectedCycleId,
    }),
    ...mapState(useCycleStore, {
      $cycles: state => state.items,
    }),
  },
  props: {
    routineId: Number,
    allowEditing: Boolean,
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
    deleteC() {
      this.deleteCycle(this.routineId, this.$cycles[this.selectedItem])
    },
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
    async deleteCycle(routineId, currentCycle) {
      try {
        const res = await this.$deleteCycle(routineId, currentCycle)
        this.setResult(res)
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
    $cycles: function() {
      this.cycles = this.$cycles;
    }
  },
  async created() {
    this.getAllCycles(this.routineId)
  },
}
</script>

<style scoped>
.class1 {
  background-color: white;
  border-radius: 0px;
  margin: 0.5rem 0rem;
}
.class2 {
  background-color: rgba(168, 162, 157, 0.34);
  margin: 0.5rem 0.25rem;
  border-radius: 15px;
}
</style>