import "reflect-metadata";
import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { AuthService } from "../services/auth.service";
import { AuthPayload } from "../interfaces/auth.interface";
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.util";
import { logger } from "../utils/logger.util";

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
      res
        .status(201)
        .json({ message: `User ${user.email} register successful!` });
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
      const user = await this.auth.login(userData);
      const authPayload: AuthPayload = { userId: user.id };
      const accessToken = generateAccessToken(authPayload);
      const refreshToken = generateRefreshToken(authPayload);
      res.cookie("access_token", accessToken, { httpOnly: true });
      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      next(error);
    }
  };
  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      const refreshTokenPayload = verifyToken(refreshToken) as AuthPayload;
      const accessToken = generateAccessToken({
        userId: refreshTokenPayload.userId,
      });
      res.cookie("access_token", accessToken, { httpOnly: true });
      res.status(200).json({ message: "Refresh access token successful" });
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
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };
}
