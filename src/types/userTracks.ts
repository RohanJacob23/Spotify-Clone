import { Images } from "./general";
import { ArtistItems } from "./artists";
import { Artist } from "./albums";

export type TracksItem = {
  album: {
    album_type: string;
    artists: ArtistItems[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Images[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable?: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  images: Images[];
};

export interface UserTopTracks {
  total: string;
  limit: string;
  offset: string;
  href: string;
  next: string;
  previous: null | string;
  items: TracksItem[];
}
