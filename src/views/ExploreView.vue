<template>
  <v-main id="main-content">
    <SubHeaderSearch @searched="(val) => searchQuery=val"
    title="Explore"
    subtitle="Top routines by the community"
    :has-search-bar=true />
    <RoutinesGallery :routines="this.routines" :search-query="this.searchQuery" />
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutinesGallery from "@/components/RoutinesGallery";
import { mapActions } from "pinia";
import { useRoutineStore } from "@/store/RoutineStore";


export default {
  name: "ExploreView",
  components: {RoutinesGallery, SubHeaderSearch},
  data() {
    return {
      searchQuery: '',
      routines: null,
    }
  },
  methods:{
    ...mapActions(useRoutineStore, {
      $getEveryones: 'getEveryones'
    }),
    async getEveryones(){
      const result = await this.$getEveryones();
      this.routines = result.content;
    }
  },
  created() {
    this.getEveryones();
  }
};
</script>

<style scoped></style>
