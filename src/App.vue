<template>
  <v-app id="app">
    <CustomHeader logged-in=false />
    <router-view :key="$route.path"/>
  </v-app>
</template>
<script>
import CustomHeader from "@/components/CustomHeader";
import { useSecurityStore } from "@/store/SecurityStore";
export default {
  components: { CustomHeader },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  }
};
</script>
<style></style>
