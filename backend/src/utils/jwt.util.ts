import jwt, { JwtPayload } from "jsonwebtoken";
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

const verifyToken = (token: string): string | JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

function decodeToken(token: string): string | JwtPayload | null {
  try {
    return jwt.decode(token);
  } catch (err) {
    throw new Error("Fail to decode token");
  }
}
export { generateAccessToken, generateRefreshToken, verifyToken, decodeToken };
