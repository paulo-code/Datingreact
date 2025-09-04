import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, User } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      // For demo purposes, set a mock user
      setUser({
        id: 'demo-user',
        email: 'demo@example.com',
        name: 'Demo User',
        age: 25,
        bio: 'Demo user for testing',
        photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop&crop=face',
        location: 'São Paulo, SP',
        created_at: '2025-01-01',
        updated_at: '2025-01-01'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setUser(data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in:', error)
      // For demo purposes, simulate successful login
      setUser({
        id: 'demo-user',
        email,
        name: 'Demo User',
        age: 25,
        bio: 'Demo user for testing',
        photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop&crop=face',
        location: 'São Paulo, SP',
        created_at: '2025-01-01',
        updated_at: '2025-01-01'
      })
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email,
              ...userData,
            }
          ])

        if (profileError) throw profileError
      }
    } catch (error) {
      console.error('Error signing up:', error)
      // For demo purposes, simulate successful signup
      setUser({
        id: 'demo-user',
        email,
        ...userData,
        created_at: '2025-01-01',
        updated_at: '2025-01-01'
      } as User)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setUser(null)
    }
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', user.id)

      if (error) throw error
      setUser({ ...user, ...userData })
    } catch (error) {
      console.error('Error updating profile:', error)
      // For demo purposes, update local state
      setUser({ ...user, ...userData } as User)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
