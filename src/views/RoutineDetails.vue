<template>
  <section>
    <h1>{{ routine.name }}</h1>
    <h2>Hola</h2>
  </section>
</template>

<script>
import store from "@/store/routines"

export default {
  name: "RoutineDetails",
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