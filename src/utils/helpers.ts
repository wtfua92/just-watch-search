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
