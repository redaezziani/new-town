import { env } from 'process'
import { PrismaClient } from '@prisma/client'

export const secret = {
    resend_api_key: env.RESEND_API_KEY,
    jwt_secret: env.JWT_SECRET,
    jwt_expiry: env.JWT_EXPIRY,
    edge_store_access_key: env.EDGE_STORE_ACCESS_KEY,
    edge_store_secret_key: env.EDGE_STORE_SECRET_KEY,
    stripe_publishable_key: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY??'',
    stripe_secret_key: env.STRIPE_SECRET_KEY,
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
