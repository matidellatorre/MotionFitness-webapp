<template >
  <v-main >
    <v-btn class="onTop" @click="showCreationPopUp=true;" large color="secondary" fixed right bottom rounded>
      Add routine
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <SubHeaderSearch @searched="(val) => searchQuery=val"
      title="Routines"
      subtitle="This are your routines"
      :has-search-bar=true />
    <RoutinesGallery v-if="this.$routines.length!==0" :routines="this.$routines" :search-query="this.searchQuery" />
    <v-sheet v-else id="fullheight">
      <img id="emptyState" src="@/assets/dumbbell.png">
      <div>
        <h3 id="emptymsg">You have no routines.<br>To create one click on the ADD ROUTINE button</h3>
      </div>
    </v-sheet>
    <CreateRoutinePopUp :show="showCreationPopUp" @popUpClosed="showCreationPopUp=false" />
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
import RoutinesGallery from "@/components/RoutinesGallery";
import {useSecurityStore} from "@/store/SecurityStore";
import {mapActions, mapState} from "pinia";
import {useRoutineStore} from "@/store/RoutineStore";
import CreateRoutinePopUp from "@/components/CreateRoutinePopUp";

export default {
  name: "RoutinesView",
  components: {CreateRoutinePopUp, RoutinesGallery, SubHeaderSearch },
  data() {
    return {
      searchQuery: '',
      result: null,
      routine: null,
      controller: null,
      showCreationPopUp: false,
      currentUser: null,
    }
  },
  computed: {
    ...mapState(useRoutineStore, {
      $routines: state => state.items,
    }),
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    canCreate() {
      return this.$isLoggedIn && !this.routine
    },
    canOperate() {
      return this.$isLoggedIn && this.routine
    },
    canAbort() {
      return this.$isLoggedIn && this.controller
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getUser: 'getUser',
      $getCurrentUser: 'getCurrentUser',
    }),
    ...mapActions(useRoutineStore, {
      $createRoutine: 'create',
      $modifyRoutine: 'modify',
      $deleteRoutine: 'delete',
      $getRoutine: 'get',
      $getAllRoutines: 'getAll'
    }),
    setResult(result){
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
      this.setResult(this.$user)
    },
    async getAllRoutines(userId) {
      try {
        this.controller = new AbortController()
        const routines = await this.$getAllRoutines(userId, this.controller);
        this.controller = null
        this.setResult(routines)
      } catch(e) {
        this.setResult(e)
      }
    },
    abort() {
      this.controller.abort()
    }
  },
  watch: {
    $user: function() {
      this.currentUser = this.$user;
      this.getAllRoutines(this.$user.id)
    },
  },
  async created() {
    this.getAllRoutines(this.$user.id)
  }
};
</script>

<style scoped>
.onTop {
  z-index: 20;
}
#emptyState{
  width: 100px;
  margin-right: 0.5rem;
}
#fullheight{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%
}
#emptymsg{
  color: rgb(189,189,189);
}
</style>
