import { create } from "zustand";

interface SongState {
  showAudioPlayer: boolean;
  selectedSongs: HTMLAudioElement | null;
  selectedSongImage: string | null;
  selectedSongName: string | null;
  setShowAudioPlayer: (value: boolean) => void;
  setSelectedSongs: (audio: HTMLAudioElement) => void;
  setSelectedSongImage: (image: string) => void;
  setSelectedSongName: (name: string) => void;
}

export const useSongs = create<SongState>((set) => ({
  showAudioPlayer: false,
  selectedSongs: null,
  selectedSongImage: null,
  selectedSongName: null,
  setSelectedSongs: (result) => set({ selectedSongs: result }),
  setShowAudioPlayer: (value) => set({ showAudioPlayer: value }),
  setSelectedSongImage: (image) => set({ selectedSongImage: image }),
  setSelectedSongName: (name) => set({ selectedSongName: name }),
}));
