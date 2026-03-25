"use client"

import { useEffect, useState } from "react"
import { X, Loader2, Shield, AlertCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

// INICIALIZACIÓN ÚNICA: Usa la Public Key con el prefijo NEXT_PUBLIC_
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

export function CheckoutModal() {
  const { items, total, isCheckoutOpen, closeCheckout } = useCart()
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const finalTotal = total * 1.16 // IVA Chile

  // 1. Crear la preferencia de pago
  useEffect(() => {
    if (isCheckoutOpen && items.length > 0) {
      const fetchPreference = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              items, 
              userId: "ID_DEL_USUARIO_AQUÍ" // Cámbialo por tu variable de usuario real
            }),
          })
          const data = await res.json()
          if (data.id) {
            setPreferenceId(data.id)
          } else {
            throw new Error("Error al obtener el ID")
          }
        } catch (err) {
          setError("No se pudo conectar con Mercado Pago")
        } finally {
          setIsLoading(false)
        }
      }
      fetchPreference()
    }
  }, [isCheckoutOpen, items])

  if (!isCheckoutOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" onClick={closeCheckout} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-2xl shadow-2xl p-6">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-primary">Finalizar Compra - AIntegration</h2>
            <button onClick={closeCheckout} className="hover:bg-secondary p-1 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-secondary/20 p-4 rounded-xl mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total a pagar (IVA incl.):</span>
              <span className="text-primary">${Math.round(finalTotal).toLocaleString()}</span>
            </div>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-10 gap-3">
              <Loader2 className="animate-spin h-8 w-8 text-primary" />
              <p className="text-sm text-muted-foreground text-center">Iniciando pasarela segura...</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex gap-3 mb-4">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* BRICK DE PAGO: Usamos el componente oficial de la librería */}
          {preferenceId && (
            <div id="payment-brick-container" className="animate-in fade-in duration-500">
              <Payment
                initialization={{
                  amount: Math.round(finalTotal),
                  preferenceId: preferenceId,
                }}
                customization={{
                  paymentMethods: {
                    ticket: ["pec"], // Opciones para Chile (pago en efectivo)
                    bankTransfer: ["all"],
                    creditCard: "all",
                    debitCard: "all",
                    maxInstallments: 12
                  },
                }}
                onSubmit={async (param) => {
                  console.log("Pago enviado", param);
                }}
              />
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 border-t pt-4 opacity-60">
            <Shield className="h-4 w-4 text-green-600" /> 
            <span className="text-xs font-medium">Transacción protegida por Mercado Pago</span>
          </div>
        </div>
      </div>
    </>
  )
}