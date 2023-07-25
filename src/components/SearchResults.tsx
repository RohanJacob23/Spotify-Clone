"use client";
import { useSearchStore } from "@/zustand/searchStore";
import React from "react";
import SpotifyCard from "./SpotifyCard";

export default function SearchResults() {
  const [searchResults] = useSearchStore((state) => [state.searchResult]);
  const list = searchResults ? Object.entries(searchResults) : null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 items-stretch justify-center">
      {list?.map(([key, value]) =>
        value.items.map((item) => (
          <div key={item.id} className="max-w-[18rem]">
            <SpotifyCard
              image={
                "images" in item
                  ? item.images[0]
                  : "album" in item
                  ? item["album"]["images"][0]
                  : { url: null, height: null, width: null }
              }
              name={item.name}
              type={item.type}
            />
          </div>
        ))
      )}
    </div>
  );
}
