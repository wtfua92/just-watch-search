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
// import debounce from "lodash/debounce";
import { SearchItemRawInterface } from "@/utils/types";

const request = function(
  searchQuery: string
): Promise<SearchItemRawInterface[]> {
  return axios
    .get(
      `popular?body={"page_size":5,"page":1,"query":"${searchQuery}","content_types":["show","movie"]}`
    )
    .then(({ data: { items = [] } }) => {
      return items;
    })
    .catch(() => {
      return [];
    });
};

export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      titleName: "",
      touched: false
    };
  },
  methods: {
    inputHandler: async function(): Promise<void> {
      this.touched = true;
      // body={"page_size":5,"page":1,"query":"Ozar","content_types":["show","movie"]}
      window.scrollTo({
        top: 0
      });

      const items = (await request(this.titleName)) || [];

      this.$emit("userInput", items);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "src/styles/colors";

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
  }
}
</style>
