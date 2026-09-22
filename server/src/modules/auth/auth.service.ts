import { AppError } from "../../common/errors/AppError.js";
import { ERROR } from "../../common/errors/errors.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt.js";
import { hashPassword } from "../../common/utils/password.js";
import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from "./auth.repository.js";
import { registerSchema } from "./auth.schema.js";
import type { RegisterInput } from "./auth.types.js";

export const registerUser = async (input: RegisterInput) => {
  const validatedData = registerSchema.parse(input);

  const existingEmail = await findUserByEmail(validatedData.email);

  if (existingEmail) {
    throw new AppError("Email is already registered", 409, ERROR.CONFLICT);
  }

  const existingPhone = await findUserByPhone(validatedData.phone);

  if (existingPhone) {
    throw new AppError(
      "Phone number is already registered",
      409,
      ERROR.CONFLICT,
    );
  }

  const hashedPassword = await hashPassword(validatedData.password);

  const user = await createUser({
    name: validatedData.name,
    email: validatedData.email,
    phone: validatedData.phone,
    password: hashedPassword,
    drivingLicense: validatedData.drivingLicense,
    dateOfBirth: new Date(validatedData.dateOfBirth),
  });

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      drivingLicense: user.drivingLicense,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};
