import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV.trim() === 'dev' ? '.env.dev' : '.env'
})

export default {
  port: parseInt(process.env.PORT),
  client_url: process.env.CLIENT_URL,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRATION,

  bcryptSalt: parseInt(process.env.BCRYPT_SALT),

  emailFrom: process.env.EMAIL_FROM,
  emailLogin: process.env.EMAIL_LOGIN,
  emailPassword: process.env.EMAIL_PASSWORD,

  cryptoAlg: process.env.CRYPTO_ALG,
  cryptoKey: process.env.CRYPTO_KEY,
  cryptoIV: process.env.CRYPTO_IV
}
