import { createStore } from 'vuex'
import randomRuText, {randomWiki, randomWords, randomWordsHard} from "@/API/api";

export default createStore({
  state: {
    text: [] as string[],
    number: 20
  },
  getters: {
  },
  mutations: {
    setText(state, value : string[]) : void {
      state.text = value;
    }
  },
  actions: {
    setText({ commit }, value : string[]) {
      commit('setText', value);
    },
    getRandomWords({commit, state}) {
      randomWords(state.number).then(
          text => commit('setText', text)
      );
    },
    getRandomWordsHard({commit, state}) {
      randomWordsHard(state.number).then(
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
