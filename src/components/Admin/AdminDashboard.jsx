import { useState } from 'react'
import { Plus, Edit2, Trash2, Package } from 'lucide-react'
import ProductForm from './ProductForm'
import { useAdmin } from '../../context/AdminContext'

export default function AdminDashboard({ onClose }) {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const handleAddProduct = (formData) => {
    addProduct(formData)
    setShowForm(false)
    alert('Produto adicionado com sucesso!')
  }

  const handleUpdateProduct = (formData) => {
    updateProduct(editingProduct.id, formData)
    setEditingProduct(null)
    alert('Produto atualizado com sucesso!')
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      deleteProduct(id)
      alert('Produto deletado com sucesso!')
    }
  }

  if (showForm || editingProduct) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
          className="text-apple-dark hover:text-gray-600 mb-6 transition-colors"
        >
          ← Voltar
        </button>
        <ProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-apple-dark">
            Painel de Admin
          </h2>
          <p className="text-gray-600 mt-2">
            Gerencie seus produtos
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-apple-dark hover:bg-apple-dark/90 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-apple-dark mb-2">
            Nenhum produto cadastrado
          </h3>
          <p className="text-gray-600 mb-6">
            Comece adicionando seus produtos
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-apple-dark hover:bg-apple-dark/90 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <Plus size={20} />
            Adicionar Produto
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 flex gap-6 items-start hover:shadow-md transition-shadow"
            >
              {/* Imagem */}
              <div className="flex-shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-32 h-32 rounded-lg object-cover bg-apple-gray"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/128'
                  }}
                />
              </div>

              {/* Informações */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-apple-dark mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xl font-semibold text-apple-dark">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.images.length} foto(s)
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Deletar"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botão Voltar */}
      <div className="mt-8">
        <button
          onClick={onClose}
          className="w-full border border-gray-300 hover:bg-apple-gray text-apple-dark font-semibold py-3 rounded-lg transition-colors"
        >
          Voltar à Loja
        </button>
      </div>
    </div>
  )
}
