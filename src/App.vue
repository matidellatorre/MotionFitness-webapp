<template>
  <v-app>
    <CustomHeader />
    <v-main id="main-content">
      <WelcomeCard />
    </v-main>
  </v-app>
</template>

<script>
import CustomHeader from "@/components/CustomHeader";
import WelcomeCard from "@/components/WelcomeCard";
export default {
  name: "App",

  components: {
    CustomHeader,
    WelcomeCard,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
#main-content {
  background: url("../src/assets/bg.png");
  background-size: cover;
}
#sheet-container {
  margin-top: 5%;
  margin-left: 5%;
}
</style>
