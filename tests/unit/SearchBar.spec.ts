import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import SearchBar from "@/components/SearchBar.vue";
import { SearchResultActions } from "@/store/modules/search-result/actions";

const PLACEHOLDER = "Find your show";

const mapActions = {
  [SearchResultActions.SET_LOADING]: jest.fn(),
  [SearchResultActions.SET_SEARCH_RESULT]: jest.fn()
};

function renderSearchBar() {
  return render(SearchBar, {
    computed: {
      isLoading: () => false
    },
    methods: {
      ...mapActions
    }
  });
}

const SEARCH_QUERY = "Ozark";

describe("SearchBar", () => {
  const oldWindow = window;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    window = oldWindow;
  });

  it("should render", () => {
    renderSearchBar();
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeVisible();
  });

  it("should move to the top of the page once being touched", async () => {
    const { container } = renderSearchBar();
    const searchBar = screen.getByPlaceholderText(PLACEHOLDER);

    await fireEvent.input(searchBar, { target: { value: SEARCH_QUERY } });

    expect(container.querySelector(".search-bar--touched")).toBeVisible();
  });

  it("should display a user's input", async () => {
    renderSearchBar();
    const searchBar = screen.getByPlaceholderText(PLACEHOLDER);

    await fireEvent.input(searchBar, { target: { value: SEARCH_QUERY } });

    expect(screen.queryByDisplayValue(SEARCH_QUERY)).toBeVisible();
  });

  it("should trigger store actions with corresponding arguments", async () => {
    renderSearchBar();
    const searchBar = screen.getByPlaceholderText(PLACEHOLDER);

    await fireEvent.input(searchBar, { target: { value: SEARCH_QUERY } });

    await waitFor(() =>
      expect(
        mapActions[SearchResultActions.SET_SEARCH_RESULT]
      ).toHaveBeenNthCalledWith(1, SEARCH_QUERY)
    );
    expect(mapActions[SearchResultActions.SET_LOADING]).toHaveBeenNthCalledWith(
      1,
      true
    );
  });

  it("should not trigger setSearchResult action if input is empty", async () => {
    renderSearchBar();
    const searchBar = screen.getByPlaceholderText(PLACEHOLDER);

    await fireEvent.input(searchBar, { target: { value: "" } });

    await waitFor(() =>
      expect(mapActions[SearchResultActions.SET_SEARCH_RESULT]).not.toBeCalled()
    );
  });

  it("should scroll to the top of the screen on input", async () => {
    const { container } = renderSearchBar();
    const searchBar = screen.getByPlaceholderText(PLACEHOLDER);

    await fireEvent.scroll(container, { target: { scrollY: 300 } });
    await fireEvent.input(searchBar, { target: { value: SEARCH_QUERY } });

    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
    });
  });
});
