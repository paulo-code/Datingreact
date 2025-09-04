import React from 'react'
import { motion } from 'framer-motion'
import { Heart, X, RotateCcw } from 'lucide-react'

interface ActionButtonsProps {
  onDislike: () => void
  onLike: () => void
  onUndo?: () => void
  disabled?: boolean
}

export function ActionButtons({ onDislike, onLike, onUndo, disabled = false }: ActionButtonsProps) {
  return (
    <div className="flex justify-center items-center space-x-6 py-8">
      {/* Dislike Button */}
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={onDislike}
        disabled={disabled}
        className={`
          w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg
          border border-gray-200 dark:border-gray-700
          flex items-center justify-center
          ${disabled ? 'opacity-50' : 'hover:shadow-xl'}
          transition-all duration-200
        `}
      >
        <X className="w-8 h-8 text-red-500" />
      </motion.button>

      {/* Undo Button (optional) */}
      {onUndo && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onUndo}
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg
                   border border-gray-200 dark:border-gray-700
                   flex items-center justify-center
                   hover:shadow-xl transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5 text-yellow-500" />
        </motion.button>
      )}

      {/* Like Button */}
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.1 }}
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={onLike}
        disabled={disabled}
        className={`
          w-16 h-16 rounded-full bg-gradient-to-r from-tinder-pink to-red-500 shadow-lg
          flex items-center justify-center
          ${disabled ? 'opacity-50' : 'hover:shadow-xl'}
          transition-all duration-200
        `}
      >
        <Heart className="w-8 h-8 text-white fill-current" />
      </motion.button>
    </div>
  )
}
