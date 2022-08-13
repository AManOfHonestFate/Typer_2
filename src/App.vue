<template>
  <div
      class="outline-0 flex min-h-screen justify-between items-center font-body py-10 mx-16 lg:mx-32 flex-col select-none"
      @keyup.prevent="focusOnTextArea"
      tabindex="1"
  >
    <h1 class="text-6xl text-yellow-600 font-bold pb-10">
      Typer 2
    </h1>
    <ModeBar></ModeBar>
    <div class="relative flex mt-auto">
      <TextArea
          v-model:show="showHint"
          v-model:chars="charCounter"
          v-model:words="wordCounter"
          ref="textArea"
      ></TextArea>
     <ClickText :class="{'hidden': !showHint}"></ClickText>
    </div>
    <TyperStats
        :word-counter="wordCounter"
        :char-counter="charCounter"
    ></TyperStats>
    <FooterInfo></FooterInfo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextArea from "@/components/TextArea.vue";
import FooterInfo from "@/components/FooterInfo.vue";
import TyperStats from "@/components/Stats.vue";
import Stats from "@/Interfaces/Stats";
import ClickText from "@/components/ClickText.vue";
import ModeBar from "@/components/ModeBar.vue";

export default defineComponent({
  name: 'App',
  components: {
    ModeBar,
    ClickText,
    TyperStats,
    FooterInfo,
    TextArea
  },
  data() {
    return {
      charCounter: {all: 0, right: 0, wrong: 0} as Stats,
      wordCounter: {all: 0, right: 0, wrong: 0} as Stats,
      showHint: false
    }
  },
  methods: {
    focusOnTextArea() {
      const textArea = this.$refs.textArea as any;
      textArea.$el.focus();
    }
  }
});
</script>

<style></style>
