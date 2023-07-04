import { cleanEnv, port, str } from "envalid";

export const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    LOG_DIR: str(),
  });
};
