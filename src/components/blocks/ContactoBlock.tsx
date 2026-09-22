'use client'

import React, { useState } from 'react'

interface ContactoBlockProps {
  eyebrow?: string
  title?: string
  sub?: string
  formAction?: string
  subject?: string
  submitText?: string
}

export const ContactoBlock: React.FC<ContactoBlockProps> = ({
  eyebrow = 'TRABAJEMOS JUNTOS',
  title = '¿QUIERES VENDER\nNUESTROS PRODUCTOS?',
  sub = 'Déjanos tus datos y nos pondremos en contacto contigo.',
  formAction = 'https://formsubmit.co/maisondoreeliqueur@gmail.com',
  subject = 'Nuevo interesado en distribuir Maison Dorée',
  submitText = 'ENVIAR',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ message: string; type: 'idle' | 'success' | 'error' }>({
    message: '',
    type: 'idle',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ message: 'Enviando...', type: 'idle' })

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus({
          message: '¡Gracias! Nos pondremos en contacto contigo pronto.',
          type: 'success',
        })
        form.reset()
      } else {
        // If external service requires standard form submission
        form.submit()
      }
    } catch {
      // Fallback submit
      form.submit()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contacto"
      className="relative bg-[#240403] overflow-hidden pt-[clamp(56px,8vw,100px)] pb-0"
    >
      {/* Pattern background */}
      {/* <div
        className="absolute inset-0 bg-eagle-pattern opacity-40 pointer-events-none z-0"
        style={{ backgroundPosition: '0px 49px' }}
        aria-hidden="true"
      /> */}

      <div className="relative z-10 max-w-[760px] mx-auto px-[clamp(24px,5vw,60px)] text-center">
        {eyebrow && (
          <p className="font-script text-[20px] sm:text-[26px] tracking-wide text-white/95 mb-1 inline-block">
            {eyebrow}
          </p>
        )}

        {title && (
          <h2 className="font-display font-normal text-[clamp(30px,4.6vw,58px)] leading-[1.08] text-white my-[14px] whitespace-pre-line">
            {title}
          </h2>
        )}

        {sub && (
          <p className="font-sans text-[clamp(14px,1.4vw,19px)] text-white/90 mb-[clamp(32px,4.5vw,48px)]">
            {sub}
          </p>
        )}

        <form
          id="distribuidor-form"
          action={formAction}
          method="POST"
          onSubmit={handleSubmit}
          className="w-full text-center"
        >
          <input type="hidden" name="_subject" value={subject} />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="text"
            name="_honey"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-[clamp(16px,2.4vw,28px)] sm:gap-y-5 text-left mb-[clamp(24px,3.4vw,32px)]">
            <label className="flex flex-col gap-2">
              <span className="font-sans font-medium tracking-[0.06em] text-[12px] uppercase text-white/90">
                Nombre
              </span>
              <input
                type="text"
                name="Nombre"
                required
                autoComplete="name"
                placeholder="Tu nombre completo"
                className="font-sans text-[15px] text-white bg-[#f6efe1]/[0.06] border border-[#f6efe1]/50 rounded-[2px] px-3.5 py-3 outline-none transition-colors duration-200 placeholder:text-[#f6efe1]/45 focus:border-[#f6efe1]/95 focus:bg-[#f6efe1]/10"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-sans font-medium tracking-[0.06em] text-[12px] uppercase text-white/90">
                Empresa
              </span>
              <input
                type="text"
                name="Empresa"
                autoComplete="organization"
                placeholder="Nombre de tu empresa"
                className="font-sans text-[15px] text-white bg-[#f6efe1]/[0.06] border border-[#f6efe1]/50 rounded-[2px] px-3.5 py-3 outline-none transition-colors duration-200 placeholder:text-[#f6efe1]/45 focus:border-[#f6efe1]/95 focus:bg-[#f6efe1]/10"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-sans font-medium tracking-[0.06em] text-[12px] uppercase text-white/90">
                Ciudad
              </span>
              <input
                type="text"
                name="Ciudad"
                required
                autoComplete="address-level2"
                placeholder="Ej. Guayaquil, Quito, Cuenca..."
                className="font-sans text-[15px] text-white bg-[#f6efe1]/[0.06] border border-[#f6efe1]/50 rounded-[2px] px-3.5 py-3 outline-none transition-colors duration-200 placeholder:text-[#f6efe1]/45 focus:border-[#f6efe1]/95 focus:bg-[#f6efe1]/10"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-sans font-medium tracking-[0.06em] text-[12px] uppercase text-white/90">
                Teléfono
              </span>
              <input
                type="tel"
                name="Teléfono"
                required
                autoComplete="tel"
                placeholder="+593 99 999 9999"
                className="font-sans text-[15px] text-white bg-[#f6efe1]/[0.06] border border-[#f6efe1]/50 rounded-[2px] px-3.5 py-3 outline-none transition-colors duration-200 placeholder:text-[#f6efe1]/45 focus:border-[#f6efe1]/95 focus:bg-[#f6efe1]/10"
              />
            </label>

            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="font-sans font-medium tracking-[0.06em] text-[12px] uppercase text-white/90">
                Correo electrónico
              </span>
              <input
                type="email"
                name="Correo electrónico"
                required
                autoComplete="email"
                placeholder="tu@email.com"
                className="font-sans text-[15px] text-white bg-[#f6efe1]/[0.06] border border-[#f6efe1]/50 rounded-[2px] px-3.5 py-3 outline-none transition-colors duration-200 placeholder:text-[#f6efe1]/45 focus:border-[#f6efe1]/95 focus:bg-[#f6efe1]/10"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-outline w-full sm:max-w-[260px] cursor-pointer disabled:opacity-55 disabled:cursor-default font-script text-[clamp(16px,1.6vw,22px)] mx-auto"
          >
            {isSubmitting ? 'ENVIANDO...' : submitText}
          </button>

          <p
            className={`mt-4 min-h-[1.2em] font-sans text-sm ${
              status.type === 'error'
                ? 'text-[#e8b4a8]'
                : status.type === 'success'
                ? 'text-emerald-300'
                : 'text-white/80'
            }`}
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  )
}
