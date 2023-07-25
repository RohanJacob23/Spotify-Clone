"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Heart, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Slider } from "@/components/ui/slider";
import { useSongs } from "@/zustand/songStore";

export default function AudioPlayer() {
  const [selectedSongImage, showAudioPlayer, selectedSongs, selectedSongName] =
    useSongs((state) => [
      state.selectedSongImage,
      state.showAudioPlayer,
      state.selectedSongs,
      state.selectedSongName,
    ]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(selectedSongs ? !selectedSongs?.paused : false);
  }, [selectedSongs]);

  return (
    <section
      className={`${
        showAudioPlayer ? "flex" : "hidden"
      } items-center justify-between bg-background-color fixed bottom-0 w-full h-20 px-4`}
    >
      {/* song description */}
      <div className="flex items-center">
        <Card className="bg-transparent border-none hover:bg-white/5 cursor-pointer p-1.5">
          <div className="flex items-center">
            {/* image */}
            <div className="relative w-11 h-11">
              <Image
                src={
                  selectedSongImage
                    ? selectedSongImage
                    : "/images/liked-songs.png"
                }
                fill
                alt="LikedImage"
                priority={true}
                className="rounded-lg object-cover"
              />
            </div>
            <CardHeader className="flex-grow p-4">
              <CardTitle>{selectedSongName}</CardTitle>
            </CardHeader>
          </div>
        </Card>
        <Heart className="cursor-pointer w-5 h-5" />
      </div>

      {/* previous play next buttons */}
      <div className="flex items-center space-x-3">
        <SkipBack className="md:block hidden w-7 h-7 cursor-pointer" />
        <div className="flex items-center justify-center bg-white rounded-full w-9 h-9 cursor-pointer">
          {isPlaying ? (
            <Image
              src="/icons/pause.svg"
              width={32}
              height={32}
              alt="pause-icon.svg"
              onClick={() => {
                selectedSongs?.pause();
                setIsPlaying(false);
              }}
            />
          ) : (
            <Image
              src="/icons/playArrow.svg"
              width={32}
              height={32}
              alt="play-icon"
              onClick={() => {
                selectedSongs?.play();
                setIsPlaying(true);
              }}
            />
          )}
        </div>
        <SkipForward className="md:block hidden w-7 h-7 cursor-pointer" />
      </div>

      {/* volume control */}
      <div className="md:flex hidden items-center w-36 space-x-2">
        <Volume2 className="w-7 h-7 cursor-pointer" />
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          onValueChange={(value) =>
            selectedSongs ? (selectedSongs.volume = value[0] * 0.01) : null
          }
        />
      </div>
    </section>
  );
}
