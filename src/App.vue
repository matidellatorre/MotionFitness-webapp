<template>
  <v-app>
    <CustomHeader />
    <v-main id="main-content">
      <v-sheet
        color="white"
        width="35%"
        height="80%"
        class="rounded-lg text-center"
        id="sheet-container"
      >
        <h1>Welcome to Motion!</h1>
        <v-spacer></v-spacer>
        <h3>Your only Training App & Web</h3>
        <h3>
          Create and edit custom routines, sync them with your mobile device and
          have your routines on the go.
        </h3>
        <v-spacer></v-spacer>
        <v-btn color="secondary" elevation="10" rounded>
          Start creating your own routines</v-btn
        >
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import CustomHeader from "@/components/CustomHeader";
export default {
  name: "App",

  components: {
    CustomHeader,
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
