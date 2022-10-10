<template>
  <nav>
    <v-toolbar flat app dark color="primary">
      <router-link to="/">
        <TopLeftlogo />
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="pa-3">
        <div class="d-flex flex-column">
          <v-btn plain text rounded-pill @click="$router.push('/routines')"> Routines </v-btn>
          <v-card v-show="this.$route.name=='routines'" height="4" color="accent" class="mx-3 mt-0 rounded-pill"/>
        </div>
        <v-divider vertical></v-divider>
        <div class="d-flex flex-column">
          <v-btn plain text @click="$router.push('/explore')">Explore</v-btn>
          <v-sheet v-show="this.$route.name=='explore'" height="4" color="accent" class="mx-3 mt-0 rounded-pill"/>
        </div>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn
        color="secondary"
        elevation="10"
        rounded
        @click="$router.push('/login')"
        v-if="loggedIn == 'false'"
        >Log in</v-btn
      >
      <div class="d-flex align-center" v-else>
        <div class="d-flex flex-column">
          <p class="mb-0">Abdul Bari</p>
          <btn @click="$router.push('/user')" id="profileBtn" max-width="10" class="mb-0">View profile</btn>
        </div>
        <img src="@/assets/avatar.png" class="ml-4" width="50" height="50">
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
import TopLeftlogo from "@/components/TopLeftLogo";

export default {
  name: "CustomHeader",
  components: {
    TopLeftlogo,
  },
  props: {
    loggedIn: {
      type: Boolean,
      required: true
    }
  }
};
</script>
<style scoped>
  #profileBtn {
    font-size: 13px;
    color: cornflowerblue;
  }
</style>