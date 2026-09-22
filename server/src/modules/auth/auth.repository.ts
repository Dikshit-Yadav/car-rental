import { User } from "../../infrastructure/database/models/User.model.js";
import { RefreshToken } from "../../infrastructure/database/models/RefreshToken.model.js";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const findUserByEmailWithPassword = async (email: string) => {
  return User.findOne({ email }).select("+password");
};

export const findUserByPhone = async (phone: string) => {
  return User.findOne({ phone });
};

export const createUser = async (userData: {
  name: string;
  email: string;
  phone: string;
  password: string;
  drivingLicense: string;
  dateOfBirth: Date;
}) => {
  return User.create(userData);
};

export const createRefreshToken = async (data: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  return RefreshToken.create({
    userId: data.userId,
    tokenHash: data.tokenHash,
    expiresAt: data.expiresAt,
  });
};

export const findRefreshToken = async (tokenHash: string) => {
  return RefreshToken.findOne({
    tokenHash,
  });
};

export const revokeRefreshToken = async (
  refreshTokenId: string,
): Promise<void> => {
  await RefreshToken.findByIdAndUpdate(refreshTokenId, {
    revokedAt: new Date(),
  });
};

export const deleteRefreshToken = async (
  refreshTokenId: string,
): Promise<void> => {
  await RefreshToken.findByIdAndDelete(refreshTokenId);
};
