import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../utils/jwt.util";
import { AuthPayload, AuthRequest } from "./../interfaces/auth.interface";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http.exception";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.access_token;
  try {
    if (accessToken) {
      const authPayload = (await verifyToken(accessToken)) as AuthPayload;
      const users = new PrismaClient().user;
      const user = await users.findUnique({
        where: { id: authPayload.userId },
      });
      if (user) {
        (req as AuthRequest).user = user;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};
