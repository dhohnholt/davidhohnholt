import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { usePortfolio } from '@/hooks/usePortfolio';
import PortfolioCard from '@/components/PortfolioCard';
import { useAuth } from '@/contexts/AuthContext';
import PortfolioForm from '@/components/PortfolioForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Breadcrumb from '@/components/ui/breadcrumb';

export default function Portfolio() {
  console.log('✅ Portfolio component mounted');

  const [activeFilter, setActiveFilter] = useState('All');
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items, loading, deleteItem, updateItem, addItem, refetch } = usePortfolio();
  const { isAdmin, authLoading, user } = useAuth();

  console.log('🔍 Auth state in Portfolio:', {
    isAdmin,
    authLoading,
    user: user?.email,
  });

  const categories = ['All', 'Web App', 'Photography', 'Marketing', 'Video'];

  const filteredProjects =
    activeFilter === 'All'
      ? items
      : items.filter((item) => item.category === activeFilter);

  const handleSave = async (data: any) => {
    console.log(
      editingProject ? '🔄 Updating project...' : '➕ Adding project...',
      data
    );

    try {
      const result = editingProject
        ? await updateItem(editingProject.id, data)
        : await addItem(data);

      console.log('✅ [handleSave] Operation finished with:', result);

      if (result && !result.error) {
        console.log('✅ [handleSave] Closing modal...');
        setIsModalOpen(false);
        setEditingProject(null);
        await refetch();
      } else {
        console.warn(
          '⚠️ [handleSave] Modal not closing, error:',
          result?.error
        );
      }
    } catch (err) {
      console.error('❌ [handleSave] Unexpected error:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio - David Hohnholt</title>
        <meta
          name="description"
          content="Explore David Hohnholt's portfolio of digital projects, photography, web applications, and marketing campaigns."
        />
      </Helmet>

      <div className="pt-16">
        {/* ✅ Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio'}]} />
        </div>

        {/* ✅ Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white to-[#f8f8f5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                My Portfolio
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A showcase of creative projects, digital solutions, and
                successful campaigns that demonstrate my passion for excellence
                and innovation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ✅ Filter + Admin Add Button */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(category)}
                  className={`${
                    activeFilter === category
                      ? 'bg-[#014040] hover:bg-[#012020] text-white'
                      : 'border-[#014040] text-[#014040] hover:bg-[#014040] hover:text-white'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {isAdmin && (
              <Button
                size="sm"
                className="bg-[#014040] hover:bg-[#012020] text-white"
                onClick={() => {
                  console.log('➕ Opening modal for new project...');
                  setEditingProject(null);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            )}
          </div>
        </section>

        {/* ✅ Projects Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-[#014040]" />
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {filteredProjects.map((project) => (
                      <PortfolioCard
                        key={project.id}
                        project={project}
                        onEdit={
                          isAdmin
                            ? (p) => {
                                console.log(`✏️ Editing project: ${p.title}`);
                                setEditingProject(p);
                                setIsModalOpen(true);
                              }
                            : undefined
                        }
                        onDelete={
                          isAdmin
                            ? async (id) => {
                                console.log(`🗑️ Deleting project: ${id}`);
                                await deleteItem(id);
                                refetch();
                              }
                            : undefined
                        }
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <p className="text-gray-500 text-lg">No projects found in this category.</p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {/* ✅ Admin Add/Edit Modal */}
      {isAdmin && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg h-[80vh] p-6 flex flex-col">  
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
              <DialogDescription>
                {editingProject
                  ? 'Update the details of this project.'
                  : 'Fill in the details to add a new project to your portfolio.'}
              </DialogDescription>
            </DialogHeader>

            {/* Scrollable form container */}
            <div className="overflow-y-auto flex-1 mt-4">
              <PortfolioForm
                item={editingProject}
                onSubmit={handleSave}
                onCancel={() => {
                  console.log('❌ Cancel button clicked');
                  setIsModalOpen(false);
                }}
                isSubmitting={false}
              />
            </div>

          </DialogContent>
        </Dialog>
      )}
    </>
  );
}