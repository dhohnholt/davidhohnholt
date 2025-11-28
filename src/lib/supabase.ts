import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = "admin" | "viewer";

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
};

export type Booking = {
  id: string;
  created_at: string;

  client_name: string;
  client_email: string;
  client_phone: string;

  event_type: string;
  session_title: string;
  event_date: string; // ISO date from Supabase
  event_time: string;
  location: string | null;

  hours_booked: number;
  base_rate: number;
  total_amount: number;
  amount_paid: number;
  payment_status: "pending" | "partial" | "paid";

  slug: string | null;
  preview_gallery_url: string | null;
  download_gallery_url: string | null;

  notes: string | null;
};
export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: "Video" | "Photography" | "Web App" | "Marketing";
  media_url: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
};
