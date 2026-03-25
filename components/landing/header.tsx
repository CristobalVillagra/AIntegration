"use client"


import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogOut, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"


const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#cotizar", label: "Cotizar" },
  { href: "#contacto", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Hook de autenticación
  const { isLoggedIn, user, openAuthModal, logout } = useAuth()

  // Hook del carrito - para mostrar el contador y abrir el modal
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="#inicio" className="flex items-center group">
            <div className="relative h-12 w-48 lg:h-16 lg:w-64 flex items-center justify-start">
              {/* Contenedor más ancho para que quepa el banner completo */}

              <Image
                src="/banner-logo.png"
                alt="AIntegration Logo Banner"
                fill
                priority
                className="z-10 object-contain transition-all duration-500 group-hover:scale-105 multiply-mix"

              />

              {/* Resplandor de fondo ajustado al nuevo tamaño */}
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* =================================================================
              ACCIONES DESKTOP (Carrito + Auth)
          ================================================================= */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Botón del carrito con contador */}
            <Button
              variant="outline"
              size="icon"
              className="relative border-border hover:border-primary hover:text-primary"
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {/* Badge con contador de items */}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>

            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                // Usuario logueado - Mostrar menú de usuario
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {user?.name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    className="border-border text-muted-foreground hover:text-destructive hover:border-destructive"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Salir
                  </Button>
                </>
              ) : (
                // Usuario no logueado - Mostrar botones de auth
                <>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => openAuthModal("login")}
                  >
                    Iniciar Sesion
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => openAuthModal("register")}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>


            {/* =================================================================
              BOTONES MÓVIL (Carrito + Menú hamburguesa)
          ================================================================= */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Botón del carrito móvil */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Button>

              <button
                className="lg:hidden p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {isMobileMenuOpen && (
              <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
                <nav className="flex flex-col py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border mt-4">
                    {isLoggedIn ? (
                      // Usuario logueado en móvil
                      <>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {user?.name}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full border-destructive text-destructive"
                          onClick={() => {
                            logout()
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Cerrar Sesion
                        </Button>
                      </>
                    ) : (
                      // Usuario no logueado en móvil
                      <>
                        <Button
                          variant="outline"
                          className="w-full border-primary text-primary"
                          onClick={() => {
                            openAuthModal("login")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          Iniciar Sesion
                        </Button>
                        <Button
                          className="w-full bg-primary text-primary-foreground"
                          onClick={() => {
                            openAuthModal("register")
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          Registrarse
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}