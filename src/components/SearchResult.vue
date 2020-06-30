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
@import "src/styles/utils";

.search-result {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 12rem;

  @include screen-sm {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  @include screen-md {
    margin-top: 18rem;
  }
}
</style>
