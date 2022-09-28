<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex justify-space-between">
      <TopLeftlogo />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text> Routines </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text> Explore </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text> FAQ </v-btn>
      </v-toolbar-items>
      <v-btn color="secondary" elevation="10" rounded>Log in</v-btn>
    </div>
  </v-app-bar>
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
