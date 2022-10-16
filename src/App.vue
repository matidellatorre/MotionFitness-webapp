<template>
  <v-app id="app" >
    <CustomHeader />
    <v-main class="contenido">
      <router-view :key="$route.path" class="full"/>
    </v-main>
    <custom-footer />
  </v-app>
</template>
<script>
import CustomHeader from "@/components/CustomHeader";
import { useSecurityStore } from "@/store/SecurityStore";
import CustomFooter from "@/components/CustomFooter";
export default {
  components: { CustomFooter, CustomHeader },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  }
};
</script>
<style>
.contenido{
  min-height: 100%;
}
.full{
  height: 100%;
}
</style>
