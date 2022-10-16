<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="4" xl="3" v-for="routine in filteredRoutines" :key="routine.id">
          <RoutineCard :routine=routine :allow-editing="allowEditing"/>
      </v-col>
    </v-row>
  </v-container >
</template>

<script>
import RoutineCard from "@/components/RoutineCard";

export default {
  name: "RoutinesGallery",
  components: { RoutineCard },
  props: {
    routines: Array,
    searchQuery: String,
    allowEditing: Boolean,
  },
  computed: {
    filteredRoutines() {
      if (this.routines){
        return this.routines.filter(routine => routine.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
      return null
    }
  },
}
</script>

<style scoped>

</style>