<template>
  <v-app>
    <CustomHeader />

    <v-main>
      <HelloWorld />
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
