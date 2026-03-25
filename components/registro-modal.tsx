"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase' // Asegúrate de tener tu cliente Supabase configurado correctamente

export default function RegistroModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // VALIDACIÓN: ¿Coinciden las claves?
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    // PISTA: Aquí insertamos en la tabla 'usuarios'
    const { data, error } = await supabase
      .from('usuarios')
      .insert([
        { 
          nombre: formData.nombre, 
          email: formData.email, 
          password_hash: formData.password // Nota: En producción usa Supabase Auth para el hashing
        }
      ])

    if (error) {
      console.error("Error:", error.message)
      alert("Hubo un error al registrar")
    } else {
      alert("¡Usuario registrado con éxito!")
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Botón que dispara el modal (Tu botón de Inicio de Sesión) */}
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        Crear Cuenta
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background border p-8 rounded-xl shadow-2xl w-full max-w-md relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-muted-foreground">X</button>
            
            <h2 className="text-2xl font-bold mb-6">Únete a AIntegration</h2>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <input 
                type="text" placeholder="Nombre completo" required
                className="w-full p-3 rounded bg-secondary/50 border border-border"
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              />
              <input 
                type="email" placeholder="Email" required
                className="w-full p-3 rounded bg-secondary/50 border border-border"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" placeholder="Contraseña" required
                className="w-full p-3 rounded bg-secondary/50 border border-border"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <input 
                type="password" placeholder="Confirmar contraseña" required
                className="w-full p-3 rounded bg-secondary/50 border border-border"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              
              <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}