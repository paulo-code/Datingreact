import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 
                   rounded-full focus:ring-2 focus:ring-tinder-pink focus:border-transparent
                   dark:bg-gray-700 dark:text-white
                   disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          type="submit"
          disabled={disabled || !message.trim()}
          className="w-12 h-12 bg-gradient-to-r from-tinder-pink to-red-500 
                   rounded-full flex items-center justify-center
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:shadow-lg transition-all duration-200"
        >
          <Send className="w-5 h-5 text-white" />
        </motion.button>
      </form>
    </div>
  )
}
