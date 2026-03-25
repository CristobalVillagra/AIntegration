"use client"

import { ArrowDown, Sparkles, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export function HeroBanner() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            data-aos="fade-down"
            data-aos-delay="100"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Soluciones Tecnologicas para tu Negocio</span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-balance text-foreground"
          >
            Transformamos tu negocio con{" "}
            <span className="text-primary">Inteligencia Artificial</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty"
          >
            Desde desarrollo web hasta integraciones de IA avanzadas. 
            Cotiza tus servicios de informatica y lleva tu empresa al siguiente nivel.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg"
              asChild
            >
              <Link href="#cotizar">
                <Zap className="mr-2 h-5 w-5" />
                Cotizar Servicios
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary hover:text-primary px-8 py-6 text-lg"
              asChild
            >
              <Link href="#servicios">
                <Shield className="mr-2 h-5 w-5" />
                Ver Servicios
              </Link>
            </Button>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: "+Rapido", label: "Para tus Proyectos" },
              { value: "+Flexible", label: "Con nuestro Clientes" },
              { value: "99%", label: "Satisfaccion" },
              { value: "24/7", label: "Soporte" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Link
            href="#servicios"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm items-center gap-2">Explorar</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  )
}
