<template>
  <v-app>
    <CustomHeader />
    <v-main>
      <img src="../src/assets/bg.png" />
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
