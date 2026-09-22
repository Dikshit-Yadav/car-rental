import type { Role } from "../../common/constants/roles.js";

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  drivingLicense: string;
  dateOfBirth: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  drivingLicense: string;
  dateOfBirth: Date;
  role: Role;
  isActive: boolean;
  createdAt: Date;
}