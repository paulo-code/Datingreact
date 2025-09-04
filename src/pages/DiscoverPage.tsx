import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProfileCard } from '../components/profile/ProfileCard'
import { ActionButtons } from '../components/profile/ActionButtons'
import { mockUsers, User } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function DiscoverPage() {
  const [profiles, setProfiles] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<string[]>([])
  const { user } = useAuth()

  useEffect(() => {
    // Filter out current user and load profiles
    const filteredProfiles = mockUsers.filter(profile => profile.id !== user?.id)
    setProfiles(filteredProfiles)
  }, [user])

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentProfile = profiles[currentIndex]
    
    if (direction === 'right' && currentProfile) {
      // Simulate match (random chance for demo)
      if (Math.random() > 0.5) {
        setMatches(prev => [...prev, currentProfile.id])
        // Show match notification
        alert(`🎉 É um match com ${currentProfile.name}!`)
      }
    }

    // Move to next profile
    setCurrentIndex(prev => prev + 1)
  }

  const currentProfile = profiles[currentIndex]
  const hasMoreProfiles = currentIndex < profiles.length

  if (!hasMoreProfiles) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-tinder-pink to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">💕</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Não há mais perfis!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Volte mais tarde para ver novos perfis
          </p>
          <button
            onClick={() => {
              setCurrentIndex(0)
              setProfiles(mockUsers.filter(profile => profile.id !== user?.id))
            }}
            className="px-6 py-3 bg-gradient-to-r from-tinder-pink to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-200"
          >
            Recomeçar
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pb-24">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Descubra
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Arraste para a direita para curtir
          </p>
        </div>

        {/* Profile Stack */}
        <div className="relative h-[600px] mb-6">
          <AnimatePresence>
            {currentProfile && (
              <ProfileCard
                key={currentProfile.id}
                user={currentProfile}
                onSwipe={handleSwipe}
              />
            )}
          </AnimatePresence>

          {/* Next profile preview */}
          {profiles[currentIndex + 1] && (
            <div
              className="absolute inset-0 w-full h-full -z-10 scale-95 opacity-50"
              style={{ transform: 'scale(0.95) translateY(10px)' }}
            >
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <img
                  src={profiles[currentIndex + 1].photo_url}
                  alt="Next profile"
                  className="w-full h-3/4 object-cover rounded-t-2xl"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <ActionButtons
          onDislike={() => handleSwipe('left')}
          onLike={() => handleSwipe('right')}
          disabled={!currentProfile}
        />

        {/* Profile counter */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} de {profiles.length} perfis
        </div>
      </div>
    </div>
  )
}
