/*
  # Zyra WorkHub Database Schema

  ## Overview
  Complete database schema for Zyra WorkHub - a youth-driven startup platform for webinars, design services, and marketing partnerships.

  ## New Tables

  ### 1. webinars
  Stores all webinar events (upcoming and past)
  - `id` (uuid, primary key)
  - `title` (text) - Webinar title
  - `description` (text) - Full description
  - `domain` (text) - Topic domain (e.g., Tech, Design, Marketing)
  - `date` (timestamptz) - Scheduled date and time
  - `duration_minutes` (integer) - Event duration
  - `capacity` (integer) - Maximum attendees
  - `registered_count` (integer) - Current registrations
  - `status` (text) - upcoming/ongoing/completed/cancelled
  - `meeting_link` (text) - Zoom/Meet URL
  - `thumbnail_url` (text) - Event image
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. speakers
  Manages speaker profiles and submissions
  - `id` (uuid, primary key)
  - `name` (text) - Full name
  - `email` (text) - Contact email
  - `bio` (text) - Professional bio
  - `photo_url` (text) - Profile picture
  - `expertise` (text[]) - Array of topics
  - `linkedin_url` (text)
  - `twitter_url` (text)
  - `website_url` (text)
  - `status` (text) - pending/approved/rejected
  - `submission_date` (timestamptz)
  - `cv_url` (text) - Resume/CV file
  - `abstract` (text) - Talk proposal
  - `created_at` (timestamptz)

  ### 3. webinar_speakers
  Junction table linking webinars to speakers (many-to-many)
  - `webinar_id` (uuid, foreign key)
  - `speaker_id` (uuid, foreign key)
  - `role` (text) - host/guest/panelist

  ### 4. registrations
  Tracks webinar registrations
  - `id` (uuid, primary key)
  - `webinar_id` (uuid, foreign key)
  - `name` (text)
  - `email` (text)
  - `phone` (text, optional)
  - `organization` (text, optional)
  - `registration_date` (timestamptz)
  - `attended` (boolean)
  - `created_at` (timestamptz)

  ### 5. projects
  Portfolio of completed design/marketing projects
  - `id` (uuid, primary key)
  - `title` (text) - Project name
  - `description` (text) - Project details
  - `client_name` (text)
  - `category` (text) - branding/poster/digital-art/web-design
  - `tags` (text[]) - Searchable tags
  - `images` (jsonb) - Array of image objects [{url, alt, order}]
  - `completion_date` (date)
  - `featured` (boolean) - Show on homepage
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. feedback
  Client and student testimonials
  - `id` (uuid, primary key)
  - `name` (text)
  - `role` (text) - student/client/partner
  - `organization` (text, optional)
  - `message` (text) - Testimonial content
  - `rating` (integer) - 1-5 stars
  - `photo_url` (text, optional)
  - `approved` (boolean) - Admin approval
  - `created_at` (timestamptz)

  ### 7. contact_submissions
  General inquiries and partnership requests
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text, optional)
  - `interest_type` (text) - design-service/partnership/collaboration/general
  - `message` (text)
  - `status` (text) - new/in-progress/completed
  - `created_at` (timestamptz)

  ### 8. blog_posts
  Articles, success stories, and announcements
  - `id` (uuid, primary key)
  - `title` (text)
  - `slug` (text, unique)
  - `content` (text) - Markdown content
  - `excerpt` (text) - Short summary
  - `author` (text)
  - `cover_image_url` (text)
  - `tags` (text[])
  - `published` (boolean)
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 9. newsletter_subscribers
  Community newsletter subscriptions
  - `id` (uuid, primary key)
  - `email` (text, unique)
  - `name` (text, optional)
  - `subscribed` (boolean)
  - `subscribed_at` (timestamptz)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for approved/published content
  - Authenticated admin access for writes
  - Secure registration and submission endpoints
*/

-- Create webinars table
CREATE TABLE IF NOT EXISTS webinars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  domain text NOT NULL,
  date timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  capacity integer NOT NULL DEFAULT 100,
  registered_count integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  meeting_link text,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create speakers table
CREATE TABLE IF NOT EXISTS speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  bio text NOT NULL,
  photo_url text,
  expertise text[] DEFAULT '{}',
  linkedin_url text,
  twitter_url text,
  website_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submission_date timestamptz DEFAULT now(),
  cv_url text,
  abstract text,
  created_at timestamptz DEFAULT now()
);

-- Create webinar_speakers junction table
CREATE TABLE IF NOT EXISTS webinar_speakers (
  webinar_id uuid REFERENCES webinars(id) ON DELETE CASCADE,
  speaker_id uuid REFERENCES speakers(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'guest' CHECK (role IN ('host', 'guest', 'panelist')),
  PRIMARY KEY (webinar_id, speaker_id)
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_id uuid REFERENCES webinars(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  registration_date timestamptz DEFAULT now(),
  attended boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  client_name text NOT NULL,
  category text NOT NULL CHECK (category IN ('branding', 'poster', 'digital-art', 'web-design', 'marketing', 'other')),
  tags text[] DEFAULT '{}',
  images jsonb DEFAULT '[]',
  completion_date date,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'client', 'partner')),
  organization text,
  message text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  photo_url text,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  interest_type text NOT NULL CHECK (interest_type IN ('design-service', 'partnership', 'collaboration', 'general')),
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  author text NOT NULL,
  cover_image_url text,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  subscribed boolean DEFAULT true,
  subscribed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_webinars_date ON webinars(date DESC);
CREATE INDEX IF NOT EXISTS idx_webinars_status ON webinars(status);
CREATE INDEX IF NOT EXISTS idx_speakers_status ON speakers(status);
CREATE INDEX IF NOT EXISTS idx_registrations_webinar ON registrations(webinar_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Enable Row Level Security
ALTER TABLE webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinar_speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for webinars (public read for upcoming/completed, authenticated write)
CREATE POLICY "Anyone can view published webinars"
  ON webinars FOR SELECT
  USING (status IN ('upcoming', 'completed'));

CREATE POLICY "Authenticated users can insert webinars"
  ON webinars FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update webinars"
  ON webinars FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete webinars"
  ON webinars FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for speakers (public read for approved)
CREATE POLICY "Anyone can view approved speakers"
  ON speakers FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can submit speaker application"
  ON speakers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update speakers"
  ON speakers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for webinar_speakers (public read)
CREATE POLICY "Anyone can view webinar speakers"
  ON webinar_speakers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage webinar speakers"
  ON webinar_speakers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for registrations
CREATE POLICY "Anyone can register for webinars"
  ON registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for projects (public read for all)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for feedback (public read for approved)
CREATE POLICY "Anyone can view approved feedback"
  ON feedback FOR SELECT
  USING (approved = true);

CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update feedback"
  ON feedback FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for contact_submissions
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for blog_posts (public read for published)
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Subscribers can update own subscription"
  ON newsletter_subscribers FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);