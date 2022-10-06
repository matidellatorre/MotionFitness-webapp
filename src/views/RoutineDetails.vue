<template>
  <v-main>
    <SubHeaderSearch :title=routine.name has-search-bar="false" />
    <ThirdHeader left-text="Cycles" right-text="Exercices"></ThirdHeader>
    <div class="d-flex flex-fill fill-height">
      <LateralList />
      <v-list three-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item
            v-else
            :key="item.title"
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-main>
</template>

<script>
import store from "@/store/routines"
import SubHeaderSearch from "@/components/SubHeaderSearch";
import LateralList from "@/components/LateralList";
import ThirdHeader from "@/components/ThirdHeader";
// import ExerciseCard from "@/components/ExerciseCard";

export default {
  name: "RoutineDetails",
  components: { ThirdHeader, LateralList, SubHeaderSearch},
  data(){
    return {
      routineId: this.$route.params.id,
      exercises: store.exercises,
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
LateralList {
  display: inline-block;
}
</style>