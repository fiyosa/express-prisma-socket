import dotenv from 'dotenv'
dotenv.config()

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? null,
  NODE_KEY: process.env.NODE_KEY,
  LOCALE: process.env.LOCALE ?? 'en',
}

export default env
