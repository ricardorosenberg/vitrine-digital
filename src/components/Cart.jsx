import { ArrowLeft, Trash2, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { generateWhatsAppMessage } from '../utils/whatsapp'

export default function Cart({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const totalPrice = getTotalPrice()

  const handleCheckout = () => {
    const message = generateWhatsAppMessage(cartItems, totalPrice)
    const whatsappUrl = `https://wa.me/SEUCELULARAQUI?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-apple-dark hover:text-gray-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Voltar à Loja</span>
      </button>

      <div className="bg-white rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-apple-dark mb-8">
          Carrinho de Compras
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Seu carrinho está vazio
            </p>
            <p className="text-gray-400">
              Adicione produtos para começar
            </p>
          </div>
        ) : (
          <>
            {/* Lista de Itens */}
            <div className="space-y-4 mb-8">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-apple-dark">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="border-t-2 border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-apple-dark">
                  Total:
                </span>
                <span className="text-2xl font-semibold text-apple-dark">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Botão Comprar via WhatsApp */}
            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} />
              <span>Comprar no WhatsApp</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
