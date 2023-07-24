"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { useSearchStore } from "@/zustand/store";

const spotifyType = [
  {
    value: "album",
    label: "Album",
  },
  {
    value: "artist",
    label: "Artist",
  },
  {
    value: "playlist",
    label: "Playlist",
  },
  {
    value: "track",
    label: "Track",
  },
];

export default function SearchBar({ token }: { token: string | undefined }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("album");
  const [search, setSearch] = useState("");
  const pathname = usePathname().replace("/", "");
  const [setSearchResult] = useSearchStore((state) => [state.setSearchResult]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .get(
        `https://api.spotify.com/v1/search?limit=10&q=${search}&type=${value}&market=IN`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(({ data }) => setSearchResult(data))
      .catch((error) => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${
          pathname === "search" ? "block" : "hidden"
        } relative w-full flex items-center md:space-x-3 space-x-1`}
      >
        <Search className="absolute w-5 md:w-auto md:top-1.5 md:left-5 top-2 left-2" />
        <Input
          type="text"
          placeholder="What do you want to listen to?"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="rounded-full bg-[#2B3839] hover:border-white/10 focus:border-2 focus:border-white border-2 border-transparent p-3 pl-7 md:p-5 md:pl-10 md:w-72"
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="default"
              role="combobox"
              aria-expanded={open}
              className="justify-between rounded-full bg-primary-color hover:bg-primary-color/90 font-semibold h-8 md:h-auto"
            >
              {value
                ? spotifyType.find((searchType) => searchType.value === value)
                    ?.label
                : "Artist"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command className="bg-background-color">
              <CommandInput placeholder="Search..." />
              <CommandEmpty>
                Couldn&apos;t find what you were looking for.
              </CommandEmpty>
              <CommandGroup>
                {spotifyType.map((searchType) => (
                  <CommandItem
                    key={searchType.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "album" : currentValue);
                      setOpen(false);
                    }}
                    className="aria-selected:bg-secondary-color"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-accent-color",
                        value === searchType.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {searchType.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </form>
  );
}
