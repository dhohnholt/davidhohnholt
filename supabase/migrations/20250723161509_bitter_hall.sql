/*
  # Create portfolio items table

  1. New Tables
    - `portfolio_items`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `description` (text, not null)
      - `category` (enum: Video, Photography, Web App, Marketing)
      - `media_url` (text, not null)
      - `thumbnail_url` (text, not null)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `portfolio_items` table
    - Add policy for public read access
    - Add policy for authenticated users to manage items
*/

-- Create enum for categories
CREATE TYPE portfolio_category AS ENUM ('Video', 'Photography', 'Web App', 'Marketing');

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category portfolio_category NOT NULL,
  media_url text NOT NULL,
  thumbnail_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Policy for public read access
CREATE POLICY "Anyone can view portfolio items"
  ON portfolio_items
  FOR SELECT
  TO public
  USING (true);

-- Policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert portfolio items"
  ON portfolio_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to update
CREATE POLICY "Authenticated users can update portfolio items"
  ON portfolio_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy for authenticated users to delete
CREATE POLICY "Authenticated users can delete portfolio items"
  ON portfolio_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO portfolio_items (title, description, category, media_url, thumbnail_url) VALUES
  ('E-commerce Platform', 'Modern e-commerce solution with React and Node.js', 'Web App', '#', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Brand Photography', 'Professional brand photography for local businesses', 'Photography', '#', 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Social Media Campaign', 'Viral social media campaign that increased engagement by 300%', 'Marketing', '#', 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Product Launch Video', 'Compelling product launch video for tech startup', 'Video', '#', 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Portfolio Website', 'Responsive portfolio website for creative agency', 'Web App', '#', 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Event Photography', 'Corporate event photography and post-production', 'Photography', '#', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Email Marketing Campaign', 'Automated email sequence with 45% open rate', 'Marketing', '#', 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'),
  ('Promotional Video', 'High-impact promotional video for fitness brand', 'Video', '#', 'https://images.pexels.com/photos/3846203/pexels-photo-3846203.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop');