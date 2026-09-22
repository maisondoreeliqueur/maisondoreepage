import React from 'react'
import type { Metadata } from 'next'
import {
  Caprasimo,
  Quintessential,
  Charis_SIL,
  Montserrat,
  Archivo_Narrow,
  Italianno,
} from 'next/font/google'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AgeGateModal } from '@/components/AgeGateModal'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ensureDbSchema } from '@/payload/ensureSchema'
import { seed } from '@/payload/seed'
import { getMediaUrl } from '@/lib/media'
import './globals.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const caprasimo = Caprasimo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const italianno = Italianno({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italianno',
  display: 'swap',
})

const quintessential = Quintessential({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

const charisSIL = Charis_SIL({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['200', '300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const archivoNarrow = Archivo_Narrow({
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-narrow',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    const faviconUrl =
      getMediaUrl(siteSettings?.favicon) ||
      (typeof siteSettings?.faviconUrl === 'string' && siteSettings.faviconUrl
        ? siteSettings.faviconUrl
        : '/favicon.ico')

    return {
      title: siteSettings?.siteTitle || 'Maison Dorée — Ecuadorian & French cream licor',
      description: siteSettings?.siteDescription || 'Uniendo una tradición familiar desde 1862.',
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      },
    }
  } catch {
    return {
      title: 'Maison Dorée — Ecuadorian & French cream licor',
      description: 'Uniendo una tradición familiar desde 1862.',
      icons: {
        icon: '/favicon.ico',
      },
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let headerData = null
  let footerData = null
  let siteSettingsData: any = null

  try {
    await ensureDbSchema()
    const payload = await getPayload({ config: configPromise })

    const users = await payload.find({ collection: 'users' })
    if (users.docs.length === 0) {
      await seed()
    }

    headerData = await payload.findGlobal({ slug: 'header' })
    footerData = await payload.findGlobal({ slug: 'footer' })
    siteSettingsData = await payload.findGlobal({ slug: 'site-settings' })
  } catch (error) {
    console.error('Error fetching global layout data from Payload:', error)
  }

  const isAgeGateEnabled =
    siteSettingsData?.enableAgeGate !== undefined ? Boolean(siteSettingsData.enableAgeGate) : true

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${caprasimo.variable} ${quintessential.variable} ${charisSIL.variable} ${montserrat.variable} ${archivoNarrow.variable} ${italianno.variable}`}
    >
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-[#240403] text-white">
        <AgeGateModal
          enabled={isAgeGateEnabled}
          title={siteSettingsData?.ageGateTitle}
          message={siteSettingsData?.ageGateMessage}
          confirmText={siteSettingsData?.ageGateConfirmText}
          rejectText={siteSettingsData?.ageGateRejectText}
        />
        <Header data={headerData ? (headerData as any) : undefined} />
        <main className="flex-grow">{children}</main>
        <Footer data={footerData ? (footerData as any) : undefined} />
        <WhatsAppButton url={siteSettingsData?.whatsappUrl} />
      </body>
    </html>
  )
}
