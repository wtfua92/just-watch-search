import {
  requestCacheWrapper,
  searchRequest,
  searchRequestWithCaching
} from "@/utils/helpers";
import axios from "axios";
import Mock = jest.Mock;
import { searchQuery } from "../../mocks";

jest.mock("axios");

describe("helpers", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("searchRequest", () => {
    it("should return empty array if search query is empty", () => {
      expect(searchRequest("")).resolves.toEqual([]);
    });

    it("should return items property of server's response", () => {
      (axios.get as Mock).mockResolvedValue({
        data: {
          items: [1, 2, 3]
        }
      });

      expect(searchRequest(searchQuery)).resolves.toHaveLength(3);
    });

    it("should return empty array if no items in server's response", () => {
      (axios.get as Mock).mockResolvedValue({
        data: {}
      });
      expect(searchRequest(searchQuery)).resolves.toEqual([]);
    });

    it("should return empty array if request errored", () => {
      (axios.get as Mock).mockRejectedValue({
        type: "error"
      });

      expect(searchRequest(searchQuery)).resolves.toEqual([]);
    });
  });

  describe("searchRequestWithCaching", () => {
    it("should not make a request if an item is searched more than once", async () => {
      (axios.get as Mock).mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            items: [1, 2, 3]
          }
        })
      );

      await searchRequestWithCaching(searchQuery);
      await searchRequestWithCaching(searchQuery);
      await searchRequestWithCaching(searchQuery);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
