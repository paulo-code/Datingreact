import React from 'react'
import { motion } from 'framer-motion'
import { Message } from '../../lib/supabase'

interface ChatBubbleProps {
  message: Message
  isOwn: boolean
}

export function ChatBubble({ message, isOwn }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[70%] px-4 py-3 rounded-2xl
          ${isOwn
            ? 'bg-gradient-to-r from-tinder-pink to-red-500 text-white rounded-br-sm'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-sm'
          }
        `}
      >
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
          {new Date(message.created_at).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </motion.div>
  )
}
