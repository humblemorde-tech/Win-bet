import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { phone } = await req.json()
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  await prisma.oTP.create({
    data: { phone, code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }
  })

  console.log(`OTP for ${phone}: ${code}`) // Check Vercel Logs

  return NextResponse.json({ success: true })
}
