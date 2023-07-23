import { User } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  userId: number;
}
export interface AuthRequest extends Request {
  user: User;
}
