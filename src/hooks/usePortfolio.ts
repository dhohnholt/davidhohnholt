// src/hooks/usePortfolio.ts
import { useCallback, useEffect, useState } from "react";
import {
  supabase,
  type PortfolioInput,
  type PortfolioItem,
} from "@/lib/supabase";

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // FETCH ALL ITEMS
  // ---------------------------------------------------------------------------
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("portfolio_items") // ✅ CORRECT TABLE NAME
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Portfolio Load Error:", error.message);
      setError(error.message);
      setItems([]);
    } else {
      setItems(data as PortfolioItem[]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ---------------------------------------------------------------------------
  // ADD NEW ITEM
  // ---------------------------------------------------------------------------
  const addItem = useCallback(async (payload: PortfolioInput) => {
    const insertPayload = {
      title: payload.title,
      description: payload.description,
      category: payload.category,
      media_url: payload.media_url,
      thumbnail_url: payload.thumbnail_url,
      embed_code: payload.embed_code ?? null,
      gallery_embed_url: payload.gallery_embed_url ?? null,
      position: payload.position ?? 0,
      ...(payload.featured_images && payload.featured_images.length
        ? { featured_images: payload.featured_images }
        : {}),
    };

    const { data, error } = await supabase
      .from("portfolio_items")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("❌ Add Portfolio Error:", error.message);
      return { error };
    }

    if (data) setItems((prev) => [data as PortfolioItem, ...prev]);

    return { error: null };
  }, []);

  // ---------------------------------------------------------------------------
  // UPDATE ITEM
  // ---------------------------------------------------------------------------
  const updateItem = useCallback(
    async (id: string, payload: PortfolioInput) => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .update({
          title: payload.title,
          description: payload.description,
          category: payload.category,
          media_url: payload.media_url,
          thumbnail_url: payload.thumbnail_url,
          embed_code: payload.embed_code ?? null,
          gallery_embed_url: payload.gallery_embed_url ?? null,
          position: payload.position ?? 0,
          ...(payload.featured_images && payload.featured_images.length
            ? { featured_images: payload.featured_images }
            : {}),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("❌ Update Portfolio Error:", error.message);
        return { error };
      }

      if (data) {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? (data as PortfolioItem) : item))
        );
      }

      return { error: null };
    },
    []
  );

  // ---------------------------------------------------------------------------
  // DELETE ITEM
  // ---------------------------------------------------------------------------
  const deleteItem = useCallback(async (id: string) => {
    const { error } = await supabase
      .from("portfolio_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("❌ Delete Portfolio Error:", error.message);
      return { error };
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
    return { error: null };
  }, []);

  // ---------------------------------------------------------------------------
  // FETCH BY ID
  // ---------------------------------------------------------------------------
  const fetchItemById = useCallback(
    async (id: string): Promise<PortfolioItem | null> => {
      const cached = items.find((i) => i.id === id);
      if (cached) return cached;

      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("❌ Fetch Portfolio by ID Error:", error.message);
        return null;
      }

      return data as PortfolioItem;
    },
    [items]
  );

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    fetchItemById,
    refetch: fetchItems,
  };
}
