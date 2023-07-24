import React from "react";

import { AlbumsResponse } from "@/types/albums";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SpotifyCard from "@/components/SpotifyCard";
import { AccessToken } from "@/types/general";
import { cookies } from "next/headers";
import { TopUserArtists } from "@/types/artists";
import { UserTopTracks } from "@/types/userTracks";
import Backward from "@/components/Backward";
import Forward from "@/components/Forward";
import Link from "next/link";
import { Home, Search } from "lucide-react";

async function fetchSpotifyAccessToken(): Promise<AccessToken> {
  console.log(process.env.URL);
  const res = await fetch(`${process.env.URL}/api/token`, {
    cache: "no-store",
  });

  // Check if the response is successful
  if (!res.ok) {
    // Throw an error if the request fails
    throw new Error("Failed to fetch data");
  }

  // Return the JSON data from the response
  return res.json();
}

async function fetchNewReleases(
  accessToken: string
): Promise<{ albums: AlbumsResponse }> {
  const res = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?limit=10&country=IN`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );

  // Check if the response is successful
  if (!res.ok) {
    // Throw an error if the request fails
    throw new Error("Failed to fetch data");
  }

  // Return the JSON data from the response
  return res.json();
}

async function fetchUserArtists(
  accessToken: string | undefined
): Promise<TopUserArtists | null> {
  if (!accessToken) {
    return null;
  }
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/artists?limit=10`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );
  if (!res.ok) {
    // Throw an error if the request fails
    throw new Error("Failed to fetch data");
  }

  // Return the JSON data from the response
  return res.json();
}

async function fetchUserTracks(
  access_token: string | undefined
): Promise<UserTopTracks | null> {
  if (!access_token) {
    return null;
  }
  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=10`, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  // Check if the response is successful
  if (!res.ok) {
    // Throw an error if the request fails
    throw new Error("Failed to fetch data");
  }

  // Return the JSON data from the response
  return res.json();
}
export default async function page() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const accessTokenRes = await fetchSpotifyAccessToken();
  const { albums } = await fetchNewReleases(accessTokenRes.access_token);
  const artists = await fetchUserArtists(token?.value);
  const tracks = await fetchUserTracks(token?.value);

  return (
    <section className="text-white rounded-lg bg-background-variant-color h-full w-full px-3 py-4 overflow-y-scroll">
      {/* navigation for mobile view */}
      <div className="md:hidden flex items-center justify-between mb-3">
        {/* home and search navigation */}
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex justify-center items-center w-9 h-9 bg-black rounded-full"
          >
            <Home className="w-5 h-5" />
          </Link>
          {token && (
            <Link
              href="/search"
              className="flex justify-center items-center w-9 h-9 bg-black rounded-full"
            >
              <Search className="w-5 h-5" />
            </Link>
          )}
        </div>

        {/* forward and backward navigation */}
        <div className="flex items-center space-x-2">
          <Backward />
          <Forward />
        </div>
      </div>

      {/* new release section */}
      <section className="flex flex-col mt-3">
        <h1 className="text-xl md:text-2xl font-semibold hover:underline cursor-pointer mb-3">
          New Releases
        </h1>

        {/* albums card */}
        <ScrollArea className="w-full">
          <div className="flex flex-row gap-2">
            {albums.items.map((album) => (
              <div key={album.id} className="w-36 md:w-auto">
                <SpotifyCard
                  image={album.images[0]}
                  name={album.name}
                  type={album.album_type}
                />
              </div>
            ))}
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </section>
      {token && (
        <>
          <section className="flex flex-col mt-10">
            <h1 className="text-xl md:text-2xl font-semibold hover:underline cursor-pointer mb-3">
              Your Top Artists
            </h1>

            {/* user's top artists card */}
            <ScrollArea className="w-full">
              <div className="flex flex-row gap-2">
                {artists?.items.map((artist) => (
                  <div key={artist.id} className="w-36 md:w-auto">
                    <SpotifyCard
                      image={artist.images[0]}
                      name={artist.name}
                      type={artist.type}
                    />
                  </div>
                ))}
                <ScrollBar orientation="horizontal" />
              </div>
            </ScrollArea>
          </section>

          <section className="flex flex-col mt-10">
            <h1 className="text-xl md:text-2xl font-semibold hover:underline cursor-pointer mb-3">
              Your Top Tracks
            </h1>

            {/* user's top artists card */}
            <ScrollArea className="w-full">
              <div className="flex flex-row gap-2">
                {tracks?.items.map((track) => (
                  <div key={track.id} className="w-36 md:w-auto">
                    <SpotifyCard
                      image={track.album.images[0]}
                      name={track.name}
                      type={track.type}
                    />
                  </div>
                ))}
                <ScrollBar orientation="horizontal" />
              </div>
            </ScrollArea>
          </section>
        </>
      )}
    </section>
  );
}
