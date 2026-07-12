import { useState } from 'react'
import { Plus, X, Image } from 'lucide-react'

export default function ProductForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      price: '',
      images: ['']
    }
  )

  const [previewImages, setPreviewImages] = useState(initialData?.images || [''])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }))
  }

  const handleImageChange = (index, value) => {
    const newImages = [...previewImages]
    newImages[index] = value
    setPreviewImages(newImages)
    setFormData(prev => ({
      ...prev,
      images: newImages.filter(img => img.trim() !== '')
    }))
  }

  const addImageField = () => {
    setPreviewImages([...previewImages, ''])
  }

  const removeImageField = (index) => {
    const newImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(newImages)
    setFormData(prev => ({
      ...prev,
      images: newImages.filter(img => img.trim() !== '')
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.price || formData.images.length === 0) {
      alert('Por favor, preencha todos os campos')
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-apple-dark mb-2">
          Nome do Produto *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ex: Camiseta Preta"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-dark"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-apple-dark mb-2">
          Descrição *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Descreva o produto..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-dark resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-apple-dark mb-2">
          Preço (R$) *
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="99.90"
          step="0.01"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-dark"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-apple-dark mb-2">
          Fotos do Produto *
        </label>
        <p className="text-xs text-gray-500 mb-4">
          Cole a URL da imagem (ex: https://exemplo.com/foto.jpg)
        </p>

        <div className="space-y-3">
          {previewImages.map((image, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-dark"
                />
                {previewImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {image && (
                <div className="flex items-center gap-3 bg-apple-gray p-3 rounded-lg">
                  <Image size={16} className="text-gray-400" />
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <span className="text-xs text-gray-500 truncate flex-1">
                    {image}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addImageField}
          className="mt-4 flex items-center gap-2 px-4 py-2 text-apple-dark border border-gray-300 rounded-lg hover:bg-apple-gray transition-colors"
        >
          <Plus size={16} />
          Adicionar outra foto
        </button>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-apple-dark hover:bg-apple-dark/90 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {initialData ? 'Atualizar Produto' : 'Adicionar Produto'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 hover:bg-apple-gray text-apple-dark font-semibold py-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
