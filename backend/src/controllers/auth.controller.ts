import "reflect-metadata";
import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { AuthService } from "../services/auth.service";
import { AuthPayload } from "../interfaces/auth.interface";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util";

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
      const authPayload: AuthPayload = { userId: user.id.toString() };
      const accessToken = generateAccessToken(authPayload);
      const refreshToken = generateRefreshToken(authPayload);
      res.cookie("access_token", accessToken, { httpOnly: true });
      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      res.status(200).json({ message: "Login successful" });
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
