import Vue from "vue";
import Vuex from "vuex";
import searchResult from "./modules/search-result";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    searchResult
  }
});
