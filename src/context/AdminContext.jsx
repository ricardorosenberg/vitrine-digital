import { createContext, useContext } from 'react'
import { useProducts } from '../hooks/useProducts'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const products = useProducts()

  return (
    <AdminContext.Provider value={products}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
