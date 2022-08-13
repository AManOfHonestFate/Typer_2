<template>
  <div class="flex self-end text-neutral-600 text-sm mb-4">
    <router-link
        v-for="(mode, idx) in modes"
        :to="mode.path"
        :key="idx"
        class="button-mode"
        :class="{
          'border-r-0': modes.length - 1 === idx,
          'text-neutral-300': mode.path === currentPath
        }"
    >
      {{mode.title}}
    </router-link>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ModeBar",
  data() {
    return {
      modes: [
        {path: '/words', title: 'Random words'},
        {path: '/hard_words', title: 'Random words(hard ones)'},
        {path: '/wiki', title: 'Random wiki page'},
        {path: '/ru', title: 'Random ru text'}
      ]
    }
  },
  methods: {},
  computed: {
    currentPath() : string {
      return this.$route.path;
    }
  },
  watch: {
    '$route.path': function (newVal) {
      switch (newVal) {
        case '/words':
          this.$store.dispatch('getRandomWords');
          break;
        case '/wiki':
          this.$store.dispatch('getRandomWiki');
          break;
        case '/hard_words':
          this.$store.dispatch('getRandomWordsHard');
          break;
        case '/ru':
          this.$store.dispatch('getRandomRu');
          break;
      }
    }
  }
})
</script>

<style scoped>

</style>