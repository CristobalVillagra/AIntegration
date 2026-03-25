
import { AuthModal } from "@/components/auth/auth-modal"
import { Header } from "@/components/landing/header"
import { HeroBanner } from "@/components/landing/hero-banner"
import { ServicesSection } from "@/components/landing/services-section"
import { AboutSection } from "@/components/landing/about-section"
import { QuoteForm } from "@/components/landing/quote-form"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AuthModal />
      <Header />
      <main>
        <HeroBanner />
        <ServicesSection />
        <AboutSection />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  )
}
