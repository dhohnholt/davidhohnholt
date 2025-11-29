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
import type { PortfolioItem } from "@/lib/supabase";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchItemById } = usePortfolio();

  const [project, setProject] = useState<PortfolioItem | null>(null);
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
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-stone-400">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md text-center space-y-4">
          <p className="text-stone-300 mb-2">Project not found.</p>
          <Button
            onClick={() => navigate("/portfolio")}
            className="bg-amber-500 text-black hover:bg-amber-600"
          >
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const featured = project.featured_images;

  return (
    <>
      <Helmet>
        <title>{project.title} – David Hohnholt</title>
        <meta
          name="description"
          content={project.description || "Project details"}
        />
      </Helmet>

      <div className="min-h-screen bg-black text-white pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 space-y-8">
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
            className="bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-md"
          >
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              {project.title}
            </h1>

            {/* Gallery / Carousel */}
            {featured && featured.length > 0 ? (
              <Carousel
                opts={{ align: "center", containScroll: "trimSnaps" }}
                className="relative mb-6"
              >
                <CarouselContent>
                  {featured.map((url) => (
                    <CarouselItem
                      key={url}
                      className="flex items-center justify-center"
                    >
                      <LazyLoadImage
                        src={url}
                        alt={project.title}
                        className="w-auto max-w-full max-h-[26rem] object-contain object-center rounded-lg"
                        placeholder={
                          <div className="w-full h-80 bg-gray-800 animate-pulse rounded-lg" />
                        }
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white bg-black/60 border-white/20" />
                <CarouselNext className="text-white bg-black/60 border-white/20" />
              </Carousel>
            ) : project.thumbnail_url ? (
              <LazyLoadImage
                src={project.thumbnail_url}
                alt={project.title}
                className="rounded-lg mb-6 w-full object-contain object-center max-h-[26rem]"
                placeholder={
                  <div className="w-full h-80 bg-gray-800 animate-pulse rounded-lg" />
                }
              />
            ) : null}

            <p className="text-stone-200 leading-relaxed mb-6">
              {project.description}
            </p>

            {project.media_url && (
              <a
                href={project.media_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-lg font-semibold transition-colors"
              >
                Open Gallery / Project
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
