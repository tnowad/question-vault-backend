import { Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { AuthController } from "../controllers/auth.controller";
import asyncHandler from "express-async-handler";

export class AuthRoute implements Routes {
  public path = "/api/auth";
  public router = Router();
  public auth = new AuthController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/register`, asyncHandler(this.auth.register));
    this.router.post(`${this.path}/login`, asyncHandler(this.auth.login));
    this.router.post(
      `${this.path}/refresh-token`,
      asyncHandler(this.auth.refreshToken)
    );
    this.router.post(`${this.path}/logout`, asyncHandler(this.auth.logout));
  }
}
