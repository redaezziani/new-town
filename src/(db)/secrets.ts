import { env } from 'process'
import { PrismaClient } from '@prisma/client'

export const secret = {
    next_public_supabase_url: env.NEXT_PUBLIC_SUPABASE_URL,
    next_public_supabase_key: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    resend_api_key: env.RESEND_API_KEY,
    jwt_secret: env.JWT_SECRET,
    jwt_expiry: env.JWT_EXPIRY,
    scrape_base_url: env.SCRAPE_BASE_URL,
    secret_user_name_scraper: env.SECRET_USER_NAME_SCRAPER,
    secret_password_scraper: env.SECRET_PASSWORD_SCRAPER,
    secret_port_scraper: env.SECRET_PORT_SCRAPER,
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
