<template>
  <div class="search-result">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchResult"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-result {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 2 1;
  margin-top: 12rem;
}
</style>
