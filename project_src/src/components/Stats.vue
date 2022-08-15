<template>
  <div class="mt-auto flex text-neutral-500 text-lg">
    <div class="px-4 border-r-2 border-r-neutral-300"><span class="text-yellow-600">Chars</span>: {{charCounter.all}}/{{charCounter.right}}/{{charCounter.wrong}}</div>
    <div class="px-4 border-r-2 border-r-neutral-300"><span class="text-yellow-600">Words</span>: {{wordCounter.all}}/{{wordCounter.right}}/{{wordCounter.wrong}}</div>
    <div class="px-4"><span class="text-yellow-600">CPM</span>: {{cpm}}</div>
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
    time: {
      type: Number,
      default: 0
    }
  },
  computed: {
    currentMode() {
      return this.$store.state.mode;
    },
    lTime() {
      if (this.currentMode === 'time') {
        return this.$store.state.timer - this.time;
      } else {
        return this.time;
      }
    },
    cpm() {
      if (this.lTime <= 0) return 0;
      const cpm = (this.charCounter.right / (this.lTime / 60)).toFixed(2);
      this.$emit('update:modelValue', cpm);
      return cpm;
    }
  }
});
</script>

<style scoped>

</style>