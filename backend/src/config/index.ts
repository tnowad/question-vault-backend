import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, LOG_DIR, LOG_FORMAT, ORIGIN, CREDENTIALS } = process.env;
