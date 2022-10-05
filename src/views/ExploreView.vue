<template>
  <v-main>
    <SubHeaderSearch title="Explore" subtitle="Top routines by the community" has-search-bar="true" />
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
export default {
  name: "ExploreView",
  components: { SubHeaderSearch },
};
</script>

<style scoped></style>
