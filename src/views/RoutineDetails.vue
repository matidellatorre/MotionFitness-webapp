<template>
  <v-main>
    <v-btn large color="secondary" fixed right bottom rounded>
      Add exercise
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <SubHeaderSearch :title=$router.currentRoute.params.routineName :has-search-bar=false />
    <ThirdHeader left-text="Cycles" right-text="Exercices"></ThirdHeader>
    <div class="d-flex flex-fill fill-height">
      <LateralList :routine-id="$router.currentRoute.params.id" />
      <ExerciseList />
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
};
</script>

<style scoped>
LateralList {
  display: inline-block;
}
</style>