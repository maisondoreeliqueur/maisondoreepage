'use client'

import React from 'react'
import Image from 'next/image'
import { getMediaUrl } from '@/lib/media'

interface HistoriaBlockProps {
  wordmarkImage?: any
  wordmarkImageUrl?: string
  scriptText?: string
  paragraph1?: string
  paragraph2?: string
  sinceText?: string
  signText?: string
  mediaImage?: any
  mediaImageUrl?: string
}

export const HistoriaBlock: React.FC<HistoriaBlockProps> = ({
  wordmarkImage,
  wordmarkImageUrl = '/images/wordmark.png',
  scriptText = 'Ecuadorian & French cream licor',
  paragraph1 = 'En el año 2025, durante unas vacaciones en la costa ecuatoriana, compartí mi receta familiar de rompope manabita con unos amigos franceses, quienes insistieron en que más personas debían probarla. Inspirado por su motivación, decidí fundar la marca de licores crema de mayor calidad en el mercado ecuatoriano.',
  paragraph2 = 'Así nació Maison Dorée.\nUniendo una tradición familiar',
  sinceText = 'desde 1862.',
  signText = '- Douglas Pazmiño, Fundador.',
  mediaImage,
  mediaImageUrl = '/images/manabi.jpg',
}) => {
  const resolvedWordmark =
    getMediaUrl(wordmarkImage) ||
    (typeof wordmarkImageUrl === 'string' && wordmarkImageUrl ? wordmarkImageUrl : '') ||
    '/images/wordmark.png'

  const resolvedMediaImage =
    getMediaUrl(mediaImage) ||
    (typeof mediaImageUrl === 'string' && mediaImageUrl ? mediaImageUrl : '') ||
    '/images/manabi.jpg'
  return (
    <section
      id="historia"
      className="relative bg-[#1e0101] py-16 md:py-24 overflow-hidden flex items-center min-h-[500px] md:min-h-[700px]"
    >
      {/* Pattern repeat watermark background */}
      <div className="absolute inset-0 bg-eagle-pattern opacity-40 pointer-events-none z-0" />

      {/* Left Eagle Tint */}
      <div className="eagle-watermark-left hidden md:block" />

      {/* Right Vertical Rotated Wordmark */}
      <div className="absolute right-0 mr-[20px] xl:right-2 top-0 bottom-0 w-20 xl:w-24 z-0 hidden lg:flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-[480px] h-[140px] -rotate-90 shrink-0">
          <Image
            src="/images/wordmark-tint.png"
            alt=""
            fill
            sizes="480px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Copy Column */}
        <div className="md:col-span-7 lg:col-span-7 text-center md:pl-12">
          <div className="relative w-[200px] sm:w-[260px] md:w-[330px] h-16 sm:h-20 md:h-24 mx-auto mb-3">
            <Image
              src={resolvedWordmark}
              alt="Maison Dorée"
              fill
              sizes="(max-width: 768px) 260px, 330px"
              className="object-contain"
            />
          </div>
          <p className="font-script text-base sm:text-xl md:text-2xl text-white/90 mb-6">
            {scriptText}
          </p>

          <p className="font-serif text-sm sm:text-base md:text-lg text-white leading-relaxed mb-4 max-w-xl mx-auto">
            {paragraph1}
          </p>

          <p className="font-serif text-sm sm:text-base md:text-lg text-white leading-relaxed mb-4 max-w-xl mx-auto whitespace-pre-line">
            {paragraph2}
          </p>

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal mb-4">
            {sinceText}
          </p>

          <p className="font-sans font-light text-sm sm:text-base text-white/90">
            {signText}
          </p>
        </div>

        {/* Media Image Column */}
        <div className="md:col-span-5 lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[460px] h-[280px] sm:h-[330px]  shadow-2xl shadow-black/70 rounded-sm overflow-hidden">
            <Image
              src={resolvedMediaImage}
              alt="Bienvenidos a Manabí"
              fill
              sizes="(max-width: 768px) 100vw, 460px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
