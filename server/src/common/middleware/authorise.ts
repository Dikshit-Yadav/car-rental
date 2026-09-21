import { NextFunction, Request, Response } from "express";

export const authorise =(...roles: string[]) => {
  return (
    _req: Request,
    _res: Response,
    next: NextFunction
  ): void => {
    console.log("Allowed roles:", roles);

    next();
  };
};