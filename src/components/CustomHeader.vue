<template>
  <nav>
    <v-toolbar flat app dark color="primary">
      <TopLeftlogo />
      <v-spacer></v-spacer>
      <v-toolbar-items class="pa-3">
        <v-btn text> Routines </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text> Explore </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text> FAQ </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn color="secondary" elevation="10" rounded>Log in</v-btn>
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
