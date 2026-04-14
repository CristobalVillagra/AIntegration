
import { Header } from "@/components/landing/header"
import { HeroBanner } from "@/components/landing/hero-banner"
import { ServicesSection } from "@/components/landing/services-section"
import { AboutSection } from "@/components/landing/about-section"
import { QuoteForm } from "@/components/landing/quote-form"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <ServicesSection />
        <AboutSection />
        <QuoteForm />
          <p className="mt-2 text-muted-foreground">
        El botón de WhatsApp está fijo en la esquina inferior derecha.
      </p>
      </main>
      <Footer />
    </div>
  )
}
