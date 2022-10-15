<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div class="d-flex align-center clickable" v-on="on">
          <p v-if="currentUser" class="mb-0">{{ currentUser.firstName }}</p>
          <img class = "rounded-circle elevation-5 ml-2" src="@/assets/avatar.png" width="30">
        </div>
      </template>
      <v-list class="pa-0">
        <v-list-item class="clickable" @click="$router.push('/user')">
          <v-icon class="mr-2">mdi-account</v-icon>
          <v-list-item-title>My profile</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item class="clickable" @click="logout(); $router.push('/')">
          <v-icon class="mr-2 red--text">mdi-logout</v-icon>
          <v-list-item-title class="red--text">Log out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";

export default {
  data: () => ({
    items: [
      { title: 'View profile' },
      { title: 'Log out' },
    ],
    currentUser: null,
  }),
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    async logout() {
      await this.$logout()
      this.clearResult()
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
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
  watch: {
    $user: function() {
      this.currentUser = this.$user;
    },
  },
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>