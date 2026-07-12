import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart } = useCart()

  const handlePrevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  const currentImage = product.images[currentImageIndex]
  const imageCount = product.images.length

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Carrossel de Imagens */}
      <div className="relative bg-apple-gray aspect-square overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Indicadores de Imagem */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImageIndex
                  ? 'bg-apple-dark w-6'
                  : 'bg-gray-400 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Botões de Navegação */}
        {imageCount > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={20} className="text-apple-dark" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={20} className="text-apple-dark" />
            </button>
          </>
        )}
      </div>

      {/* Informações do Produto */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-apple-dark mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-apple-dark">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-apple-dark hover:bg-apple-dark/90 text-white p-3 rounded-full transition-all transform hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
