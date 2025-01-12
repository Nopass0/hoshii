import { create } from "zustand";
import { z } from "zod";
import { fetchApi } from "@/lib/apiBase";
import { useAdmin } from "./useAdmin";

// Word schemas
const WordSchema = z.object({
  id: z.number(),
  word: z.string(),
  reading: z.string(),
  meaning: z.array(z.string()),
  partOfSpeech: z.array(z.string()),
  level: z.number().optional(),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
    }),
  ),
  examples: z.array(
    z.object({
      id: z.number(),
      sentence: z.string(),
      translation: z.string(),
    }),
  ),
});

export type Word = z.infer<typeof WordSchema>;

interface WordState {
  items: Word[];
  isLoading: boolean;
  error: string | null;

  // CRUD operations
  fetchAll: (params?: Record<string, string>) => Promise<void>;
  fetchOne: (id: number) => Promise<Word>;
  create: (data: Omit<Word, "id">) => Promise<Word>;
  update: (id: number, data: Partial<Word>) => Promise<Word>;
  delete: (id: number) => Promise<void>;
}

export const useWords = create<WordState>()((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchAll: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchApi("/words", {
        method: "GET",
      });

      const items = z.array(WordSchema).parse(response.data);
      set({ items, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchOne: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchApi(`/words/${id}`);
      const word = WordSchema.parse(response);
      set({ isLoading: false });
      return word;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },

  create: async (data) => {
    useAdmin.getState().requireAdmin();
    set({ isLoading: true, error: null });
    try {
      const response = await fetchApi("/words", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const word = WordSchema.parse(response);
      set((state) => ({
        items: [...state.items, word],
        isLoading: false,
      }));
      return word;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },

  update: async (id, data) => {
    useAdmin.getState().requireAdmin();
    set({ isLoading: true, error: null });
    try {
      const response = await fetchApi(`/words/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const word = WordSchema.parse(response);
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? word : item)),
        isLoading: false,
      }));
      return word;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },

  delete: async (id) => {
    useAdmin.getState().requireAdmin();
    set({ isLoading: true, error: null });
    try {
      await fetchApi(`/words/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
      throw error;
    }
  },
}));
