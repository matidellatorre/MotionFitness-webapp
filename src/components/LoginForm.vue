<template>
  <v-container class="flex-fill justify-center limit">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12 rounded-xl">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12 px-8 pt-4 pb-0" >
                    <h1 class="text-center secondary--text mb-10">Sign in to Motion Fitness</h1>
                    <h4 v-if="!credentialError" class="text-center mlt-4">Please enter your username and password</h4>
                    <h4 v-if="credentialError" class="text-center red--text mlt-4">{{ this.msg }}</h4>
                    <v-form
                        v-model="validLogin">
                      <v-text-field
                        label="Username"
                        v-model.trim="credentials.username"
                        name="Username"
                        prepend-icon="mdi-account"
                        type="text"
                        color="secondary"
                        :rules="usernameRules"
                        required/>
                      <v-text-field
                          id="password"
                          label="Password"
                          v-model.trim="credentials.password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          color="secondary"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          :rules="loginPasswordRules"
                          required
                      />
                      <div class="d-flex align-center mt-1">
                        <v-checkbox v-model="rememberMe" class="ma-0"/>
                        <p>Remember me</p>
                      </div>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mb-12">
                    <v-btn :disabled="!validLogin" rounded color="secondary" @click="sendcredentials()">LOG IN</v-btn>
                  </div>
<!--                  <error-pop-up :show="credentialError" :msg="msg" @popUpClosed="credentialError=false" />-->
                </v-col>
                <v-col cols="12" md="4" class="secondary">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1">Don't have an account?</h1>
                    <h5 class="text-center">Create an account now to start training with us!</h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn rounded outlined dark @click="step++;creationError=false;credentialError=false">SIGN UP</v-btn>
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
                    <v-btn rounded outlined dark @click="step--;creationError=false;credentialError=false">LOG IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h1 class="text-center secondary--text mb-10">Create Account</h1>
                    <h4 v-if="!creationError" class="text-center mlt-4">Please enter your information to create a Motion Fitness account</h4>
                    <h4 v-else class="text-center red--text mlt-4">{{ this.msg }}</h4>
                    <v-form ref="form"
                            v-model="validSignup">
                      <v-text-field
                          label="Name"
                          name="Name"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model.trim="newUser.firstName"
                          color="secondary"
                          :rules="nameRules"
                          required/>
                      <v-text-field
                          label="Username"
                          name="Username"
                          prepend-icon="mdi-account"
                          type="text"
                          v-model.trim="newUser.username"
                          color="secondary"
                          :rules="usernameRules"
                          required/>
                      <v-text-field
                          label="Email"
                          name="Email"
                          prepend-icon="mdi-email"
                          type="text"
                          v-model.trim="newUser.email"
                          color="secondary"
                          :rules="emailRules"
                          required/>
                      <v-text-field
                          label="Password"
                          name="Password"
                          prepend-icon="mdi-lock"
                          type="password"
                          v-model.trim="newUser.password"
                          color="secondary"
                          :rules="passwordRules"
                          required/>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
<!--                    <v-btn rounded color="secondary mb-12" @click="createAccount();this.showPopup = true;console.log(newUser.email)">CREATE ACCOUNT</v-btn>-->
                    <div class="mb-6 mt-3">
                      <v-btn :loading="loading" :disabled="!validSignup" rounded color="secondary" @click="validate(); createAccount()">CREATE ACCOUNT</v-btn>
                    </div>
                    <verification-pop-up :show=showVerificationPopUp :email=newUser.email :controller=this.controller @popUpClosed="showVerificationPopUp=false;step=1" />
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
      newUser: new User(null,null,null,null),
      validLogin: false,
      msg: '',
      validSignup: false,
      credentialError: false,
      creationError: false,
      show1: false,
      loading: false,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 20) || 'Username must be less than 20 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) || 'Password must contain 8 characters, including one letter and one number',
      ],
      loginPasswordRules: [
        v => !!v || 'Password is required',
      ]
    }
  },
  methods: {
    async sendcredentials() {
      this.login();
    },
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $login: 'login',
      $logout: 'logout',
    }),
    async login() {
      try {
        await this.$login(this.credentials, this.rememberMe)
        await this.getCurrentUser();
        this.$router.push('/routines')
      } catch (e) {
        if(e.code===4) {
          this.credentialError=true;
          this.msg=e.description
        }
      }
    },
    async logout() {
      await this.$logout()
      this.clearResult()
    },
    async getCurrentUser() {
      await this.$getCurrentUser()
    },
    abort() {
      this.controller.abort()
    },
    async createAccount() {
      try {
        this.loading=true;
        await UserApi.create(this.newUser,this.controller)
        this.showVerificationPopUp = true
      } catch (e) {
        if(e.code) {
          if (e.code===2){
            this.creationError=true;
            this.msg='Email and/or user already taken. Please use another one.'
          }
        }
      }
      this.loading=false;
    },
    validate () {
      this.$refs.form.validate()
    },
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

<style>
.limit{
  max-width: 1100px;
  max-height: 450px;
}
</style>