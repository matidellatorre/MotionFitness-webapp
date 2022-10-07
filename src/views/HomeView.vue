<template>
  <v-main id="main-content">
    <WelcomeCard />
  </v-main>
</template>

<script>
import WelcomeCard from "@/components/WelcomeCard";
export default {
  name: "HomeView",
  components: {
    WelcomeCard,
  },
};
</script>
<style scoped>
#main-content {
  background: url("@/assets/bg.jpg");
  background-size: cover;
}
#sheet-container {
  margin-top: 5%;
  margin-left: 5%;
}
</style>
