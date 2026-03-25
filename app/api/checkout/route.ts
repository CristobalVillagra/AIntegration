import { NextRequest, NextResponse } from "next/server";
import api from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const { items, userId } = await req.json();

    // 1. Llamamos a la función de tu librería
    const preference = await api.checkout.createPreference(items, userId);

    // 2. DEBUG CRÍTICO: Mira tu TERMINAL (la negra)
    console.log("Objeto devuelto por Mercado Pago:", preference);

    // 3. Mercado Pago SDK v2 devuelve un objeto con el ID en la raíz o en .id
    // Si 'preference' ya es la respuesta, devolvemos el ID.
    if (preference && preference.id) {
      return NextResponse.json({ id: preference.id });
    }

    // Si llegamos aquí, es que 'preference' no tiene ID
    return NextResponse.json({ error: "Respuesta de MP sin ID", data: preference }, { status: 500 });

  } catch (error: any) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}