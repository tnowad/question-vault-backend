/* eslint-disable @typescript-eslint/naming-convention */
import { cleanEnv, port, str, bool } from "envalid";

export const validateEnv = (): typeof cleanedEnv => {
  const cleanedEnv = cleanEnv(process.env, {
    PORT: port(),
    DATABASE_URL: str(),
    LOG_FORMAT: str(),
    LOG_DIR: str(),
    ORIGIN: str(),
    CREDENTIALS: bool(),
    JWT_SECRET: str(),
    ACCESS_TOKEN_EXPIRATION: str(),
    REFRESH_TOKEN_EXPIRATION: str(),
  });
  return cleanedEnv;
};
