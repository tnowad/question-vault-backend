import { Request, Response, NextFunction } from "express";

export class AuthController {
  public async register(
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
