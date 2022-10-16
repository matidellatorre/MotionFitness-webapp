<template>
  <v-sheet class="d-flex justify-center align-center text-center" height="100%" width="100%">
    <div>
      <h1 class="ma-3">No internet</h1>
      <div class="d-flex justify-center text-center">
        <v-img class="ma-3 text-center" src="@/assets/no-internet.jpg" width="10px" />
      </div>
      <h3 class="ma-3"> Your connection seems to be down :( </h3>
      <p>Please check your network settings and try again.</p>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "NoInternet"
}
</script>

<style scoped>

</style>