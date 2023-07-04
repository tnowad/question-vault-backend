import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Routes } from "./interfaces/routes.interface";
import { CREDENTIALS, LOG_FORMAT, ORIGIN, PORT } from "./config";
import { logger, stream } from "./utils/logger";
export class App {
  public app: express.Application;
  public port: string | number;
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT ?? 3000;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`> App listening on the port: ${this.port}`);
    });
  }
  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT as string, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS == "true" }));
  }
  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
}
