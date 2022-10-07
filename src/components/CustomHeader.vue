<template>
  <nav>
    <v-toolbar flat app dark color="primary">
      <router-link to="/">
        <TopLeftlogo />
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="pa-3">
        <v-btn text @click="$router.push('/routines')"> Routines </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text @click="$router.push('/explore')">Explore</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <!--
      <CustomButton @click="$router.push('/login')" color="secondary">
        Holaa
      </CustomButton> -->
      <v-btn
        color="secondary"
        elevation="10"
        rounded
        @click="$router.push('/login')"
        >Log in</v-btn
      >
    </v-toolbar>
  </nav>
</template>

<script>
import TopLeftlogo from "@/components/TopLeftLogo";

export default {
  name: "CustomHeader",
  components: {
    TopLeftlogo,
  },
};
</script>
<style scoped></style>
