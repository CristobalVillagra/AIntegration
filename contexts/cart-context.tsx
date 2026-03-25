"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react"

export interface CartItem {
  id: string;          // ID único para React (key)
  serviceId: string;   // UUID de tu tabla de servicios
  title: string;       
  price: number;       // Numeric para la DB
  quantity: number;    
  description: string; 
}

export type CheckoutStatus = "idle" | "processing" | "success" | "error"

interface CartContextType {
  items: CartItem[]
  itemCount: number
  total: number
  addToCart: (item: Omit<CartItem, "id" | "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  isCheckoutOpen: boolean
  openCheckout: () => Promise<void> // Ahora es async
  closeCheckout: () => void
  checkoutStatus: CheckoutStatus
  preferenceId: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle")
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  
  // Usuario simulado (Asegúrate de obtener el UUID real de tu Auth)
  const [user] = useState({ id: "uuid-del-usuario-actual", name: "Cristobal" })

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const total = useMemo(() => 
    items.reduce((acc, item) => acc + (item.price * item.quantity), 0), 
    [items]
  )

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const addToCart = useCallback((newItem: Omit<CartItem, "id" | "quantity">) => {
    setItems(current => {
      const existing = current.find(item => item.serviceId === newItem.serviceId)
      if (existing) {
        return current.map(item => 
          item.serviceId === newItem.serviceId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...current, { ...newItem, id: `cart_${Date.now()}`, quantity: 1 }]
    })
    setIsCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setItems(current => current.filter(item => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id)
    setItems(current => current.map(item => item.id === id ? { ...item, quantity } : item))
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
    setPreferenceId(null)
    setCheckoutStatus("idle")
  }, [])

  // Esta es la función clave que conecta con Mercado Pago
  const openCheckout = useCallback(async () => {
    if (items.length === 0) return

    setIsCartOpen(false)
    setIsCheckoutOpen(true)
    setCheckoutStatus("processing")
    setPreferenceId(null) // Limpiamos ID anterior

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          userId: user.id // <--- Pasamos el UUID para que llegue al Webhook
        }),
      })

      const data = await res.json()
      console.log("Respuesta de la API:", data)

      if (data.id) {
        setPreferenceId(data.id)
        setCheckoutStatus("idle")
      } else {
        console.error("Data recibida sin ID:", data)
        throw new Error("No se recibió Preference ID")
      }
    } catch (e) {
      console.error("Error al crear preferencia:", e)
      setCheckoutStatus("error")
    }
  }, [items, user.id])

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false)
    setPreferenceId(null)
    setCheckoutStatus("idle")
  }, [])

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      checkoutStatus,
      preferenceId
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}