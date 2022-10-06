<template>
  <v-sheet color="grey2" height="50" class="d-flex py-3 px-4">
    <v-spacer></v-spacer>
    <p>{{ leftText }}</p>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <p>{{ rightText }}</p>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  </v-sheet>
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