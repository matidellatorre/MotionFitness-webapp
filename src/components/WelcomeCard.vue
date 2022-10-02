<template>
  <v-sheet
    color="white"
    width="35%"
    height="80%"
    class="rounded-xl text-center pa-9 d-flex flex-column justify-space-around mb-6"
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
    <v-btn color="secondary" elevation="10" rounded @click="$router.push('/routines')">
      Start creating your own routines</v-btn
    >
  </v-sheet>
</template>

<script>
export default {
  name: "WelcomeCard",
};
</script>

<style scoped></style>
