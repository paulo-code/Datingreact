import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Edit3, MapPin, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function ProfilePage() {
  const { user, signOut, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age?.toString() || '',
    bio: user?.bio || '',
    location: user?.location || '',
  })

  const handleSave = async () => {
    if (user) {
      await updateProfile({
        name: formData.name,
        age: parseInt(formData.age),
        bio: formData.bio,
        location: formData.location,
      })
      setIsEditing(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Meu Perfil
          </h1>
          <Button
            onClick={() => signOut()}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Profile Photo */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-6"
        >
          <div className="w-32 h-32 mx-auto relative">
            <img
              src={user.photo_url}
              alt={user.name}
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-tinder-pink rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Profile Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Informações
            </h2>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Nome"
                value={formData.name}
                onChange={(value) => updateField('name', value)}
              />
              
              <Input
                label="Idade"
                type="number"
                value={formData.age}
                onChange={(value) => updateField('age', value)}
              />

              <Input
                label="Localização"
                value={formData.location}
                onChange={(value) => updateField('location', value)}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateField('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-tinder-pink focus:border-transparent
                           dark:bg-gray-700 dark:border-gray-600 dark:text-white
                           transition-all duration-200 resize-none"
                  placeholder="Conte um pouco sobre você..."
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleSave}
                  className="flex-1"
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {user.name}, {user.age}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{user.location}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Sobre mim
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {user.bio || 'Adicione uma bio para contar mais sobre você!'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Estatísticas
          </h2>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-tinder-pink">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Matches</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">45</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Conversas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
