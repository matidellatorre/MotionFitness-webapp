<template>
  <v-main>
    <SubHeaderSearch :title=routine.name has-search-bar="false" />
    <LateralList/>
  </v-main>
</template>

<script>
import store from "@/store/routines"
import SubHeaderSearch from "@/components/SubHeaderSearch";
import LateralList from "@/components/LateralList";

export default {
  name: "RoutineDetails",
  components: {LateralList, SubHeaderSearch},
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