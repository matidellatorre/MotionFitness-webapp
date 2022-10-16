<template>
  <v-main id="main-content">
    <SubHeaderSearch @searched="(val) => searchQuery=val"
    title="Explore"
    subtitle="Top routines by the community"
    :has-search-bar=true />
    <RoutinesGallery :routines="this.routines" :search-query="this.searchQuery" :allow-editing=false />
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutinesGallery from "@/components/RoutinesGallery";
import { mapActions, mapState } from "pinia";
import { useRoutineStore } from "@/store/RoutineStore";
import { useSecurityStore } from "@/store/SecurityStore";


export default {
  name: "ExploreView",
  components: {RoutinesGallery, SubHeaderSearch},
  data() {
    return {
      searchQuery: '',
      routines: null,
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
      return await this.$getEveryones();
    },
    async getIntersection() {
      const everyonesRoutines = await this.getEveryones();
      if(this.$isLoggedIn)
        this.routines = everyonesRoutines.content.filter(routine => routine.user.id != this.$user.id);
      else
        this.routines = everyonesRoutines.content;
    }
  },
  created() {
    this.getIntersection();
  }
};
</script>

<style scoped></style>
