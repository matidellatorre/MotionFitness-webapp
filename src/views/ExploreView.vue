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
import store from "@/store/routines";
import RoutinesGallery from "@/components/RoutinesGallery";


export default {
  name: "ExploreView",
  components: {RoutinesGallery, SubHeaderSearch},
  data() {
    return {
      searchQuery: '',
      routines: store.routines,
    }
  }
};
</script>

<style scoped></style>
