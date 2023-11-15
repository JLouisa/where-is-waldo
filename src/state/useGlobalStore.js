import { create } from "zustand";

const useGlobalStore = create((set) => ({
  gameOver: false,
  setGameOver: (gameOver) => set({ gameOver }),
}));

export default useGlobalStore;
