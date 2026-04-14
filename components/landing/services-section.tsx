"use client"

import {
  Code,
  Brain,
  Database,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Definimos los servicios con la estructura exacta que espera tu carrito
const services = [
  {
    icon: Code,
    serviceId: "web-development",
    title: "Desarrollo Web",
    description: "Sitios web modernos, responsivos y optimizados. Desde landing pages hasta aplicaciones web complejas.",
    features: ["Hosting", "Certificado SSL", "Correos Corporativos", "SEO Básico"],
    price: 150000,
  },
  {
    icon: Brain,
    serviceId: "ai-integration",
    title: "Integración de IA",
    description: "Implementamos soluciones de inteligencia artificial para automatizar y optimizar tus procesos de negocio.",
    features: ["Chatbots", "Análisis de Datos", "Automatizaciones", "Modelos Personalizados"],
    price: 500000,
  },
  {
    icon: Database,
    serviceId: "database-management",
    title: "Bases de Datos",
    description: "Diseño, migración y optimización de bases de datos. Aseguramos la integridad de tu información.",
    features: ["SQL / NoSQL", "Migraciones", "Backups Automáticos"],
    price: 350000,
  },
]

export function ServicesSection() {
  const scrollToCotizar = () => {
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="servicios" className="py-24 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-3">
            Servicios Profesionales
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Soluciones tecnológicas para el mundo real
          </h3>
          <p className="text-muted-foreground text-lg">
            Potenciamos tu presencia digital con herramientas de última generación y soporte especializado.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.serviceId}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative group bg-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
            >
              {/* Icono con efecto de resplandor */}
              <div className="relative w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <service.icon className="h-8 w-8 text-primary z-10" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </div>

              <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Lista de Features con checks */}
              <ul className="space-y-4 mb-8 flex-grow">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Precio y Acciones */}
              <div className="pt-6 border-t border-border mt-auto">
                <div className="flex flex-col mb-6">
                  <span className="text-xs text-muted-foreground uppercase font-medium">Inversión desde</span>
                  <span className="text-3xl font-black text-primary">
                    ${service.price.toLocaleString('es-CL')}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                    onClick={scrollToCotizar}
                  >
                    Contratar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}