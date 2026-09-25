import { AppError } from "../../common/errors/AppError.js";
import { ERROR } from "../../common/errors/errors.js";
import { findUserById } from "./user.repository.js";
import type { UserResponse } from "./user.types.js";

export const getMyProfile = async (
  userId: string
): Promise<UserResponse> => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      ERROR.NOT_FOUND
    );
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    drivingLicense: user.drivingLicense,
    dateOfBirth: user.dateOfBirth,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};