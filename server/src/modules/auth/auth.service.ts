import { AppError } from "../../common/errors/AppError.js";
import { ERROR } from "../../common/errors/errors.js";
import { hashPassword } from "../../common/utils/password.js";
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserByPhone,
  rotateRefreshToken,
} from "./auth.repository.js";
import { registerSchema } from "./auth.schema.js";
import type { RegisterInput } from "./auth.types.js";
import { createAuthTokens } from "./auth.tokens.js";
import { comparePassword } from "../../common/utils/password.js";
import { loginSchema } from "./auth.schema.js";
import type { LoginInput } from "./auth.types.js";
import {
  findRefreshToken,
  revokeRefreshToken,
} from "./auth.repository.js";

import {
  verifyRefreshToken,
} from "../../common/utils/jwt.js";

import { hashToken } from "../../common/utils/token-hash.js";

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

  const tokens = await createAuthTokens(user._id.toString(), user.role);

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

    tokens,
  };
};

export const loginUser = async (input: LoginInput) => {
  const validatedData = loginSchema.parse(input);

  const user = await findUserByEmailWithPassword(validatedData.email);

  if (!user) {
    throw new AppError("Invalid email or password", 401, ERROR.UNAUTHORIZED);
  }

  if (!user.isActive) {
    throw new AppError("User account is inactive", 403, ERROR.FORBIDDEN);
  }

  const passwordMatches = await comparePassword(
    validatedData.password,
    user.password,
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401, ERROR.UNAUTHORIZED);
  }

  const tokens = await createAuthTokens(user._id.toString(), user.role);

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

    tokens,
  };
};

export const refreshAuthTokens = async (
  refreshToken: string
) => {
  const payload = verifyRefreshToken(refreshToken);

  const tokenHash = hashToken(refreshToken);

  const storedToken = await rotateRefreshToken(
    tokenHash
  );

  if (!storedToken) {
    throw new AppError(
      "Refresh token is invalid, expired, or already used",
      401,
      ERROR.UNAUTHORIZED
    );
  }

  if (
    storedToken.userId.toString() !== payload.userId
  ) {
    throw new AppError(
      "Invalid refresh token",
      401,
      ERROR.UNAUTHORIZED
    );
  }

  return createAuthTokens(
    payload.userId,
    payload.role
  );
};

export const logoutUser = async (
  refreshToken: string
): Promise<void> => {
  const tokenHash = hashToken(refreshToken);

  const storedToken = await findRefreshToken(
    tokenHash
  );

  if (!storedToken) {
    return;
  }

  if (storedToken.revokedAt) {
    return;
  }

  await revokeRefreshToken(
    storedToken._id.toString()
  );
};