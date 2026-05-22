import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../middlewares/sendResponse";
import { verifyToken } from "./jwt";
import authService from "../modules/auth/auth.service";
import type { Role } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return sendResponse(
      res,
      {
        message: "token not found",
        error: true,
      },
      401,
    );
  }

  const payload = verifyToken(token, "access");

  if (!payload) {
    return sendResponse(
      res,
      {
        message: "Your token is Invalid",
      },
      401,
    );
  }

  const user = await authService.getUserById(payload.id);

  if (!user) {
    return sendResponse(
      res,
      {
        message: "User not found",
      },
      401,
    );
  }

  req.user = user;
  return next();
};

export const authorizeByRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(
        res,
        {
          message: "unauthorized access",
          error: true,
        },
        401,
      );
    }
    if (!roles.includes(req.user.role)) {
      return sendResponse(
        res,
        {
          message: "You have no permissions to access",
          error: true,
        },
        401,
      );
    }
    next();
  };
};
