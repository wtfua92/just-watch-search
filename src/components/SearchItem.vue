<template>
  <div
    class="search-result__item"
    :style="{ backgroundImage: `url(${imageUrl})` }"
  >
    <div class="search-result__item__details">
      <div class="search-result__item__title">
        <span>{{ title }}</span>
        <div class="search-result__item__badges">
          <Badge :class="typeBadgeClass" :content="type" title="Item type" />
          <Badge
            class="search-result__item__rating"
            :content="roundedRating"
            title="TMDB Popularity Rating"
          />
        </div>
      </div>
      <p class="search-result__item__year">{{ year }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { IMAGE_DATA } from "@/utils/constants.ts";
import Badge from "@/components/Badge.vue";

export default Vue.extend({
  name: "SearchItem",
  computed: {
    imageUrl(): string {
      return `${IMAGE_DATA.IMAGE_URL}${this.poster.replace(
        "{profile}",
        IMAGE_DATA.IMAGE_PROFILE
      )}`;
    },
    roundedRating(): string {
      return `${this.rating.toFixed(1)} &#9733;`;
    },
    typeBadgeClass(): string {
      return `search-result__item__type search-result__item__type--${this.type}`;
    }
  },
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
    year: Number,
    rating: Number
  },
  components: {
    Badge
  }
});
</script>

<style lang="scss" scoped>
@import "src/styles/colors";
@import "src/styles/utils";

.search-result__item {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 50rem;
  margin-bottom: 5rem;
  max-width: 100%;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  border-radius: 1rem;
  color: $grey-100;

  @include screen-sm {
    flex-basis: 48%;
  }

  @include screen-md {
    flex-basis: 100%;
    flex-direction: row;
    justify-content: flex-start;
    height: 25rem;
    background-position: 100% 100%;
    background-color: $dark-100;
    background-size: auto 100%;
  }

  @include screen-lg {
    flex-basis: 48%;
  }

  @include screen-xl {
    height: 35rem;
  }

  &__details {
    height: 30%;
    background-color: $dark-100;
    width: 100%;
    padding: 3rem 2rem;
    border-radius: 0.5rem 0.5rem 1rem 1rem;

    @include screen-md {
      background-color: transparent;
      height: auto;
    }
  }

  &__title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 2rem;
    line-height: 3.5rem;
    color: $white;
    margin-bottom: 1rem;

    & > span {
      padding-right: 1rem;
    }

    @include screen-sm {
      font-size: 2.5rem;
    }

    @include screen-xl {
      font-size: 3.5rem;
    }
  }

  &__year {
    font-size: 1.25rem;

    @include screen-sm {
      font-size: 1.5rem;
    }

    @include screen-xl {
      font-size: 2.5rem;
    }
  }

  &__rating.badge {
    border: 1px solid $yellow-100;
    color: $yellow-100;
  }

  &__type.badge {
    border: 1px solid $grey-100;
    color: $white;
  }
}
</style>
