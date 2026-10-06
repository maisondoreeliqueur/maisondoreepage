'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMediaUrl } from '@/lib/media'

export interface ImageColumnData {
  blockType: 'imageBlock'
  id?: string
  image?: any
  imageUrl?: string
  alt?: string
}

export interface CardColumnData {
  blockType: 'cardBlock'
  id?: string
  tag?: string
  title: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
  image?: any
  imageUrl?: string
  theme?: 'maroon' | 'dark' | 'cream'
}

export type TwoColColumnItem = ImageColumnData | CardColumnData

export interface TwoColBlockProps {
  columns?: TwoColColumnItem[]
  imagePath?: string
  altText?: string
}

export const TwoColBlock: React.FC<TwoColBlockProps> = ({
  columns,
  imagePath = '/images/saint-manicho.jpg',
  altText = 'Prueba el nuevo sabor Saint Manicho',
}) => {
  // If columns array is provided and not empty, render custom columns
  if (columns && columns.length > 0) {
    const isSingle = columns.length === 1

    return (
      <section className="w-full bg-[#350903] overflow-hidden">
        <div
          className={`w-full grid grid-cols-1 ${
            isSingle ? 'max-w-4xl mx-auto' : 'md:grid-cols-2'
          }`}
        >
          {columns.map((col, idx) => {
            if (col.blockType === 'imageBlock') {
              const src = getMediaUrl(col.image, col.imageUrl || '/images/saint-manicho.jpg')
              const alt = col.alt || 'Maison Dorée'

              return (
                <div
                  key={col.id || idx}
                  className="w-full h-full flex items-center justify-center overflow-hidden bg-[#240403]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover block"
                  />
                </div>
              )
            }

            if (col.blockType === 'cardBlock') {
              const cardImage = getMediaUrl(col.image, col.imageUrl)
              const theme = col.theme || 'maroon'
              const isExternalCta =
                col.ctaUrl?.startsWith('http://') ||
                col.ctaUrl?.startsWith('https://') ||
                col.ctaUrl?.startsWith('wa.me')

              const bgClasses =
                theme === 'dark'
                  ? 'bg-[#160303] text-white border-y md:border-y-0 md:border-r border-white/10'
                  : theme === 'cream'
                  ? 'bg-[#f7f2ea] text-[#240403]'
                  : 'bg-gradient-to-br from-[#3b0805] via-[#2a0604] to-[#1c0302] text-white'

              return (
                <div
                  key={col.id || idx}
                  className={`w-full h-full flex flex-col justify-center items-start p-8 sm:p-12 md:p-14 lg:p-20 relative overflow-hidden ${bgClasses}`}
                >
                  {/* Subtle Background Accent Pattern */}
                  <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-[url('/images/eagle-tint.png')] bg-right-center bg-no-repeat bg-contain opacity-15 pointer-events-none" />

                  {/* Card Content */}
                  <div className="relative z-10 max-w-xl">
                    {col.tag && (
                      <p
                        className={`font-script text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 ${
                          theme === 'cream' ? 'text-[#8b2b1a]' : 'text-amber-200/90'
                        }`}
                      >
                        {col.tag}
                      </p>
                    )}

                    <h3
                      className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[0.01em] mb-4 drop-shadow-sm ${
                        theme === 'cream' ? 'text-[#240403]' : 'text-white'
                      }`}
                    >
                      {col.title}
                    </h3>

                    {col.description && (
                      <p
                        className={`font-serif text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-md ${
                          theme === 'cream' ? 'text-[#3d1814]/90' : 'text-white/85'
                        }`}
                      >
                        {col.description}
                      </p>
                    )}

                    {cardImage && (
                      <div className="relative w-36 h-36 mb-6">
                        <Image
                          src={cardImage}
                          alt={col.title}
                          fill
                          sizes="150px"
                          className="object-contain"
                        />
                      </div>
                    )}

                    {col.ctaLabel && col.ctaUrl && (
                      isExternalCta ? (
                        <a
                          href={col.ctaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn-outline font-script text-[clamp(14px,1.3vw,19px)] tracking-[0.06em] inline-flex items-center justify-center px-10 py-3 rounded-full transition-all duration-300 ${
                            theme === 'cream'
                              ? 'border-[#240403]/60 text-[#240403] hover:bg-[#240403]/10'
                              : 'border-white/70 text-white hover:bg-white/15'
                          }`}
                        >
                          {col.ctaLabel}
                        </a>
                      ) : (
                        <Link
                          href={col.ctaUrl}
                          className={`btn-outline font-script text-[clamp(14px,1.3vw,19px)] tracking-[0.06em] inline-flex items-center justify-center px-10 py-3 rounded-full transition-all duration-300 ${
                            theme === 'cream'
                              ? 'border-[#240403]/60 text-[#240403] hover:bg-[#240403]/10'
                              : 'border-white/70 text-white hover:bg-white/15'
                          }`}
                        >
                          {col.ctaLabel}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </section>
    )
  }

  // Fallback: Original Saint Manicho dual-image layout
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#350903]">
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagePath}
          alt={altText}
          className="w-full h-full object-cover block"
        />
      </div>
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagePath}
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>
    </section>
  )
}
