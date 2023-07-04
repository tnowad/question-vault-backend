import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { LOG_DIR } from "../config";

const logDir = join(__dirname, LOG_DIR as string);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
