<template>
  <div id="app">
    <SearchBar msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchBar from "./components/SearchBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    SearchBar
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
