import { create } from "zustand";
import { useUser } from "./useUser";

interface AdminState {
  // Check if the current user has admin rights
  isAdmin: () => boolean;

  // Ensure admin access or throw error
  requireAdmin: () => void;
}

export const useAdmin = create<AdminState>()((set, get) => ({
  isAdmin: () => {
    const user = useUser.getState().user;
    return user?.isAdmin ?? false;
  },

  requireAdmin: () => {
    if (!useAdmin.getState().isAdmin()) {
      throw new Error("Admin access required");
    }
  },
}));
