'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/media'

export interface HeroBlockProps {
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaUrl?: string
  video?: any
  videoSrc?: string
  posterImage?: any
  posterUrl?: string
  heroImage?: string
  id?: string
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title = 'El secreto más dulce\nse sirve con hielo.',
  subtitle = 'Prueba sus diferentes sabores.',
  ctaLabel = 'COMPRA AHORA',
  ctaUrl = 'https://wa.me/593985504731',
  video,
  videoSrc = '/video/hero.mp4',
  posterImage,
  posterUrl = '/images/hero.png',
  heroImage,
  id = 'inicio',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)

  // Use video upload, or fallback to videoSrc
  const effectiveVideo =
    getMediaUrl(video) ||
    (typeof videoSrc === 'string' && videoSrc ? videoSrc : '') ||
    '/video/hero.mp4'

  // Use posterImage upload, or fallback to posterUrl or heroImage
  const effectivePoster =
    getMediaUrl(posterImage) ||
    (typeof posterUrl === 'string' && posterUrl ? posterUrl : '') ||
    (typeof heroImage === 'string' && heroImage ? heroImage : '') ||
    '/images/hero.png'

  // Format title safely to handle null/undefined from CMS or string with <br> tags
  const rawTitle =
    typeof title === 'string' && title
      ? title
      : 'El secreto más dulce\nse sirve con hielo.'
  const formattedTitle = rawTitle.replace(/<br\s*\/?>/gi, '\n')

  const safeSubtitle =
    typeof subtitle === 'string' ? subtitle : 'Prueba sus diferentes sabores.'

  const safeCtaLabel =
    typeof ctaLabel === 'string' && ctaLabel ? ctaLabel : 'COMPRA AHORA'

  const safeCtaUrl =
    typeof ctaUrl === 'string' && ctaUrl
      ? ctaUrl
      : 'https://wa.me/593985504731'

  // Performance Optimization: IntersectionObserver to pause background video when not in viewport
  useEffect(() => {
    const videoElement = videoRef.current
    const sectionElement = sectionRef.current
    if (!videoElement || !sectionElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isPaused) {
            videoElement.play().catch(() => {
              // Browser autoplay policy catch
            })
          }
        } else {
          videoElement.pause()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(sectionElement)
    return () => observer.disconnect()
  }, [isPaused])

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current
          .play()
          .then(() => setIsPaused(false))
          .catch(() => {})
      } else {
        videoRef.current.pause()
        setIsPaused(true)
      }
    }
  }

  const isExternalCta =
    safeCtaUrl.startsWith('http://') ||
    safeCtaUrl.startsWith('https://') ||
    safeCtaUrl.startsWith('wa.me')

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative min-h-[560px] h-[clamp(560px,62vw,820px)] flex flex-col justify-center overflow-hidden bg-[#2a1a12] rounded-bl-[68px]"
    >
      {/* Background Video for Desktop & Mobile background loop */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          id="hero-video"
          src={effectiveVideo}
          poster={effectivePoster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          suppressHydrationWarning
          onError={() => setHasVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />
      )}

      {/* Fallback Poster Image if video error occurs */}
      {hasVideoError && (
        <img
          src={effectivePoster}
          alt="Maison Dorée Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />
      )}

      {/* Dark Reading Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(20,6,4,.78) 0%, rgba(20,6,4,.42) 34%, rgba(20,6,4,0) 60%)',
        }}
      />

      {/* Video Controls (Mute & Play/Pause) */}
      {!hasVideoError && (
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-30 flex items-center gap-3">
          {/* Mute Button */}
          <button
            type="button"
            id="hero-mute"
            onClick={toggleMute}
            data-muted={isMuted ? 'true' : 'false'}
            aria-label={isMuted ? 'Activar sonido' : 'Desactivar sonido'}
            className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          >
            {isMuted ? (
              /* Mute Icon */
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 9v6h4l5 5V4L8 9H4z" />
                <path d="M19 12l3-3-1.4-1.4-3 3-3-3L13.2 9l3 3-3 3 1.4 1.4 3-3 3 3L21 15z" />
              </svg>
            ) : (
              /* Sound Icon */
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 9v6h4l5 5V4L8 9H4z" />
                <path d="M16.5 12c0-1.77-.77-3.29-2-4.24v8.48c1.23-.95 2-2.47 2-4.24z" />
                <path d="M14.5 5.67v1.94A6.5 6.5 0 0118.5 12a6.5 6.5 0 01-4 6.39v1.94A8.5 8.5 0 0020.5 12a8.5 8.5 0 00-6-6.33z" />
              </svg>
            )}
          </button>

          {/* Play / Pause Button */}
          <button
            type="button"
            id="hero-play"
            onClick={togglePlay}
            data-paused={isPaused ? 'true' : 'false'}
            aria-label={isPaused ? 'Reproducir video' : 'Pausar video'}
            className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
          >
            {isPaused ? (
              /* Play Icon */
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              /* Pause Icon */
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 md:px-16 flex flex-col items-start text-left">
        <div className="max-w-2xl flex flex-col items-start text-left">
          <h1 className="font-italianno text-[clamp(54px,8.5vw,120px)] font-normal leading-[0.78] text-white tracking-[0.01em] whitespace-pre-line mb-4 drop-shadow-lg">
            {formattedTitle}
          </h1>
          <p className="font-serif text-[clamp(18px,2.2vw,28px)] text-white/95 my-3 drop-shadow">
            {safeSubtitle}
          </p>
          {isExternalCta ? (
            <a
              href={safeCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline font-script text-[clamp(15px,1.5vw,21px)] tracking-[0.06em] mt-2"
            >
              {safeCtaLabel}
            </a>
          ) : (
            <Link
              href={safeCtaUrl}
              className="btn-outline font-script text-[clamp(15px,1.5vw,21px)] tracking-[0.06em] mt-2"
            >
              {safeCtaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

