import { Schema, model, type Document } from "mongoose";
import { ROLES, type Role } from "../../../common/constants/roles.js";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  drivingLicense: string;
  dateOfBirth: Date;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    drivingLicense: {
      type: String,
      required: [true, "Driving license is required"],
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);