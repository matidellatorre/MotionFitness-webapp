<template>
  <div>
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
        v-if="!this.$isLoggedIn"
        >Sign Up / Log in</v-btn
      >
      <div class="d-flex align-center" v-else>
        <top-right-menu v-if="this.$isLoggedIn" />
      </div>
    </v-toolbar>
  </nav>
    <AlertPopUp :show="showAlertPopUp" :message="currentErrorMessage?this.currentErrorMessage:null" @popUpClosed="showAlertPopUp=false" />
  </div>
</template>

<script>
import TopLeftlogo from "@/components/TopLeftLogo";
import { useSecurityStore } from "@/store/SecurityStore";
import { mapActions, mapState } from "pinia";
import TopRightMenu from "@/components/TopRightMenu";
import AlertPopUp from "@/components/AlertPopUp";

export default {
  name: "CustomHeader",
  components: {
    AlertPopUp,
    TopRightMenu,
    TopLeftlogo,
  },
  data() {
    return {
      showAlertPopUp: false,
      currentErrorMessage: null
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    async logout() {
      try {
        await this.$logout()
      } catch (e) {
        if (e.code){
          this.showAlertPopUp=true
          this.currentErrorMessage = e.description
        }
      }

    },
    async getCurrentUser() {
      try {
        await this.$getCurrentUser()
      } catch(e) {
        if (e.code) {
          this.showAlertPopUp=true
          this.currentErrorMessage=e.description
        }
      }
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