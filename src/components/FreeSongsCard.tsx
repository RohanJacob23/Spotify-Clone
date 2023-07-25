"use client";

import React, { useState } from "react";
import { useSongs } from "@/zustand/songStore";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export default function FreeSongsCard({
  name,
  image,
  audio,
}: {
  name: string;
  image: string;
  audio: string;
}) {
  const [
    selectedSongs,
    setShowAudioPlayer,
    setSelectedSongs,
    setSelectedSongImage,
    setSelectedSongName,
  ] = useSongs((state) => [
    state.selectedSongs,
    state.setShowAudioPlayer,
    state.setSelectedSongs,
    state.setSelectedSongImage,
    state.setSelectedSongName,
  ]);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    const main = document.getElementsByTagName("main")[0];
    main.classList.add("h-[90%]");
    if (!selectedSongs?.paused) {
      selectedSongs?.paused;
      selectedSongs?.pause();
    }
    setShowAudioPlayer(true);
    setSelectedSongs(new Audio(audio));
    setSelectedSongImage(image);
    setSelectedSongName(name);
  };

  return (
    <Card
      className="min-w-[7rem] md:min-w-[12rem] w-full h-full flex flex-col bg-background-color border-none"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="relative p-3">
        <Image
          src={image}
          width={640}
          height={640}
          alt="song-image"
          className={`w-full max-h-44 object-cover rounded-lg`}
        />
        {/* play button */}

        <div
          className={`${
            show ? "flex" : "hidden"
          } playButton items-center justify-center bg-primary-color bottom-5 right-5 rounded-full w-12 h-12 absolute  drop-shadow cursor-pointer`}
          onClick={handleClick}
        >
          <Image
            src="/icons/playArrow.svg"
            width={32}
            height={32}
            alt="play-icon"
          />
        </div>
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-sm md:text-base">{name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
