"use client"

import { CheckCircle, Users, Target, Award } from "lucide-react"

const features = [
  "Equipo de expertos certificados",
  "Metodologias agiles de trabajo",
  "Soporte tecnico 24/7",
  "Proyectos a medida",
  "Tecnologias de vanguardia",
  "Precios competitivos",
]

const highlights = [
  {
    icon: Users,
    title: "Equipo Experto",
    description: "Profesionales con anos de experiencia en el sector tecnologico.",
  },
  {
    icon: Target,
    title: "Enfoque Personalizado",
    description: "Cada proyecto es unico y merece una solucion a medida.",
  },
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Comprometidos con la excelencia en cada entrega.",
  },
]

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span
              data-aos="fade-right"
              className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              Sobre Nosotros
            </span>
            <h2
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            >
              Impulsamos la transformacion digital de tu negocio
            </h2>
            <p
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              En AIntegration combinamos creatividad, tecnologia y experiencia 
              para ofrecer soluciones informaticas que realmente marcan la diferencia. 
              Nuestro objetivo es ser tu socio estrategico en el camino hacia la innovacion.
            </p>

            <div
              data-aos="fade-right"
              data-aos-delay="300"
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Highlight Cards */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                data-aos="fade-left"
                data-aos-delay={100 + index * 100}
                className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
