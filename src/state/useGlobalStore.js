import { create } from "zustand";

const useGlobalStore = create((set) => ({
  gameOverTime: 0,
  setGameOverTime: (gameOverTime) => set({ gameOverTime }),
  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
  getTime: 0,
  setGetTime: (getTime) => set({ getTime }),
}));

export default useGlobalStore;
