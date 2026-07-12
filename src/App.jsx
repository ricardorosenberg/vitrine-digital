import { useState } from 'react'
import AdminHeader from './components/Admin/AdminHeader'
import AdminDashboard from './components/Admin/AdminDashboard'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'
import { AdminProvider } from './context/AdminContext'

export default function App() {
  const [showCart, setShowCart] = useState(false)
  const [adminMode, setAdminMode] = useState(false)

  const handleToggleAdmin = () => {
    setAdminMode(!adminMode)
    setShowCart(false)
  }

  return (
    <AdminProvider>
      <CartProvider>
        <div className="min-h-screen bg-apple-gray">
          {adminMode ? (
            <AdminHeader
              onBack={() => setAdminMode(false)}
              adminMode={adminMode}
              onToggleAdmin={handleToggleAdmin}
            />
          ) : (
            <Header onCartClick={() => setShowCart(!showCart)} />
          )}

          <main className="max-w-7xl mx-auto px-4 py-12">
            {adminMode ? (
              <AdminDashboard onClose={() => setAdminMode(false)} />
            ) : showCart ? (
              <Cart onClose={() => setShowCart(false)} />
            ) : (
              <ProductGrid />
            )}
          </main>
        </div>
      </CartProvider>
    </AdminProvider>
  )
}
