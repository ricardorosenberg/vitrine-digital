import { useState } from 'react'
import { Lock } from 'lucide-react'

export default function PasswordModal({ onConfirm, onClose }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (password === '78790815') {
      onConfirm()
    } else {
      setError('Senha incorreta!')
      setPassword('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <div className="bg-apple-gray p-4 rounded-full">
            <Lock size={32} className="text-apple-dark" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-apple-dark mb-2">
          Painel Protegido
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Digite sua senha para acessar o painel admin
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Digite a senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
