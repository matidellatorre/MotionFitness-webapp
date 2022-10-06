<template>
  <div class="d-flex">
    <v-sheet color="grey2" height="50" class="d-flex py-3 px-4 d-inline-block justify-center" width="18%">
      <p>{{ leftText }}</p>
    </v-sheet>
    <v-sheet color="grey2" height="50" class="d-flex py-3 px-4 d-inline-block justify-center" width="82%">
      <p>{{ rightText }}</p>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "ThirdHeader",
  props: {
    leftText: String,
    rightText: String,
  }
}
</script>

<style scoped>
p {
  font-size: large;
}
</style>