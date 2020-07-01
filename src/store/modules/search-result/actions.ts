import {
  SearchItemInterface,
  SearchItemRawInterface,
  SearchResultStateInterface
} from "@/utils/types";
import { ActionContext, ActionTree } from "vuex";

import { SearchResultMutations } from "@/store/modules/search-result/mutations";
import { searchRequestWithCaching } from "@/utils/helpers";

export enum SearchResultActions {
  SET_SEARCH_RESULT = "setSearchResult",
  SET_LOADING = "setLoading"
}

const setSearchResult = async (
  context: ActionContext<
    SearchResultStateInterface,
    SearchResultStateInterface
  >,
  searchQuery: string
): Promise<void> => {
  let items: SearchItemRawInterface[] = [];
  await context.dispatch(SearchResultActions.SET_LOADING);
  context.commit(SearchResultMutations.SET_SEARCH_RESULT, []);

  try {
    items = await searchRequestWithCaching(searchQuery);
  } catch (e) {
    console.log(e);
  }

  const newItems: SearchItemInterface[] = items.map(item => ({
    ...item,
    type: item.object_type,
    year: item.original_release_year
  }));

  context.commit(SearchResultMutations.SET_SEARCH_RESULT, newItems);
  await context.dispatch(SearchResultActions.SET_LOADING);
};

const setLoading = (
  context: ActionContext<SearchResultStateInterface, SearchResultStateInterface>
) => {
  context.commit(SearchResultMutations.SET_LOADING);
};

export default {
  [SearchResultActions.SET_SEARCH_RESULT]: setSearchResult,
  [SearchResultActions.SET_LOADING]: setLoading
} as ActionTree<SearchResultStateInterface, SearchResultStateInterface>;
