<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <v-card class="pa-10 rounded-xl text-center">
        <h1 class="text-center secondary--text mb-5">Error</h1>
        <h4 class="text-center mlt-4 mb-8">{{this.message?this.message:'Sorry, we have an internal error. Please try again later'}}</h4>
        <div class="d-flex text-center align-center justify-center">
        <v-btn @click="$emit('popUpClosed');" class="mr-5 rounded-xl flex-fill" color="secondary">OK</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "AlertPopUp",
  data() {
    return {
      dialog: this.show,
      mes: this.message
    }
  },
  props: {
    show: Boolean,
    message: String
  },
  watch: {
    show: function () {
      this.dialog = this.show;
    },
    message: function () {
      this.mes = this.message()
    }
  }
}
</script>

<style scoped>

</style>