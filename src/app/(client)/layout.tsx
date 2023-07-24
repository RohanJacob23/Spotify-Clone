import SideNav from "@/components/SideNav";
import React from "react";
import { cookies } from "next/headers";
import { User } from "@/types/general";
import { redirect } from "next/navigation";
import { UserPlaylist } from "@/types/playlist";
import SearchBar from "@/components/SearchBar";
import UserAvatar from "@/components/UserAvatar";
import SyncSpotify from "@/components/SyncSpotify";

async function fetchUser(
  accessToken: string | undefined
): Promise<User | null> {
  if (!accessToken) {
    return null;
  }
  const res = await fetch(`https://api.spotify.com/v1/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  // Check if the response is successful
  if (!res.ok) {
    redirect(`${process.env.URL}/api/callback?refresh=true`);
    // Throw an error if the request fails
  }

  // Return the JSON data from the response
  return res.json();
}

async function fetchUserPlaylists(
  accessToken: string | undefined
): Promise<UserPlaylist | null> {
  if (!accessToken) {
    return null;
  }

  const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=10`, {
    headers: { Authorization: `Bearer ${accessToken}` },
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

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const user = await fetchUser(token?.value);
  const userPlaylists = await fetchUserPlaylists(token?.value);
  return (
    <main className="flex pt-3">
      <SideNav userPlaylists={userPlaylists} />

      <section className="flex flex-col h-full w-full md:w-9/12 px-2 space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-background-variant-color px-3 py-4 sticky top-0">
          <div>
            <SearchBar token={token?.value} />
          </div>
          {user ? <UserAvatar name={user.display_name} /> : <SyncSpotify />}
        </div>

        {children}
      </section>
    </main>
  );
}
