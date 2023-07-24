import { PostBody, AccessToken } from "@/types/general";

const spotifyAccountApiUrl = "https://accounts.spotify.com";
export async function fetchAccessToken(
  postBody: PostBody
): Promise<AccessToken> {
  const res = await fetch(`${spotifyAccountApiUrl}/api/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(postBody),
  });
  return res.json();
}
