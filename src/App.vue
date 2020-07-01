<template>
  <div id="app">
    <SearchBar />
    <SearchResult v-if="searchResultItems.length > 0" />
    <!--    <SearchResultFallback v-else />-->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "./components/SearchBar.vue";
import SearchResult from "@/components/SearchResult.vue";
// import SearchResultFallback from "@/components/SearchResultFallback.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "App",
  computed: {
    ...mapGetters(["searchResultItems"])
  },
  components: {
    SearchBar,
    SearchResult
    // SearchResultFallback
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
  position: relative;
}

.search-result--fallback {
  display: flex;
  font-size: 10rem;
  color: $details;
}
</style>
