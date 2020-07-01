<template>
  <div :class="['search-bar', { 'search-bar--touched': touched }]">
    <label for="search-bar" class="search-bar__label">Search:</label>
    <input
      id="search-bar"
      type="text"
      class="search-bar__input"
      autofocus
      :placeholder="!touched && 'Find your show'"
      v-model="titleName"
      @input="inputHandler"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import debounce from "lodash/debounce";
import { mapActions, mapGetters } from "vuex";
import { SearchResultActions } from "@/store/modules/search-result/actions";

export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      titleName: "",
      touched: false
    };
  },
  computed: {
    ...mapGetters(["isLoading"]),
    titleNameEmpty: function(): boolean {
      return this.titleName.length === 0;
    }
  },
  methods: {
    ...mapActions([
      SearchResultActions.SET_SEARCH_RESULT,
      SearchResultActions.SET_LOADING
    ]),
    inputHandler: function() {
      if (!this.touched) {
        this.touched = true;
      }

      !this.isLoading && !this.titleNameEmpty && this.setLoading(true);

      return debounce(
        (): void => {
          window.scrollTo({
            top: 0
          });

          if (!this.titleNameEmpty) {
            this.setSearchResult(this.titleName);
          }
        },
        750,
        {
          leading: false,
          trailing: true
        }
      )();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "src/styles/colors";
@import "src/styles/utils";

.search-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: -5rem;
  background-color: $dark-200;
  top: 0;

  @include screen-md {
    margin-top: -10rem;
  }

  &--touched {
    position: fixed;
    top: 0;
    margin-top: 0;
    padding: 0 0 2rem;
    transition: top 1s ease-out;
  }

  &__label {
    display: none;
  }

  &__input {
    width: 100%;
    line-height: 5rem;
    font-size: 5rem;
    padding: 1rem 0.5rem;
    background-color: $dark-200;
    border: 0;
    outline: none;
    color: $grey-100;
    border-bottom: 2px solid $grey-100;
    text-align: center;

    &::placeholder {
      @include input-size(4rem);

      @include screen-sm {
        @include input-size(8rem);
      }

      @include screen-lg {
        @include input-size(10rem);
      }
    }

    @include screen-sm {
      @include input-size(7rem);
    }
  }
}
</style>
