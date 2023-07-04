import express from "express";
import { PORT } from "./config";
import { logger } from "./utils/logger";
export class App {
  public app: express.Application;
  public port: string | number;
  constructor() {
    this.app = express();
    this.port = PORT ?? 3000;
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`> App listening on the port: ${this.port}`);
    });
  }
}
