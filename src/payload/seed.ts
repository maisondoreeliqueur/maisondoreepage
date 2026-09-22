import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ensureDbSchema } from './ensureSchema'

let isSeeding = false

export async function seed() {
  if (isSeeding) {
    console.log('Seed already in progress, skipping concurrent call.')
    return
  }
  isSeeding = true

  try {
    await ensureDbSchema()
    const payload = await getPayload({ config: configPromise })

    console.log('Seeding Payload CMS data...')

    // 1. Seed Admin User (admin/admin)
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@maisondoree.com',
        },
      },
    })

    if (existingUsers.docs.length === 0) {
      try {
        await payload.create({
          collection: 'users',
          data: {
            email: 'admin@maisondoree.com',
            password: 'admin',
            name: 'Admin User',
          },
        })
        console.log('Created admin user: admin@maisondoree.com / admin')
      } catch {
        // User created in concurrent request
      }
    }

    // 2. Seed Header Global
    await payload.updateGlobal({
      slug: 'header',
      data: {
        logoPath: '/images/wordmark.png',
        subtitle: 'Ecuadorian & French cream liqueur',
        navLinksLeft: [
          { label: 'PRODUCTO', url: '#productos' },
          { label: 'HISTORIA', url: '#historia' },
        ],
        navLinksRight: [
          { label: 'DONDE ENCONTRARNOS', url: '#donde' },
          { label: 'CONTACTANOS', url: '#contacto' },
        ],
      },
    })

    // 3. Seed Footer Global
    await payload.updateGlobal({
      slug: 'footer',
      data: {
        logoPath: '/images/logo.png',
        topLinks: [
          { label: 'Nuestra Historia', url: '#historia' },
          { label: 'CONTACTANOS', url: '#contacto' },
        ],
        socialLinks: [
          { platform: 'facebook', url: '#' },
          { platform: 'instagram', url: '#' },
          { platform: 'tiktok', url: '#' },
          { platform: 'whatsapp', url: '#' },
        ],
        bottomMenu: [
          { label: 'PRODUCTO', url: '#productos' },
          { label: 'HISTORIA', url: '#historia' },
          { label: 'FAMILIA MD', url: '#historia' },
          { label: 'DONDE ENCONTRARNOS', url: '#donde' },
        ],
        copyrightText: 'Copyright © 2026 MAISON DORÉE LIQUEUR. All Rights Reserved',
        designedByText: 'Designed By PILOW.',
      },
    })

    // 4. Seed Site Settings (Favicon, SEO & Age Gate)
    try {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          siteTitle: 'Maison Dorée — Ecuadorian & French cream licor',
          siteDescription: 'Uniendo una tradición familiar desde 1862.',
          faviconUrl: '/favicon.ico',
          whatsappUrl: 'https://wa.me/593999999999',
          enableAgeGate: true,
          ageGateTitle: 'BIENVENIDO A MAISON DORÉE',
          ageGateMessage:
            'Debes ser mayor de 18 años para ingresar a nuestro sitio web y conocer nuestros licores artesanales.',
          ageGateConfirmText: 'SÍ, SOY MAYOR DE 18 AÑOS',
          ageGateRejectText: 'NO, SOY MENOR DE EDAD',
          underageTitle: 'ACCESO RESTRINGIDO',
          underageMessage:
            'Lo sentimos, debes ser mayor de 18 años para acceder y consumir nuestros productos. El consumo responsable es fundamental.',
        },
      })
    } catch {
      // optional initial seed
    }

    // 5. Seed Flavors & Cleanup Duplicates
    const flavorsData = [
      {
        name: 'BRISE MENTHOLÉE',
        order: 1,
        bottle750Url: '/images/bottle-brise.png',
        bottle375Url: '/images/ticket-brise.png',
        bottle160Url: '/images/mini-brise.png',
      },
      {
        name: 'CRÉME CAPPUCCINO',
        order: 2,
        bottle750Url: '/images/bottle-creme.png',
        bottle375Url: '/images/ticket-creme.png',
        bottle160Url: '/images/mini-creme.png',
      },
      {
        name: 'VANILLE CLASSIQUE',
        order: 3,
        bottle750Url: '/images/bottle-vanille.png',
        bottle375Url: '/images/ticket-vanille.png',
        bottle160Url: '/images/mini-vanille.png',
      },
      {
        name: 'NUIT DE CACAO',
        order: 4,
        bottle750Url: '/images/bottle-cacao.png',
        bottle375Url: '/images/ticket-cacao.png',
        bottle160Url: '/images/mini-cacao.png',
      },
    ]

    // Fetch existing flavors to check for duplicates and missing items
    const existingFlavors = await payload.find({
      collection: 'flavors',
      limit: 100,
    })

    // Remove duplicates if any exist
    const seenNames = new Set<string>()
    for (const doc of existingFlavors.docs) {
      const normalizedName = (doc.name || '').trim().toUpperCase()
      if (seenNames.has(normalizedName)) {
        console.log(`Removing duplicate flavor doc id: ${doc.id} (${doc.name})`)
        try {
          await payload.delete({
            collection: 'flavors',
            id: doc.id,
          })
        } catch (err) {
          console.error(`Failed to delete duplicate flavor ${doc.id}:`, err)
        }
      } else {
        seenNames.add(normalizedName)
      }
    }

    for (const flavor of flavorsData) {
      const normalized = flavor.name.trim().toUpperCase()
      if (!seenNames.has(normalized)) {
        try {
          await payload.create({
            collection: 'flavors',
            data: flavor as any,
          })
          seenNames.add(normalized)
        } catch (err) {
          console.error(`Error creating flavor ${flavor.name}:`, err)
        }
      }
    }

  // 6. Seed Home Page
  const existingPages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  const defaultHomeLayout: any[] = [
    {
      blockType: 'heroBlock',
      title: 'Dulce capricho',
      subtitle: 'Prueba sus diferentes sabores.',
      ctaLabel: 'COMPRA AHORA',
      ctaUrl: '#productos',
      videoSrc: '/video/hero.mp4',
      posterUrl: '/images/hero.png',
    },
    {
      blockType: 'saboresBlock',
      eyebrow: 'DESCUBRE LOS SABORES',
      autoPlayMs: 2000,
    },
    {
      blockType: 'twoColBlock',
      imagePath: '/images/saint-manicho.jpg',
      altText: 'Prueba el nuevo sabor Saint Manicho',
      columns: [
        {
          blockType: 'imageBlock',
          imageUrl: '/images/saint-manicho.jpg',
          alt: 'Maison Dorée',
        },
        {
          blockType: 'imageBlock',
          imageUrl: '/images/saint-pistacho.jpg',
          alt: 'Maison Dorée',
        },
      ],
    },
    {
      blockType: 'historiaBlock',
      wordmarkImageUrl: '/images/wordmark.png',
      scriptText: 'Ecuadorian & French cream licor',
      paragraph1:
        'En el año 2025, durante unas vacaciones en la costa ecuatoriana, compartí mi receta familiar de rompope manabita con unos amigos franceses, quienes insistieron en que más personas debían probarla. Inspirado por su motivación, decidí fundar la marca de licores crema de mayor calidad en el mercado ecuatoriano.',
      paragraph2:
        'Así nació Maison Dorée.\nUniendo una tradición familiar',
      sinceText: 'desde 1862.',
      signText: '- Douglas Pazmiño, Fundador.',
      mediaImageUrl: '/images/manabi.jpg',
    },
    {
      blockType: 'dondeEncontrarnosBlock',
      title: 'DONDE\nENCONTRANOS',
      places: [
        { city: 'QUEVEDO', logo1: 'LOGO 1', logo2: 'LOGO 2' },
        { city: 'GYE', logo1: 'LOGO 1', logo2: 'LOGO 2' },
        { city: 'SANTELENA', logo1: 'LOGO 1', logo2: 'LOGO 2' },
        { city: 'MANTA', logo1: 'LOGO 1', logo2: 'LOGO 2' },
        { city: 'QUEVEDO', logo1: 'LOGO 1', logo2: 'LOGO 2' },
      ],
    },
    {
      blockType: 'contactoBlock',
      eyebrow: 'TRABAJEMOS JUNTOS',
      title: '¿QUIERES VENDER\nNUESTROS PRODUCTOS?',
      sub: 'Déjanos tus datos y nos pondremos en contacto contigo.',
      formAction: 'https://formsubmit.co/maisondoreeliqueur@gmail.com',
      subject: 'Nuevo interesado en distribuir Maison Dorée',
      submitText: 'ENVIAR',
    },
  ]

  if (existingPages.docs.length === 0) {
    try {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Maison Dorée — Home',
          slug: 'home',
          layout: defaultHomeLayout,
        },
      })
      console.log('Seeded Home Page with blocks!')
    } catch {
      // Page already created concurrently
    }
  } else if (!existingPages.docs[0].layout || (existingPages.docs[0].layout as any[]).length === 0) {
    await payload.update({
      collection: 'pages',
      id: existingPages.docs[0].id,
      data: {
        layout: defaultHomeLayout,
      },
    })
    console.log('Updated Home Page layout with default blocks!')
  }

  console.log('Seeding completed successfully!')
  } finally {
    isSeeding = false
  }
}
