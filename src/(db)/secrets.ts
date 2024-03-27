import { env } from 'process'
import { PrismaClient } from '@prisma/client'

export const secret = {
    next_public_supabase_url: env.NEXT_PUBLIC_SUPABASE_URL,
    next_public_supabase_key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    resend_api_key: env.RESEND_API_KEY,
    jwt_secret: env.JWT_SECRET,
    jwt_expiry: env.JWT_EXPIRY,
    asq_url: env.ASQ_URL,
    manga_arabic_url: env.MANGA_ARABIC_URL,
}

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
