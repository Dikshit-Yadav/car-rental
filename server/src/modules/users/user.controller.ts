import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { getMyProfile } from "./user.service.js";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const user = await getMyProfile(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};