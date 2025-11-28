import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Plus,
  LogOut,
  Grid,
  List,
  Shield,
  RefreshCcw,
  Trash,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/breadcrumb";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioForm from "@/components/PortfolioForm";
import { useAuth } from "@/contexts/AuthContext";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useBookings } from "@/hooks/useBookings";
import { PortfolioItem } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, profile, isAdmin, signOut, authLoading } = useAuth();
  const { items, loading, addItem, updateItem, deleteItem, refetch } =
    usePortfolio();
  const {
    bookings,
    bookingsLoading,
    saving,
    updateBooking,
    deleteBooking,
    refetch: refetchBookings,
  } = useBookings();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  /* Redirect non-admins */
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/");
  }, [authLoading, user, isAdmin, navigate]);

  /* Logout */
  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  /* Add item */
  const handleAddItem = async (data: any) => {
    setIsSubmitting(true);
    const { error } = await addItem(data);

    if (!error) {
      toast.success("Portfolio item added");
      setIsFormOpen(false);
    } else {
      toast.error("Failed to add item");
    }
    setIsSubmitting(false);
  };

  /* Update item */
  const handleUpdateItem = async (data: any) => {
    if (!editingItem) return;
    setIsSubmitting(true);

    const { error } = await updateItem(editingItem.id, data);

    if (!error) {
      toast.success("Portfolio item updated");
      setEditingItem(null);
    } else {
      toast.error("Failed to update item");
    }

    setIsSubmitting(false);
  };

  /* Delete item */
  const handleDeleteItem = async () => {
    if (!deletingId) return;
    await deleteItem(deletingId);
    toast.success("Deleted");
    setDeletingId(null);
  };

  /* UI Skeleton */
  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center text-amber-400">
          <div className="h-10 w-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-sm opacity-75">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard – David Hohnholt</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* OUTER CINEMATIC WRAPPER */}
      <div className="min-h-screen bg-black text-white pb-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-10 opacity-70">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Admin Dashboard" },
            ]}
          />
        </div>

        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-md border-b border-white/10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-amber-400">
                Admin Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                Welcome, {profile?.full_name || user.email}
                <Badge className="bg-amber-500/20 text-amber-400 border border-amber-400/40">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>

              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-gray-400 hover:text-red-400 hover:bg-red-400/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-6 pt-12 space-y-16">
          {/* BOOKINGS PANEL */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl border border-white/10 shadow-xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-400">Bookings</h2>
              <button
                onClick={refetchBookings}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-amber-300"
              >
                <RefreshCcw className="h-4 w-4" /> Refresh
              </button>
            </div>

            {bookingsLoading ? (
              <p className="text-gray-400">Loading bookings…</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-400">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-black/40 border border-white/10 rounded-lg">
                  <thead className="bg-white/5 text-gray-300">
                    <tr>
                      <th className="px-3 py-2">Date</th>
                      <th className="px-3 py-2">Client</th>
                      <th className="px-3 py-2">Event</th>
                      <th className="px-3 py-2">Total</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Gallery</th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b) => (
                      <tr
                        key={b.id}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        {/* Date */}
                        <td className="px-3 py-2">
                          {new Date(b.event_date).toLocaleDateString()}
                        </td>

                        {/* Client */}
                        <td className="px-3 py-2">
                          <div className="font-semibold">{b.client_name}</div>
                          <div className="text-xs text-gray-400">
                            {b.client_email}
                          </div>
                        </td>

                        {/* Event */}
                        <td className="px-3 py-2">
                          <div>{b.session_title}</div>
                          <div className="text-xs text-gray-400">
                            {b.event_type}
                          </div>
                        </td>

                        {/* Total */}
                        <td className="px-3 py-2 text-amber-400 font-bold">
                          $
                          {(
                            b.total_amount ?? b.base_rate * b.hours_booked
                          ).toFixed(2)}
                        </td>

                        {/* Status */}
                        <td className="px-3 py-2">
                          <select
                            className="bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs"
                            value={b.payment_status}
                            onChange={(e) =>
                              updateBooking(b.id, {
                                payment_status: e.target.value,
                              })
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="partial">Partial</option>
                            <option value="paid">Paid</option>
                          </select>
                        </td>

                        {/* GALLERY URLs */}
                        <td className="px-3 py-2 w-56 space-y-1">
                          <input
                            type="text"
                            defaultValue={b.preview_gallery_url ?? ""}
                            placeholder="Preview gallery URL"
                            className="w-full bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs"
                            onBlur={(e) =>
                              updateBooking(b.id, {
                                preview_gallery_url: e.target.value || null,
                              })
                            }
                          />
                          <input
                            type="text"
                            defaultValue={b.download_gallery_url ?? ""}
                            placeholder="Download URL"
                            className="w-full bg-black/40 border border-white/10 rounded-md px-2 py-1 text-xs"
                            onBlur={(e) =>
                              updateBooking(b.id, {
                                download_gallery_url: e.target.value || null,
                              })
                            }
                          />
                        </td>

                        {/* Delete */}
                        <td className="px-3 py-2 text-right">
                          <button
                            onClick={() => deleteBooking(b.id)}
                            disabled={saving}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            <Trash className="h-4 w-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.section>

          {/* PORTFOLIO GRID */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl shadow-xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-amber-400">
                Portfolio Items
              </h2>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-amber-400 text-black hover:bg-amber-300"
                      : "border-amber-400 text-amber-400"
                  }
                >
                  <Grid className="h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-amber-400 text-black hover:bg-amber-300"
                      : "border-amber-400 text-amber-400"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* GRID OR LIST */}
            {items.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No portfolio items yet.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <PortfolioCard
                    key={item.id}
                    project={item}
                    onEdit={setEditingItem}
                    onDelete={setDeletingId}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-black/40 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-amber-400 hover:text-amber-300"
                          onClick={() => setEditingItem(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => setDeletingId(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        </main>

        {/* ADD / EDIT FORM */}
        <Dialog
          open={isFormOpen || !!editingItem}
          onOpenChange={() => {
            setIsFormOpen(false);
            setEditingItem(null);
          }}
        >
          <DialogContent className="max-w-xl bg-black/80 border border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-400 text-xl">
                {editingItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}
              </DialogTitle>
            </DialogHeader>

            <PortfolioForm
              item={editingItem || undefined}
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingItem(null);
              }}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>

        {/* DELETE CONFIRMATION */}
        <AlertDialog
          open={!!deletingId}
          onOpenChange={() => setDeletingId(null)}
        >
          <AlertDialogContent className="bg-black/90 border border-white/10 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-amber-400">
                Delete Item?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 hover:bg-white/20 text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteItem}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
