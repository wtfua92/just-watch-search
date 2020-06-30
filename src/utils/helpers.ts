import { SearchItemRawInterface } from "@/utils/types";
import axios from "axios";

export const requestCacheWrapper = (requestFunc: Function) => {
  const cache = new Map();

  return (searchValue: string) => {
    if (cache.has(searchValue)) {
      const cachedResult = cache.get(searchValue);

      if (cachedResult.length > 0) {
        return cache.get(searchValue);
      }
    }

    return requestFunc(searchValue)
      .then((result: any) => {
        cache.set(searchValue, result);
        return result;
      })
      .catch((e: Error) => {
        // TODO implement error logging;
        console.log(e);
        return [];
      });
  };
};

export const searchRequest = async function(
  searchQuery: string
): Promise<SearchItemRawInterface[]> {
  if (!searchQuery) {
    return Promise.resolve([]);
  }

  let result: SearchItemRawInterface[] = [];

  try {
    const {
      data: { items }
    } = await axios.get("popular", {
      params: {
        body: {
          pageSize: 5,
          page: 1,
          query: searchQuery,
          contentTypes: ["show", "movie"]
        }
      }
    });

    result = items || [];
  } catch (e) {
    console.log(e);
  }
  return result;
};

export const searchRequestWithCaching = requestCacheWrapper(searchRequest);
