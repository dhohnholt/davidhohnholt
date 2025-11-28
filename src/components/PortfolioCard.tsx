// /home/project/src/components/PortfolioCard.tsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PortfolioItem } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface PortfolioCardProps {
  project: PortfolioItem;
  onEdit?: (project: PortfolioItem) => void;
  onDelete?: (id: string) => void;
}

export default function PortfolioCard({ project, onEdit, onDelete }: PortfolioCardProps) {
  const { isAdmin, authLoading, user } = useAuth();
  const navigate = useNavigate();

  console.log('🔍 PortfolioCard Auth State:', {
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
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
        <div className="relative overflow-hidden">
          <LazyLoadImage
            src={project.thumbnail_url}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder={<div className="w-full h-48 bg-gray-200 animate-pulse" />}
          />
          <div className="absolute inset-0 bg-[#014040] bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  console.log(`➡️ Navigating to project detail: ${project.id}`);
                  navigate(`/portfolio/${project.id}`);
                }}
              >
                View
              </Button>
              {isAdmin && onEdit && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    console.log(`✏️ Editing project: ${project.title}`);
                    onEdit(project);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              {isAdmin && onDelete && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    console.log(`🗑️ Deleting project: ${project.id}`);
                    onDelete(project.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-white text-[#014040] px-3 py-1 rounded-full text-sm font-medium">
              {project.category}
            </span>
          </div>
        </div>

        <CardContent className="p-6 flex flex-col flex-1 overflow-hidden">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {project.title}
          </h3>
          <div className="flex-1 overflow-y-auto text-gray-600 leading-relaxed">
            {project.description}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}