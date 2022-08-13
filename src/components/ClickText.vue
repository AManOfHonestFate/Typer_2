<template>
  <div class="absolute centered text-neutral-300 text-2xl pointer-events-none text-shadow">
    Click Or Start Typing To Begin
  </div>
</template>

<script lang="ts">
export default {
  name: "ClickText"
}
</script>

<style scoped>

.centered {
  width: 50%;
  height: 50%;
  left: 25%;
  top: 25%;
}

.text-shadow {
  text-shadow: 0 0 5px black;
}

</style>