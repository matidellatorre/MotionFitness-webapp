<template>
  <v-main>
    <SubHeaderSearch title="FAQ" subtitle="Frequently Asked Questions" :has-search-bar=false />
    <template>
      <v-expansion-panels>
        <v-expansion-panel>
        <v-expansion-panel-header>
          What is Motion Fitness?
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Motion Fitness is a web and mobile app in which you can create custom routines and view them on the go. It's different from other similar services as it offers complete freedom about the creation process while being extremely simple. Motion Fitness is your only training app.
        </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Do I need to register?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Motion Fitness requires to create an account to be able to save your routines and be synced to the mobile app.
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Do I need to have the mobile app installed to use this web?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            No. The Motion Fitness web is independent and you can use it despite not having the app installed on your phone.
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            How much does it cost?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            For now, Motion Fitness is free. But we are planning to introduce a Premium Service with more features for advanced users, keeping the current ones still free.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-main>
</template>

<script>
import SubHeaderSearch from "@/components/SubHeaderSearch";
export default {
  name: "FAQView",
  components: { SubHeaderSearch },
};
</script>

<style scoped></style>
