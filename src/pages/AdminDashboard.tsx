import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Plus, LogOut, Grid, List, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext'; // ✅ UPDATED to global context
import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioItem } from '@/lib/supabase';
import PortfolioCard from '@/components/PortfolioCard';
import PortfolioForm from '@/components/PortfolioForm';
import Breadcrumb from '@/components/ui/breadcrumb';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, profile, isAdmin, signOut, authLoading } = useAuth();
  const { items, loading, addItem, updateItem, deleteItem } = usePortfolio();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  console.log("🔍 AdminDashboard Auth State:", {
    user: user?.email,
    role: profile?.role,
    isAdmin,
    authLoading,
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      console.warn("⚠️ Non-admin detected -> redirecting to home");
      navigate('/'); // Redirect non-admins to home
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSignOut = async () => {
    console.log("🚪 Signing out...");
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleAddItem = async (data: any) => {
    console.log("➕ Adding new item:", data.title);
    setIsSubmitting(true);
    const { error } = await addItem(data);
    if (!error) {
      toast.success("Item added successfully");
      setIsFormOpen(false);
    } else {
      toast.error("Failed to add item");
    }
    setIsSubmitting(false);
  };

  const handleUpdateItem = async (data: any) => {
    if (!editingItem) return;
    console.log("✏️ Updating item:", editingItem.id, data.title);
    setIsSubmitting(true);
    const { error } = await updateItem(editingItem.id, data);
    if (!error) {
      toast.success("Item updated successfully");
      setEditingItem(null);
    } else {
      toast.error("Failed to update item");
    }
    setIsSubmitting(false);
  };

  const handleDeleteItem = async () => {
    if (!deletingId) return;
    console.log("🗑️ Deleting item:", deletingId);
    await deleteItem(deletingId);
    toast.success("Item deleted");
    setDeletingId(null);
  };

  const openEditForm = (item: PortfolioItem) => {
    console.log("✏️ Opening edit form for:", item.title);
    setEditingItem(item);
  };

  const closeForm = () => {
    console.log("❌ Closing form");
    setIsFormOpen(false);
    setEditingItem(null);
  };

  if (authLoading || loading || !user) {
    console.log("⏳ Loading dashboard...");
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#014040] mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - David Hohnholt</title>
        <meta
          name="description"
          content="Portfolio management dashboard for David Hohnholt."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* ✅ Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumb
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Admin Dashboard' },
            ]}
          />
        </div>

        {/* Header */}
        <header className="bg-white shadow-sm border-b mt-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Portfolio Dashboard
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm text-gray-600">
                    Welcome back, {profile?.full_name || user?.email}
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-[#014040] text-white"
                  >
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={
                      viewMode === 'grid'
                        ? 'bg-[#014040] hover:bg-[#012020]'
                        : ''
                    }
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={
                      viewMode === 'list'
                        ? 'bg-[#014040] hover:bg-[#012020]'
                        : ''
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-[#014040] hover:bg-[#012020] text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-[#014040]">
                  {items.length}
                </div>
                <p className="text-gray-600">Total Items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-[#014040]">
                  {items.filter((item) => item.category === 'Video').length}
                </div>
                <p className="text-gray-600">Videos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-[#014040]">
                  {items.filter((item) => item.category === 'Photography').length}
                </div>
                <p className="text-gray-600">Photos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-[#014040]">
                  {items.filter((item) => item.category === 'Web App').length}
                </div>
                <p className="text-gray-600">Web Apps</p>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Items */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Items</CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No portfolio items yet</p>
                  <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-[#014040] hover:bg-[#012020] text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Item
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <PortfolioCard
                        project={item}
                        onEdit={openEditForm}
                        onDelete={setDeletingId}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        {/* Add/Edit Form Dialog */}
        <Dialog open={isFormOpen || !!editingItem} onOpenChange={closeForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
              </DialogTitle>
            </DialogHeader>
            <PortfolioForm
              item={editingItem || undefined}
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={closeForm}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deletingId}
          onOpenChange={() => setDeletingId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                portfolio item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteItem}
                className="bg-red-600 hover:bg-red-700"
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