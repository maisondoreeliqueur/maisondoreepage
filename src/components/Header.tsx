'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface NavLink {
  label: string
  url: string
}

interface HeaderProps {
  data?: {
    logoPath?: string
    subtitle?: string
    navLinksLeft?: NavLink[]
    navLinksRight?: NavLink[]
  }
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const logoPath = data?.logoPath || '/images/wordmark.png'
  const subtitle = data?.subtitle || 'Ecuadorian & French cream licor'
  const navLinksLeft =
    data?.navLinksLeft !== undefined
      ? data.navLinksLeft
      : [
          { label: 'PRODUCTO', url: '#productos' },
          { label: 'HISTORIA', url: '#historia' },
        ]
  const navLinksRight =
    data?.navLinksRight !== undefined
      ? data.navLinksRight
      : [
          { label: 'DONDE ENCONTRARNOS', url: '#donde' },
          { label: 'CONTACTANOS', url: '#contacto' },
        ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[clamp(88px,9vw,120px)] bg-[#390604] transition-shadow duration-300 flex items-center px-4 md:px-8 ${
        isScrolled ? 'shadow-2xl shadow-black/40' : ''
      }`}
    >
      <nav className="w-full max-w-[1320px] mx-auto flex items-center justify-between relative">
        {/* Left Nav Links (Desktop) */}
        <ul className="hidden lg:flex items-center gap-8 text-[17px] md:text-[17px] font-sans tracking-wider text-white">
          {navLinksLeft.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.url}
                className="hover:text-amber-200 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center Brand */}
        <Link
          href="/"
          onClick={(e) => {
            if (typeof window !== 'undefined' && window.location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.replaceState(null, '', '/')
            }
            setIsOpen(false)
          }}
          className="flex flex-col items-center lg:mx-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <div className="relative h-7 md:h-11 w-36 md:w-56">
            <Image
              src={logoPath}
              alt="Maison Dorée"
              fill
              priority
              sizes="(max-width: 768px) 144px, 224px"
              className="object-contain"
            />
          </div>
          <span className="text-[11px] md:text-[14px] font-script text-white/90 mt-1 tracking-wide text-center">
            {subtitle}
          </span>
        </Link>

        {/* Right Nav Links (Desktop) */}
        <ul className="hidden lg:flex items-center gap-8 text-[17px] md:text-[17px] font-sans tracking-wider text-white">
          {navLinksRight.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.url}
                className="hover:text-amber-200 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
          aria-expanded={isOpen}
          className="lg:hidden p-2 text-white focus:outline-none ml-auto"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`h-0.5 bg-white transition-all ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-all ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 bg-white transition-all ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#390604] shadow-2xl py-6 flex flex-col items-center gap-4 text-white font-sans text-lg md:text-xl tracking-wider text-center border-t border-white/10">
            {navLinksLeft.concat(navLinksRight).map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                onClick={() => setIsOpen(false)}
                className="hover:text-amber-200 py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
