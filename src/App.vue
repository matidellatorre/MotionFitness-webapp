<template>
  <v-app id="app">
    <CustomHeader logged-in=false />
    <router-view :key="$route.path"/>
  </v-app>
</template>
<script>
import CustomHeader from "@/components/CustomHeader";
export default {
  components: { CustomHeader },
};
</script>
<style></style>
