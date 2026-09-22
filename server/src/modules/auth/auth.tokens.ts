import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt.js";
import { hashToken } from "../../common/utils/token-hash.js";
import { createRefreshToken } from "./auth.repository.js";

const REFRESH_TOKEN_EXPIRES_IN_DAYS = 7;

export const createAuthTokens = async (
  userId: string,
  role: string
) => {
  const accessToken = generateAccessToken({
    userId,
    role,
  });

  const refreshToken = generateRefreshToken({
    userId,
    role,
  });

  const tokenHash = hashToken(refreshToken);

  const expiresAt = new Date(
    Date.now() +
      REFRESH_TOKEN_EXPIRES_IN_DAYS *
        24 *
        60 *
        60 *
        1000
  );

  await createRefreshToken({
    userId,
    tokenHash,
    expiresAt,
  });

  return {
    accessToken,
    refreshToken,
  };
};