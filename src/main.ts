import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import store from "./store";

import { BASE_URL } from "@/utils/constants";

Vue.config.productionTip = false;

axios.defaults.baseURL = BASE_URL;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
