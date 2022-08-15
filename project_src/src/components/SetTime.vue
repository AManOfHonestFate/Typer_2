<template>
  <div class="text-lg text-yellow-600 flex">
    time:
    <div
        v-for="(value, idx) in timeValues"
        class="px-4 border-r-neural-300"
        :class="{
          'text-neutral-600 ': value !== currentValue,
          'text-neutral-300': value === currentValue,
          'border-r': idx + 1 !== timeValues.length,
          'border-r-0': idx + 1 === timeValues.length
        }"
        :key="value"
        @click="setValue(value)"
    >
      {{value}}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SetTime",
  data() {
    return {
      timeValues: [15, 30, 60, 120],
    }
  },
  computed: {
    currentValue() {
      return this.$store.state.timer;
    }
  },
  methods: {
    setValue(number: number) {
      this.$store.commit('setTimer', number);
      this.$store.commit('toggleReload');
    }
  }
})
</script>

<style scoped>

</style>