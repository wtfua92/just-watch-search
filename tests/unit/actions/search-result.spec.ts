import actions, {
  SearchResultActions
} from "@/store/modules/search-result/actions";
import { ActionContext } from "vuex";
import { SearchResultStateInterface } from "@/utils/types";
import { SearchResultMutations } from "@/store/modules/search-result/mutations";
import { searchQuery, searchResultItemsRaw } from "../../mocks";
import { searchRequestWithCaching } from "@/utils/helpers";
import Mock = jest.Mock;

jest.mock("@/utils/helpers");

describe("SearchResultActions", () => {
  let context: ActionContext<
    SearchResultStateInterface,
    SearchResultStateInterface
  >;

  beforeEach(() => {
    context = {
      commit: jest.fn(),
      dispatch: jest.fn(),
      state: {
        searchResultItems: [],
        loading: false
      },
      getters: {},
      rootGetters: {},
      rootState: {
        searchResultItems: [],
        loading: false
      }
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it(`should commit ${SearchResultMutations.SET_LOADING} on setLoading action`, () => {
    // @ts-ignore
    actions[SearchResultActions.SET_LOADING](context, true);
    expect(context.commit).toHaveBeenCalledWith(
      SearchResultMutations.SET_LOADING,
      true
    );
  });

  describe(`${SearchResultActions.SET_SEARCH_RESULT}`, () => {
    const fireSetSearchResult = () =>
      //@ts-ignore
      actions[SearchResultActions.SET_SEARCH_RESULT](context, searchQuery);

    beforeEach(() => {
      (searchRequestWithCaching as Mock).mockResolvedValue(
        searchResultItemsRaw
      );
    });

    it("should change loading to false", () => {
      context.state.loading = true;

      fireSetSearchResult();

      setTimeout(() => {
        expect(context.state.loading).toBeFalsy();
      });
    });

    it("should update searchResultItems with server response", () => {
      fireSetSearchResult();

      setTimeout(() => {
        expect(context.state.searchResultItems).toHaveLength(
          searchResultItemsRaw.length
        );
      });
    });
  });
});
