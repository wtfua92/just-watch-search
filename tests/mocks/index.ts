import { SearchItemInterface, SearchItemRawInterface } from "@/utils/types";

export const searchQuery = "Ozark";

export const searchItem: SearchItemInterface = {
  id: 123,
  title: "Ozark",
  poster: "/POSTER.jpg",
  type: "show",
  year: 2017,
  rating: 100.234
};

export const searchItemRaw: SearchItemRawInterface = {
  id: 123,
  title: "Ozark",
  poster: "/POSTER.jpg",
  object_type: "show",
  original_release_year: 2017,
  tmdb_popularity: 100.234
};

export const searchResultItems = [
  { ...searchItem, id: 1 },
  { ...searchItem, id: 2 }
];

export const searchResultItemsRaw = [
  { ...searchItemRaw, id: 1 },
  { ...searchItemRaw, id: 2 }
];
