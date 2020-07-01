import { SearchItemInterface, SearchResultStateInterface } from "@/utils/types";
import { Mutation, MutationTree } from "vuex";

export enum SearchResultMutations {
  SET_SEARCH_RESULT = "SET_SEARCH_RESULT",
  SET_LOADING = "SET_LOADING"
}

const setSearchResult: Mutation<SearchResultStateInterface> = (
  state: SearchResultStateInterface,
  payload: SearchItemInterface[]
): void => {
  state.searchResult = payload;
};

const setLoading: Mutation<SearchResultStateInterface> = state => {
  state.loading = !state.loading;
};

export default {
  [SearchResultMutations.SET_SEARCH_RESULT]: setSearchResult,
  [SearchResultMutations.SET_LOADING]: setLoading
} as MutationTree<SearchResultStateInterface & SearchResultMutations>;
