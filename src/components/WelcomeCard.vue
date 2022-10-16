<template>
  <v-sheet
    color="white"
    width="35%"
    height="70%"
    class="rounded-xl text-center pa-9 d-flex flex-column justify-space-around mb-6"
    id="sheet-container"
  >
    <h1 class="secondary--text">Welcome to Motion!</h1>
    <v-spacer></v-spacer>
    <h3>Your only Training App & Web</h3>
    <v-spacer></v-spacer>
    <p class="font-weight-light text--accent-2 body-1">
      Create and edit custom routines, sync them with your mobile device and
      have your routines on the go.
    </p>
    <v-spacer></v-spacer>
    <div class="text-center mt-3 mb-12">
      <v-btn rounded color="secondary" dark @click="$router.push('/routines')">Start training</v-btn>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "WelcomeCard",
};
</script>

<style scoped></style>
