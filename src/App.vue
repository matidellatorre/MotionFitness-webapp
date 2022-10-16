<template>
  <v-app id="app" >
    <CustomHeader />
    <v-main class="contenido">
      <router-view v-if="onLine" :key="$route.path" class="full"/>
      <div v-else>
        <NoInternet />
      </div>
    </v-main>
    <custom-footer />
  </v-app>
</template>
<script>
import CustomHeader from "@/components/CustomHeader";
import { useSecurityStore } from "@/store/SecurityStore";
import CustomFooter from "@/components/CustomFooter";
import NoInternet from "@/components/NoInternet";
export default {
  components: {NoInternet, CustomFooter, CustomHeader },
  data() {
    return {
      onLine: true,
    }
  },
  methods: {
    updateOnlineStatus(e) {
      const {
        type
      } = e;
      this.onLine = type === 'online';
    }
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();
  },
  mounted() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 1000);
      }
    }
  },
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
