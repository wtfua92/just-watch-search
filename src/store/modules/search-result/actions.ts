import {
  SearchItemInterface,
  SearchItemRawInterface,
  SearchResultStateInterface
} from "@/utils/types";
import { ActionContext, ActionTree } from "vuex";

import { SearchResultMutations } from "@/store/modules/search-result/mutations";
import { searchRequestWithCaching } from "@/utils/helpers";

export enum SearchResultActions {
  SET_SEARCH_RESULT = "setSearchResult"
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
    year: item.original_release_year
  }));

  context.commit(SearchResultMutations.SET_SEARCH_RESULT, newItems);
};

export default {
  [SearchResultActions.SET_SEARCH_RESULT]: setSearchResult
} as ActionTree<SearchResultStateInterface, SearchResultStateInterface>;
