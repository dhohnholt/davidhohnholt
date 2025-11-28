// src/components/PortfolioCard.tsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PortfolioItem } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface PortfolioCardProps {
  project: PortfolioItem;
  onEdit?: (project: PortfolioItem) => void;
  onDelete?: (id: string) => void;
}

/**
 * Card used on Portfolio page + Admin dashboard grid.
 * - Dark overlay hover
 * - "View" button goes to /portfolio/:id
 */
export default function PortfolioCard({
  project,
  onEdit,
  onDelete,
}: PortfolioCardProps) {
  const { isAdmin, authLoading, user } = useAuth();
  const navigate = useNavigate();

  console.log("🔍 PortfolioCard Auth State:", {
    user: user?.email,
    isAdmin,
    authLoading,
    project: project.title,
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-h-[30rem] flex flex-col"
    >
      <Card className="group overflow-hidden border border-white/5 bg-black/60 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
        <div className="relative overflow-hidden">
          <LazyLoadImage
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            placeholder={
              <div className="w-full h-56 bg-gray-800 animate-pulse" />
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/portfolio/${project.id}`)}
              >
                View
              </Button>
              {isAdmin && onEdit && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEdit(project)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {isAdmin && onDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-black/80 text-amber-300 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase">
              {project.category}
            </span>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col flex-1 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-2">
            {project.title}
          </h3>
          <div className="flex-1 overflow-y-auto text-sm text-gray-300 leading-relaxed">
            {project.description}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
