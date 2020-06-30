import { Getter } from "vuex";
import { SearchResultStateInterface } from "@/utils/types";

const searchResultItems: Getter<
  SearchResultStateInterface,
  SearchResultStateInterface
> = state => state.searchResult;

export default {
  searchResultItems
};
