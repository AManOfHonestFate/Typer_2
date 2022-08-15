import { createStore } from 'vuex'
import randomRuText, {randomWiki, randomWords, randomWordsHard} from "../API/api";

export default createStore({
  state: {
    text: [] as string[],
    numberOfWords: 15,
    timer: 30,
    reloadText: false,
    mode: 'words'
  },
  getters: {
  },
  mutations: {
    setText(state, value : string[]) : void {
      state.text = value;
    },
    setNumberOfWords(state, value) {
      state.numberOfWords = value;
    },
    setTimer(state, value) {
      state.timer = value;
    },
    toggleReload(state) {
      state.reloadText = !state.reloadText;
    },
    setMode(state, value) {
      state.mode = value;
    }
  },
  actions: {
    setText({ commit }, value : string[]) {
      commit('setText', value);
    },
    getRandomWords({commit, state}) {
      randomWords(state.numberOfWords).then(
          text => commit('setText', text)
      );
    },
    getRandomWordsHard({commit, state}) {
      randomWordsHard(state.numberOfWords).then(
          text => commit('setText', text)
      );
    },
    getRandomWiki({commit}) {
      randomWiki().then(
          text => commit('setText', text)
      );
    },
    getRandomRu({commit}) {
      randomRuText().then(
          text => commit('setText', text)
      )
    }
  },
  modules: {
  }
})
