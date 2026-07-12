import { ArrowLeft, Settings } from 'lucide-react'

export default function AdminHeader({ onBack, adminMode, onToggleAdmin }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {adminMode && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-apple-gray rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-apple-dark" />
            </button>
          )}
          <h1 className="text-2xl font-semibold text-apple-dark">
            Vitrine Digital
          </h1>
        </div>
        
        <button
          onClick={onToggleAdmin}
          className="flex items-center gap-2 px-4 py-2 hover:bg-apple-gray rounded-lg transition-colors"
          title={adminMode ? "Sair do Painel Admin" : "Entrar no Painel Admin"}
        >
          <Settings size={20} className="text-apple-dark" />
          <span className="text-sm font-medium text-apple-dark">
            {adminMode ? 'Admin' : 'Painel'}
          </span>
        </button>
      </div>
    </header>
  )
}
