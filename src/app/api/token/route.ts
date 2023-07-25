import { fetchAccessToken } from "@/util/functions/fetchAccessToken";
import { NextResponse } from "next/server";
import { PostBody } from "@/types/general";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const postBody: PostBody = {
    grant_type: "client_credentials",
    client_id: "a2b1b5e5371c4cc6964a5737a04046ee",
    client_secret: "15d61170883144449553e2529850c153",
  };
  const res = await fetchAccessToken(postBody);
  console.log("ELSE ", res);
  return NextResponse.json(res);
}
