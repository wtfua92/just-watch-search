<template>
  <div id="app">
    <SearchBar @userInput="userInputHandler" />
    <SearchResult v-if="searchResult.length > 0">
      <SearchItem v-for="item in searchResult" v-bind="item" :key="item.id" />
    </SearchResult>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "./components/SearchBar.vue";
import SearchItem from "./components/SearchItem.vue";
import SearchResult from "@/components/SearchResult.vue";

import { SearchItemInterface, SearchItemRawInterface } from "@/utils/types";

export default Vue.extend({
  data() {
    return {
      itemsHidden: true,
      searchResult: [] as SearchItemInterface[]
    };
  },
  methods: {
    userInputHandler(data: SearchItemRawInterface[]): void {
      this.searchResult = data.map(s => ({
        id: s.id,
        title: s.title,
        poster: s.poster,
        year: s.original_release_year,
        type: s.object_type
      }));
    }
  },
  name: "App",
  components: {
    SearchBar,
    SearchItem,
    SearchResult
  }
});
</script>

<style lang="scss">
@import "styles/reset";
@import "styles/utils";
@import "styles/colors";

html {
  position: relative;
  min-height: 100%;
  height: 100%;
  background-color: $background;
  font-size: 10px;
}

body {
  min-height: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
  background-color: $background;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
}
</style>
