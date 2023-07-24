import { Album } from "./albums";
import { ArtistItems } from "./artists";
import { Playlist } from "./playlist";
import { TracksItem } from "./userTracks";

export interface SearchResult {
  href: string;
  items: Album[] | ArtistItems[] | Playlist[] | TracksItem[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
