import { useState, useRef } from 'react'
import { Plus, X, Image } from 'lucide-react'

const MAX_PHOTOS = 5

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

  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

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
    if (previewImages.length >= MAX_PHOTOS) {
      alert(`Máximo de ${MAX_PHOTOS} fotos permitido`)
      return
    }
    setPreviewImages([...previewImages, ''])
  }

  const removeImageField = (index) => {
    const newImages = previewImages.filter((_, i) => i !== index)
    setPreviewImages(newImages.length > 0 ? newImages : [''])
    setFormData(prev => ({
      ...prev,
      images: newImages.filter(img => img.trim() !== '')
    }))
  }

  const isBase64Image = (image) => image.startsWith('data:')

  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(new Error(`Erro ao ler o arquivo: ${file.name}`))
      reader.readAsDataURL(file)
    })

  const handleFilesSelected = async (files) => {
    const currentFilled = previewImages.filter(img => img.trim() !== '').length
    const available = MAX_PHOTOS - currentFilled
    if (available <= 0) {
      alert(`Máximo de ${MAX_PHOTOS} fotos já atingido`)
      return
    }

    const filesToProcess = Array.from(files).slice(0, available)

    try {
      const dataUrls = await Promise.all(filesToProcess.map(convertFileToBase64))

      setPreviewImages(prev => {
        const withoutEmpty = prev.filter(img => img.trim() !== '')
        return [...withoutEmpty, ...dataUrls]
      })
      setFormData(prev => {
        const withoutEmpty = previewImages.filter(img => img.trim() !== '')
        return { ...prev, images: [...withoutEmpty, ...dataUrls] }
      })
    } catch (err) {
      console.error(err)
      alert('Erro ao processar as imagens. Tente novamente.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.price || formData.images.length === 0) {
      alert('Por favor, preencha todos os campos')
      return
    }

    onSubmit(formData)
  }

  const totalFilled = previewImages.filter(img => img.trim() !== '').length
  const atLimit = totalFilled >= MAX_PHOTOS

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
          Fotos do Produto * <span className="text-gray-400 font-normal">({totalFilled}/{MAX_PHOTOS})</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Tire uma foto, selecione da galeria ou cole a URL da imagem
        </p>

        {/* Camera / Gallery buttons */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            disabled={atLimit}
            onClick={() => cameraInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-apple-dark text-white rounded-lg hover:bg-apple-dark/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            📷 Tirar Foto
          </button>
          <button
            type="button"
            disabled={atLimit}
            onClick={() => galleryInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-apple-dark rounded-lg hover:bg-apple-gray transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🖼️ Galeria
          </button>

          {/* Hidden: camera capture */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleFilesSelected(e.target.files)
              e.target.value = ''
            }}
          />

          {/* Hidden: gallery picker (multiple) */}
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleFilesSelected(e.target.files)
              e.target.value = ''
            }}
          />
        </div>

        <div className="space-y-3">
          {previewImages.map((image, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={isBase64Image(image) ? '' : image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://exemplo.com/foto.jpg"
                  readOnly={isBase64Image(image)}
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
                    {isBase64Image(image) ? '📷 Foto capturada' : image}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {!atLimit && (
          <button
            type="button"
            onClick={addImageField}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-apple-dark border border-gray-300 rounded-lg hover:bg-apple-gray transition-colors"
          >
            <Plus size={16} />
            Adicionar URL de foto
          </button>
        )}
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
