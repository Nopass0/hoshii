import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchApi, ApiError } from "@/lib/apiBase";
import {
  User,
  UserSchema,
  LoginCredentials,
  RegisterData,
  AuthResponseSchema,
} from "@/lib/schemas/user";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: FormData) => Promise<User>;
  refreshUser: () => Promise<void>;
}

export const useUser = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      token: null,

      setToken: (token: string | null) => {
        set({ token });
        if (token) {
          localStorage.setItem("auth_token", token);
        } else {
          localStorage.removeItem("auth_token");
        }
      },

      setUser: (user: User | null) => set({ user }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchApi<AuthResponseSchema>("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          });

          if (response.token) {
            get().setToken(response.token);
            if (response.user) {
              get().setUser(response.user);
            } else {
              await get().refreshUser();
            }
          } else {
            throw new Error("Invalid response from server: No token provided");
          }
        } catch (error) {
          let errorMessage = "An error occurred during login";
          if (error instanceof ApiError) {
            errorMessage = error.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchApi<AuthResponseSchema>(
            "/auth/register",
            {
              method: "POST",
              body: JSON.stringify(data),
            },
          );

          if (response.token) {
            get().setToken(response.token);
            if (response.user) {
              get().setUser(response.user);
            } else {
              await get().refreshUser();
            }
          } else {
            throw new Error("Invalid response from server: No token provided");
          }
        } catch (error) {
          let errorMessage = "An error occurred during registration";
          if (error instanceof ApiError) {
            errorMessage = error.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        get().setToken(null);
        get().setUser(null);
      },

      updateProfile: async (data: FormData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetchApi<User>("/user/me", {
            method: "PATCH",
            body: data,
          });

          const updatedUser = UserSchema.parse(response);
          get().setUser(updatedUser);
          return updatedUser;
        } catch (error) {
          let errorMessage = "An error occurred while updating profile";
          if (error instanceof ApiError) {
            errorMessage = `API Error (${error.status}): ${error.message}`;
          } else if (error instanceof Error) {
            errorMessage = `Error: ${error.message}`;
          }
          set({ error: errorMessage });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      refreshUser: async () => {
        const token = get().token || localStorage.getItem("auth_token");
        if (!token) {
          get().setToken(null);
          get().setUser(null);
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetchApi<User>("/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = UserSchema.parse(response);
          get().setUser(user);
          get().setToken(token);
        } catch (error) {
          let errorMessage = "An error occurred while refreshing user data";
          if (error instanceof ApiError) {
            errorMessage = error.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          set({ error: errorMessage });
          console.log("Failed to refresh user, but keeping existing state");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

// Initialize the store
const initializeStore = () => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    useUser.getState().setToken(token);
    useUser.getState().refreshUser();
  }
};

// Call initializeStore when the app starts
initializeStore();
