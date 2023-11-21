export default {
  port: process.env.PORT || 5000,
  dbUri: process.env.MONGO_URI || "",
  saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR) || 10,
  jwtPublic: process.env.JWT_PUBLIC_KEY || 'publickey',
  jwtPrivate: process.env.JWT_PRIVATE_KEY || 'privatekey',
  accessTokenTtl: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenTtl: process.env.JWT_REFRESH_TOKEN_TTL || '1y',
}