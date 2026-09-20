import type { GlobalConfig } from 'payload'

export const SiteSettingsGlobal: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del Sitio (SEO / Favicon)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'Maison Dorée — Ecuadorian & French cream licor',
      label: 'Título del Sitio',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: 'Uniendo una tradición familiar desde 1862.',
      label: 'Descripción Meta',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon del Sitio (Seleccionar imagen de la biblioteca)',
    },
    {
      name: 'faviconUrl',
      type: 'text',
      defaultValue: '/favicon.ico',
      label: 'Favicon URL de respaldo',
    },
    {
      name: 'whatsappUrl',
      type: 'text',
      defaultValue: 'https://wa.me/593999999999',
      label: 'Enlace de WhatsApp (Botón Flotante)',
      admin: {
        description:
          'Enlace de WhatsApp para el botón flotante de acceso rápido (ej. https://wa.me/593999999999 o +593999999999). Si se deja vacío, el botón flotante no se mostrará.',
      },
    },
    {
      name: 'enableAgeGate',
      type: 'checkbox',
      defaultValue: true,
      label: 'Activar verificación de edad (+18)',
      admin: {
        description: 'Muestra un popup al ingresar requiriendo confirmación de mayoría de edad.',
      },
    },
    {
      name: 'ageGateTitle',
      type: 'text',
      defaultValue: 'BIENVENIDO A MAISON DORÉE',
      label: 'Título del Popup (+18)',
      admin: {
        condition: (data) => Boolean(data?.enableAgeGate),
      },
    },
    {
      name: 'ageGateMessage',
      type: 'textarea',
      defaultValue: 'Debes ser mayor de 18 años para ingresar a nuestro sitio web y conocer nuestros licores artesanales.',
      label: 'Mensaje del Popup (+18)',
      admin: {
        condition: (data) => Boolean(data?.enableAgeGate),
      },
    },
    {
      name: 'ageGateConfirmText',
      type: 'text',
      defaultValue: 'SÍ, SOY MAYOR DE 18',
      label: 'Texto Botón Sí (Mayor de 18)',
      admin: {
        condition: (data) => Boolean(data?.enableAgeGate),
      },
    },
    {
      name: 'ageGateRejectText',
      type: 'text',
      defaultValue: 'NO, SOY MENOR DE EDAD',
      label: 'Texto Botón No (Menor de 18)',
      admin: {
        condition: (data) => Boolean(data?.enableAgeGate),
      },
    },
    {
      name: 'underageTitle',
      type: 'text',
      defaultValue: 'ACCESO RESTRINGIDO',
      label: 'Título en Página de Menor de Edad',
    },
    {
      name: 'underageMessage',
      type: 'textarea',
      defaultValue: 'Lo sentimos, debes ser mayor de 18 años para acceder y consumir nuestros productos. El consumo responsable es fundamental.',
      label: 'Mensaje en Página de Menor de Edad',
    },
  ],
}
