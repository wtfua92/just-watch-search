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
  state.searchResultItems = payload;
};

const setLoading: Mutation<SearchResultStateInterface> = (
  state: SearchResultStateInterface,
  payload: boolean
) => {
  state.loading = payload;
};

export type SearchResultMutationsTree = MutationTree<
  SearchResultStateInterface & SearchResultMutations
>;

export default {
  [SearchResultMutations.SET_SEARCH_RESULT]: setSearchResult,
  [SearchResultMutations.SET_LOADING]: setLoading
} as SearchResultMutationsTree;
