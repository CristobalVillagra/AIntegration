import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { CartItem } from "@/contexts/cart-context";

export const mercadopago = new MercadoPagoConfig({
  accessToken: (process.env.MP_ACCESS_TOKEN || "").trim()
});

interface Message {
  id: number;
  text: string;
}

const DB_PATH = "db/message.db";

// Asegurar que la carpeta db existe
if (!existsSync("db")) mkdirSync("db");
if (!existsSync(DB_PATH)) writeFileSync(DB_PATH, JSON.stringify([]));

const api = {
  message: {
    async list(): Promise<Message[]> {
      const db = readFileSync(DB_PATH);
      return JSON.parse(db.toString());
    },
    async add(message: Message): Promise<void> {
      const db = await api.message.list();
      if (db.some((_m) => _m.id === message.id)) throw new Error("Message already added");
      const draft = db.concat(message);
      writeFileSync(DB_PATH, JSON.stringify(draft, null, 2));
    },
  },

  // PROPIEDAD UNIFICADA (Sin duplicados)
  checkout: {
    async createPreference(items: CartItem[], userId: string) {
      try {
          // TEMPORAL: verificar que el token no está vacío
          const token = process.env.MP_ACCESS_TOKEN || ""
          console.log("Token primeros 12 chars:", token.substring(0, 12))
          console.log("Token length:", token.length)

          if (!token || token.length < 20) {
            throw new Error("MP_ACCESS_TOKEN vacío o inválido — revisa tu .env.local")
          }


          const preference = new Preference(mercadopago);
          // URL Base de tu App (Local: localhost:3000 | Prod: dev.aintegration.cl)
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

          const response = await preference.create({
            body: {
              items: items.map(item => ({
                id: item.serviceId,
                title: item.title,
                unit_price: Math.max(1, Math.round(item.price || 0)),
                quantity: Math.max(1, Number(item.quantity) || 1),
                currency_id: "CLP"
              })),
              metadata: {
                user_id: userId,
                services_ids: items.map(i => i.serviceId).join(",")
              },
              back_urls: {
                // CORREGIDO: Usamos baseUrl, no la URL de Supabase
                success: `${baseUrl}/pago-exitoso`,
                failure: `${baseUrl}/carrito`,
                pending: `${baseUrl}/pago-pendiente`,
              },
              auto_return: "approved",
              // Solo activar si tienes ngrok/tunnel funcionando
              // notification_url: `${process.env.WEBHOOK_URL}/api/webhooks/mercadopago`,
            }
          });

          // IMPORTANTE: Retornamos la respuesta completa
          return response;
        } catch (error) {
          console.error("Error detallado al crear preferencia:", error);
          throw error;
        }
      }
  }
  };

  export default api;