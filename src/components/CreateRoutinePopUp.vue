<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card class="pa-10 rounded-xl">
        <h1 class="text-center secondary--text mb-5">Routine Name</h1>
        <h4 class="text-center mlt-4 mb-8">Please enter this routine name to save it</h4>
        <v-text-field type="text" name="Routine Name"/>
        <div class="d-flex justify-center my-3">
          <v-btn @click="$emit('popUpClosed')" class="mr-5 rounded-xl" color="secondary">Create Routine</v-btn>
<!--          Aca arriba en @click hay que llamar a la funcion de crear rutina y mandarsela a la API-->
          <v-btn outlined dark color="red" @click="$emit('popUpClosed')" class="ml-5 rounded-xl">Cancel</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "CreateRoutinePopUp",
  data() {
    return {
      dialog: this.show,
      mail: String,
      code: String,
    }
  },
  props: {
    show: Boolean,
  },
  watch: {
    show: function() {
      this.dialog = this.show;
    },
  },
};
</script>

<style scoped>

</style>