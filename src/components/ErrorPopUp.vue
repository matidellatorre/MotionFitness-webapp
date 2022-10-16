<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-6 rounded-xl">
        <h2 class="text-center red--text mb-5">{{ this.msg }}</h2>
        <div class="d-flex justify-center">
          <v-btn outlined dark color="black" @click="$emit('popUpClosed')" class="rounded-xl">OK</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ErrorPopUp",
  data() {
    return {
      dialog: this.show,
    }
  },
  props: {
    msg: String,
    show: Boolean,
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
  },
};
</script>

<style scoped>

</style>