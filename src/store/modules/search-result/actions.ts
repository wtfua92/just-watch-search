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

  try {
    items = await searchRequestWithCaching(searchQuery);
  } catch (e) {
    console.log(e);
  }

  const newItems: SearchItemInterface[] = items.map(item => ({
    ...item,
    type: item.object_type,
    year: item.original_release_year,
    rating: item.tmdb_popularity
  }));

  context.commit(SearchResultMutations.SET_SEARCH_RESULT, newItems);
  context.state.loading &&
    (await context.dispatch(SearchResultActions.SET_LOADING, false));
};

const setLoading = (
  context: ActionContext<
    SearchResultStateInterface,
    SearchResultStateInterface
  >,
  newLoadingState: boolean
) => {
  context.commit(SearchResultMutations.SET_LOADING, newLoadingState);
};

export default {
  [SearchResultActions.SET_SEARCH_RESULT]: setSearchResult,
  [SearchResultActions.SET_LOADING]: setLoading
} as ActionTree<SearchResultStateInterface, SearchResultStateInterface>;
