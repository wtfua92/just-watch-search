import { render, screen } from "@testing-library/vue";
import SearchResult from "@/components/SearchResult.vue";
import { SearchItemInterface } from "@/utils/types";
import { searchItem, searchResultItems } from "../../mocks";

const renderSearchResult = (
  searchItems: SearchItemInterface[],
  isLoading: boolean
) =>
  render(SearchResult, {
    computed: {
      searchResultItems: () => searchItems,
      isLoading: () => isLoading
    }
  });

describe("SearchResult", () => {
  it("should display all search items", () => {
    const container = renderSearchResult(searchResultItems, false);
    expect(screen.getAllByText(searchItem.title)).toHaveLength(2);
    expect(container.baseElement).toMatchSnapshot();
  });

  it("should display loading spinner if isLoading=true", () => {
    const container = renderSearchResult(searchResultItems, true);
    expect(screen.getByText("Loading...")).toBeVisible();
    expect(container.baseElement).toMatchSnapshot();
  });
});
