import { config } from "dotenv";

config({ path: ".env" });

export const {
  PORT,
  LOG_DIR,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} = process.env;
