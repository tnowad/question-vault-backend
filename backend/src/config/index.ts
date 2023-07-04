import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, LOG_DIR } = process.env;
