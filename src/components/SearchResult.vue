<template>
  <div class="search-result">
    <LoadingSpinner v-if="isLoading" />
    <SearchItem
      v-else
      v-for="item in searchResultItems"
      v-bind="item"
      :key="item.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchItem from "@/components/SearchItem.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "SearchResult",
  components: {
    SearchItem,
    LoadingSpinner
  },
  computed: {
    ...mapGetters(["searchResultItems", "isLoading"])
  }
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
    margin-top: 15rem;
  }
}
</style>
