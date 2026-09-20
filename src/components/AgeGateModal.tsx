'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

interface AgeGateModalProps {
  enabled?: boolean
  title?: string
  message?: string
  confirmText?: string
  rejectText?: string
}

const STORAGE_KEY = 'maison_doree_age_verified'

export const AgeGateModal: React.FC<AgeGateModalProps> = ({
  enabled = true,
  title = 'BIENVENIDO A MAISON DORÉE',
  message = 'Debes ser mayor de 18 años para ingresar a nuestro sitio web y conocer nuestros licores artesanales.',
  confirmText = 'SÍ, SOY MAYOR DE 18 AÑOS',
  rejectText = 'NO, SOY MENOR DE EDAD',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    if (!enabled) {
      setIsOpen(false)
      return
    }

    // Don't show modal if already on underage page
    if (pathname === '/menor-de-edad') {
      setIsOpen(false)
      return
    }

    const isVerified = localStorage.getItem(STORAGE_KEY) === 'true'
    if (!isVerified) {
      setIsOpen(true)
    }
  }, [enabled, pathname])

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsOpen(false)
  }

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, 'false')
    setIsOpen(false)
    router.push('/menor-de-edad')
  }

  if (!isMounted || !isOpen || !enabled || pathname === '/menor-de-edad') {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        style={{ fontFamily: 'var(--font-sans), "Montserrat", sans-serif' }}
        className="relative w-full max-w-lg font-sans bg-gradient-to-b from-[#3a0805] via-[#240403] to-[#190202] border border-[#f6efe1]/30 rounded-2xl shadow-2xl p-6 sm:p-10 text-center overflow-hidden"
      >
        {/* Background Pattern */}
        {/* <div
          className="absolute inset-0 bg-eagle-pattern opacity-30 pointer-events-none"
          aria-hidden="true"
        /> */}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo / Eagle */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 opacity-95">
            <Image
              src="/images/logo.png"
              alt="Maison Dorée"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>

          {/* <p className="font-script text-amber-200/90 text-sm sm:text-base tracking-[0.2em] uppercase mb-2">
            Verificación de Edad
          </p> */}

          <h2
            id="age-gate-title"
            className="font-display text-2xl sm:text-3xl text-white font-normal leading-tight mb-4 whitespace-pre-line"
          >
            {title}
          </h2>

          <div className="w-20 h-[1px] bg-white/30 mb-5" />

          <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed mb-8 max-w-md">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="w-full flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              style={{ fontFamily: 'var(--font-sans), "Montserrat", sans-serif' }}
              className="btn-outline w-full max-w-xs !font-sans text-lg sm:text-xl py-3 px-6 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 border-white/80 text-white shadow-lg transition-all duration-200 active:scale-95"
            >
              {confirmText}
            </button>

            <button
              type="button"
              onClick={handleReject}
              style={{ fontFamily: 'var(--font-sans), "Montserrat", sans-serif' }}
              className="text-xs sm:text-sm font-sans tracking-[0.08em] uppercase text-white/60 hover:text-white/95 underline-offset-4 hover:underline cursor-pointer transition-colors py-2"
            >
              {rejectText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
