import React from 'react'
import { HeroBlock } from './blocks/HeroBlock'
import { SaboresCarouselBlock } from './blocks/SaboresCarouselBlock'
import { SaintManichoBlock, TwoColBlock } from './blocks/SaintManichoBlock'
import { HistoriaBlock } from './blocks/HistoriaBlock'
import { DondeEncontrarnosBlock } from './blocks/DondeEncontrarnosBlock'
import { ContactoBlock } from './blocks/ContactoBlock'
import { Separator } from './Separator'

interface BlockData {
  blockType: string
  id?: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks?: BlockData[]
  flavors?: any[]
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, flavors }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'heroBlock':
            return <HeroBlock key={block.id || index} {...block} />
          case 'saboresBlock':
            return (
              <SaboresCarouselBlock
                key={block.id || index}
                flavors={block.flavors || flavors}
                {...block}
              />
            )
          case 'twoColBlock':
          case 'saintManichoBlock':
            return <TwoColBlock key={block.id || index} {...block} />
          case 'historiaBlock':
            return <HistoriaBlock key={block.id || index} {...block} />
          case 'dondeEncontrarnosBlock':
            return <DondeEncontrarnosBlock key={block.id || index} {...block} />
          case 'contactoBlock':
            return <ContactoBlock key={block.id || index} {...block} />
          case 'separatorBlock':
          case 'separator':
            return <Separator key={block.id || index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
