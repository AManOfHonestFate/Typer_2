<template>
  <div class="mt-auto flex text-neutral-500 text-lg">
    <div class="px-4 border-r-2 border-r-neutral-300">Chars: {{charCounter.all}}/{{charCounter.right}}/{{charCounter.wrong}}</div>
    <div class="px-4 border-r-2 border-r-neutral-300">Words: {{wordCounter.all}}/{{wordCounter.right}}/{{wordCounter.wrong}}</div>
    <div class="px-4">CPM: 0</div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import Stats from "@/Interfaces/Stats";

export default defineComponent({
  name: "TyperStats",
  props: {
    wordCounter: {
      type: Object as PropType<Stats>,
      default: () => {return {all: 0, right: 0, wrong: 0}}
    },
    charCounter: {
      type: Object as PropType<Stats>,
      default: () => {return {all: 0, right: 0, wrong: 0}}
    },
  }
});
</script>

<style scoped>

</style>