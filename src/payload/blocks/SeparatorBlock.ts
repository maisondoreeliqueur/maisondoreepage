import type { Block } from 'payload'

export const SeparatorBlock: Block = {
  slug: 'separatorBlock',
  labels: {
    singular: 'Separador de Espacio',
    plural: 'Separadores de Espacio',
  },
  fields: [
    {
      name: 'desktopSpace',
      type: 'number',
      required: true,
      label: 'Espacio Desktop (px)',
      admin: {
        description: 'Altura del espacio en píxeles para pantallas de escritorio.',
        placeholder: 'Ej: 80',
      },
    },
    {
      name: 'mobileSpace',
      type: 'number',
      required: false,
      label: 'Espacio Mobile (px)',
      admin: {
        description: 'Altura del espacio en píxeles para móviles. Si se deja vacío, usará el mismo espacio que desktop.',
        placeholder: 'Opcional (Ej: 40)',
      },
    },
  ],
}
