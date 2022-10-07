<template>
  <div class="d-flex justify-center">
    <v-card width="50%" class="d-flex flex-column ma-10 pa-10 text-center rounded-xl elevation-2" >
    <h1 class="secondary--text">My profile</h1>
      <div class="text-center mt-3">
        <img src="@/assets/avatar.png" width="150" height="150">
      </div>
      <v-text-field
          label="Name"
          name="Name"
          :value=user.name
          type="text"
          color="secondary"
          class="mt-5" />
      <v-text-field
          label="Email"
          name="Email"
          :value=user.email
          type="text"
          color="secondary"
          disabled
      />
      <div>
        <v-btn text rounded color="red" class=" mb-4">Log out</v-btn>
      </div>
      <div>
        <v-btn rounded color="secondary">Save</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import store from "@/store/user"

export default {
  name: "UserView",
  data() {
    return {
      user: store.user
    }
  }
};
</script>

<style scoped>

</style>