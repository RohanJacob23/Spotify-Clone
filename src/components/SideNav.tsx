import { Home, Search, Library, Plus } from "lucide-react";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { UserPlaylist } from "@/types/playlist";

export default function SideNav({
  userPlaylists,
}: {
  userPlaylists: UserPlaylist | null;
}) {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: "a2b1b5e5371c4cc6964a5737a04046ee",
    scope:
      "user-read-private user-read-email user-top-read playlist-read-private",
    redirect_uri: "http://localhost:3000/api/callback",
    state: "12344555",
  }).toString();
  const authUrl = `https://accounts.spotify.com/authorize?${query}`;
  return (
    <section className="hidden md:flex flex-col space-y-3 h-full w-3/12 font-semibold">
      {/* upper section */}
      <ul className="bg-background-variant-color rounded-lg p-2">
        {/* Home */}
        <li>
          <Link className="flex space-x-4 py-2 px-3" href="/">
            <Home />
            <h1>Home</h1>
          </Link>
        </li>

        {/* search */}
        <li>
          <Link className="flex space-x-4 py-2 px-3" href="/search">
            <Search />
            <h1>search</h1>
          </Link>
        </li>

        <li>
          <Link className="flex space-x-4 py-2 px-3" href={authUrl}>
            <Library />
            <h1>Account</h1>
          </Link>
        </li>
      </ul>
      {/* bottom nav */}
      <section className="flex flex-col h-full rounded-lg p-2 bg-background-variant-color overflow-hidden">
        <div className="flex justify-between flex-nowrap gap-2 p-3">
          <div className="flex space-x-2">
            <Library />
            <h1>Your Library</h1>
          </div>
        </div>

        <ScrollArea className="h-full">
          <Card className="bg-transparent border-none hover:bg-white/5 cursor-pointer p-1.5">
            <div className="flex items-center">
              {/* image */}
              <div className="relative w-11 h-11">
                <Image
                  src="/images/liked-songs.png"
                  fill
                  alt="LikedImage"
                  priority={true}
                  className="rounded-lg object-cover"
                />
              </div>
              <CardHeader className="flex-grow p-4">
                <CardTitle>Liked Songs</CardTitle>
              </CardHeader>
            </div>
          </Card>

          {/* User Playlist section */}
          {userPlaylists && (
            <>
              {userPlaylists.items.map((playlist) => (
                <Card
                  key={playlist.id}
                  className="bg-transparent border-none hover:bg-white/5 cursor-pointer p-1.5"
                >
                  <div className="flex items-center">
                    {/* image */}
                    <div className="relative w-11 h-11">
                      {playlist.images[0].url && (
                        <Image
                          src={playlist.images[0].url}
                          fill
                          alt="LikedImage"
                          // priority={true}
                          className="rounded-lg object-cover"
                        />
                      )}
                    </div>
                    <CardHeader className="flex-grow p-2.5">
                      <CardTitle>{playlist.name}</CardTitle>
                      <CardDescription>
                        {playlist.owner.display_name}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              ))}
            </>
          )}
        </ScrollArea>
      </section>
    </section>
  );
}
