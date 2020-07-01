<template>
  <span v-if="content" class="badge" :title="title" v-html="content" />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Badge",
  props: {
    title: String,
    content: String
  }
});
</script>

<style lang="scss" scoped>
@import "src/styles/colors";
@import "src/styles/utils";

.badge {
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid $dark-100;
  border-radius: 10%;
  font-size: 1.5rem;

  @include screen-sm {
    font-size: 1.75rem;
  }

  @include screen-lg {
    margin-right: 1.5rem;
  }
}
</style>
