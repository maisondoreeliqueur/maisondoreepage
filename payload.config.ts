import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Flavors } from './src/payload/collections/Flavors'
import { Pages } from './src/payload/collections/Pages'
import { HeaderGlobal } from './src/payload/globals/Header'
import { FooterGlobal } from './src/payload/globals/Footer'
import { SiteSettingsGlobal } from './src/payload/globals/SiteSettings'

import { ensureDbSchema } from './src/payload/ensureSchema'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const postgresUrl =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  (process.env.DATABASE_URI && process.env.DATABASE_URI.startsWith('postgres')
    ? process.env.DATABASE_URI
    : undefined)

// Ensure schema is updated for Postgres in production
if (postgresUrl) {
  void ensureDbSchema()
}

export default buildConfig({
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Maison Dorée Admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          url: '/images/logo.png',
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname, 'src/app/(payload)/admin'),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Flavors, Pages],
  globals: [HeaderGlobal, FooterGlobal, SiteSettingsGlobal],
  editor: lexicalEditor({}),
  sharp,
  secret: process.env.PAYLOAD_SECRET || '8f7b2c9e1a3d4f5b6c7d8e9f0a1b2c3d',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresUrl
    ? postgresAdapter({
        pool: {
          connectionString: postgresUrl,
        },
        push: true,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./payload.db',
        },
      }),
})
