export interface SearchItemInterface {
  id: number;
  title: string;
  poster: string;
  year: number;
  type: string;
}

export interface SearchItemRawInterface {
  id: number;
  title: string;
  poster: string;
  original_release_year: number;
  object_type: string;
}

export type SearchResultStateInterface = {
  searchResult: SearchItemInterface[];
  loading: boolean;
};
