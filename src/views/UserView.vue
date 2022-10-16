<template>
  <v-main id="main-content">
    <div v-if="this.$user" class="d-flex justify-center fill-height align-center"  >
      <v-card width="30%" class="d-flex flex-column px-10 pb-10 pt-7 text-center rounded-xl elevation-2" max-width="500" max-height="550" >
      <h1 class="secondary--text">My profile</h1>
        <div class="text-center mt-5">
          <img v-if="this.$user" class="rounded-circle elevation-3" v-bind:src="this.$user.avatarUrl" width="150" height="150">
        </div>
        <v-text-field
            @keydown="wasEdited=true"
            label="Name"
            name="Name"
            :value="this.$user.firstName"
            type="text"
            color="secondary"
            class="mt-5" />
        <v-text-field
            @keydown="wasEdited=true"
            label="Username"
            name="Username"
            :value="this.$user.username"
            type="text"
            color="secondary"
        />
        <v-text-field
            label="Email"
            name="Email"
            :value="this.$user.email"
            type="text"
            color="secondary"
            disabled
        />
        <div class="d-flex justify-center my-3">
          <v-btn rounded @click="saveCurrentUser()" color="secondary" class="mr-5 rounded-xl" :disabled="wasEdited==false">Save</v-btn>
          <v-btn outlined dark color="red" @click="logout(); $router.push('/')" class="ml-5 rounded-xl">Log out</v-btn>
        </div>
      </v-card>
    </div>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import { Credentials } from "@/api/user";

export default {
  name: 'UserView',
  props: {
    source: String,
  },
  data() {
    return {
      step: 1,
      userVerificated: false,
      credentials: new Credentials,
      result: null,
      controller: null,
      wasEdited: false
    }
  },
  methods: {
    async sendcredentials() {
      await this.login();
      await this.getCurrentUser();
      console.log(this.$user.username);
    },
    async talogueado() {
      await this.logout();
      console.log(this.$isLoggedIn);
      console.log(this.$user);
    },
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
      $modifyCurrentUser: 'modifyCurrentUser'
    }),
    setResult(result){
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult() {
      this.result = null
    },
    async logout() {
      await this.$logout()
      this.clearResult()
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    async saveCurrentUser() {
      this.setResult(await this.$modifyCurrentUser())
    },
    abort() {
      this.controller.abort()
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
    }),
  },
};
</script>

<style scoped>
#main-content {
  background: url("@/assets/bg3.jpeg");
  background-size: cover;
}
</style>