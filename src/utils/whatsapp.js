export function generateWhatsAppMessage(cartItems, totalPrice) {
  let message = '🛍️ *Novo Pedido da Vitrine Digital*\n\n'
  message += '*Produtos:*\n'

  cartItems.forEach((item, index) => {
    const subtotal = (item.price * item.quantity).toFixed(2).replace('.', ',')
    message += `${index + 1}. ${item.name}\n`
    message += `   Qtd: ${item.quantity}x\n`
    message += `   Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}\n`
    message += `   Subtotal: R$ ${subtotal}\n\n`
  })

  message += '─────────────────────\n'
  message += `*TOTAL: R$ ${totalPrice.toFixed(2).replace('.', ',')}\n\n`
  message += 'Obrigado pela compra! 🙏'

  return message
}
