import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function SyncSpotify() {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: "a2b1b5e5371c4cc6964a5737a04046ee",
    scope:
      "user-read-private user-read-email user-top-read playlist-read-private",
    // redirect_uri: "http://localhost:3000/api/callback",
    redirect_uri: "https://spotify-clone-sepia-sigma.vercel.app/api/callback",
    state: "12344555",
  }).toString();
  const authUrl = `https://accounts.spotify.com/authorize?${query}`;

  return (
    <div>
      <Button asChild className="bg-primary-color rounded-full font-semibold">
        <Link href={authUrl}>Sync Account</Link>
      </Button>
    </div>
  );
}
