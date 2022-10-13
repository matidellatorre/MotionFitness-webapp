<template>
  <v-container class="fill-height flex-fill justify-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12 rounded-xl">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12 px-8 pt-4 pb-0" >
                    <h1 class="text-center secondary--text mb-10">Sign in to Motion Fitness</h1>
                    <h4 class="text-center mlt-4">Please enter your username and password</h4>
                    <v-form>
                      <v-text-field
                        label="Username"
                        v-model.trim="credentials.username"
                        name="Username"
                        prepend-icon="mdi-account"
                        type="text"
                        color="secondary"/>
                      <v-text-field
                          id="password"
                          label="Password"
                          v-model.trim="credentials.password"
                          name="Password"
                          type="password"
                          prepend-icon="mdi-lock"
                          color="secondary"
                      />
                      <div class="d-flex align-center mt-1">
                        <v-checkbox v-model="rememberMe" class="ma-0"/>
                        <p>Remember me</p>
                      </div>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mb-12">
                    <v-btn rounded color="secondary" dark @click="sendcredentials()">LOG IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="secondary">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Don't have an account?</h1>
                    <h5 class="text-center">Create an account now to start training with us!</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="secondary">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Already have an account?</h1>
                    <h5 class="text-center">Please log in to continue training with us</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step--">LOG IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center secondary--text">Create Account</h1>
                    <h4 class="text-center mt-4">Please enter your information to create a Motion Fitness account</h4>
                    <v-form>
                      <v-text-field
                          label="Name"
                          name="Name"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model.trim="newUser.firstName"
                          color="secondary"/>
                      <v-text-field
                          label="Username"
                          name="Username"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model.trim="newUser.username"
                          color="secondary"/>
                      <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          v-model.trim="newUser.email"
                          color="secondary"/>
                      <v-text-field
                          label="Password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-model.trim="newUser.password"
                          color="secondary"/>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
<!--                    <v-btn rounded color="secondary mb-12" @click="createAccount();this.showPopup = true;console.log(newUser.email)">CREATE ACCOUNT</v-btn>-->
                    <v-btn rounded color="secondary mb-12" @click="createAccount(); showVerificationPopUp = true">CREATE ACCOUNT</v-btn>
                    <verification-pop-up :show=showVerificationPopUp :email=newUser.email :controller=this.controller @popUpClosed="showVerificationPopUp=false" />
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useSecurityStore } from "@/store/SecurityStore";
import {Credentials, UserApi} from "@/api/user";
import { User } from "@/api/user";
import VerificationPopUp from "@/components/VerificationPopUp";

export default {
  name: 'LoginForm',
  components: { VerificationPopUp },
  props: {
    source: String,
  },
  data() {
    return {
      step: 1,
      userVerificated: false,
      credentials: new Credentials,
      result: null,
      controller: null,
      rememberMe: false,
      showVerificationPopUp: false,
      newUser: new User,
    }
  },
  methods: {
    async sendcredentials() {
      await this.login();
      await this.getCurrentUser();
    },
    async talogueado() {
      await this.logout();
      console.log(this.$isLoggedIn);
      console.log(this.$user);
    },
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    setResult(result){
      //this.result = JSON.stringify(result, null, 2) No sirve pasarlo a string
      this.result = result
    },
    clearResult() {
      this.result = null
    },
    async login() {
      try {
        await this.$login(this.credentials, this.rememberMe)
        this.clearResult()
      } catch (e) {
        this.setResult(e)
      }
    },
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
    },
    createAccount() {
      //Validacion de los campos antes de llamar a crear usuario
      UserApi.create(this.newUser,this.controller)
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
};
</script>

<style></style>