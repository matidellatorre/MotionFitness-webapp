<template>
  <v-sheet color="secondary" class="px-5 py-1 elevation-3" dark height="auto">
    <h1 class="my-2">{{ title }}</h1>
    <div class="d-flex">
      <h3 class="mb-5">{{ subtitle }}</h3>
      <v-spacer></v-spacer>
      <div id="field-box">
        <v-text-field
          placeholder="Search routine"
          filled
          rounded
          dense
          clearable
          light
          background-color="white"
          append-icon="mdi-magnify"
          class="mr-5"
          v-model="searchQuery"
          @keyup="$emit('searched', searchQuery)"
          v-if="hasSearchBar == 'true'"
        />
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "SubHeaderSearch",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    hasSearchBar: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  }
};
</script>

<style scoped>
#field-box {
  width: 30%;
}
</style>
