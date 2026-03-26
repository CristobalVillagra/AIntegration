import { MercadoPagoConfig, Preference } from "mercadopago";
import { CartItem } from "@/contexts/cart-context";

// Configuración de MercadoPago con validación
const accessToken = process.env.MP_ACCESS_TOKEN?.trim();

if (!accessToken) {
  console.warn("[MercadoPago] MP_ACCESS_TOKEN no configurado");
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: accessToken || ""
});

// Tipos para MercadoPago
interface PreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

const api = {
  checkout: {
    async createPreference(items: CartItem[], userId: string, baseUrl: string): Promise<PreferenceResponse> {
      const token = process.env.MP_ACCESS_TOKEN?.trim();

      if (!token || token.length < 20) {
        throw new Error("MP_ACCESS_TOKEN no configurado o inválido");
      }

      if (!items || items.length === 0) {
        throw new Error("No hay items en el carrito");
      }

      if (!baseUrl) {
        throw new Error("baseUrl es requerida para MercadoPago");
      }

      const preference = new Preference(mercadopago);
      const isLocalhost = baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")

      const response = await preference.create({
        body: {
          items: items.map(item => ({
            id: String(item.serviceId),
            title: item.title,
            unit_price: Math.max(1, Math.round(item.price || 0)),
            quantity: Math.max(1, Number(item.quantity) || 1),
            currency_id: "CLP"
          })),
          metadata: {
            user_id: userId,
            services_ids: items.map(i => i.serviceId).join(",")
          },
          // back_urls solo si la URL es pública
          ...(!isLocalhost && {
            back_urls: {
              success: `${baseUrl}/pago-exitoso`,
              failure: `${baseUrl}/carrito`,
              pending: `${baseUrl}/pago-pendiente`,
            },
            auto_return: "approved",
          }),
        }
    });
  console.log("[MP RAW RESPONSE]:", JSON.stringify(response, null, 2))
      if(!response?.id) {
    throw new Error("MercadoPago no devolvió un ID de preferencia válido");
  }

      return response as PreferenceResponse;
}
  }
};

export default api;
