import React from "react";
import { Images } from "@/types/general";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function SpotifyCard({
  image,
  name,
  type,
}: {
  image?: Images;
  name: string;
  type?: string;
}) {
  return (
    <Card className="min-w-[7rem] md:min-w-[12rem] w-full h-full flex flex-col bg-background-color border-none">
      <div className="relative p-3">
        {image && image.url ? (
          <Image
            src={image.url}
            width={image.width ? image.width : 640}
            height={image.height ? image.height : 640}
            alt="song-image"
            className={`w-full max-h-44 object-cover ${
              type === "artist" ? "rounded-full" : "rounded-lg"
            }`}
          />
        ) : (
          <div className="w-full h-full"></div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-sm md:text-base">{name}</CardTitle>
        <CardDescription className="text-xs md:text-sm">{type}</CardDescription>
      </CardHeader>
    </Card>
  );
}
