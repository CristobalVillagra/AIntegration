import { ReactNode } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { AOSProvider } from "@/components/aos-provider"
import { CartProvider } from "@/contexts/cart-context"
import { AuthModal } from "@/components/auth/auth-modal"
import { CartModal } from "@/components/cart/cart-modal"
import { CheckoutModal } from "@/components/cart/checkout-modal"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <AOSProvider>
          {/* Contenido de la aplicación */}
          {children}
          
          {/* Modales globales - pueden abrirse desde cualquier componente */}
          <AuthModal />      {/* Modal de login/registro */}
          <CartModal />      {/* Modal del carrito */}
          <CheckoutModal />  {/* Modal de checkout/pago */}
        </AOSProvider>
      </CartProvider>
    </AuthProvider>
  )
}