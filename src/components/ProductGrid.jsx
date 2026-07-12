import { useState } from 'react'
import ProductCard from './ProductCard'
import { useAdmin } from '../context/AdminContext'

export default function ProductGrid() {
  const { products } = useAdmin()

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-apple-dark mb-2">
          Produtos em Destaque
        </h2>
        <p className="text-gray-600">
          {products.length} produto{products.length !== 1 ? 's' : ''} disponível{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-500 text-lg">
            Nenhum produto disponível no momento
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
