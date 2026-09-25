import { User } from "../../infrastructure/database/models/User.model.js";

export const findUserById = async (userId: string) => {
  return User.findById(userId).select("-password");
};