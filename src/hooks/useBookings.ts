import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { supabase, type Booking } from "@/lib/supabase";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const hasFetched = useRef(false);

  // -----------------------------------------------------
  // Fetch all bookings
  // -----------------------------------------------------
  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("event_date", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (err: unknown) {
      console.error("❌ fetchBookings error:", err);
      toast.error("Failed to load bookings.");
    } finally {
      setBookingsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    if (!hasFetched.current) {
      fetchBookings();
      hasFetched.current = true;
    }
  }, []);

  // -----------------------------------------------------
  // Update a booking field (payment, galleries, etc.)
  // -----------------------------------------------------
  const updateBooking = async (id: string, fields: Partial<Booking>) => {
    setSaving(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .update(fields)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...data } : b))
      );
      toast.success("Booking updated");
    } catch (err: unknown) {
      console.error("❌ updateBooking error:", err);
      toast.error("Failed to update booking.");
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------------------
  // Delete a booking
  // -----------------------------------------------------
  const deleteBooking = async (id: string) => {
    setSaving(true);

    try {
      const { error } = await supabase.from("bookings").delete().eq("id", id);

      if (error) throw error;

      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    } catch (err: unknown) {
      console.error("❌ deleteBooking error:", err);
      toast.error("Failed to delete booking.");
    } finally {
      setSaving(false);
    }
  };

  // -----------------------------------------------------
  // Manual refetch (used in Admin Dashboard)
  // -----------------------------------------------------
  const refetch = async () => {
    await fetchBookings();
  };

  return {
    bookings,
    bookingsLoading,
    saving,
    updateBooking,
    deleteBooking,
    refetch,
  };
}
