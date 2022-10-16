<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card v-if="mail" class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Email verification</h1>
        <h4 class="text-center mlt-4 mb-8">Please enter the code sent to {{ mail }}</h4>
        <v-otp-input
            length="6"
            v-model="code"
        ></v-otp-input>
        <div class="d-flex justify-center my-3">
          <v-btn @click="verifyUser(mail, code); $emit('popUpClosed')" class="mr-5 rounded-xl" color="secondary">Verify</v-btn>
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <AlertPopUp :show="showError" :message="msg" @popUpClosed="showError=false" />
  </div>
</template>

<script>
import {UserApi, Verification} from "@/api/user";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "VerificationPopUp",
  components: {AlertPopUp},
  data() {
    return {
      dialog: this.show,
      mail: String,
      code: String,
      showError: false,
      msg: null
    }
  },
  props: {
    show: Boolean,
    email: String,
    controller: Object
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
    email: function() {
      this.mail = this.email;
    }
  },
  methods: {
    async verifyUser(email, code, controller) {
      const ver = new Verification(email, code)
      try {
        await UserApi.verify(ver, controller)
      } catch (e) {
        if (e.code){
          if (e.code===8){
            this.msg="The Motion verification code is invalid. Please try again."
            this.showError=true
          } else {
            this.msg=null
            this.showError=true
          }
        }
      }

    }
  }
};
</script>

<style scoped>

</style>