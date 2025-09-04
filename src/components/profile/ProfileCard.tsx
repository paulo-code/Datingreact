import React from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { Heart, X, MapPin } from 'lucide-react'
import { User } from '../../lib/supabase'

interface ProfileCardProps {
  user: User
  onSwipe: (direction: 'left' | 'right') => void
  style?: React.CSSProperties
}

export function ProfileCard({ user, onSwipe, style }: ProfileCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 100) {
      onSwipe(offset > 0 ? 'right' : 'left')
    }
  }

  return (
    <motion.div
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity, ...style }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Photo */}
        <div className="relative h-3/4">
          <img
            src={user.photo_url}
            alt={user.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Basic info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-3xl font-bold mb-1">
              {user.name}, {user.age}
            </h3>
            {user.location && (
              <div className="flex items-center text-white/90">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio section */}
        <div className="h-1/4 p-6 flex items-center">
          <p className="text-gray-700 dark:text-gray-300 text-center w-full">
            {user.bio || 'Sem bio disponível'}
          </p>
        </div>

        {/* Swipe indicators */}
        <motion.div
          className="absolute top-1/2 left-8 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg transform -rotate-12"
          style={{ opacity: useTransform(x, [-200, -50], [1, 0]) }}
        >
          <X className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-8 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg transform rotate-12"
          style={{ opacity: useTransform(x, [50, 200], [0, 1]) }}
        >
          <Heart className="w-6 h-6" />
        </motion.div>
      </div>
    </motion.div>
  )
}
