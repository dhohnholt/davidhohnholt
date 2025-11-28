import { useState, useEffect, useRef } from 'react';
import { supabase, PortfolioItem } from '@/lib/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export type PortfolioItemWithImages = PortfolioItem & {
  featured_images: string[];
};

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItemWithImages[]>([]);
  const [loading, setLoading] = useState(true); 
  const hasFetched = useRef(false);
  const { isAdmin } = useAuth();

  console.log('🔄 usePortfolio initialized'); 

  // Fetch all projects + images
  const fetchItems = async () => {
    console.log('📥 fetchItems: loading...');
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select(`*, portfolio_item_images(image_url)`) // join images
        .order('position', { ascending: true });
      if (error) throw error;
      const mapped = (data || []).map((d: any) => ({
        ...d,
        featured_images: (d.portfolio_item_images || []).map((i: any) => i.image_url),
      }));
      console.log(`✅ fetchItems: ${mapped.length} items`);
      setItems(mapped);
    } catch (err: any) {
      console.error('❌ fetchItems error:', err.message || err);
      toast.error('Failed to load portfolio items');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      console.log('🚀 Initial fetchItems');
      fetchItems();
      hasFetched.current = true;
    }
  }, []);

  // Fetch one project by ID + images
  const fetchItemById = async (id: string): Promise<PortfolioItemWithImages | null> => {
    console.log(`🔍 fetchItemById: ${id}`);
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select(`*, portfolio_item_images(image_url)`)
        .eq('id', id)
        .single();
      if (error) throw error;
      const item: PortfolioItemWithImages = {
        ...data,
        featured_images: (data.portfolio_item_images || []).map((i: any) => i.image_url),
      };
      console.log('✅ fetchItemById:', item.title);
      return item;
    } catch (err: any) {
      console.error('❌ fetchItemById error:', err.message || err);
      return null;
    }
  };

  // Add project + its images
  const addItem = async (newItem: Partial<PortfolioItemWithImages>) => {
    console.log('➕ addItem:', newItem.title);
    const { featured_images, ...itemFields } = newItem;
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .insert([itemFields])
        .select()
        .single();
      if (error) throw error;
      console.log('✅ addItem row:', data.id);
      toast.success('Project added');
      // Insert images
      if (featured_images?.length) {
        console.log(`➕ addItem: ${featured_images.length} images`);
        const inserts = featured_images.map((url, idx) => ({
          portfolio_id: data.id,
          image_url: url,
          position: idx,
        }));
        const { error: imgErr } = await supabase
          .from('portfolio_item_images')
          .insert(inserts);
        if (imgErr) {
          console.error('❌ addItem images error:', imgErr.message);
          toast.error('Failed to add images');
        }
      }
      setItems(prev => [{ ...(data as any), featured_images: featured_images || [] }, ...prev]);
      return { error: null, data };
    } catch (err: any) {
      console.error('❌ addItem error:', err.message || err);
      toast.error('Failed to add project');
      return { error: err, data: null };
    }
  };

  // Update project + replace images
  const updateItem = async (
    id: string,
    fields: Partial<PortfolioItemWithImages>
  ) => {
    console.log('✏️ updateItem:', id, fields.title);
    const { featured_images, ...itemFields } = fields as any;
    try {
      console.log('🔄 updateItem fields:', itemFields);
      const { data, error } = await supabase
        .from('portfolio_items')
        .update(itemFields)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      console.log('✅ updateItem row updated');
      // Replace images
      if (featured_images) {
        console.log('🗑️ Deleting old images');
        await supabase.from('portfolio_item_images').delete().eq('portfolio_id', id);
        console.log(`➕ Inserting ${featured_images.length} images`);
        const inserts = featured_images.map((url, idx) => ({
          portfolio_id: id,
          image_url: url,
          position: idx,
        }));
        const { error: imgErr } = await supabase
          .from('portfolio_item_images')
          .insert(inserts);
        if (imgErr) {
          console.error('❌ updateItem images error:', imgErr.message);
          toast.error('Failed to update images');
        }
      }
      toast.success('Project updated');
      setItems(prev =>
        prev.map(i =>
          i.id === id
            ? { ...i, ...data, featured_images: featured_images ?? i.featured_images }
            : i
        )
      );
      return { error: null, data };
    } catch (err: any) {
      console.error('❌ updateItem error:', err.message || err);
      toast.error('Failed to update project');
      return { error: err, data: null };
    }
  };

  // Delete project + images
  const deleteItem = async (id: string) => {
    console.log('🗑️ deleteItem:', id);
    try {
      console.log('🗑️ deleteItem: removing images');
      await supabase.from('portfolio_item_images').delete().eq('portfolio_id', id);
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      console.log('✅ deleteItem done');
      toast.success('Project deleted');
      setItems(prev => prev.filter(i => i.id !== id));
      return { error: null };
    } catch (err: any) {
      console.error('❌ deleteItem error:', err.message || err);
      toast.error('Failed to delete project');
      return { error: err };
    }
  };

  const refetch = async () => {
    console.log('🔄 refetch'); 
    await fetchItems();
  };

  console.log(
    `📊 state: items=${items.length}, loading=${loading}, isAdmin=${isAdmin}`
  );

  return {
    items,
    loading,
    isAdmin,
    fetchItemById,
    addItem,
    updateItem,
    deleteItem,
    refetch,
  };
}