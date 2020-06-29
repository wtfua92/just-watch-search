<template>
    <div>
        <label for="search-bar">Search:</label>
        <input id="search-bar" type="text">
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import debounce from ""

export default Vue.extend({
  name: "SearchBar",
  props: {
    msg: String
  },
    methods: {

    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
