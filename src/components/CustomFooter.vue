<template>
  <v-footer
      dark
      padless
  >
    <v-card
        flat
        tile
        class="primary text-center"
        width="100%"
    >
      <v-card-text>
        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
         Your only training app
      </v-card-text>
      <v-btn text class="white--text pt-0 mb-2" @click="$router.push('/faq')">
        Have any questions? See our FAQ here
      </v-btn>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Motion Fitness</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "CustomFooter"
}
</script>

<style scoped>

</style>