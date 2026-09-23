import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { verifyAccessToken } from "../utils/jwt.js";
import type { AuthenticatedUser } from "../types/common.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader =
      req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Authorization header missing");
    }

    const [scheme, token] =
      authorizationHeader.split(" ");

    if (
      scheme !== "Bearer" ||
      !token
    ) {
      throw new Error("Invalid authorization format");
    }

    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};