<template>
  <div class="text-yellow-600 text-xl">{{ time < 60 ? time : (Math.floor(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + time % 60) }}</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "MyTimer",
  emits: {
    'update:time': null
  },
  data() {
    return {
      time: 0,
      intervalId: 0,
      timeoutId: 0
    }
  },
  props: {
    startTimer: {
      type: Boolean,
      default: false
    },
    ended: Boolean
  },
  computed: {
    currentMode() {
      return this.$store.state.mode;
    }
  },
  watch: {
    startTimer(newVal) {
      if (newVal) {
        if (this.currentMode === 'time') {
          this.intervalId = setInterval(() => {
            this.time--;
            this.$emit('update:time', this.time);
          }, 1000);

          this.timeoutId = setTimeout(() => {
            clearInterval(this.intervalId);
          }, this.time * 1000);
          return;
        }

        this.intervalId = setInterval(() => {
          this.time++;
          this.$emit('update:time', this.time);
        }, 1000);
      } else {
        this.time = this.currentMode === 'time' ? this.$store.state.timer : 0;
        clearInterval(this.intervalId);
      }
    },
    currentMode(mode) {
      if (mode === 'time') {
        this.time = this.$store.state.timer;
      } else {
        this.time = 0;
      }
    },
    ended(val) {
      if (val) {
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
      }
    },
    '$store.state.timer': function(value) {
      this.time = value;
    },
    '$store.state.text': function() {
      clearTimeout(this.timeoutId);
      clearInterval(this.intervalId);
    }
  }
})
</script>

<style scoped>

</style>