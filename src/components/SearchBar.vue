<template>
  <div :class="['search-bar', { 'search-bar--touched': touched }]">
    <label for="search-bar" class="search-bar__label">Search:</label>
    <input
      id="search-bar"
      type="text"
      class="search-bar__input"
      v-model="titleName"
      autofocus
      @input="inputHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import debounce from "lodash/debounce";
import { SearchItemRawInterface } from "@/utils/types";
import { requestCacheWrapper } from "@/utils/helpers";

const searchRequest = function(
  searchQuery: string
): Promise<SearchItemRawInterface[]> {
  if (!searchQuery) {
    return Promise.resolve([]);
  }

  return axios
    .get(`popular`, {
      params: {
        body: {
          pageSize: 5,
          page: 1,
          query: searchQuery,
          contentTypes: ["show", "movie"]
        }
      }
    })
    .then(({ data: { items = [] } }) => {
      return items;
    })
    .catch((e: Error) => {
      console.log(e);
      return [];
    });
};

const searchRequestWithCache = requestCacheWrapper(searchRequest);

export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      titleName: "",
      touched: false
    };
  },
  methods: {
    inputHandler: function() {
      return debounce(async (): Promise<void> => {
        this.touched = true;
        window.scrollTo({
          top: 0
        });

        const items = (await searchRequestWithCache(this.titleName)) || [];

        this.$emit("userInput", items);
      }, 750)();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/utils";

@mixin input-size($size) {
  line-height: $size;
  font-size: $size;
}

.search-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -5rem;
  background-color: $background;

  &--touched {
    position: fixed;
    top: 0;
    margin-top: 0;
    padding: 0 0 2rem;
  }

  &__label {
    display: none;
  }

  &__input {
    width: 100%;
    line-height: 5rem;
    font-size: 5rem;
    padding: 1rem 0.5rem;
    background-color: $background;
    border: 0;
    outline: none;
    color: $font;
    border-bottom: 2px solid $font;
    text-align: center;

    @include screen-sm {
      @include input-size(10rem);
    }

    @include screen-xl {
      @include input-size(12rem);
    }
  }
}
</style>
