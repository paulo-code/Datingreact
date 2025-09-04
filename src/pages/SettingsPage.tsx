import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, Shield, Heart, HelpCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [ageRange, setAgeRange] = useState([18, 35])
  const [maxDistance, setMaxDistance] = useState(50)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Configurações
        </h1>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2" />
            Aparência
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Modo escuro</span>
            <button
              onClick={toggleDarkMode}
              className={`
                relative w-12 h-6 rounded-full transition-colors duration-200
                ${isDarkMode ? 'bg-tinder-pink' : 'bg-gray-300'}
              `}
            >
              <div
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                  transition-transform duration-200 flex items-center justify-center
                  ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}
                `}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-gray-600" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificações
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Novos matches</span>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`
                  relative w-12 h-6 rounded-full transition-colors duration-200
                  ${notifications ? 'bg-tinder-pink' : 'bg-gray-300'}
                `}
              >
                <div
                  className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
                    transition-transform duration-200
                    ${notifications ? 'translate-x-6' : 'translate-x-0'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Mensagens</span>
              <button className="relative w-12 h-6 rounded-full bg-tinder-pink">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full translate-x-6" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Discovery Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Preferências de Descoberta
          </h2>

          <div className="space-y-6">
            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Faixa etária: {ageRange[0]} - {ageRange[1]} anos
              </label>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                  className="flex-1 accent-tinder-pink"
                />
                <input
                  type="range"
                  min="18"
                  max="100"
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                  className="flex-1 accent-tinder-pink"
                />
              </div>
            </div>

            {/* Max Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distância máxima: {maxDistance} km
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                className="w-full accent-tinder-pink"
              />
            </div>
          </div>
        </motion.div>

        {/* Account & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Conta e Privacidade
          </h2>

          <div className="space-y-3">
            <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-tinder-pink transition-colors">
              Bloquear contatos
            </button>
            <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-tinder-pink transition-colors">
              Configurações de privacidade
            </button>
            <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-tinder-pink transition-colors">
              Dados e download
            </button>
          </div>
        </motion.div>

        {/* Help & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2" />
            Ajuda e Suporte
          </h2>

          <div className="space-y-3">
            <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-tinder-pink transition-colors">
              Central de ajuda
            </button>
            <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-tinder-pink transition-colors">
              Reportar um problema
            </button>
            <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-tinder-pink transition-colors">
              Termos de serviço
            </button>
          </div>
        </motion.div>

        {/* Delete Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            variant="danger"
            onClick={() => {
              if (confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.')) {
                // Delete account logic
                alert('Conta deletada (demo)')
              }
            }}
          >
            Deletar Conta
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
