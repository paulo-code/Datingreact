import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

interface LoginFormProps {
  onToggleMode: () => void
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await signIn(email, password)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bem-vindo de volta!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Entre para encontrar pessoas incríveis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          required
        />
        
        <Input
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Não tem uma conta?{' '}
          <button
            onClick={onToggleMode}
            className="text-tinder-pink hover:underline font-semibold"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </motion.div>
  )
}
