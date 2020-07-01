import mutations, {
  SearchResultMutations
} from "@/store/modules/search-result/mutations";
import { searchResultItems, searchItem } from "../../mocks";

import { SearchResultStateInterface } from "@/utils/types";

describe("SearchResultMutations", () => {
  let state: SearchResultStateInterface;

  beforeEach(() => {
    state = {
      searchResultItems,
      loading: false
    };
  });

  it(`${SearchResultMutations.SET_SEARCH_RESULT} should set payload as new searchResultItems`, () => {
    mutations[SearchResultMutations.SET_SEARCH_RESULT](state, [
      ...searchResultItems,
      { ...searchItem, id: 3 }
    ]);

    expect(state.searchResultItems).toHaveLength(3);
  });

  it(`${SearchResultMutations.SET_LOADING} should set payload as new loading`, () => {
    mutations[SearchResultMutations.SET_LOADING](state, true);

    expect(state.loading).toBeTruthy();
  });
});
