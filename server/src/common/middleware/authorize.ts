import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../errors/AppError.js";
import { ERROR } from "../errors/errors.js";
import type { Role } from "../constants/roles.js";

export const authorize = (...roles: Role[]) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    try {
      if (!req.user) {
        throw new AppError(
          "Authentication required",
          401,
          ERROR.UNAUTHORIZED
        );
      }

      if (!roles.includes(req.user.role as Role)) {
        throw new AppError(
          "You do not have permission to access this resource",
          403,
          ERROR.FORBIDDEN
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};