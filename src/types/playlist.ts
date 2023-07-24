import { Images } from "./general";

export type Playlist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Images[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: null | string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
  album?: string;
};

export interface UserPlaylist {
  href: string;
  limit: number;
  next: null | string;
  offset: number;
  total: number;
  previous: null | string;
  items: Playlist[];
}
