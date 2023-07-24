import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchAccessToken } from "@/util/functions/fetchAccessToken";
import { PostBody } from "@/types/general";

export async function GET(request: Request) {
  const postBody: PostBody = {
    grant_type: "authorization_code",
    client_id: "a2b1b5e5371c4cc6964a5737a04046ee",
    client_secret: "15d61170883144449553e2529850c153",
    // redirect_uri: "http://localhost:3000/api/callback",
    redirect_uri: "https://spotify-clone-sepia-sigma.vercel.app/api/callback",
  };
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const refresh = searchParams.get("refresh");
  if (code) {
    postBody.code = code;
    const res = await fetchAccessToken(postBody);
    console.log("IF ", res);

    cookies().set("token", res.access_token);
    cookies().set("refresh_token", res.refresh_token);
    redirect("/");
  } else if (refresh) {
    const refresh_token = cookies().get("refresh_token");
    delete postBody.code;
    // postBody.redirect_uri = "http://localhost:3000/api/callback";
    postBody.redirect_uri =
      "https://spotify-clone-sepia-sigma.vercel.app/api/callback";
    postBody.grant_type = "refresh_token";
    postBody.refresh_token = refresh_token?.value;
    const res = await fetchAccessToken(postBody);
    cookies().set("token", res.access_token);
    redirect("/");
  }
}
