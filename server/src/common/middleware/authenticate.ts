import { NextFunction, Request, Response } from "express";

export const authenticate = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    

  } catch (error) {}

  next();
};