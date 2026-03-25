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

    const preference = await api.checkout.createPreference(items, userId);

    return NextResponse.json({
      id: preference.id,
      init_point: preference.init_point,
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("[Checkout API Error]:", message);
    
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
