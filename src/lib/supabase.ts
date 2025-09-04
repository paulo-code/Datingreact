import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  age: number
  bio?: string
  photo_url?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface Match {
  id: string
  user1_id: string
  user2_id: string
  created_at: string
  user1?: User
  user2?: User
}

export interface Like {
  id: string
  liker_id: string
  liked_id: string
  created_at: string
}

export interface Message {
  id: string
  match_id: string
  sender_id: string
  content: string
  created_at: string
  sender?: User
}

// Mock data for demo purposes
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'ana@example.com',
    name: 'Ana Silva',
    age: 25,
    bio: 'Amo viajar e conhecer novas culturas! 🌍',
    photo_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=600&fit=crop&crop=face',
    location: 'São Paulo, SP',
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '2',
    email: 'carlos@example.com',
    name: 'Carlos Santos',
    age: 28,
    bio: 'Desenvolvedor apaixonado por tecnologia e café ☕',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    location: 'Rio de Janeiro, RJ',
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  },
  {
    id: '3',
    email: 'maria@example.com',
    name: 'Maria Oliveira',
    age: 23,
    bio: 'Artista e amante da natureza 🎨🌿',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    location: 'Belo Horizonte, MG',
    created_at: '2025-01-01',
    updated_at: '2025-01-01'
  }
]
