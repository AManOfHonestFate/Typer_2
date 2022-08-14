<template>
  <div
      class="text-neutral-600 h-28 overflow-hidden whitespace-pre-wrap font-light text-3xl relative blur focus:blur-0 outline-0"
      @keyup.prevent.space="keySpace"
      @keyup.prevent="startTimer(); ($event.key === 'Backspace' ? keyBackspace() : keyDown($event))"
      @blur.prevent="onBlur"
      @focus.prevent="onFocus"
      tabindex="0"
      autofocus
      ref="textArea"
  >
    <div
        v-for="(word, idx) in text"
        :key="idx"
        class="inline-block mr-3"
    >
        <span
            v-for="(myChar, idx) in word"
            :key="idx"
            class="inline"
            :class="{
              'text-neutral-200': myChar.state === 1,
              'text-red-500': myChar.state === 2
            }"
        >
          {{ myChar.char }}
        </span>
    </div>
    <span
        class="absolute text-yellow-600 transition-transform top-0 -left-2 pulse text-4xl"
        ref="textCursor"
        :style="`transform: translate(${cursorPosition})`"
    >|</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import myChar from "@/Interfaces/myChar";
import Stats from "@/Interfaces/Stats";

export default defineComponent({
  name: "TextArea",
  props: {
    ended: Boolean
  },
  data() {
    return {
      charCounter: 0,
      totalChars: 0,
      wordCounter: 0,
      text: [] as myChar[][],
      wordEnded: false,
      extraChar: 0,
      extraLimit: 10,
      scroll: -1,
    }
  },
  emits: {
    'update:chars': null,
    'update:words': null,
    'update:show': null,
    'update:timer': null,
    'update:ended': null
  },
  methods: {
    keySpace() {
      if (this.ended) return;
      // setting default values
      this.extraChar = 0;
      this.wordEnded = false;
      // after this line watch:wordCounter will trigger
      this.wordCounter++;
    },
    keyBackspace() {
      if (this.ended) return;
      if (this.charCounter < 1) return;

      this.charCounter--;
      // case for extra chars
      if (this.extraChar > 0) {
        this.extraChar--;
        this.text[this.wordCounter].pop();
        return;
      }
      //normal case
      if (this.wordEnded) this.wordEnded = false;
      this.text[this.wordCounter][this.charCounter].state = 0;
    },
    keyDown(event : { key: string }) {
      if (this.ended) return;

      const normalCase = () => {
        const word = this.text[this.wordCounter];
        const charComp = key === word[this.charCounter].char;

        word[this.charCounter].state = charComp ? 1 : 2;

        if (this.charCounter < word.length - 1) {
          this.charCounter++;
          return;
        }

        this.charCounter++;
        this.wordEnded = true;
      }

      const wordEndedCase = () => {
        this.text[this.wordCounter].push({char: key, state: 2});
        this.extraChar++;
        this.charCounter++;
      }

      const key = event.key;


      if (key.length === 1 && /^\w|[?!%&()-`'";:,.]|[а-яА-Я]$/i.test(key)) {
        if (this.wordEnded) {
          if (this.extraChar >= this.extraLimit) return;
          wordEndedCase();
          return;
        }
        normalCase();
      }
    },
    onFocus() {
      this.$emit('update:show', false);
    },
    onBlur() {
      this.$emit('update:show', true);
    },
    parseText(newVal : string[][]) {
      this.text = newVal.map((word : string[]) => {
        return [...word].map((char : string) => {
          return {char, state: 0} as myChar;
        })
      })
    },
    startTimer() {
      this.$emit('update:timer', true);
    }
  },
  watch: {
    wordCounter(val) {
      if (this.text.length === val) {
        this.$emit('update:ended', true);
      }
      this.totalChars += this.charCounter;
      this.charCounter = 0;
      const wordsStats = {all: this.wordCounter, right: this.wordCounter - this.stats.words, wrong: this.stats.words} as Stats;
      this.$emit('update:words', wordsStats);
    },
    charCounter(val) {
      if (this.text.length === this.wordCounter + 1 && this.text[this.wordCounter].length === val) {
        this.$emit('update:ended', true);
      }
      const totalChars = this.charCounter + this.totalChars;
      const charStats = {all: totalChars, right: totalChars - this.stats.chars, wrong: this.stats.chars} as Stats;
      this.$emit('update:chars', charStats);
    },
    wordOffset(newVal, oldVal) {
      // sum bug here
      // some miscalculation by browser
      if (Math.abs(newVal.top - oldVal.top) > 1) {
        const textArea = this.$refs.textArea as HTMLElement;
        const convertRemToPixels = () => {
          this.scroll++;
          return this.scroll * (parseFloat(getComputedStyle(textArea).lineHeight));
        }
        textArea.scrollTo(0, convertRemToPixels());
      }
    }
  },
  computed: {
    wordOffset () {
      const textArea = this.$refs.textArea as HTMLElement;
      const word = this.wordCounter as number;

      const textAreaPosition = {
        top: textArea?.getBoundingClientRect().top || 0,
        left: textArea?.getBoundingClientRect().left || 0
      }

      const wordPosition = {
        top: textArea?.children[word]?.getBoundingClientRect().top || 0,
        left: textArea?.children[word]?.getBoundingClientRect().left || 0
      }

      if (wordPosition.top || wordPosition.left) {
        return {
          top: wordPosition.top - textAreaPosition.top + (textArea?.scrollTop | 0),
          left: wordPosition.left - textAreaPosition.left
        }
      }

      return {top: 0, left: 0};
    },
    cursorPosition() {
      const wordOffset = this.wordOffset as {top: number, left: number};
      const charOffset = this.charCounter as number;
      return `calc(${wordOffset.left}px + ${charOffset * 0.5}em), ${wordOffset.top}px`;
    },
    stats() {
      return this.text.slice(0, this.wordCounter + 1).reduce((total : { chars: number, words: number }, currentValue) => {
        const wrongChars = currentValue.reduce((total : number, currentValue) => {
          return total + (currentValue.state === 2 ? 1 : 0);
        }, 0);

        if (wrongChars) {
          return {chars: total.chars + wrongChars, words: total.words + 1}
        }

        return  {chars: total.chars, words: total.words}

      }, {chars: 0, words: 0})
    }
  },
  created() {
    this.$watch(
        () => {
          return this.$store.state.text;
        },
        this.parseText
    );
  },
  mounted() {
    this.$el.focus();
    this.parseText(this.$store.state.text);
    this.$emit('update:timer', false);
    this.$emit('update:ended', false);
  }
});

</script>

<style scoped>

@keyframes pulse {
  100% {
    opacity: 0;
  }
}

.pulse {
  animation: pulse 0.6s ease-in;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

</style>