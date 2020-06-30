import { SearchItemInterface, SearchResultStateInterface } from "@/utils/types";
import { Mutation, MutationTree } from "vuex";

export enum SearchResultMutations {
  SET_SEARCH_RESULT = "SET_SEARCH_RESULT"
}

const setSearchResult: Mutation<SearchResultStateInterface> = (
  state: SearchResultStateInterface,
  payload: SearchItemInterface[]
): void => {
  state.searchResult = payload;
};

export default {
  [SearchResultMutations.SET_SEARCH_RESULT]: setSearchResult
} as MutationTree<SearchResultStateInterface & SearchResultMutations>;
