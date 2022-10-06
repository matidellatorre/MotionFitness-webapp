<template>
  <v-list height="100%" width="18%" elevation="3" color="grey1">
    <v-list-item-group
        v-model="selectedItem"
        color="secondary"
    >
      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          width="auto"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: 'Real-Time' },
      { text: 'Audience' },
      { text: 'Conversions' },
    ],
  }),
}
</script>

<style scoped>

</style>