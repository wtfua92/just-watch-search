import actions from "@/store/modules/search-result/actions";
import getters from "@/store/modules/search-result/getters";
import mutations from "@/store/modules/search-result/mutations";

import { SearchResultStateInterface } from "@/utils/types";

const state: SearchResultStateInterface = {
  searchResult: []
};

export default {
  state,
  actions,
  getters,
  mutations
};
