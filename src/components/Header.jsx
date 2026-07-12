import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header({ onCartClick }) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-apple-dark">
          Vitrine Digital
        </h1>
        
        <button
          onClick={onCartClick}
          className="relative p-2 hover:bg-apple-gray rounded-full transition-colors"
        >
          <ShoppingBag size={24} className="text-apple-dark" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
