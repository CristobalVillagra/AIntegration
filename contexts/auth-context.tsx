"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react"
import { supabase } from "@/lib/supabase" // Asegúrate de que esta ruta sea correcta

// =============================================================================
// TIPOS DE DATOS
// =============================================================================

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  isAuthModalOpen: boolean
  authModalView: "login" | "register"
  openAuthModal: (view?: "login" | "register") => void
  closeAuthModal: () => void
  setAuthModalView: (view: "login" | "register") => void
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  requireAuth: (callback: () => void) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Empezamos en true para verificar la sesión inicial
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login")
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null)

  const isLoggedIn = user !== null

  // =============================================================================
  // PERSISTENCIA DE SESIÓN (EL MOTOR)
  // =============================================================================
  
  useEffect(() => {
    // 1. Verificar sesión activa al cargar la página
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          name: session.user.user_metadata.full_name ?? session.user.email?.split('@')[0] ?? "Usuario",
        })
      }
      setIsLoading(false)
    }

    checkSession()

    // 2. Escuchar cambios de estado (Login, Logout, Token renovado)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((evnt, session) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          name: session.user.user_metadata.full_name ?? session.user.email?.split('@')[0] ?? "Usuario",
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // =============================================================================
  // FUNCIONES DE CONTROL
  // =============================================================================

  const openAuthModal = useCallback((view: "login" | "register" = "login") => {
    setAuthModalView(view)
    setIsAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(true) // Esto debería ser false, lo corregí abajo
    setIsAuthModalOpen(false)
    setPendingCallback(null)
  }, [])

  const requireAuth = useCallback((callback: () => void) => {
    if (isLoggedIn) {
      callback()
    } else {
      setPendingCallback(() => callback)
      openAuthModal("login")
    }
  }, [isLoggedIn, openAuthModal])

  // =============================================================================
  // AUTENTICACIÓN REAL CON SUPABASE
  // =============================================================================

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      setIsAuthModalOpen(false)
      if (pendingCallback) {
        pendingCallback()
        setPendingCallback(null)
      }
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }, [pendingCallback])

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })
      if (error) throw error

      // Si el usuario se crea pero requiere confirmar email, Supabase no inicia sesión de inmediato
      if (data.user && data.session) {
        setIsAuthModalOpen(false)
        if (pendingCallback) {
          pendingCallback()
          setPendingCallback(null)
        }
      } else {
        return { success: true, error: "Por favor, verifica tu correo electrónico." }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }, [pendingCallback])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user, isLoggedIn, isLoading, isAuthModalOpen, authModalView,
        openAuthModal, closeAuthModal, setAuthModalView,
        login, register, logout, requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error("useAuth debe usarse dentro de un AuthProvider")
  return context
}