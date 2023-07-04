import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import Container from "typedi";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public auth = Container.get(AuthService);

  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userData: User = req.body;
      const user = this.auth.register(userData);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Do something
    } catch (error) {
      next(error);
    }
  }
  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Do something
    } catch (error) {
      next(error);
    }
  }
}
