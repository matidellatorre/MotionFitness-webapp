<template>
  <v-main>
    <SubHeaderSearch
      title="My Routines"
      subtitle="This are the actual routines"
    />
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
