<template>
  <v-sheet class="d-flex justify-center align-center text-center" height="100%" width="100%">
    <div>
      <h1 class="ma-3">Error 404</h1>
      <div class="d-flex justify-center text-center">
        <v-img class="ma-3 text-center" src="@/assets/not-found.png" width="10px" />
      </div>
      <h3 class="ma-3"> This page is missing :( </h3>
      <p>Please use the buttons to navigate through this site.</p>
      <router-link style="text-decoration: none; color: inherit;" to="/">
        <v-btn class="ma-3" rounded color="secondary">Go Home</v-btn>
      </router-link>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "NotFoundPageView"
}
</script>

<style scoped>
router-link{
  text-decoration: none;
}
</style>