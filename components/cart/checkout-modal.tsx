"use client"

import { useEffect, useState, useRef } from "react"
import { X, Loader2, Shield, AlertCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// Variable para rastrear si ya se inicializó
let mpInitialized = false;

export function CheckoutModal() {
  const { items, total, isCheckoutOpen, closeCheckout, preferenceId: contextPreferenceId, checkoutStatus } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [mpReady, setMpReady] = useState(false)
  const initRef = useRef(false)

  const finalTotal = Math.round(total * 1.19) // IVA Chile 19%

  // Inicializar MercadoPago solo una vez
  useEffect(() => {
    if (!mpInitialized && process.env.NEXT_PUBLIC_MP_PUBLIC_KEY) {
      initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
      mpInitialized = true;
      setMpReady(true);
    } else if (mpInitialized) {
      setMpReady(true);
    }
  }, [])

  // Limpiar error cuando se cierra
  useEffect(() => {
    if (!isCheckoutOpen) {
      setError(null)
    }
  }, [isCheckoutOpen])

  if (!isCheckoutOpen) return null

  const isLoading = checkoutStatus === "processing"
  const hasPreference = !!contextPreferenceId && mpReady

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={closeCheckout} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl p-6">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-primary">Finalizar Compra</h2>
            <button onClick={closeCheckout} className="hover:bg-secondary p-2 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Resumen de compra */}
          <div className="bg-secondary/20 p-4 rounded-xl mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Resumen de tu orden</h3>
            <div className="space-y-2 mb-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground">{item.title} x{item.quantity}</span>
                  <span className="text-muted-foreground">${(item.price * item.quantity).toLocaleString("es-CL")}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">IVA (19%)</span>
                <span>${Math.round(total * 0.19).toLocaleString("es-CL")}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total a pagar</span>
                <span className="text-primary">${finalTotal.toLocaleString("es-CL")}</span>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-10 gap-3">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
              <p className="text-sm text-muted-foreground text-center">Conectando con MercadoPago...</p>
            </div>
          )}

          {checkoutStatus === "error" && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex gap-3 mb-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Error al conectar con MercadoPago</p>
                <p className="text-xs mt-1">Verifica tu conexion e intenta nuevamente</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex gap-3 mb-4">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Brick de pago de MercadoPago */}
          {hasPreference && (
            <div id="payment-brick-container" className="animate-in fade-in duration-500">
              <Payment
                initialization={{
                  amount: finalTotal,
                  preferenceId: contextPreferenceId,
                }}
                customization={{
                  paymentMethods: {
                    bankTransfer: "all",
                    creditCard: "all",
                    debitCard: "all",
                    maxInstallments: 12
                  },
                }}
                onSubmit={async (param) => {
                  console.log("Pago procesado:", param);
                }}
                onError={(error) => {
                  console.error("Error en Payment Brick:", error);
                  setError("Error al procesar el pago");
                }}
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 border-t pt-4 opacity-60">
            <Shield className="h-4 w-4 text-green-600" /> 
            <span className="text-xs font-medium">Transaccion protegida por MercadoPago</span>
          </div>
        </div>
      </div>
    </>
  )
}
