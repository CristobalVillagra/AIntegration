import { mercadopago } from "@/lib/api"; // Asegúrate que aquí exportas el objeto MercadoPagoConfig
import { Payment } from "mercadopago";
import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase"; // Descomenta cuando lo tengas listo

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("data.id");

    // Mercado Pago a veces envía el ID por query params en lugar del body
    if (type === "payment" && id) {
      const paymentClient = new Payment(mercadopago);
      const payment = await paymentClient.get({ id });

      if (payment.status === "approved") {
        // EXTRAER DATA: Mercado Pago convierte la metadata a minúsculas
        // Si en la preferencia enviaste 'userId', aquí llega como 'user_id'
        const userUuid = payment.metadata?.user_id; 
        const servicesUuids = payment.metadata?.services_uuids; 

        const datosPago = {
          uuid_usuario: userUuid,
          uuid_servicio: servicesUuids, // Si es un array, asegúrate que tu tabla acepte JSON o UUID[]
          monto: payment.transaction_amount,
          estado: "aprobado",
          id_transaccion_mp: payment.id?.toString(),
          metodo_pago: payment.payment_method_id,
          fecha_pago: new Date().toISOString()
        };

        console.log("✅ Pago aprobado para AIntegration:", datosPago);

        // Ejemplo de inserción en Supabase:
        // const { error } = await supabase.from('pagos').insert(datosPago);
        // if (error) throw error;
      }
    }

    // SIEMPRE retornar 200 rápido para que MP no piense que el server se cayó
    return new NextResponse(null, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error en Webhook:", error.message);
    // Retornamos 500 para que MP reintente el envío
    return new NextResponse("Error interno", { status: 500 });
  }
}