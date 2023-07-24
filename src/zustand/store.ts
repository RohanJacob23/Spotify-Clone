import { SearchResult } from "@/types/search";
import { create } from "zustand";

type SearchResponse = {
  artists: SearchResult;
  tracks?: SearchResult;
  playlists?: SearchResult;
  albums?: SearchResult;
};

interface searchState {
  searchResult: SearchResponse | null;
  setSearchResult: (result: SearchResponse) => void;
}

export const useSearchStore = create<searchState>((set) => ({
  searchResult: null,
  setSearchResult: (result) => set({ searchResult: result }),
}));
