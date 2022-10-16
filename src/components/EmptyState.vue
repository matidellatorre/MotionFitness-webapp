<template>
  <v-sheet id="fullheight">
    <img id="emptyState" src="@/assets/dumbbell.png">
    <div>
      <h3 id="emptymsg">{{ title }}.<br>{{ subtitle }}</h3>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "EmptyState",
  props: {
    title: String,
    subtitle: String
  }
}
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