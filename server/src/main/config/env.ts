export default {
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',
  bcryptSalt: process.env.BCRYPT_SALT || 12
}
