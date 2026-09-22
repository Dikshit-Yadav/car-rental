import { User } from "../../infrastructure/database/models/User.model.js";

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
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