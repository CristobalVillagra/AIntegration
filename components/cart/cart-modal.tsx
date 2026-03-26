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
    openCheckout,
    checkoutStatus,
  } = useCart()

  const handleProceedToCheckout = () => {
    openCheckout()
  }

  if (!isCartOpen) return null

  const isGeneratingPreference = checkoutStatus === "processing"

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200" 
        onClick={closeCart} 
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l border-border z-50 animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Mi Carrito
              </h2>
              {itemCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-medium">Tu carrito esta vacio</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Explora nuestros servicios y agrega lo que necesites
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl p-4 transition-all hover:border-primary/30"
                  >
                    {/* Info del producto */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-2">
                        <h3 className="font-semibold text-foreground text-sm">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors group"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive" />
                      </button>
                    </div>

                    {/* Precio y cantidad */}
                    <div className="flex items-center justify-between">
                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-background rounded-md transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-background rounded-md transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Precio */}
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          ${item.price.toLocaleString("es-CL")} c/u
                        </p>
                        <p className="font-bold text-primary">
                          ${(item.price * item.quantity).toLocaleString("es-CL")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer con resumen y boton de pago */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-4 bg-card/50">
              {/* Resumen de items */}
              <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Productos ({itemCount})</span>
                  <span className="text-foreground">${total.toLocaleString("es-CL")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA (19%)</span>
                  <span className="text-foreground">${Math.round(total * 0.19).toLocaleString("es-CL")}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${Math.round(total * 1.19).toLocaleString("es-CL")}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
                disabled={isGeneratingPreference}
                onClick={handleProceedToCheckout}
              >
                {isGeneratingPreference ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generando orden...
                  </>
                ) : (
                  <>
                    Proceder al Pago
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-[10px] text-muted-foreground text-center">
                Seras redirigido a MercadoPago para completar tu compra de forma segura
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
