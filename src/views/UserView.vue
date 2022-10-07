<template>
  <v-main id="main-content">
    <div class="d-flex justify-center fill-height align-center"  >
      <v-card width="30%" class="d-flex flex-column px-10 pb-10 pt-7 text-center rounded-xl elevation-2" max-width="500" max-height="550" >
      <h1 class="secondary--text">My profile</h1>
        <div class="text-center mt-5">
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
  </v-main>
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
#main-content {
  background: url("@/assets/bg3.jpeg");
  background-size: cover;
}
</style>