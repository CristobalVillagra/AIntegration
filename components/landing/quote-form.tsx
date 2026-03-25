"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const services = [
  "Desarrollo Web",
  "Integracion de IA",
  "Bases de Datos",
  "Ciberseguridad",
  "Apps Moviles",
  "Cloud & DevOps",
  "Soporte Tecnico",
  "Consultoria IT",
  "Otro",
]

const budgets = [
  "Menos de $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "Mas de $25,000",
]

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="cotizar" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span
              data-aos="fade-up"
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Cotiza tu Proyecto
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance"
            >
              Solicita una cotizacion gratuita
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-muted-foreground max-w-2xl mx-auto text-lg"
            >
              Cuentanos sobre tu proyecto y te enviaremos una propuesta personalizada en menos de 24 horas.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-card border border-border rounded-3xl p-6 sm:p-8 lg:p-12"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">Solicitud Enviada</h3>
                <p className="text-muted-foreground">
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Nombre completo *</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      required
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Correo electronico *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Telefono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 890"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground">Empresa</Label>
                    <Input
                      id="company"
                      placeholder="Nombre de tu empresa"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground">Servicio de interes *</Label>
                    <Select required>
                      <SelectTrigger className="bg-background border-border focus:border-primary">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase().replace(/ /g, "-")}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-foreground">Presupuesto estimado</Label>
                    <Select>
                      <SelectTrigger className="bg-background border-border focus:border-primary">
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgets.map((budget) => (
                          <SelectItem key={budget} value={budget.toLowerCase().replace(/ /g, "-")}>
                            {budget}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Describe tu proyecto *</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuentanos los detalles de tu proyecto, objetivos, plazos y cualquier informacion relevante..."
                    rows={5}
                    required
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Solicitud
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Al enviar aceptas nuestra politica de privacidad. No compartiremos tu informacion.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
