import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "../config";
import { AuthPayload } from "../interfaces/auth.interface";

const generateAccessToken = (payload: AuthPayload): string => {
  const secretKey = JWT_SECRET ?? "";
  const options = { expiresIn: ACCESS_TOKEN_EXPIRATION ?? "15m" };

  return jwt.sign(payload, secretKey, options);
};

const generateRefreshToken = (payload: AuthPayload): string => {
  const secretKey = JWT_SECRET ?? "";
  const options = { expiresIn: REFRESH_TOKEN_EXPIRATION ?? "7d" };

  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token: string, secretKey: string): string | object => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { generateAccessToken, generateRefreshToken, verifyToken };
