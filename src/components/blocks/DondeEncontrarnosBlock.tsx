'use client'

import React from 'react'

export interface PlaceItem {
  city: string
  logo1?: string
  logo2?: string
}

interface DondeEncontrarnosBlockProps {
  title?: string
  places?: PlaceItem[]
}

const defaultPlaces: PlaceItem[] = [
  { city: 'QUEVEDO', logo1: 'LOGO 1', logo2: 'LOGO 2' },
  { city: 'GYE', logo1: 'LOGO 1', logo2: 'LOGO 2' },
  { city: 'SANTELENA', logo1: 'LOGO 1', logo2: 'LOGO 2' },
  { city: 'MANTA', logo1: 'LOGO 1', logo2: 'LOGO 2' },
  { city: 'QUEVEDO', logo1: 'LOGO 1', logo2: 'LOGO 2' },
]

export const DondeEncontrarnosBlock: React.FC<DondeEncontrarnosBlockProps> = ({
  title = 'DONDE\nENCONTRANOS',
  places = defaultPlaces,
}) => {
  const placeList = places && places.length > 0 ? places : defaultPlaces

  return (
    <section
      id="donde"
      className="relative bg-[#3509003] pb-16 pt-16 md:pb-28 md:pb-28 overflow-hidden"
    >
      {/* Top decorative line pattern */}
      {/* <div className="h-20 md:h-32 bg-eagle-repeat-x opacity-15 mb-10 md:mb-16" /> */}

      <div className="max-w-[1320px] mx-auto px-6 text-center">
        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl text-white font-normal leading-tight whitespace-pre-line">
          {title}
        </h2>

        {/* Decorative Rule */}
        <div className="w-full max-w-[560px] h-[1px] bg-white/40 mx-auto mt-6" />

        {/* Locations Grid / Próximamente */}
        <div className="mt-12 md:mt-20 flex justify-center text-center">
          {/* {placeList.map((place, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal mb-4">
                {place.city}
              </h3>
              {place.logo1 && (
                <p className="font-sans font-light text-lg sm:text-2xl md:text-3xl text-white/90 leading-snug">
                  {place.logo1}
                </p>
              )}
              {place.logo2 && (
                <p className="font-sans font-light text-lg sm:text-2xl md:text-3xl text-white/90 leading-snug">
                  {place.logo2}
                </p>
              )}
            </div>
          ))} */}
          <p className="donde__soon text-center font-display font-normal text-[clamp(24px,-11px+8vw,220px)] leading-none tracking-[0.01em] text-cream m-0 px-[50px] py-0 whitespace-nowrap">
            PRÓXIMAMENTE
          </p>
        </div>
      </div>
    </section>
  )
}
