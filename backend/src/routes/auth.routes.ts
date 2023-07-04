import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";

export class AuthRoute implements Routes {
  public path = "/api/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/register`, (req, res) => {
      res.status(200).json({ message: "register" });
    });
    this.router.post(`${this.path}/login`, (req, res) => {
      res.status(200).json({ message: "login" });
    });
    this.router.post(`${this.path}/logout`, (req, res) => {
      res.status(200).json({ message: "logout" });
    });
  }
}
