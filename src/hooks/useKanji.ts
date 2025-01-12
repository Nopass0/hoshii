import { create } from "zustand";
import { z } from "zod";
import { fetchApi } from "@/lib/apiBase";
import { useAdmin } from "./useAdmin";

// Kanji schemas
const KanjiSchema = z.object({
  id: z.number(),
  kanji: z.string(),
  meaning: z.array(z.string()),
  readingOn: z.array(z.string()),
  readingKun: z.array(z.string()),
  strokeCount: z.number(),
  jlptLevel: z.number().optional(),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      color: z.string(),
    }),
  ),
});

export type Kanji = z.infer<typeof KanjiSchema>;

interface KanjiState {
  items: Kanji[];
  isLoading: boolean;
  error: string | null;

  // CRUD operations
  fetchAll: (params?: Record<string, string>) => Promise<void>;
  fetchOne: (id: number) => Promise<Kanji>;
  create: (data: Omit<Kanji, "id">) => Promise<Kanji>;
  update: (id: number, data: Partial<Kanji>) => Promise<Kanji>;
  delete: (id: number) => Promise<void>;
}

export const useKanji = create<KanjiState>()((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchAll: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchApi("/kanji", {
        method: "GET",
      });

      const items = z.array(KanjiSchema).parse(response.data);
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
      const response = await fetchApi(`/kanji/${id}`);
      const kanji = KanjiSchema.parse(response);
      set({ isLoading: false });
      return kanji;
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
      const response = await fetchApi("/kanji", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const kanji = KanjiSchema.parse(response);
      set((state) => ({
        items: [...state.items, kanji],
        isLoading: false,
      }));
      return kanji;
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
      const response = await fetchApi(`/kanji/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });

      const kanji = KanjiSchema.parse(response);
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? kanji : item)),
        isLoading: false,
      }));
      return kanji;
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
      await fetchApi(`/kanji/${id}`, {
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
