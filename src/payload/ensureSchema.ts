import pg from 'pg'

let hasRun = false

export async function ensureDbSchema(): Promise<void> {
  if (hasRun) return

  const postgresUrl =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    (process.env.DATABASE_URI && process.env.DATABASE_URI.startsWith('postgres')
      ? process.env.DATABASE_URI
      : undefined)

  if (!postgresUrl) return

  // Don't run migration during Next.js static build if no DB is reachable
  const client = new pg.Client({
    connectionString: postgresUrl,
    connectionTimeoutMillis: 5000,
  })

  try {
    await client.connect()
    await client.query(`
      ALTER TABLE IF EXISTS "site_settings" 
      ADD COLUMN IF NOT EXISTS "whatsapp_url" varchar DEFAULT 'https://wa.me/593999999999';

      ALTER TABLE IF EXISTS "pages_blocks_hero_block" 
      ADD COLUMN IF NOT EXISTS "video_id" integer REFERENCES "media"("id") ON DELETE SET NULL;
    `)
    hasRun = true
    console.log('[ensureDbSchema] Verified database schema for site_settings and pages_blocks_hero_block')
  } catch (err: any) {
    console.error('[ensureDbSchema] Note on schema check:', err?.message || err)
  } finally {
    await client.end().catch(() => {})
  }
}
