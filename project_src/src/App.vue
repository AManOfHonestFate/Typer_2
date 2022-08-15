<template>
  <div
      class="outline-0 flex min-h-screen justify-between items-center font-body py-10 mx-16 lg:mx-32 flex-col select-none max-w-screen-2xl"
      @keyup.prevent="focusOnTextArea"
      tabindex="1"
  >
    <h1 class="text-6xl text-yellow-600 font-bold mb-4">
      Typer 2
    </h1>
    <ModeBar class="mt-auto mb-4"></ModeBar>
    <div class="flex justify-between mb-8 w-full cursor-pointer">
      <MyTimer :start-timer="timer" v-model:time.number="time" :ended="typeEnded"></MyTimer>
      <div><router-view></router-view></div>
    </div>
    <div v-if="textLength" class="relative flex">
      <TextArea
          v-model:show="showHint"
          v-model:chars="charCounter"
          v-model:words="wordCounter"
          v-model:timer="timer"
          v-model:ended="typeEnded"
          ref="textArea"
      ></TextArea>
      <PostTypeInfo :cpm="cpm" v-if="typeEnded" :class="{'hidden': !showHint}"></PostTypeInfo>
      <ClickText v-else :class="{'hidden': !showHint}"></ClickText>
    </div>
    <LoadingIcon v-else></LoadingIcon>
    <TyperStats
        class="mt-auto"
        :word-counter="wordCounter"
        :char-counter="charCounter"
        :time="time"
        v-model="cpm"
    ></TyperStats>
    <FooterInfo class="mt-auto"></FooterInfo>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import TextArea from "@/components/TextArea.vue";
import FooterInfo from "@/components/FooterInfo.vue";
import TyperStats from "@/components/Stats.vue";
import Stats from "@/Interfaces/Stats";
import ClickText from "@/components/ClickText.vue";
import ModeBar from "@/components/ModeBar.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import MyTimer from "@/components/MyTimer.vue";
import PostTypeInfo from "@/components/PostTypeInfo";

export default defineComponent({
  name: 'App',
  components: {
    PostTypeInfo,
    MyTimer,
    LoadingIcon,
    ModeBar,
    ClickText,
    TyperStats,
    FooterInfo,
    TextArea
  },
  data() {
    return {
      charCounter: {all: 0, right: 0, wrong: 0},
      wordCounter: {all: 0, right: 0, wrong: 0},
      showHint: false,
      timer: false,
      time: 0,
      typeEnded: false,
      cpm: 0
    }
  },
  computed: {
    textLength() {
      return this.$store.state.text.length;
    }
  },
  methods: {
    focusOnTextArea() {
      if (this.typeEnded) return;

      const textArea = this.$refs.textArea;
      textArea?.$el?.focus();
    }
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        this.$store.commit('toggleReload');
      }
    })
  },
  watch: {
    time(val) {
      if (this.$store.state.mode === 'time' && !val) {
        this.typeEnded = true;
      }
    },
    typeEnded(val) {
      if (val) {
        this.$el.focus();
      }
    }
  }
});
</script>

<style></style>