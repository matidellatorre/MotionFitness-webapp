<template >
  <v-main >
    <v-btn large color="secondary" fixed right bottom rounded>
      Add routine
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <SubHeaderSearch @searched="(val) => searchQuery=val"
      title="Routines"
      subtitle="This are your routines"
      has-search-bar="true"/>
    <RoutinesGallery :routines="this.routines" :search-query="this.searchQuery" />'
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import store from "@/store/routines"
import RoutinesGallery from "@/components/RoutinesGallery";

export default {
  name: "RoutinesView",
  components: {RoutinesGallery, SubHeaderSearch },
  data() {
    return {
      searchQuery: '',
      routines: store.routines,
    }
  }
};
</script>

<style scoped></style>
