import { Getter } from "vuex";
import { SearchResultStateInterface } from "@/utils/types";

const searchResultItems: Getter<
  SearchResultStateInterface,
  SearchResultStateInterface
> = state => state.searchResultItems;

const isLoading: Getter<
  SearchResultStateInterface,
  SearchResultStateInterface
> = state => state.loading;

export default {
  searchResultItems,
  isLoading
};
