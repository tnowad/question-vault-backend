import { Request, Response, NextFunction } from "express";

export class AuthController {
  public register = async (
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
  public login = async (
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
