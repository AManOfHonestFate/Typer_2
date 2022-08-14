<template>
  <div class="absolute centered text-neutral-300 text-2xl pointer-events-none text-shadow">
    <span class="pulse absolute">Characters Rer Minute: {{cpm}}</span>
    <span class="pulse pulse-delay absolute">Press TAB To Restart</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "PostTypeInfo",
  props: {
    cpm: String
  }
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

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  animation-direction: alternate;
}

.pulse-delay {
  opacity: 0;
  animation-direction: alternate-reverse;
}

</style>