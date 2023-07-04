import "reflect-metadata";
import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { AuthService } from "../services/auth.service";

export class AuthController {
  public auth: AuthService = Container.get(AuthService);

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      const user = await this.auth.register(userData);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      const user = this.auth.login(userData);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
  public logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Do something
    } catch (error) {
      next(error);
    }
  };
}
