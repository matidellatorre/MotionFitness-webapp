<template>
  <v-app id="app">
    <CustomHeader />
    <router-view :key="$route.path"/>
  </v-app>
</template>
<script>
import CustomHeader from "@/components/CustomHeader";
// import { useSecurityStore } from "@/store/SecurityStore";
export default {
  components: { CustomHeader },
};
</script>
<style></style>
