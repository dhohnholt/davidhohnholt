import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PortfolioItem } from '@/lib/supabase';

const portfolioSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['Video', 'Photography', 'Web App', 'Marketing']),
  media_url: z.string().url('Please enter a valid URL'),
  thumbnail_url: z.string().url('Please enter a valid thumbnail URL'),
  featured_images: z.array(z.string().url('Please enter a valid image URL')).optional(),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

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
  const [preview, setPreview] = useState(item?.thumbnail_url || '');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: item
      ? {
          title: item.title,
          description: item.description,
          category: item.category,
          media_url: item.media_url,
          thumbnail_url: item.thumbnail_url,
          featured_images: item.featured_images || [],
        }
      : {
          title: '',
          description: '',
          category: 'Web App',
          media_url: '',
          thumbnail_url: '',
          featured_images: [],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'featured_images',
  });

  const category = watch('category');
  const thumbnail_url = watch('thumbnail_url');

  const handleFormSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      if (!item) {
        reset();
        setPreview('');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setPreview(item?.thumbnail_url || '');
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <Input
          id="title"
          {...register('title')}
          className="mt-1"
          placeholder="Project title"
          disabled={isLoading}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <Textarea
          id="description"
          {...register('description')}
          rows={3}
          className="mt-1"
          placeholder="Project description"
          disabled={isLoading}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <Select
          value={category}
          onValueChange={(value) => setValue('category', value as any)}
          disabled={isLoading}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Photography">Photography</SelectItem>
            <SelectItem value="Web App">Web App</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="media_url" className="block text-sm font-medium text-gray-700 mb-1">
          Media URL *
        </label>
        <Input
          id="media_url"
          {...register('media_url')}
          className="mt-1"
          placeholder="https://example.com/project"
          disabled={isLoading}
        />
        {errors.media_url && <p className="text-red-500 text-sm mt-1">{errors.media_url.message}</p>}
      </div>

      <div>
        <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700 mb-1">
          Thumbnail URL *
        </label>
        <Input
          id="thumbnail_url"
          {...register('thumbnail_url')}
          className="mt-1"
          placeholder="https://example.com/thumbnail.jpg"
          onChange={(e) => setPreview(e.target.value)}
          disabled={isLoading}
        />
        {errors.thumbnail_url && <p className="text-red-500 text-sm mt-1">{errors.thumbnail_url.message}</p>}
        {thumbnail_url && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <img
              src={thumbnail_url}
              alt="Thumbnail preview"
              className="w-40 h-24 object-cover rounded border"
            />
          </motion.div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Featured Images
        </label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input
              {...register(`featured_images.${index}` as const)}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              disabled={isLoading}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => append('')}
          disabled={isLoading}
        >
          Add Image
        </Button>
        {errors.featured_images && (
          <p className="text-red-500 text-sm mt-1">
            {errors.featured_images.message as string}
          </p>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="bg-[#014040] hover:bg-[#012020] text-white"
        >
          {(isLoading || isSubmitting) ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading || isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}