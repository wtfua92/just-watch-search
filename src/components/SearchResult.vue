<template>
  <div class="search-result">
    <SearchItem
      v-for="item in searchResultItems"
      v-bind="item"
      :key="item.id"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchItem from "@/components/SearchItem.vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "SearchResult",
  components: {
    SearchItem
  },
  computed: {
    ...mapGetters(["searchResultItems"])
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
  }

  @include screen-md {
    margin-top: 18rem;
  }
}
</style>
