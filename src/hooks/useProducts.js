import { useState, useEffect } from 'react'
import { mockProducts } from '../data/products'

const STORAGE_KEY = 'vitrine_products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Carrega produtos do localStorage ou usa padrão
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY)
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
        setProducts(mockProducts)
      }
    } else {
      setProducts(mockProducts)
    }
    setIsLoading(false)
  }, [])

  // Salva produtos no localStorage
  const saveProducts = (newProducts) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts))
    setProducts(newProducts)
  }

  const addProduct = (product) => {
    const newProduct = {
      id: Date.now(),
      ...product
    }
    const updatedProducts = [...products, newProduct]
    saveProducts(updatedProducts)
    return newProduct
  }

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = products.map(p =>
      p.id === id ? { ...p, ...updatedProduct } : p
    )
    saveProducts(updatedProducts)
  }

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id)
    saveProducts(updatedProducts)
  }

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    saveProducts
  }
}
