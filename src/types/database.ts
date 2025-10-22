export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      webinars: {
        Row: {
          id: string
          title: string
          description: string
          domain: string
          date: string
          duration_minutes: number
          capacity: number
          registered_count: number
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          meeting_link: string | null
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          domain: string
          date: string
          duration_minutes?: number
          capacity?: number
          registered_count?: number
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          meeting_link?: string | null
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          domain?: string
          date?: string
          duration_minutes?: number
          capacity?: number
          registered_count?: number
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          meeting_link?: string | null
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      speakers: {
        Row: {
          id: string
          name: string
          email: string
          bio: string
          photo_url: string | null
          expertise: string[]
          linkedin_url: string | null
          twitter_url: string | null
          website_url: string | null
          status: 'pending' | 'approved' | 'rejected'
          submission_date: string
          cv_url: string | null
          abstract: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          bio: string
          photo_url?: string | null
          expertise?: string[]
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submission_date?: string
          cv_url?: string | null
          abstract?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          bio?: string
          photo_url?: string | null
          expertise?: string[]
          linkedin_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          status?: 'pending' | 'approved' | 'rejected'
          submission_date?: string
          cv_url?: string | null
          abstract?: string | null
          created_at?: string
        }
      }
      webinar_speakers: {
        Row: {
          webinar_id: string
          speaker_id: string
          role: 'host' | 'guest' | 'panelist'
        }
        Insert: {
          webinar_id: string
          speaker_id: string
          role?: 'host' | 'guest' | 'panelist'
        }
        Update: {
          webinar_id?: string
          speaker_id?: string
          role?: 'host' | 'guest' | 'panelist'
        }
      }
      registrations: {
        Row: {
          id: string
          webinar_id: string
          name: string
          email: string
          phone: string | null
          organization: string | null
          registration_date: string
          attended: boolean
          created_at: string
        }
        Insert: {
          id?: string
          webinar_id: string
          name: string
          email: string
          phone?: string | null
          organization?: string | null
          registration_date?: string
          attended?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          webinar_id?: string
          name?: string
          email?: string
          phone?: string | null
          organization?: string | null
          registration_date?: string
          attended?: boolean
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          client_name: string
          category: 'branding' | 'poster' | 'digital-art' | 'web-design' | 'marketing' | 'other'
          tags: string[]
          images: Json
          completion_date: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          client_name: string
          category: 'branding' | 'poster' | 'digital-art' | 'web-design' | 'marketing' | 'other'
          tags?: string[]
          images?: Json
          completion_date?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          client_name?: string
          category?: 'branding' | 'poster' | 'digital-art' | 'web-design' | 'marketing' | 'other'
          tags?: string[]
          images?: Json
          completion_date?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          name: string
          role: 'student' | 'client' | 'partner'
          organization: string | null
          message: string
          rating: number
          photo_url: string | null
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: 'student' | 'client' | 'partner'
          organization?: string | null
          message: string
          rating: number
          photo_url?: string | null
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'student' | 'client' | 'partner'
          organization?: string | null
          message?: string
          rating?: number
          photo_url?: string | null
          approved?: boolean
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          interest_type: 'design-service' | 'partnership' | 'collaboration' | 'general'
          message: string
          status: 'new' | 'in-progress' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          interest_type: 'design-service' | 'partnership' | 'collaboration' | 'general'
          message: string
          status?: 'new' | 'in-progress' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          interest_type?: 'design-service' | 'partnership' | 'collaboration' | 'general'
          message?: string
          status?: 'new' | 'in-progress' | 'completed'
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          author: string
          cover_image_url: string | null
          tags: string[]
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          author: string
          cover_image_url?: string | null
          tags?: string[]
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          author?: string
          cover_image_url?: string | null
          tags?: string[]
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          subscribed: boolean
          subscribed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          subscribed?: boolean
          subscribed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          subscribed?: boolean
          subscribed_at?: string
          created_at?: string
        }
      }
    }
  }
}
