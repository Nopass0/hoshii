import { create } from "zustand";
import { useUser } from "./useUser";

interface PremiumState {
  // Check if the current user has premium access
  isPremium: () => boolean;

  // Ensure premium access or throw error
  requirePremium: () => void;
}

export const usePremium = create<PremiumState>()((set, get) => ({
  isPremium: () => {
    const user = useUser.getState().user;
    return user?.isPremium ?? false;
  },

  requirePremium: () => {
    if (!usePremium.getState().isPremium()) {
      throw new Error("Premium access required");
    }
  },
}));
