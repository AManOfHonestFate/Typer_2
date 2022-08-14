<template>
  <div class="flex self-end text-neutral-600 text-sm mb-4">
    <router-link
        v-for="(mode, idx) in modes"
        :to="mode.path"
        :key="idx"
        class="button-mode"
        :class="{
          'border-r-0': modes.length - 1 === idx,
          'text-yellow-600': mode.path === currentPath
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
  methods: {
    loadText () {
      this.$store.commit('setText', []);
      switch (this.currentPath) {
        case '/words':
          this.$store.commit('setMode', 'words');
          this.$store.dispatch('getRandomWords');
          break;
        case '/wiki':
          this.$store.commit('setMode', 'time');
          this.$store.dispatch('getRandomWiki');
          break;
        case '/hard_words':
          this.$store.commit('setMode', 'words');
          this.$store.dispatch('getRandomWordsHard');
          break;
        case '/ru':
          this.$store.commit('setMode', 'time');
          this.$store.dispatch('getRandomRu');
          break;
    }
},
  },
  computed: {
    currentPath() : string {
      return this.$route.path;
    }
  },
  mounted() {
    this.$watch('$route.path', this.loadText);
    this.$watch('$store.state.reloadText', this.loadText);
  }
})
</script>

<style scoped>

</style>