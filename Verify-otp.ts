import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { phone, code } = await req.json()

  const otp = await prisma.oTP.findFirst({
    where: { phone, code, expiresAt: { gt: new Date() } }
  })

  if (!otp) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })

  let user = await prisma.user.findUnique({ where: { phone } })
  if (!user) user = await prisma.user.create({ data: { phone } })

  const token = signToken(user.id)

  return NextResponse.json({ success: true, token, user })
    }
