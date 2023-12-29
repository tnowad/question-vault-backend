import { ConfigFactory } from '@nestjs/config';

export default () => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION
    ? parseInt(process.env.JWT_EXPIRATION, 10)
    : 3600,
});
