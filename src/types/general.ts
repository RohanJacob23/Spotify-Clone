export type PostBody = {
  grant_type: "client_credentials" | "authorization_code" | "refresh_token";
  client_id: string;
  client_secret: string;
  redirect_uri?: string;
  code?: string;
  refresh_token?: string;
};
export type AccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};
export interface User {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [];
  type: string;
  uri: string;
  followers: { href: string | null; total: number };
  country: string;
  product: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  email: string;
}

export type Images = {
  height: number | null;
  url: string|null
  width: number | null;
};
