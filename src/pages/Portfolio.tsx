// src/pages/Portfolio.tsx (Cinematic Dark Version)
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioCard from "@/components/PortfolioCard";
import { useAuth } from "@/contexts/AuthContext";
import PortfolioForm from "@/components/PortfolioForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Breadcrumb from "@/components/ui/breadcrumb";
import type { PortfolioItem } from "@/lib/supabase";
import type { PortfolioFormData } from "@/components/PortfolioForm";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items, loading, deleteItem, updateItem, addItem, refetch } =
    usePortfolio();
  const { isAdmin } = useAuth();

  const categories = ["All", "Photography", "Video", "Marketing", "Web App"];

  const filteredProjects =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const handleSave = async (data: PortfolioFormData) => {
    const result = editingProject
      ? await updateItem(editingProject.id, data)
      : await addItem(data);

    if (!result?.error) {
      setIsModalOpen(false);
      setEditingProject(null);
      refetch();
    }
  };

  return (
    <>
      <Helmet>
        <title>Portfolio – David Hohnholt</title>
      </Helmet>

      <div className="pt-24 bg-black min-h-screen text-white">
        {/* Breadcrumb (Gold on dark) */}
        <div className="max-w-7xl mx-auto px-6 mb-6 opacity-80">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "Portfolio", href: "/portfolio" },
            ]}
            textColor="text-amber-400"
          />
        </div>

        {/* HERO — cinematic with background image */}
        <section className="relative h-[70vh] w-full overflow-hidden bg-black">
          {/* BACKGROUND IMAGE */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage:
                "url('https://lightroom.adobe.com/v2c/spaces/e110740675b5431489d323fc9dc4f77e/assets/837ea1c45ee34aa594c75bd0d27271a1/revisions/f29a1465f2646179aeb25b16a9857143/renditions/ebe5cdddd4de586a5ab87dbf33070f3a')",
            }}
          />

          {/* DARKENING GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

          {/* TEXT CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-light tracking-tight text-amber-400 mb-6 drop-shadow-[0_0_25px_rgba(255,200,0,0.3)]"
            >
              Portfolio
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-stone-300 max-w-3xl mx-auto text-lg leading-relaxed"
            >
              A curated showcase of portraits, sports banners, digital media,
              and creative storytelling — crafted with care and cinematic
              intention.
            </motion.p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="py-10 bg-black/80 backdrop-blur-xl border-t border-white/10 border-b">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full border text-sm transition ${
                    activeFilter === category
                      ? "bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20"
                      : "border-white/20 text-stone-300 hover:border-amber-400 hover:text-amber-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Admin Add */}
            {isAdmin && (
              <Button
                onClick={() => {
                  setEditingProject(null);
                  setIsModalOpen(true);
                }}
                className="bg-amber-500 text-black hover:bg-amber-400 rounded-full shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            )}
          </div>
        </section>

        {/* PROJECT GRID */}
        <section className="py-24 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="flex justify-center py-32">
                <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                  >
                    {filteredProjects.map((project) => (
                      <PortfolioCard
                        key={project.id}
                        project={project}
                        onEdit={
                          isAdmin
                            ? (p) => {
                                setEditingProject(p);
                                setIsModalOpen(true);
                              }
                            : undefined
                        }
                        onDelete={
                          isAdmin
                            ? async (id) => {
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
                  <div className="text-center text-stone-400 text-lg py-24">
                    No projects available in this category.
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      {/* ADMIN MODAL */}
      {isAdmin && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg h-[80vh] bg-black/90 border border-amber-400/20 text-white backdrop-blur-xl shadow-2xl shadow-amber-500/10">
            <DialogHeader>
              <DialogTitle className="text-amber-400">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription className="text-stone-400">
                {editingProject
                  ? "Update this portfolio entry."
                  : "Create a new project showcase."}
              </DialogDescription>
            </DialogHeader>

            <div className="overflow-y-auto flex-1 mt-4">
              <PortfolioForm
                item={editingProject ?? undefined}
                onSubmit={handleSave}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
