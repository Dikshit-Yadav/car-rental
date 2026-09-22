import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import { ERROR } from "../errors/errors.js";

interface AccessTokenPayload {
  userId: string;
  role: string;
}

export const generateAccessToken = (
  payload: AccessTokenPayload
): string => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (
  payload: AccessTokenPayload
): string => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (
  token: string
): AccessTokenPayload => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  try {
    return jwt.verify(
      token,
      secret
    ) as AccessTokenPayload;
  } catch {
    throw new AppError(
      "Invalid or expired access token",
      401,
      ERROR.UNAUTHORIZED
    );
  }
};

export const verifyRefreshToken = (
  token: string
): AccessTokenPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  try {
    return jwt.verify(
      token,
      secret
    ) as AccessTokenPayload;
  } catch {
    throw new AppError(
      "Invalid or expired refresh token",
      401,
      ERROR.UNAUTHORIZED
    );
  }
};