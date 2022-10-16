<template>
  <v-main>
    <SubHeaderSearch :title=$router.currentRoute.params.routineName :has-search-bar=false />
    <ThirdHeader left-text="Cycles" right-text="Exercices"></ThirdHeader>
    <div class="d-flex flex-fill fill-height">
      <LateralList :routine-id="parseInt($router.currentRoute.params.id)" :allow-editing="allowEditing" />
      <ExerciseList :allow-editing="allowEditing" />
    </div>
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import LateralList from "@/components/LateralList";
import ThirdHeader from "@/components/ThirdHeader";
import ExerciseList from "@/components/ExerciseList";

export default {
  name: "RoutinesView",
  components: {ExerciseList, LateralList, ThirdHeader, SubHeaderSearch },
  data() {
    return {
      allowEditing: this.$router.currentRoute.params.editable==='e',
    }
  }
};
</script>

<style scoped>
LateralList {
  display: inline-block;
}
</style>