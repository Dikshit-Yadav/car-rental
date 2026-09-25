import type { Role } from "../../common/constants/roles.js";

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  drivingLicense: string;
  dateOfBirth: Date;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}