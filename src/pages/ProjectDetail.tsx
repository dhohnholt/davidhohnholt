// src/pages/ProjectDetail.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { usePortfolio } from "@/hooks/usePortfolio";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchItemById } = usePortfolio();

  const [project, setProject] = useState<
    (ReturnType<typeof fetchItemById> extends Promise<infer U> ? U : any) | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchItemById(id)
      .then((p) => setProject(p))
      .catch((err) => console.error("❌ Error fetching project:", err))
      .finally(() => setLoading(false));
  }, [id, fetchItemById]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading project details...</p>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <p className="text-gray-600 mb-4">Project not found.</p>
        <Button
          onClick={() => navigate("/portfolio")}
          className="bg-[#014040] text-white px-4 py-2 rounded hover:bg-[#012020]"
        >
          Back to Portfolio
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - David Hohnholt</title>
        <meta
          name="description"
          content={project.description || "Project details"}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto py-16 px-4 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumb
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: project.title },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>

         {project.featured_images?.length ? (
  <Carousel
    opts={{ align: 'center', containScroll: 'trimSnaps' }}
    className="relative mb-6"
  >
    <CarouselContent>
      {project.featured_images.map((url) => (
        <CarouselItem key={url} className="flex items-center justify-center">
          <LazyLoadImage
            src={url}
            alt={project.title}
            className="w-auto max-w-full max-h-80 object-contain object-center rounded"
            placeholder={
              <div className="w-full h-80 bg-gray-200 animate-pulse rounded" />
            }
          />
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="text-white bg-black/50" />
    <CarouselNext className="text-white bg-black/50" />
  </Carousel>
) : (
            project.thumbnail_url && (
              <LazyLoadImage
                src={project.thumbnail_url}
                alt={project.title}
                className="rounded-lg mb-6 w-full object-contain object-center max-h-96"
                placeholder={
                  <div className="w-full h-96 bg-gray-200 animate-pulse rounded" />
                }
              />
            )
          )}

          <p className="text-gray-700 leading-relaxed mb-6">
            {project.description}
          </p>

          {project.media_url && (
            <a
              href={project.media_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#014040] hover:bg-[#012020] text-white px-4 py-2 rounded transition-colors"
            >
              Visit Project
            </a>
          )}
        </motion.div>
      </div>
    </>
  );
}