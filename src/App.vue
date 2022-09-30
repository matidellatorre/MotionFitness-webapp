<template>
  <v-app id="app">
    <CustomHeader />
    <router-view />
  </v-app>
</template>
<script>
import CustomHeader from "@/components/CustomHeader";
export default {
  components: { CustomHeader },
};
</script>
<style></style>
