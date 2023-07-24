import { Images } from "./general";

export type ArtistItems = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
  album?: string;
};

export interface TopUserArtists {
  total: string;
  limit: string;
  offset: string;
  href: string;
  next: string;
  previous: null | string;
  items: ArtistItems[];
}
