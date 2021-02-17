export default {
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',
  bcryptSalt: process.env.BCRYPT_SALT || 12,

  emailFrom: process.env.EMAIL_FROM,
  emailLogin: process.env.EMAIL_LOGIN,
  emailPassword: process.env.EMAIL_PASSWORD,

  cryptoAlg: process.env.CRYPTO_ALG || 'aes-256-cbc',
  cryptoKey: process.env.CRYPTO_KEY || '2e0fa95d12945fa68b9f6a5292432f835ab0a11f2639b017928b36ac23641b96',
  cryptoIV: process.env.CRYPTO_IV || 'f9cd729345874571529ed4c44e7dbd61'
}
