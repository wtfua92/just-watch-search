import { render, screen } from "@testing-library/vue";
import SearchResult from "@/components/SearchResult.vue";
import { SearchItemInterface } from "@/utils/types";

const searchItem: SearchItemInterface = {
  id: 0,
  title: "Ozark",
  poster: "/POSTER.jpg",
  type: "show",
  year: 2017,
  rating: 100.234
};

const searchItemsResult = [
  { ...searchItem, id: 1 },
  { ...searchItem, id: 2 }
];

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
    const container = renderSearchResult(searchItemsResult, false);
    expect(screen.getAllByText(searchItem.title)).toHaveLength(2);
    expect(container.baseElement).toMatchSnapshot();
  });

  it("should display loading spinner if isLoading=true", () => {
    const container = renderSearchResult(searchItemsResult, true);
    expect(screen.getByText("Loading...")).toBeVisible();
    expect(container.baseElement).toMatchSnapshot();
  });
});
