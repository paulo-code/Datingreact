import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
import { LoginForm } from '../components/auth/LoginForm'
import { SignUpForm } from '../components/auth/SignUpForm'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-tinder-pink via-red-400 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <Heart className="w-10 h-10 text-tinder-pink fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TinderClone</h1>
          <p className="text-white/80">Encontre sua alma gêmea</p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm
                key="login"
                onToggleMode={() => setIsLogin(false)}
              />
            ) : (
              <SignUpForm
                key="signup"
                onToggleMode={() => setIsLogin(true)}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-white/80 text-sm"
        >
          <p>💡 Demo: Use qualquer email/senha para testar</p>
        </motion.div>
      </div>
    </div>
  )
}
