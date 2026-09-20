'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/lib/media'

export interface FlavorItem {
  id?: number | string
  name: string
  order?: number | null
  bottle750?: any
  bottle750Url?: string | null
  bottle375?: any
  bottle375Url?: string | null
  bottle160?: any
  bottle160Url?: string | null
}

interface SaboresCarouselBlockProps {
  eyebrow?: string
  autoPlayMs?: number
  flavors?: FlavorItem[]
}

const resolveBottleUrl = (
  mediaField: any,
  fallbackUrl?: string | null,
  defaultAsset: string = ''
): string => {
  return (
    getMediaUrl(mediaField) ||
    (typeof fallbackUrl === 'string' && fallbackUrl ? fallbackUrl : '') ||
    (typeof mediaField === 'string' && mediaField ? mediaField : '') ||
    defaultAsset
  )
}

const defaultFlavors: FlavorItem[] = [
  {
    name: 'CRÉME CAPPUCCINO',
    bottle750Url: '/images/bottle-creme.png',
    bottle375Url: '/images/ticket-creme.png',
    bottle160Url: '/images/mini-creme.png',
  },
  {
    name: 'BRISE MENTHOLÉE',
    bottle750Url: '/images/bottle-brise.png',
    bottle375Url: '/images/ticket-brise.png',
    bottle160Url: '/images/mini-brise.png',
  },
  {
    name: 'VANILLE CLASSIQUE',
    bottle750Url: '/images/bottle-vanille.png',
    bottle375Url: '/images/ticket-vanille.png',
    bottle160Url: '/images/mini-vanille.png',
  },
  {
    name: 'NUIT DE CACAO',
    bottle750Url: '/images/bottle-cacao.png',
    bottle375Url: '/images/ticket-cacao.png',
    bottle160Url: '/images/mini-cacao.png',
  },
]

export const SaboresCarouselBlock: React.FC<SaboresCarouselBlockProps> = ({
  eyebrow = 'DESCUBRE LOS SABORES',
  autoPlayMs = 2000,
  flavors = defaultFlavors,
}) => {
  const flavorList = flavors && flavors.length > 0 ? flavors : defaultFlavors
  const [index, setIndex] = useState(1) // Centered on BRISE MENTHOLÉE
  const [isHovered, setIsHovered] = useState(false)
  const [translateX, setTranslateX] = useState(0)

  const carouselRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentFlavor = flavorList[index] || flavorList[0]

  const updatePosition = () => {
    if (!carouselRef.current || !slideRefs.current[index]) return
    const container = carouselRef.current
    const slide = slideRefs.current[index]
    if (!slide) return

    const offset =
      container.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2)
    setTranslateX(offset)
  }

  const go = (dir: number) => {
    setIndex((prev) => (prev + dir + flavorList.length) % flavorList.length)
  }

  useEffect(() => {
    updatePosition()
  }, [index, flavorList])

  useEffect(() => {
    const handleResize = () => updatePosition()
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
    }
  }, [index])

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      go(1)
    }, autoPlayMs)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered, autoPlayMs, flavorList.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flavorList.length])

  return (
    <section
      id="productos"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-[#350903] pt-16 pb-12 overflow-hidden h-[clamp(580px,65vw,900px)] flex flex-col justify-between"
    >
      {/* Background Half-Eagle Watermark */}
      <div className="absolute top-0 bottom-0 right-0 w-[min(40vw,500px)] bg-[url('/images/eagle-tint.png')] bg-left-center bg-no-repeat bg-cover opacity-70 pointer-events-none z-0" />

      {/* Header Controls */}
      <div className="text-center z-[999] px-4 relative">
        <p className="font-script text-[clamp(15px,1.55vw,22px)] tracking-[0.2em] text-white/90 border-b border-white/40 pb-2 inline-block">
          {eyebrow}
        </p>
        <div className="flex items-center justify-center gap-4 md:gap-10 mt-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Sabor anterior"
            className="w-[clamp(42px,4.4vw,58px)] h-[clamp(42px,4.4vw,58px)] rounded-full border border-white/50 bg-none flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all text-white shrink-0"
          >
            <svg
              className="w-5 h-5 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="w-[min(63vw,940px)] text-center shrink-0">
            <h2 className="min-h-[60px] break-word font-display text-[clamp(30px,6vw,84px)] font-normal text-white leading-none  transition-all duration-300">
              {currentFlavor.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Sabor siguiente"
            className="w-[clamp(42px,4.4vw,58px)] h-[clamp(42px,4.4vw,58px)] rounded-full border border-white/50 bg-none flex items-center justify-center hover:bg-white/15 active:scale-95 transition-all text-white shrink-0"
          >
            <svg
              className="w-5 h-5 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Continuous Carousel Track with Next.js Image components */}
      <div
        ref={carouselRef}
        className="relative w-full flex-1 overflow-visible z-10 my-4"
      >
        <div
          ref={trackRef}
          className="absolute left-0 bottom-4 h-full flex items-end gap-[43.5px] transition-transform duration-550 ease-[cubic-bezier(0.5,0.1,0.2,1)] will-change-transform"
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {flavorList.map((flavor, i) => (
            <article
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el
              }}
              onClick={() => setIndex(i)}
              className={`flex-none h-full flex items-end gap-[16px] sm:gap-[20px] cursor-pointer transition-all duration-500 ${
                i === index ? 'opacity-100 scale-105 z-20' : 'opacity-65 hover:opacity-90 scale-95'
              }`}
            >
              <Image
                src={resolveBottleUrl(flavor.bottle750, flavor.bottle750Url, '/images/bottle-brise.png')}
                alt={`${flavor.name} 750ml`}
                width={220}
                height={580}
                priority={i === index}
                onLoad={updatePosition}
                className="h-[clamp(260px,38vw,580px)] w-auto object-contain object-bottom filter drop-shadow-[0_26px_26px_rgba(0,0,0,0.5)]"
              />
              <Image
                src={resolveBottleUrl(flavor.bottle375, flavor.bottle375Url, '/images/ticket-brise.png')}
                alt={`${flavor.name} 375ml`}
                width={180}
                height={460}
                priority={i === index}
                onLoad={updatePosition}
                className="h-[clamp(200px,30vw,460px)] w-auto object-contain object-bottom filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.45)]"
              />
              <Image
                src={resolveBottleUrl(flavor.bottle160, flavor.bottle160Url, '/images/mini-brise.png')}
                alt={`${flavor.name} 160ml`}
                width={130}
                height={340}
                priority={i === index}
                onLoad={updatePosition}
                className="h-[clamp(150px,22vw,340px)] w-auto object-contain object-bottom filter drop-shadow-[0_16px_16px_rgba(0,0,0,0.4)]"
              />
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Dots Indicator */}
      <div className="flex items-center justify-center gap-2.5 z-10 pb-2">
        {flavorList.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Sabor ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index
                ? 'bg-white w-7'
                : 'bg-white/40 w-2.5 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
