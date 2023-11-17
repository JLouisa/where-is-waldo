import { create } from "zustand";

const useGlobalStore = create((set) => ({
  gameOverTime: 0,
  setGameOverTime: (gameOverTime) => set({ gameOverTime }),
}));

export default useGlobalStore;
