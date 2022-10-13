<template>
  <nav>
    <v-toolbar flat dark color="primary">
      <router-link to="/">
        <TopLeftlogo />
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="pa-3">
        <div class="d-flex flex-column">
          <v-btn text rounded-pill @click="$router.push('/routines')"> Routines </v-btn>
          <v-card v-show="this.$route.name=='routines'" height="4" color="accent" class="mx-3 mt-0 rounded-pill"/>
        </div>
        <v-divider vertical></v-divider>
        <div class="d-flex flex-column">
          <v-btn text @click="$router.push('/explore')">Explore</v-btn>
          <v-sheet v-show="this.$route.name=='explore'" height="4" color="accent" class="mx-3 mt-0 rounded-pill"/>
        </div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        elevation="10"
        rounded
        @click="$router.push('/login')"
        v-if="this.$isLoggedIn == false"
        >Sign Up / Log in</v-btn
      >
      <div class="d-flex align-center" v-else>
        <top-right-menu />
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
import TopLeftlogo from "@/components/TopLeftLogo";
import { useSecurityStore } from "@/store/SecurityStore";
import { mapActions, mapState } from "pinia";
import TopRightMenu from "@/components/TopRightMenu";

export default {
  name: "CustomHeader",
  components: {
    TopRightMenu,
    TopLeftlogo,
  },methods: {
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
  created() {
    this.getCurrentUser();
  },
};
</script>
<style scoped>
  #profileBtn {
    font-size: 13px;
    color: cornflowerblue;
  }
</style>