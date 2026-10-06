import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../blocks/HeroBlock'
import { SaboresBlock } from '../blocks/SaboresBlock'
import { TwoColBlock } from '../blocks/TwoColBlock'
import { SaintManichoBlock } from '../blocks/SaintManichoBlock'
import { HistoriaBlock } from '../blocks/HistoriaBlock'
import { DondeEncontrarnosBlock } from '../blocks/DondeEncontrarnosBlock'
import { ContactoBlock } from '../blocks/ContactoBlock'
import { SeparatorBlock } from '../blocks/SeparatorBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const slug = data?.slug
        const path = !slug || slug === 'home' || slug === 'index' ? '' : slug
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
        return `${baseUrl}/${path}`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      defaultValue: 'home',
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        SaboresBlock,
        TwoColBlock,
        SaintManichoBlock,
        HistoriaBlock,
        DondeEncontrarnosBlock,
        ContactoBlock,
        SeparatorBlock,
      ],
    },
  ],
}
