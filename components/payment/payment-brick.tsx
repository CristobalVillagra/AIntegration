"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export function PaymentBrick({ preferenceId }: { preferenceId: string }) {
  useEffect(() => {
    const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
    const bricksBuilder = mp.bricks();

    const renderPaymentBrick = async (bricksBuilder: any) => {
      const settings = {
        initialization: {
          amount: 150000, // Aquí deberías pasar el total de tu carrito
          preferenceId: preferenceId,
        },
        customization: {
          paymentMethods: {
            ticket: "all",
            bankTransfer: "all",
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
          },
        },
        callbacks: {
          onReady: () => {
            console.log("Brick listo")
          },
          onSubmit: ({ selectedPaymentMethod, formData }: any) => {
            // Aquí puedes manejar lógica extra antes del envío
            console.log("Formulario enviado", formData)
          },
          onError: (error: any) => {
            console.error("Error en el Brick", error)
          },
        },
      };
      
      // 'paymentCardBrick_container' es el ID del div donde se dibujará
      await bricksBuilder.create("payment", "payment-brick-container", settings);
    };

    renderPaymentBrick(bricksBuilder);
  }, [preferenceId]);

  return <div id="payment-brick-container"></div>;
}