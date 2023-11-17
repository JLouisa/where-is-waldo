import { create } from "zustand";

const useGlobalStore = create((set) => ({
  gameOver: false,
  setGameOver: (gameOver) => set({ gameOver }),
  showChoose: false,
  setShowChoose: (showChoose) => set({ showChoose }),
  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
  rickMortyGame: false,
  setRickMortyGame: (rickMortyGame) => set({ rickMortyGame }),
}));

export default useGlobalStore;
