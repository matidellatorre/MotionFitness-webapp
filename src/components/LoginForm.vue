<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center >
      <v-flex xs12 sm8 md4>
        <v-sheet class="elevation-12" rounded>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Motion Fitness Log in</v-toolbar-title>
          </v-toolbar>
          <p v-if="userVerificated" class="color = red--text mx-6 mt-3 mb-0">Usuario o contraseña incorrecta</p>
          <v-card-text class="pt-0">
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="text"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" to="/routines">Log in</v-btn>
          </v-card-actions>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    source: String,
  },
  data() {
    return {
      userVerificated: false,
    }
  }
};
</script>

<style></style>