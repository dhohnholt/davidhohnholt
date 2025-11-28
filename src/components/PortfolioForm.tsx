// src/components/PortfolioForm.tsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { PortfolioItem } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["Video", "Photography", "Web App", "Marketing"]),
  media_url: z.string().url("Please enter a valid URL"),
  thumbnail_url: z.string().url("Please enter a valid thumbnail URL"),
  featured_images: z.array(z.string().url()).optional(),
});

export type PortfolioFormData = z.infer<typeof schema>;

interface PortfolioFormProps {
  item?: PortfolioItem & { featured_images?: string[] };
  onSubmit: (data: PortfolioFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function PortfolioForm({
  item,
  onSubmit,
  onCancel,
  isSubmitting,
}: PortfolioFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = useMemo(
    () =>
      item
        ? {
            title: item.title,
            description: item.description,
            category: item.category,
            media_url: item.media_url,
            thumbnail_url: item.thumbnail_url,
            featured_images: item.featured_images ?? [],
          }
        : {
            title: "",
            description: "",
            category: "Web App",
            media_url: "",
            thumbnail_url: "",
            featured_images: [],
          },
    [item]
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "featured_images",
  });

  const thumbnail_url = watch("thumbnail_url");

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      if (!item) reset();
    } finally {
      setIsLoading(false);
    }
  };

  const cancelForm = () => {
    reset();
    onCancel();
  };

  const inputClasses =
    "bg-black/40 border border-white/10 text-white placeholder-gray-400 " +
    "focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400/50";

  const labelClasses = "block text-sm font-semibold text-amber-400 mb-1";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* TITLE */}
      <div>
        <label className={labelClasses}>Title *</label>
        <Input
          {...register("title")}
          placeholder="Project title"
          disabled={isLoading}
          className={inputClasses}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className={labelClasses}>Description *</label>
        <Textarea
          {...register("description")}
          rows={3}
          placeholder="Project description"
          disabled={isLoading}
          className={inputClasses}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* CATEGORY */}
      <div>
        <label className={labelClasses}>Category *</label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) =>
                field.onChange(value as PortfolioFormData["category"])
              }
              disabled={isLoading}
            >
              <SelectTrigger className={`${inputClasses} mt-1`}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 text-white border border-white/10">
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Photography">Photography</SelectItem>
                <SelectItem value="Web App">Web App</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* MEDIA URL */}
      <div>
        <label className={labelClasses}>Media URL *</label>
        <Input
          {...register("media_url")}
          placeholder="https://your-gallery-or-site.com/..."
          disabled={isLoading}
          className={inputClasses}
        />
        {errors.media_url && (
          <p className="text-red-500 text-sm mt-1">
            {errors.media_url.message}
          </p>
        )}
      </div>

      {/* THUMBNAIL */}
      <div>
        <label className={labelClasses}>Thumbnail URL *</label>
        <Input
          {...register("thumbnail_url")}
          placeholder="https://your-image.jpg"
          disabled={isLoading}
          className={inputClasses}
        />

        {errors.thumbnail_url && (
          <p className="text-red-500 text-sm mt-1">
            {errors.thumbnail_url.message}
          </p>
        )}

        {thumbnail_url && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <img
              src={thumbnail_url}
              alt="Thumbnail"
              className="w-40 h-24 object-cover rounded-lg border border-amber-400/30 shadow-md shadow-amber-500/20"
            />
          </motion.div>
        )}
      </div>

      {/* FEATURED IMAGES */}
      <div>
        <label className={labelClasses}>Featured Images (Carousel)</label>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input
              {...register(`featured_images.${index}`)}
              placeholder="https://your-image.jpg"
              disabled={isLoading}
              className={inputClasses}
            />
            <Button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() => append("")}
          disabled={isLoading}
          className="border border-amber-400 text-amber-400 hover:bg-amber-400/20"
        >
          Add Image
        </Button>

        {errors.featured_images && (
          <p className="text-red-500 text-sm mt-1">
            {errors.featured_images.message as string}
          </p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="bg-amber-500 text-black hover:bg-amber-400 font-semibold shadow-lg shadow-amber-500/20"
        >
          {isLoading || isSubmitting
            ? "Saving..."
            : item
              ? "Update Item"
              : "Add Item"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={cancelForm}
          disabled={isLoading || isSubmitting}
          className="border border-amber-400 text-amber-400 hover:bg-amber-400/20"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
