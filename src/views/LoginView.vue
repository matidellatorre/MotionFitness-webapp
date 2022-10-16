<template>
  <v-main id="main-content" class="d-flex align-start">
    <LoginForm class="mt-8 mt-xl-16"/>
  </v-main>
</template>

<script>
import LoginForm from "@/components/LoginForm";
export default {
  name: "LoginView",
  components: { LoginForm },
  data() {
    return {
      step: 1
    }
  },
  props: {
    source: String
  }
};
</script>

<style scoped>
#main-content {
  background: url("@/assets/bg2.jpg");
  background-size: cover;
  align-items: center;
}
</style>
