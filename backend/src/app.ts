import express from "express";
export class App {
  public app: express.Application;
  public port: string | number;
  constructor() {
    this.app = express();
    this.port = 3000;
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`> App listening on the port: ${this.port}`);
    });
  }
}
