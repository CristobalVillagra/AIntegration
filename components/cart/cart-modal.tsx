"use client"

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function CartModal() {
  const {
    items,
    itemCount,
    total,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    openCheckout, // Esta función ahora gatilla todo el proceso
    checkoutStatus, // Usamos esto para el estado de carga
  } = useCart()

  // =============================================================================
  // FUNCIÓN: INICIAR PROCESO DE PAGO
  // =============================================================================
  const handleProceedToCheckout = () => {
    // Ya no necesitas el fetch aquí ni el try/catch manual, 
    // porque el Context lo hace de forma centralizada.
    openCheckout() 
  }

  if (!isCartOpen) return null

  // Estado de carga derivado del contexto
  const isGeneratingPreference = checkoutStatus === "processing"

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" onClick={closeCart} />

      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background border-l border-border z-50 animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          
          {/* ... Header (se mantiene igual) ... */}

          {/* FOOTER CON LÓGICA DE MERCADO PAGO */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-lg font-semibold pt-2">
                  <span className="text-foreground">Total (Subtotal)</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-center italic">
                  * El IVA se calculará en el siguiente paso
                </p>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                disabled={isGeneratingPreference}
                onClick={handleProceedToCheckout}
              >
                {isGeneratingPreference ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando orden...
                  </>
                ) : (
                  <>
                    Proceder al Pago
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}