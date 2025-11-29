// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

export type UserRole = "admin" | "viewer" | "editor" | "guest" | "client";

export interface Profile {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
  role?: UserRole | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export type PortfolioCategory =
  | "Video"
  | "Photography"
  | "Web App"
  | "Marketing";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  media_url: string | null;
  thumbnail_url: string;
  embed_code?: string | null;
  gallery_embed_url?: string | null;
  featured_images?: string[];
  position: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioInput {
  title: string;
  description: string;
  category: PortfolioCategory;
  media_url: string | null;
  thumbnail_url: string;
  embed_code?: string | null;
  gallery_embed_url?: string | null;
  featured_images?: string[];
  position?: number;
}

export interface Booking {
  id: string;
  created_at: string | null;
  client_name: string;
  client_email: string;
  client_phone: string;
  event_type: string;
  session_title: string;
  event_date: string;
  event_time: string;
  location: string | null;
  hours_booked: number;
  base_rate: number;
  total_amount: number | null;
  amount_paid: number;
  payment_status: string;
  slug: string | null;
  preview_gallery_url: string | null;
  download_gallery_url: string | null;
  notes: string | null;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage, // ⬅ REQUIRED FOR React
  },
});
