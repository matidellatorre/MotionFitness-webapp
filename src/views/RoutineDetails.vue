<template>
  <v-main>
    <SubHeaderSearch :title=routine.name has-search-bar="false" />
  </v-main>
</template>

<script>
import store from "@/store/routines"
import SubHeaderSearch from "@/components/SubHeaderSearch";

export default {
  name: "RoutineDetails",
  components: {SubHeaderSearch},
  data(){
    return {
      routineId: this.$route.params.id
    }
  },
  computed: {
    routine() {
      return store.routines.find(routine => routine.id === this.routineId) //Basicamente filtramos por id
    }
  }
};
</script>

<style scoped>

</style>