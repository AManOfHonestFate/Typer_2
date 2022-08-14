<template>
  <div class="text-lg text-yellow-600 flex">
    words:
    <div
        v-for="(number, idx) in wordsNumber"
        class="px-4 border-r-neural-300"
        :class="{
          'text-neutral-600 ': number !== currentNumber,
          'text-neutral-300': number === currentNumber,
          'border-r': idx + 1 !== wordsNumber.length,
          'border-r-0': idx + 1 === wordsNumber.length
        }"
        :key="number"
        @click="setNumber(number)"
    >
      {{number}}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SetWords",
  data() {
    return {
      wordsNumber: [10, 15, 20, 30],
    }
  },
  computed: {
    currentNumber() {
      return this.$store.state.numberOfWords;
    }
  },
  methods: {
    setNumber(number: number) {
      this.$store.commit('setNumberOfWords', number);
      this.$store.commit('toggleReload');
    }
  }
})
</script>

<style scoped>

</style>