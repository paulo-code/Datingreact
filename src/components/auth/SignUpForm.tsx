import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

interface SignUpFormProps {
  onToggleMode: () => void
}

export function SignUpForm({ onToggleMode }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    bio: '',
  })
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await signUp(formData.email, formData.password, {
        name: formData.name,
        age: parseInt(formData.age),
        bio: formData.bio,
        photo_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=600&fit=crop&crop=face',
        location: 'São Paulo, SP'
      })
    } catch (error) {
      console.error('Sign up error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Crie sua conta
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Junte-se a nós e encontre alguém especial
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(value) => updateField('name', value)}
          required
        />
        
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          required
        />
        
        <Input
          label="Idade"
          type="number"
          placeholder="25"
          value={formData.age}
          onChange={(value) => updateField('age', value)}
          required
        />
        
        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          required
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio (opcional)
          </label>
          <textarea
            placeholder="Conte um pouco sobre você..."
            value={formData.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-tinder-pink focus:border-transparent
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white
                     transition-all duration-200 resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Já tem uma conta?{' '}
          <button
            onClick={onToggleMode}
            className="text-tinder-pink hover:underline font-semibold"
          >
            Faça login
          </button>
        </p>
      </div>
    </motion.div>
  )
}
