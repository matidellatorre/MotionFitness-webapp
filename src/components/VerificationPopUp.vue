<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Email verification</h1>
        <h4 class="text-center mlt-4 mb-8">Please enter the code sent to your email address</h4>
        <v-otp-input
            length="6"
        ></v-otp-input>
        <div class="d-flex justify-center my-3">
          <v-btn @click="dialog = false" class="mr-5 rounded-xl" color="secondary">Verify</v-btn>
          <v-btn outlined dark color="red" @click="dialog = false" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "VerificationPopUp",
  data() {
    return {
      dialog: this.show,
    }
  },
  props: {
    show: Boolean,
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    }
  }
};
</script>

<style scoped>

</style>