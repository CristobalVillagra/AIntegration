import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, userId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No hay items en el carrito" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Usuario no identificado" },
        { status: 400 }
      );
    }

    // Obtener baseUrl desde el request header o env vars
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const preference = await api.checkout.createPreference(items, userId, baseUrl);

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
    });

  } catch (error: unknown) {
    console.error("[Checkout FULL ERROR]:", error)

    // El SDK de MP lanza objetos planos, no instancias de Error
    const message =
      error instanceof Error
        ? error.message
        : (error as any)?.message || "Error desconocido"

    const status = (error as any)?.status || 500

    return NextResponse.json({ error: message }, { status })
  }
}
