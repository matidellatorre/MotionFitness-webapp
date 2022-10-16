<template>
  <v-main id="main-content">
    <SubHeaderSearch @searched="(val) => searchQuery=val"
    title="Explore"
    subtitle="Routines created by other users"
    :has-search-bar=true />
    <RoutinesGallery v-if="this.routines" :routines="this.routines" :search-query="this.searchQuery" :allow-editing=false />
    <AlertPopUp :show="showError" @popUpClosed="showError=false" />
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutinesGallery from "@/components/RoutinesGallery";
import { mapActions, mapState } from "pinia";
import { useRoutineStore } from "@/store/RoutineStore";
import { useSecurityStore } from "@/store/SecurityStore";
import AlertPopUp from "@/components/AlertPopUp";


export default {
  name: "ExploreView",
  components: {AlertPopUp, RoutinesGallery, SubHeaderSearch},
  data() {
    return {
      searchQuery: '',
      routines: null,
      showError: false
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
      $isLoggedIn: 'isLoggedIn'
    }),
  },
  methods: {
    ...mapActions(useRoutineStore, {
      $getEveryones: 'getEveryones',
    }),
    async getEveryones(){
      try {
        return await this.$getEveryones();
      } catch (e) {
        this.showError = true
      }

    },
    async getIntersection() {
      let everyonesRoutines = null
      try {
        everyonesRoutines = await this.getEveryones();
      } catch (e) {
        this.showError = true
      }
      if(everyonesRoutines){
        if(this.$isLoggedIn)
          this.routines = everyonesRoutines.content.filter(routine => routine.user.id != this.$user.id);
        else
          this.routines = everyonesRoutines.content;
      }
    }
  },
  created() {
    this.getIntersection();
  }
};
</script>

<style scoped></style>
