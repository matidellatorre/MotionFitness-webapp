<template>
  <v-btn
    :color=color
    elevation="10"
    rounded
  >
    <slot></slot>
  </v-btn>
</template>

<script>

export default {
  name: "CustomButton",
  props: {
    color:String
  }
};
</script>

<style scoped>

</style>