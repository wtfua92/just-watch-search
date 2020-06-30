<template>
  <div
    class="search-result__item"
    :style="{ backgroundImage: `url(${imageUrl})` }"
  >
    <div class="search-result__item__details">
      <p class="search-result__item__title">{{ title }} ({{ type }})</p>
      <p class="search-result__item__year">{{ year }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE_DATA } from "@/utils/constants.ts";

export default Vue.extend({
  name: "SearchItem",
  props: {
    title: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      required: true
    },
    type: String,
    year: Number
  },
  computed: {
    imageUrl: function(): string {
      return `${IMAGE_DATA.IMAGE_URL}${this.poster.replace(
        "{profile}",
        IMAGE_DATA.IMAGE_PROFILE
      )}`;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "src/styles/colors";

.search-result__item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50rem;
  margin-bottom: 5rem;
  max-width: 100%;
  background-size: auto 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border-radius: 1rem;
  color: $font;

  &__details {
    height: 30%;
    padding: 1.5rem;
    background-color: rgba($details, 0.95);
    border-radius: 0.5rem 0.5rem 1rem 1rem;
  }

  &__title {
    font-size: 2rem;
  }

  &__year {
    font-size: 1.25rem;
  }
}
</style>
