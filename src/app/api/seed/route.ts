import { NextResponse } from 'next/server'
import { seed } from '@/payload/seed'
import { ensureDbSchema } from '@/payload/ensureSchema'

export async function GET() {
  try {
    await ensureDbSchema()
    await seed()
    return NextResponse.json({ success: true, message: 'Database seeded and schema verified successfully!' })
  } catch (error: any) {
    console.error('Seed API error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to seed' }, { status: 500 })
  }
}
