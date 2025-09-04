import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Heart } from 'lucide-react'
import { mockUsers, User } from '../lib/supabase'

export function MatchesPage() {
  // Mock matches for demo
  const [matches] = useState<User[]>(mockUsers.slice(0, 2))
  const [selectedMatch, setSelectedMatch] = useState<User | null>(null)

  if (selectedMatch) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Chat Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedMatch(null)}
              className="text-tinder-pink hover:text-red-600 transition-colors"
            >
              ←
            </button>
            <img
              src={selectedMatch.photo_url}
              alt={selectedMatch.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {selectedMatch.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 pb-24">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-tinder-pink to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-white fill-current" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Vocês deram match!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Comece uma conversa com {selectedMatch.name}
              </p>
            </motion.div>

            {/* Mock messages */}
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[70%]">
                  <p className="text-sm">Oi! Como você está? 😊</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">14:30</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-tinder-pink to-red-500 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[70%]">
                  <p className="text-sm">Oi! Tudo bem sim! E você?</p>
                  <p className="text-xs text-white/70 mt-1">14:32</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 
                       rounded-full focus:ring-2 focus:ring-tinder-pink focus:border-transparent
                       dark:bg-gray-700 dark:text-white"
            />
            <button className="w-12 h-12 bg-gradient-to-r from-tinder-pink to-red-500 
                             rounded-full flex items-center justify-center">
              <span className="text-white">→</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Seus Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </p>
        </div>

        {matches.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Nenhum match ainda
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Continue navegando para encontrar pessoas interessantes!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedMatch(match)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={match.photo_url}
                    alt={match.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {match.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {match.age} anos • {match.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                      Começar conversa...
                    </p>
                  </div>
                  <MessageCircle className="w-6 h-6 text-tinder-pink" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
